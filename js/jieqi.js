/**
 * jieqi.js — 节气 card rendering
 * Yaoshi Health Calendar App
 *
 * Exports:
 *   renderJieqiCard() — renders current 节气 card into #jieqi-card
 */

import { t, getLang } from './i18n.js';
import { JIEQI_DATA, JIEQI_DATES, getCurrentJieqi } from '../data/jieqi-data.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Returns the localized string for a bilingual object. */
function loc(obj) {
  const lang = getLang();
  return (obj && (obj[lang] || obj['zh'])) || '';
}

/** Format a [month, day] pair as a readable string. */
function formatDate(monthDay, year) {
  if (!monthDay) return '';
  const [m, d] = monthDay;
  const lang = getLang();
  if (lang === 'zh') {
    return `${year}年${m}月${d}日`;
  }
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[m - 1]} ${d}, ${year}`;
}

/** Map season key to translated label. */
function seasonLabel(seasonKey) {
  const map = {
    spring: 'seasons.spring',
    summer: 'seasons.summer',
    autumn: 'seasons.autumn',
    winter: 'seasons.winter',
  };
  return t(map[seasonKey] || 'seasons.spring');
}

// ---------------------------------------------------------------------------
// renderJieqiCard
// ---------------------------------------------------------------------------

export function renderJieqiCard() {
  const container = document.getElementById('jieqi-card');
  if (!container) return;

  const today = new Date();
  const year = today.getFullYear();
  const { current, next, startDate, endDate } = getCurrentJieqi(today);

  const jieqiName = loc(current.name);
  const season = seasonLabel(current.season);
  const advice = loc(current.advice);
  const diet = loc(current.diet);
  const herbalRecipe = loc(current.herbalRecipe);
  const exercise = loc(current.exercise);
  const avoidance = loc(current.avoidance);

  const startStr = formatDate(startDate, year);
  const endYear = (endDate && endDate[0] < (startDate ? startDate[0] : 1)) ? year + 1 : year;
  const endStr = endDate ? formatDate(endDate, endYear) : '';
  const dateRangeStr = endStr ? `${startStr} – ${endStr}` : startStr;

  const currentJieqiLabel = t('home.currentJieqi');
  const adviceLabel = t('home.healthAdvice');
  const dietLabel = t('home.diet');
  const recipeLabel = t('calendar.herbalRecipe');
  const exerciseLabel = t('home.exercise');
  const lang = getLang();
  const expandLabel = lang === 'zh' ? '展开详情' : 'Show Details';
  const collapseLabel = lang === 'zh' ? '收起' : 'Collapse';

  function optionalSection(label, text) {
    if (!text) return '';
    return `
      <div style="margin-top: 16px;">
        <p class="caption" style="margin-bottom: 4px;">${label}</p>
        <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${text}</p>
      </div>`;
  }

  container.innerHTML = `
    <p class="caption" style="margin-bottom: 12px;">${currentJieqiLabel}</p>
    <div class="card card--hero-border" style="padding: 24px;">
      <div class="flex-between" style="margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="gold-tag">${jieqiName}</span>
          <span class="gold-tag gold-tag--solid">${season}</span>
        </div>
        <span class="caption">${dateRangeStr}</span>
      </div>

      <h2 class="title-2" style="margin-bottom: 16px;">${jieqiName}</h2>

      <div>
        <p class="caption" style="margin-bottom: 4px;">${adviceLabel}</p>
        <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${advice}</p>
      </div>

      <div id="jieqi-details" style="display: none;">
        ${optionalSection(dietLabel, diet)}
        ${optionalSection(recipeLabel, herbalRecipe)}
        ${optionalSection(exerciseLabel, exercise)}
        ${optionalSection(lang === 'zh' ? '注意事项' : 'Precautions', avoidance)}
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <button id="jieqi-expand-btn" class="btn btn--ghost btn--sm" style="cursor:pointer;">${expandLabel}</button>
      </div>
    </div>
  `;

  const detailsEl = document.getElementById('jieqi-details');
  const expandBtn = document.getElementById('jieqi-expand-btn');
  let expanded = false;

  expandBtn.addEventListener('click', () => {
    expanded = !expanded;
    detailsEl.style.display = expanded ? 'block' : 'none';
    expandBtn.textContent = expanded ? collapseLabel : expandLabel;
  });
}
