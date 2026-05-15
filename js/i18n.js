/**
 * i18n.js — Bilingual (Chinese/English) internationalization module
 * Yaoshi Health Calendar App
 *
 * Exports: getLang, setLang, t, initLangToggle
 * localStorage key: 'yaoshi-lang' (default: 'zh')
 */

// ---------------------------------------------------------------------------
// UI Strings
// ---------------------------------------------------------------------------

const UI_STRINGS = {
  nav: {
    logo:      { zh: '药师养生历',  en: 'Yaoshi Health' },
    home:      { zh: '首页',        en: 'Home' },
    calendar:  { zh: '日历',        en: 'Calendar' },
    readings:  { zh: '法义',        en: 'Readings' },
  },

  home: {
    currentShichen: { zh: '当前时辰',   en: 'Current Shichen' },
    meridian:       { zh: '对应经络',   en: 'Meridian' },
    yakshaGeneral:  { zh: '值日药叉',   en: 'Yaksha General' },
    buddha:         { zh: '值日佛',     en: 'Daily Buddha' },
    healthAdvice:   { zh: '养生建议',   en: 'Health Advice' },
    diet:           { zh: '饮食',       en: 'Diet' },
    exercise:       { zh: '运动',       en: 'Exercise' },
    acupressure:    { zh: '穴位',       en: 'Acupressure' },
    currentJieqi:   { zh: '当前节气',   en: 'Current Jieqi' },
    season:         { zh: '所在季节',   en: 'Season' },
    viewDetails:    { zh: '查看详情',   en: 'View Details' },
    timeRemaining:  { zh: '剩余时间',   en: 'Time Remaining' },
  },

  calendar: {
    today:          { zh: '今天',       en: 'Today' },
    backToMonth:    { zh: '返回本月',   en: 'Back to Month' },
    dailySchedule:  { zh: '每日时辰',   en: 'Daily Schedule' },
    recommendations:{ zh: '养生推荐',   en: 'Recommendations' },
    herbalRecipe:   { zh: '药膳方',     en: 'Herbal Recipe' },
    lunarDate:      { zh: '农历日期',   en: 'Lunar Date' },
    monthJieqi:     { zh: '本月节气',   en: 'Month Jieqi' },
  },

  readings: {
    tableOfContents: { zh: '目录',         en: 'Table of Contents' },
    lecture1:        { zh: '第一讲',        en: 'Lecture 1' },
    lecture2:        { zh: '第二讲',        en: 'Lecture 2' },
    lecture3:        { zh: '第三讲',        en: 'Lecture 3' },
    progress:        { zh: '阅读进度',      en: 'Reading Progress' },
    continueReading: { zh: '继续阅读',      en: 'Continue Reading' },
  },

  seasons: {
    spring: { zh: '春',   en: 'Spring' },
    summer: { zh: '夏',   en: 'Summer' },
    autumn: { zh: '秋',   en: 'Autumn' },
    winter: { zh: '冬',   en: 'Winter' },
  },

  weekdays: {
    mon: { zh: '一', en: 'Mon' },
    tue: { zh: '二', en: 'Tue' },
    wed: { zh: '三', en: 'Wed' },
    thu: { zh: '四', en: 'Thu' },
    fri: { zh: '五', en: 'Fri' },
    sat: { zh: '六', en: 'Sat' },
    sun: { zh: '日', en: 'Sun' },
  },

  months: {
    1:  { zh: '一月',   en: 'January' },
    2:  { zh: '二月',   en: 'February' },
    3:  { zh: '三月',   en: 'March' },
    4:  { zh: '四月',   en: 'April' },
    5:  { zh: '五月',   en: 'May' },
    6:  { zh: '六月',   en: 'June' },
    7:  { zh: '七月',   en: 'July' },
    8:  { zh: '八月',   en: 'August' },
    9:  { zh: '九月',   en: 'September' },
    10: { zh: '十月',   en: 'October' },
    11: { zh: '十一月', en: 'November' },
    12: { zh: '十二月', en: 'December' },
  },

  footer: {
    source:    { zh: '大愿法师 · 六祖寺', en: 'Venerable Dayuan · Liuzu Monastery' },
    bookTitle: { zh: '药师法门健康养生随许法', en: 'Yaoshi Dharma Gate: Health & Longevity' },
  },
};

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'yaoshi-lang';
const DEFAULT_LANG = 'zh';
const VALID_LANGS = ['zh', 'en'];

/** Resolve a dot-notation key path into the leaf node of UI_STRINGS. */
function _resolve(key) {
  const parts = key.split('.');
  let node = UI_STRINGS;
  for (const part of parts) {
    if (node == null || typeof node !== 'object') return null;
    node = node[part];
  }
  return node;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * getLang — returns current language ('zh' or 'en').
 */
export function getLang() {
  const stored = (typeof localStorage !== 'undefined')
    ? localStorage.getItem(STORAGE_KEY)
    : null;
  return VALID_LANGS.includes(stored) ? stored : DEFAULT_LANG;
}

/**
 * setLang — sets language, persists to localStorage, re-renders all
 * [data-i18n] elements in the document, and dispatches a 'langchange'
 * CustomEvent on window.
 *
 * @param {'zh'|'en'} lang
 */
export function setLang(lang) {
  if (!VALID_LANGS.includes(lang)) {
    console.warn(`[i18n] Unknown language: "${lang}". Ignoring.`);
    return;
  }

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  // Re-render all annotated elements
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (text !== key) el.textContent = text;
    });

    // Update lang attribute on <html> for CSS / screen readers
    document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  }

  // Notify other modules
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }
}

/**
 * t — returns translated string for a dot-notation key.
 * Falls back to the key itself if no entry is found.
 *
 * @param {string} key  e.g. 'nav.home', 'months.3'
 * @returns {string}
 */
export function t(key) {
  const lang = getLang();
  const leaf = _resolve(key);

  if (leaf == null || typeof leaf !== 'object') {
    console.warn(`[i18n] Missing key: "${key}"`);
    return key;
  }

  return leaf[lang] ?? leaf[DEFAULT_LANG] ?? key;
}

/**
 * initLangToggle — wires up click handlers on
 * `.lang-toggle button[data-lang]` elements.
 * Sets the active class on the currently selected language button.
 */
export function initLangToggle() {
  if (typeof document === 'undefined') return;

  const buttons = document.querySelectorAll('.lang-toggle button[data-lang]');
  if (buttons.length === 0) return;

  const currentLang = getLang();

  buttons.forEach((btn) => {
    const lang = btn.getAttribute('data-lang');

    // Mark current language as active
    btn.classList.toggle('active', lang === currentLang);

    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-lang');
      setLang(selected);

      // Update active state across all toggle buttons
      buttons.forEach((b) => {
        b.classList.toggle('active', b.getAttribute('data-lang') === selected);
      });
    });
  });
}
