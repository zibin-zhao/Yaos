/**
 * app.js — Shared module for Yaoshi Health Calendar App
 *
 * Exports:
 *   renderNav(activePage)      — top nav + bottom mobile tab bar
 *   getCurrentShichen()        — 0-11 index for current 时辰
 *   getShichenProgress()       — 0-100 % through current 2-hr period
 *   lotusDividerHTML()         — HTML string for lotus divider
 *   renderFooter()             — footer element
 */

import { t, getLang, initLangToggle } from './i18n.js';

window.addEventListener('langchange', () => _syncLangToggleActiveClass());

// ---------------------------------------------------------------------------
// 时辰 (Shichen) utilities
// ---------------------------------------------------------------------------

/**
 * Maps the current hour to a shichen index 0–11.
 *
 * 子(23–1)→0  丑(1–3)→1   寅(3–5)→2   卯(5–7)→3
 * 辰(7–9)→4   巳(9–11)→5  午(11–13)→6 未(13–15)→7
 * 申(15–17)→8 酉(17–19)→9 戌(19–21)→10 亥(21–23)→11
 */
export function getCurrentShichen() {
  const hour = new Date().getHours();
  if (hour >= 23 || hour < 1)  return 0;  // 子
  if (hour >= 1  && hour < 3)  return 1;  // 丑
  if (hour >= 3  && hour < 5)  return 2;  // 寅
  if (hour >= 5  && hour < 7)  return 3;  // 卯
  if (hour >= 7  && hour < 9)  return 4;  // 辰
  if (hour >= 9  && hour < 11) return 5;  // 巳
  if (hour >= 11 && hour < 13) return 6;  // 午
  if (hour >= 13 && hour < 15) return 7;  // 未
  if (hour >= 15 && hour < 17) return 8;  // 申
  if (hour >= 17 && hour < 19) return 9;  // 酉
  if (hour >= 19 && hour < 21) return 10; // 戌
  return 11; // 亥 (21–23)
}

/**
 * Returns 0–100 progress percentage through the current 2-hour 时辰 period.
 */
export function getShichenProgress() {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Total elapsed seconds within the current shichen
  // Each shichen starts on an odd hour (1, 3, 5 … 23) except 子 which starts at 23.
  // Find the start hour of the current shichen:
  let startHour;
  if (hour >= 23 || hour < 1) {
    startHour = 23;
  } else {
    // Start of the current 2-hr block: floor to nearest odd hour
    startHour = hour % 2 === 1 ? hour : hour - 1;
  }

  // Seconds elapsed since shichen start
  let elapsedSeconds;
  if (startHour === 23 && hour < 1) {
    // Spans midnight: e.g. hour=0, startHour=23
    elapsedSeconds = (hour + 1) * 3600 + minute * 60 + second;
  } else {
    elapsedSeconds = (hour - startHour) * 3600 + minute * 60 + second;
  }

  const totalSeconds = 2 * 3600; // 7200 seconds per shichen
  return Math.min(100, Math.round((elapsedSeconds / totalSeconds) * 100));
}

// ---------------------------------------------------------------------------
// Lotus divider
// ---------------------------------------------------------------------------

/**
 * Returns an HTML string for the decorative lotus divider.
 * Uses .lotus-divider and .lotus-divider__icon from style.css.
 */
export function lotusDividerHTML() {
  return `<div class="lotus-divider">
  <span class="lotus-divider__icon">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
         xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Centre petal -->
      <path d="M10 14C10 14 7 11 7 8C7 6.343 8.343 5 10 5C11.657 5 13 6.343 13 8C13 11 10 14 10 14Z"
            fill="currentColor" opacity="0.9"/>
      <!-- Left petal -->
      <path d="M10 14C10 14 5.5 12.5 4.5 9.5C3.9 7.8 4.8 6 6.5 5.5C8.2 5 9.5 6.2 10 7.5C9 10 10 14 10 14Z"
            fill="currentColor" opacity="0.55"/>
      <!-- Right petal -->
      <path d="M10 14C10 14 14.5 12.5 15.5 9.5C16.1 7.8 15.2 6 13.5 5.5C11.8 5 10.5 6.2 10 7.5C11 10 10 14 10 14Z"
            fill="currentColor" opacity="0.55"/>
      <!-- Stem -->
      <line x1="10" y1="14" x2="10" y2="17" stroke="currentColor" stroke-width="1.2"
            stroke-linecap="round" opacity="0.5"/>
    </svg>
  </span>
</div>`;
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

/**
 * Renders the top navigation bar (id="main-nav") and the bottom mobile tab
 * bar (id="bottom-nav").
 *
 * @param {'home'|'calendar'|'readings'} activePage
 */
export function renderNav(activePage) {
  _renderTopNav(activePage);
  _renderBottomNav(activePage);

  initLangToggle();
  _syncLangToggleActiveClass();
}

/** Sync .lang-toggle__btn--active to match the currently selected language. */
function _syncLangToggleActiveClass() {
  const currentLang = getLang();
  document.querySelectorAll('.lang-toggle__btn').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === currentLang;
    btn.classList.toggle('lang-toggle__btn--active', isActive);
  });
}

function _renderTopNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const links = [
    { key: 'home',     href: 'index.html',    label: t('nav.home') },
    { key: 'calendar', href: 'calendar.html',  label: t('nav.calendar') },
    { key: 'readings', href: 'readings.html',  label: t('nav.readings') },
  ];

  const linksHTML = links.map(({ key, href, label }) => {
    const activeClass = key === activePage ? ' nav__link--active' : '';
    return `<a href="${href}" class="nav__link${activeClass}" data-i18n="nav.${key}">${label}</a>`;
  }).join('');

  const currentLang = getLang();

  nav.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="nav__logo">
        <div class="nav__logo-icon" aria-hidden="true">药</div>
        <span class="nav__logo-text" data-i18n="nav.logo">${t('nav.logo')}</span>
      </a>

      <nav class="nav__links" aria-label="Main navigation">
        ${linksHTML}
      </nav>

      <div class="lang-toggle" role="group" aria-label="Language">
        <button class="lang-toggle__btn${currentLang === 'zh' ? ' lang-toggle__btn--active' : ''}"
                data-lang="zh">中</button>
        <button class="lang-toggle__btn${currentLang === 'en' ? ' lang-toggle__btn--active' : ''}"
                data-lang="en">EN</button>
      </div>
    </div>
  `;
}

function _renderBottomNav(activePage) {
  const bottomNav = document.getElementById('bottom-nav');
  if (!bottomNav) return;

  const tabs = [
    {
      key: 'home',
      href: 'index.html',
      label: t('nav.home'),
      i18nKey: 'nav.home',
      icon: `<svg class="bottom-nav__icon" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
               <path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
                     stroke="currentColor" stroke-width="1.8"
                     stroke-linejoin="round" fill="none"/>
             </svg>`,
    },
    {
      key: 'calendar',
      href: 'calendar.html',
      label: t('nav.calendar'),
      i18nKey: 'nav.calendar',
      icon: `<svg class="bottom-nav__icon" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
               <rect x="3" y="4" width="18" height="18" rx="2"
                     stroke="currentColor" stroke-width="1.8" fill="none"/>
               <line x1="3" y1="9" x2="21" y2="9"
                     stroke="currentColor" stroke-width="1.8"/>
               <line x1="8" y1="2" x2="8" y2="6"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
               <line x1="16" y1="2" x2="16" y2="6"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
             </svg>`,
    },
    {
      key: 'readings',
      href: 'readings.html',
      label: t('nav.readings'),
      i18nKey: 'nav.readings',
      icon: `<svg class="bottom-nav__icon" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
               <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                     stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
               <path d="M6.5 2H20V22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2Z"
                     stroke="currentColor" stroke-width="1.8" fill="none"/>
             </svg>`,
    },
  ];

  const tabsHTML = tabs.map(({ key, href, label, i18nKey, icon }) => {
    const activeClass = key === activePage ? ' bottom-nav__tab--active' : '';
    return `
      <a href="${href}" class="bottom-nav__tab${activeClass}" aria-label="${label}">
        ${icon}
        <span class="bottom-nav__label" data-i18n="${i18nKey}">${label}</span>
      </a>
    `;
  }).join('');

  bottomNav.innerHTML = `
    <div class="bottom-nav__inner">
      ${tabsHTML}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

/**
 * Renders the footer into id="footer".
 */
export function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__inner">
      <div class="footer__logo">
        <span aria-hidden="true">☸</span>
        <span data-i18n="footer.source">${t('footer.source')}</span>
      </div>
      <p class="footer__copy" data-i18n="footer.bookTitle">${t('footer.bookTitle')}</p>
    </div>
  `;
}
