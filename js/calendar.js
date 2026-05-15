/**
 * calendar.js — Monthly grid + daily view for Yaoshi Health Calendar App
 *
 * Exports: initCalendar()
 */

import { SHICHEN_DATA } from '../data/shichen-data.js';
import { JIEQI_DATA, JIEQI_DATES, getCurrentJieqi } from '../data/jieqi-data.js';
import { getLunarDate } from '../data/lunar-data.js';
import { t, getLang } from './i18n.js';
import { lotusDividerHTML } from './app.js';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let currentYear;
let currentMonth; // 0-based

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function initCalendar() {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();
  renderMonthHeader();
  renderMonthGrid();
  renderJieqiSummary();
  // Restore monthly view in case daily view was showing
  _showMonthlyView();
}

// ---------------------------------------------------------------------------
// Month header (prev/next navigation)
// ---------------------------------------------------------------------------

function renderMonthHeader() {
  const el = document.getElementById('calendar-header');
  if (!el) return;

  const lang = getLang();
  const monthName = t(`months.${currentMonth + 1}`);
  const title = lang === 'zh'
    ? `${monthName} ${currentYear}`
    : `${monthName} ${currentYear}`;

  el.innerHTML = `
    <div class="calendar-grid-wrapper">
      <div class="calendar-nav">
        <button class="calendar-nav__btn" id="cal-prev" aria-label="Previous month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <span class="calendar-nav__title">${title}</span>
        <button class="calendar-nav__btn" id="cal-next" aria-label="Next month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  document.getElementById('cal-prev').addEventListener('click', () => {
    currentMonth -= 1;
    if (currentMonth < 0) { currentMonth = 11; currentYear -= 1; }
    renderMonthHeader();
    renderMonthGrid();
    renderJieqiSummary();
  });

  document.getElementById('cal-next').addEventListener('click', () => {
    currentMonth += 1;
    if (currentMonth > 11) { currentMonth = 0; currentYear += 1; }
    renderMonthHeader();
    renderMonthGrid();
    renderJieqiSummary();
  });
}

// ---------------------------------------------------------------------------
// Month grid
// ---------------------------------------------------------------------------

function renderMonthGrid() {
  const el = document.getElementById('calendar-grid');
  if (!el) return;

  const lang = getLang();
  const today = new Date();
  const todayStr = _dateKey(today);

  // Build jieqi lookup for this month: "YYYY-M-D" -> jieqi index
  const jieqiMap = _buildJieqiMap(currentYear, currentMonth);

  // Weekday headers (Mon … Sun)
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const weekdayHeadersHTML = dayKeys.map((k, i) => {
    const isWeekend = i >= 5;
    return `<div class="calendar-weekday${isWeekend ? ' calendar-weekday--weekend' : ''}">${t(`weekdays.${k}`)}</div>`;
  }).join('');

  // Days in this month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // First day of month: 0=Sun…6=Sat, convert to Mon-based (0=Mon…6=Sun)
  const firstDow = new Date(currentYear, currentMonth, 1).getDay();
  const offsetCells = (firstDow + 6) % 7; // Mon-based offset

  // Build day cells
  let cellsHTML = '';

  // Empty cells before first day
  for (let i = 0; i < offsetCells; i++) {
    cellsHTML += `<div class="calendar-day calendar-day--other-month"></div>`;
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const dateStr = _dateKey(date);

    const isToday = dateStr === todayStr;
    const dow = (date.getDay() + 6) % 7; // Mon-based: 5=Sat, 6=Sun
    const isWeekend = dow === 5 || dow === 6;

    const lunarResult = getLunarDate(date, lang);
    const lunarDay = lunarResult ? lunarResult.day : '';

    const jieqiIdx = jieqiMap[`${currentYear}-${currentMonth + 1}-${d}`];
    const jieqiHTML = (jieqiIdx !== undefined)
      ? `<div class="calendar-day__jieqi">${JIEQI_DATA[jieqiIdx].name[lang]}</div>`
      : '';

    let classes = 'calendar-day';
    if (isToday) classes += ' calendar-day--today';
    if (isWeekend) classes += ' calendar-day--weekend';

    cellsHTML += `
      <div class="${classes}" data-date="${dateStr}">
        <div class="calendar-day__solar">${d}</div>
        ${lunarDay ? `<div class="calendar-day__lunar">${lunarDay}</div>` : ''}
        ${jieqiHTML}
      </div>
    `;
  }

  el.innerHTML = `
    <div class="calendar-grid-wrapper">
      <div class="calendar-weekdays">${weekdayHeadersHTML}</div>
      <div class="calendar-body">${cellsHTML}</div>
    </div>
  `;

  // Attach click handlers
  el.querySelectorAll('.calendar-day[data-date]').forEach(cell => {
    cell.addEventListener('click', () => {
      const [y, m, d] = cell.getAttribute('data-date').split('-').map(Number);
      showDailyView(new Date(y, m - 1, d));
    });
  });
}

// ---------------------------------------------------------------------------
// Jieqi summary for the current month
// ---------------------------------------------------------------------------

function renderJieqiSummary() {
  const el = document.getElementById('jieqi-summary');
  if (!el) return;

  const lang = getLang();
  const jieqiMap = _buildJieqiMap(currentYear, currentMonth);
  const monthJieqi = Object.entries(jieqiMap); // [[dateStr, idx], ...]

  if (monthJieqi.length === 0) {
    el.innerHTML = '';
    return;
  }

  const cardsHTML = monthJieqi.map(([dateStr, idx]) => {
    const jq = JIEQI_DATA[idx];
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const lunarResult = getLunarDate(date, lang);
    const lunarStr = lunarResult ? `${lunarResult.month}${lunarResult.day}` : '';
    const seasonLabel = t(`seasons.${jq.season}`);

    return `
      <div class="card card--hero-border">
        <div class="card__body">
          <div class="flex-between mb-8">
            <div>
              <span class="title-3">${jq.name[lang]}</span>
              <span class="gold-tag" style="margin-left:8px">${seasonLabel}</span>
            </div>
            <div class="caption">${m}月${d}日${lunarStr ? ` · ${lunarStr}` : ''}</div>
          </div>
          <p class="body-text text-secondary" style="margin-bottom:12px">${_truncate(jq.advice[lang], 80)}</p>
          <div style="background:rgba(184,134,11,0.05);border-radius:8px;padding:10px 14px;">
            <div class="caption" style="margin-bottom:4px">${t('calendar.recommendations')}</div>
            <p class="body-text" style="font-size:13px;color:var(--color-text-secondary)">${_truncate(jq.diet[lang], 60)}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  el.innerHTML = `
    <div class="section__header">
      <h2 class="section__title">${t('calendar.monthJieqi')}</h2>
    </div>
    <div class="flex-col gap-16">${cardsHTML}</div>
  `;
}

// ---------------------------------------------------------------------------
// Daily view
// ---------------------------------------------------------------------------

export function showDailyView(date) {
  const lang = getLang();
  const { current: jq } = getCurrentJieqi(date);
  const lunarResult = getLunarDate(date, lang);

  const solarLabel = lang === 'zh'
    ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    : `${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;

  const lunarLabel = lunarResult
    ? (lang === 'zh'
        ? `农历 ${lunarResult.month}${lunarResult.day}`
        : `Lunar: ${lunarResult.month}, Day ${lunarResult.day}`)
    : '';

  const seasonLabel = t(`seasons.${jq.season}`);

  // Shichen schedule rows
  const shichenRowsHTML = SHICHEN_DATA.map(sc => {
    const name = sc.name[lang];
    const meridian = sc.meridian[lang];
    const summary = sc.summary[lang];
    return `
      <div class="card-row">
        <div style="min-width:56px;flex-shrink:0">
          <div style="font-weight:600;color:var(--color-gold-primary)">${name}</div>
          <div class="caption" style="text-transform:none;letter-spacing:0">${sc.timeRange}</div>
        </div>
        <div style="flex:1;padding-left:16px">
          <div style="font-size:13px;font-weight:500;color:var(--color-text-secondary);margin-bottom:2px">${meridian}</div>
          <div style="font-size:13px;color:var(--color-text-secondary);line-height:1.5">${summary}</div>
        </div>
      </div>
    `;
  }).join('');

  const dailyView = document.getElementById('daily-view');
  if (!dailyView) return;

  dailyView.innerHTML = `
    <div style="margin-bottom:24px">
      <button id="back-to-month" class="btn btn--ghost btn--sm" style="margin-bottom:20px">
        ← ${t('calendar.backToMonth')}
      </button>

      <div style="margin-bottom:16px">
        <h1 class="title-1" style="margin-bottom:4px">${solarLabel}</h1>
        ${lunarLabel ? `<p class="body-text text-secondary">${lunarLabel}</p>` : ''}
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">
        <span class="gold-tag gold-tag--solid">${jq.name[lang]}</span>
        <span class="gold-tag">${seasonLabel}</span>
      </div>
    </div>

    ${lotusDividerHTML()}

    <div class="section">
      <div class="section__header">
        <h2 class="section__title">${t('calendar.recommendations')}</h2>
      </div>
      <div class="card">
        <div class="card__body">
          <p class="body-text" style="margin-bottom:16px">${jq.advice[lang]}</p>
          <div style="background:rgba(184,134,11,0.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
            <div class="caption" style="margin-bottom:6px">${t('home.diet')}</div>
            <p class="body-text text-secondary" style="font-size:15px">${jq.diet[lang]}</p>
          </div>
          ${jq.herbalRecipe ? `
          <div style="background:rgba(184,134,11,0.06);border-radius:10px;padding:14px 16px;margin-bottom:12px">
            <div class="caption" style="margin-bottom:6px">${t('calendar.herbalRecipe')}</div>
            <p class="body-text text-secondary" style="font-size:15px">${jq.herbalRecipe[lang]}</p>
          </div>` : ''}
          <div style="background:rgba(184,134,11,0.06);border-radius:10px;padding:14px 16px">
            <div class="caption" style="margin-bottom:6px">${t('home.exercise')}</div>
            <p class="body-text text-secondary" style="font-size:15px">${jq.exercise[lang]}</p>
          </div>
        </div>
      </div>
    </div>

    ${lotusDividerHTML()}

    <div class="section">
      <div class="section__header">
        <h2 class="section__title">${t('calendar.dailySchedule')}</h2>
      </div>
      <div class="card--grouped">
        ${shichenRowsHTML}
      </div>
    </div>
  `;

  document.getElementById('back-to-month').addEventListener('click', () => {
    _showMonthlyView();
  });

  _showDailyView();
}

// ---------------------------------------------------------------------------
// View toggle helpers
// ---------------------------------------------------------------------------

function _showDailyView() {
  document.getElementById('calendar-header').style.display = 'none';
  document.getElementById('calendar-grid').style.display = 'none';
  document.getElementById('jieqi-summary').style.display = 'none';
  document.getElementById('daily-view').style.display = 'block';
}

function _showMonthlyView() {
  document.getElementById('calendar-header').style.display = 'block';
  document.getElementById('calendar-grid').style.display = 'block';
  document.getElementById('jieqi-summary').style.display = 'block';
  document.getElementById('daily-view').style.display = 'none';
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns "YYYY-M-D" key for a Date (local time). */
function _dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

/**
 * Build a map from "YYYY-M-D" -> jieqi index for all jieqi that start
 * within the given year/month (0-based).
 */
function _buildJieqiMap(year, month0) {
  const map = {};
  const dates = JIEQI_DATES[year];
  if (!dates) return map;

  dates.forEach(([m, d], idx) => {
    if (m - 1 === month0) {
      map[`${year}-${m}-${d}`] = idx;
    }
  });

  return map;
}

/** Truncate a string to maxLen chars, appending ellipsis if needed. */
function _truncate(str, maxLen) {
  if (!str) return '';
  return str.length <= maxLen ? str : str.slice(0, maxLen) + '…';
}
