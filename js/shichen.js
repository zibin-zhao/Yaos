/**
 * shichen.js — 时辰 hero card + timeline rendering
 * Yaoshi Health Calendar App
 *
 * Exports:
 *   renderShichenHero()      — renders current 时辰 hero card into #shichen-hero
 *   renderShichenTimeline()  — renders horizontal pill timeline into #shichen-timeline
 *   startAutoRefresh()       — sets interval to re-render hero every 60s
 */

import { getCurrentShichen, getShichenProgress, lotusDividerHTML } from './app.js';
import { t, getLang } from './i18n.js';
import { SHICHEN_DATA } from '../data/shichen-data.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/** Returns the localized string for a bilingual object. */
function loc(obj) {
  const lang = getLang();
  return (obj && (obj[lang] || obj['zh'])) || '';
}

/** Builds an info row with a label and content. Only renders if content is non-empty. */
function infoSection(labelKey, content) {
  if (!content || content.trim() === '') return '';
  return `
    <div style="margin-bottom: var(--space-16);">
      <p class="caption" style="margin-bottom: var(--space-4);">${t(labelKey)}</p>
      <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${content}</p>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// renderShichenHero
// ---------------------------------------------------------------------------

export function renderShichenHero() {
  const container = document.getElementById('shichen-hero');
  if (!container) return;

  const idx = getCurrentShichen();
  const progress = getShichenProgress();
  const shichen = SHICHEN_DATA[idx];
  const lang = getLang();

  const name = loc(shichen.name);
  const meridian = loc(shichen.meridian);
  const timeRange = shichen.timeRange;
  const yakshaGeneral = loc(shichen.yakshaGeneral);
  const buddha = loc(shichen.buddha);
  const advice = loc(shichen.advice);
  const diet = loc(shichen.diet);
  const exercise = loc(shichen.exercise);
  const acupressure = loc(shichen.acupressure);

  const currentShichenLabel = t('home.currentShichen');
  const meridianLabel = t('home.meridian');
  const yakshaLabel = t('home.yakshaGeneral');
  const buddhaLabel = t('home.buddha');
  const adviceLabel = t('home.healthAdvice');
  const dietLabel = t('home.diet');
  const exerciseLabel = t('home.exercise');
  const acupressureLabel = t('home.acupressure');

  container.innerHTML = `
    <div class="card card--hero-border" style="padding: var(--space-24);">
      <div class="flex-between" style="margin-bottom: var(--space-16);">
        <span class="caption">${currentShichenLabel}</span>
        <span class="caption">${timeRange}</span>
      </div>

      <div style="margin-bottom: var(--space-12);">
        <span class="gold-tag">${name}</span>
      </div>

      <h1 class="title-1" style="margin-bottom: var(--space-8);">
        ${name} · ${meridian}
      </h1>

      <div class="flex-between" style="margin-bottom: var(--space-20); flex-wrap: wrap; gap: var(--space-8);">
        <span class="body-text text-secondary">
          <strong>${yakshaLabel}：</strong>${yakshaGeneral}
        </span>
        <span class="body-text text-secondary">
          <strong>${buddhaLabel}：</strong>${buddha}
        </span>
      </div>

      <div class="progress-bar" style="margin-bottom: var(--space-4);" title="${progress}%">
        <div class="progress-bar__fill" style="width: ${progress}%;"></div>
      </div>
      <p class="caption" style="text-align: right; margin-bottom: var(--space-24);">${progress}%</p>

      ${lotusDividerHTML()}

      ${infoSection('home.healthAdvice', advice)}
      ${infoSection('home.diet', diet)}
      ${infoSection('home.exercise', exercise)}
      ${infoSection('home.acupressure', acupressure)}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// renderShichenTimeline
// ---------------------------------------------------------------------------

// Track which pill is selected (null = none / show current)
let _selectedIdx = null;

export function renderShichenTimeline() {
  const container = document.getElementById('shichen-timeline');
  if (!container) return;

  const currentIdx = getCurrentShichen();

  const pillsHTML = SHICHEN_DATA.map((s, i) => {
    const isCurrent = i === currentIdx;
    const activeClass = isCurrent ? ' shichen-pill--active' : '';
    const name = loc(s.name);
    const organ = loc(s.organ);
    return `
      <button class="shichen-pill${activeClass}" data-index="${i}" aria-label="${name}" aria-pressed="${isCurrent}">
        <span class="shichen-pill__name">${name}</span>
        <span class="shichen-pill__time" style="font-size:10px;">${s.timeRange.split(' - ')[0]}</span>
        <span class="shichen-pill__element">${organ}</span>
      </button>
    `;
  }).join('');

  // Build detail card for the selected non-current shichen
  const detailShichen = (_selectedIdx !== null && _selectedIdx !== currentIdx)
    ? SHICHEN_DATA[_selectedIdx]
    : null;

  const detailHTML = detailShichen ? `
    <div class="card" style="margin-top: var(--space-16); padding: var(--space-20);">
      <div class="flex-between" style="margin-bottom: var(--space-12);">
        <span class="gold-tag">${loc(detailShichen.name)}</span>
        <span class="caption">${detailShichen.timeRange}</span>
      </div>
      <h3 class="title-3" style="margin-bottom: var(--space-8);">
        ${loc(detailShichen.name)} · ${loc(detailShichen.meridian)}
      </h3>
      <div class="flex-between" style="margin-bottom: var(--space-12); flex-wrap: wrap; gap: var(--space-8);">
        <span class="caption">${t('home.yakshaGeneral')}: ${loc(detailShichen.yakshaGeneral)}</span>
        <span class="caption">${t('home.buddha')}: ${loc(detailShichen.buddha)}</span>
      </div>
      ${lotusDividerHTML()}
      <p class="body-text" style="color: var(--color-text-secondary); line-height: 1.7;">${loc(detailShichen.summary) || loc(detailShichen.advice)}</p>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="shichen-timeline" id="shichen-pills">
      ${pillsHTML}
    </div>
    <div id="shichen-detail">${detailHTML}</div>
  `;

  // Wire up pill clicks
  container.querySelectorAll('.shichen-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const clickedIdx = parseInt(btn.getAttribute('data-index'), 10);

      // Toggle: clicking same non-current pill again collapses detail
      if (_selectedIdx === clickedIdx && clickedIdx !== currentIdx) {
        _selectedIdx = null;
      } else {
        _selectedIdx = clickedIdx;
      }

      renderShichenTimeline();

      // Scroll selected pill into view
      const target = document.querySelector(`.shichen-pill[data-index="${clickedIdx}"]`);
      if (target) target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
  });
}

// ---------------------------------------------------------------------------
// startAutoRefresh
// ---------------------------------------------------------------------------

let _refreshTimer = null;

export function startAutoRefresh() {
  if (_refreshTimer) clearInterval(_refreshTimer);
  _refreshTimer = setInterval(() => {
    renderShichenHero();
    renderShichenTimeline();
  }, 60 * 1000);
}
