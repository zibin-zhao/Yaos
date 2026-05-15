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

  const startStr = formatDate(startDate, year);
  // endDate might wrap to next year
  const endYear = (endDate && endDate[0] < (startDate ? startDate[0] : 1)) ? year + 1 : year;
  const endStr = endDate ? formatDate(endDate, endYear) : '';

  const dateRangeStr = endStr ? `${startStr} – ${endStr}` : startStr;

  const currentJieqiLabel = t('home.currentJieqi');
  const seasonLabelText = t('home.season');
  const adviceLabel = t('home.healthAdvice');
  const dietLabel = t('home.diet');
  const viewDetailsLabel = t('home.viewDetails');

  const dietSection = diet ? `
    <div style="margin-top: var(--space-12);">
      <p class="caption" style="margin-bottom: var(--space-4);">${dietLabel}</p>
      <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${diet}</p>
    </div>
  ` : '';

  container.innerHTML = `
    <p class="caption" style="margin-bottom: var(--space-12);">${currentJieqiLabel}</p>
    <div class="card card--hero-border" style="padding: var(--space-24);">
      <div class="flex-between" style="margin-bottom: var(--space-16); flex-wrap: wrap; gap: var(--space-8);">
        <div style="display: flex; align-items: center; gap: var(--space-8);">
          <span class="gold-tag">${jieqiName}</span>
          <span class="gold-tag gold-tag--solid">${season}</span>
        </div>
        <span class="caption">${dateRangeStr}</span>
      </div>

      <h2 class="title-2" style="margin-bottom: var(--space-16);">${jieqiName}</h2>

      <div style="margin-bottom: var(--space-12);">
        <p class="caption" style="margin-bottom: var(--space-4);">${adviceLabel}</p>
        <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${advice}</p>
      </div>

      ${dietSection}

      <div style="margin-top: var(--space-24); text-align: right;">
        <a href="calendar.html" class="btn btn--ghost btn--sm">${viewDetailsLabel} →</a>
      </div>
    </div>
  `;
}
