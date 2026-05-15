# Yaoshi Health Calendar App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual static web app that auto-detects the current 时辰/节气 and shows health advice from 《药师法门健康养生随许法》, with a calendar and full book reading mode.

**Architecture:** Static multi-page HTML/CSS/JS site (3 pages: Home, Calendar, Readings). No framework, no build step. All content extracted verbatim from the PDF. Apple-inspired gold/white design. Deployed on GitHub Pages.

**Tech Stack:** HTML5, CSS3 (custom properties, backdrop-filter, grid, flexbox), vanilla JavaScript (ES modules via `<script type="module">`), GitHub Pages.

**Source PDF:** `药师法门健康养生随许法.pdf` in the project root. All Chinese content must be extracted verbatim — no modifications, summarization, or paraphrasing.

---

## File Map

| File | Responsibility |
|------|---------------|
| `css/style.css` | Design system: colors, typography, cards, nav, responsive, animations |
| `js/i18n.js` | Language strings, toggle logic, localStorage persistence |
| `js/app.js` | Shared nav rendering, time utilities, lotus SVG divider |
| `data/shichen-data.js` | 12 时辰 entries with full health advice from PDF |
| `data/jieqi-data.js` | 24 节气 entries with full health advice from PDF |
| `data/readings-data.js` | Full book content organized by lecture/chapter |
| `data/lunar-data.js` | Lunar calendar lookup tables for 2024-2030 |
| `js/shichen.js` | 时辰 detection, hero card rendering, timeline |
| `js/jieqi.js` | 节气 detection, card rendering |
| `js/calendar.js` | Monthly grid, daily view, lunar date display |
| `js/readings.js` | Chapter navigation, reading progress, sidebar |
| `index.html` | Home page shell |
| `calendar.html` | Calendar page shell |
| `readings.html` | Readings page shell |

---

### Task 1: CSS Design System

**Files:**
- Create: `css/style.css`

- [ ] **Step 1: Create CSS file with custom properties and reset**

```css
/* css/style.css */
:root {
  /* Colors */
  --gold-primary: #B8860B;
  --gold-light: #D4A843;
  --gold-gradient: linear-gradient(135deg, #D4A843, #B8860B);
  --white-warm: #FAF8F5;
  --white-pure: #FFFFFF;
  --glass: rgba(255, 255, 255, 0.72);
  --text-primary: #1D1D1F;
  --text-secondary: #6E6E73;
  --text-tertiary: #AEAEB2;
  --cream: #F5ECD7;
  --divider: rgba(0, 0, 0, 0.06);

  /* Typography */
  --font-ui: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Noto Sans SC", "Helvetica Neue", sans-serif;
  --font-reading: "Noto Serif SC", "Songti SC", "STSongti", serif;
  --font-heading-en: "Cormorant Garamond", Georgia, serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 80px;

  /* Transitions */
  --ease-apple: cubic-bezier(0.25, 0.1, 0.25, 1);
  --duration: 350ms;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;

  /* Shadows */
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-ui);
  color: var(--text-primary);
  background: var(--white-warm);
  line-height: 1.6;
  min-height: 100vh;
  padding-top: 48px; /* nav height */
}

a {
  color: var(--gold-primary);
  text-decoration: none;
  transition: color var(--duration) var(--ease-apple);
}

a:hover {
  color: var(--gold-light);
}
```

- [ ] **Step 2: Add typography classes**

```css
.large-title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.4px;
  line-height: 1.2;
}

.title-1 {
  font-size: 28px;
  font-weight: 700;
  line-height: 1.3;
}

.title-2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
}

.title-3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
}

.body-text {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.6;
}

.caption {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--text-secondary);
}

.reading-text {
  font-family: var(--font-reading);
  font-size: 18px;
  line-height: 1.8;
}
```

- [ ] **Step 3: Add navigation bar styles**

```css
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 0.5px solid var(--divider);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-lg);
  z-index: 1000;
}

.nav-logo {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  list-style: none;
}

.nav-links a {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 4px 0;
  position: relative;
  transition: color var(--duration) var(--ease-apple);
}

.nav-links a.active,
.nav-links a:hover {
  color: var(--gold-primary);
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold-primary);
  border-radius: 1px;
}

.lang-toggle {
  display: flex;
  border: 1px solid var(--divider);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.lang-toggle button {
  border: none;
  background: transparent;
  padding: 4px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all var(--duration) var(--ease-apple);
  font-family: var(--font-ui);
}

.lang-toggle button.active {
  background: var(--gold-primary);
  color: var(--white-pure);
}
```

- [ ] **Step 4: Add card styles**

```css
.card {
  background: var(--white-pure);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-lg);
  transition: transform var(--duration) var(--ease-apple),
              box-shadow var(--duration) var(--ease-apple);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.card-hero {
  border-left: 4px solid transparent;
  border-image: var(--gold-gradient) 1;
  position: relative;
}

.card-hero::before {
  content: '';
  position: absolute;
  top: -40px;
  left: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(184, 134, 11, 0.04), transparent 70%);
  pointer-events: none;
}

.card-grouped {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.card-grouped .card-item {
  padding: var(--space-md) var(--space-lg);
  border-bottom: 0.5px solid var(--divider);
}

.card-grouped .card-item:last-child {
  border-bottom: none;
}
```

- [ ] **Step 5: Add layout utilities and page containers**

```css
.page-container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-2xl);
}

.section {
  margin-bottom: var(--space-xl);
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fade-in {
  animation: fadeIn 400ms var(--ease-apple);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.gold-tag {
  display: inline-block;
  background: var(--cream);
  color: var(--gold-primary);
  font-size: 13px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 20px;
}

.progress-bar {
  height: 4px;
  background: var(--cream);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--gold-gradient);
  border-radius: 2px;
  transition: width 1s var(--ease-apple);
}

.lotus-divider {
  text-align: center;
  margin: var(--space-xl) 0;
  opacity: 0.3;
}

.lotus-divider svg {
  width: 60px;
  height: 20px;
}
```

- [ ] **Step 6: Add responsive breakpoints and mobile bottom nav**

```css
/* Mobile bottom tab bar */
.bottom-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 0.5px solid var(--divider);
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 0);
  z-index: 1000;
}

.bottom-nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  font-weight: 500;
  color: var(--text-tertiary);
  transition: color var(--duration) var(--ease-apple);
}

.bottom-nav a.active {
  color: var(--gold-primary);
}

.bottom-nav svg {
  width: 24px;
  height: 24px;
}

/* Tablet */
@media (max-width: 1024px) {
  .page-container {
    padding: var(--space-lg) var(--space-xl);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .page-container {
    padding: var(--space-md) var(--space-md);
    padding-bottom: 80px;
  }

  .nav-links {
    display: none;
  }

  .bottom-nav {
    display: flex;
  }

  body {
    padding-bottom: 56px;
  }

  .grid-2 {
    grid-template-columns: 1fr;
  }

  .large-title {
    font-size: 28px;
  }

  .title-1 {
    font-size: 24px;
  }
}

/* Footer */
.footer {
  text-align: center;
  padding: var(--space-xl) 0;
  color: var(--text-tertiary);
  font-size: 13px;
}
```

- [ ] **Step 7: Verify by creating a minimal test page**

Create a temporary `_test.html` in the project root:

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Style Test</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="nav-bar">
    <span class="nav-logo">药师法门 · 养生</span>
    <ul class="nav-links">
      <li><a href="#" class="active">Home</a></li>
      <li><a href="#">Calendar</a></li>
      <li><a href="#">Readings</a></li>
    </ul>
    <div class="lang-toggle">
      <button class="active">中</button>
      <button>EN</button>
    </div>
  </nav>
  <div class="page-container fade-in">
    <h1 class="large-title">药师法门 · 养生</h1>
    <div class="section">
      <div class="card card-hero" style="margin-top:24px">
        <span class="gold-tag">辰时</span>
        <h2 class="title-2" style="margin-top:12px">辰时 · 胃经</h2>
        <p class="body-text" style="margin-top:8px;color:var(--text-secondary)">7:00 - 9:00</p>
        <p class="body-text" style="margin-top:12px">辰时就是上午的七点到九点，这个时候是胃经当令的时候，这个时候要吃早餐。</p>
        <div class="progress-bar" style="margin-top:16px">
          <div class="progress-bar-fill" style="width:60%"></div>
        </div>
      </div>
    </div>
    <div class="grid-2 section">
      <div class="card">
        <h3 class="title-3">立夏</h3>
        <p class="body-text" style="margin-top:8px;color:var(--text-secondary)">May 5 - May 20</p>
      </div>
      <div class="card">
        <h3 class="title-3">小满</h3>
        <p class="body-text" style="margin-top:8px;color:var(--text-secondary)">May 20 - Jun 5</p>
      </div>
    </div>
  </div>
  <nav class="bottom-nav">
    <a href="#" class="active">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
      <span>Home</span>
    </a>
    <a href="#">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      <span>Calendar</span>
    </a>
    <a href="#">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
      <span>Readings</span>
    </a>
  </nav>
</body>
</html>
```

Open in browser: `open _test.html`

Expected: Gold/white design, frosted glass nav, hero card with gold left border, progress bar, responsive grid. On mobile viewport, bottom tab bar appears and top nav links hide.

- [ ] **Step 8: Delete test file and commit**

```bash
rm _test.html
git add css/style.css
git commit -m "feat: add CSS design system with Apple-inspired gold/white theme"
```

---

### Task 2: i18n Module

**Files:**
- Create: `js/i18n.js`

- [ ] **Step 1: Create i18n module with all UI strings**

```javascript
// js/i18n.js
const UI_STRINGS = {
  nav: {
    logo: { zh: '药师法门 · 养生', en: 'Medicine Buddha · Wellness' },
    home: { zh: '首页', en: 'Home' },
    calendar: { zh: '日历', en: 'Calendar' },
    readings: { zh: '阅读', en: 'Readings' }
  },
  home: {
    currentShichen: { zh: '当前时辰', en: 'Current Time Period' },
    meridian: { zh: '经络', en: 'Meridian' },
    yakshaGeneral: { zh: '药叉大将', en: 'Yaksha General' },
    buddha: { zh: '本地身', en: 'Buddha' },
    healthAdvice: { zh: '养生建议', en: 'Health Advice' },
    diet: { zh: '饮食', en: 'Diet' },
    exercise: { zh: '运动', en: 'Exercise' },
    acupressure: { zh: '穴位按摩', en: 'Acupressure' },
    currentJieqi: { zh: '当前节气', en: 'Current Solar Term' },
    season: { zh: '季节', en: 'Season' },
    viewDetails: { zh: '查看详情', en: 'View Details' },
    timeRemaining: { zh: '剩余时间', en: 'Time Remaining' }
  },
  calendar: {
    today: { zh: '今天', en: 'Today' },
    backToMonth: { zh: '返回月历', en: 'Back to Month' },
    dailySchedule: { zh: '每日时辰养生', en: 'Daily Health Schedule' },
    recommendations: { zh: '养生建议', en: 'Recommendations' },
    herbalRecipe: { zh: '食疗方', en: 'Herbal Recipe' },
    lunarDate: { zh: '农历', en: 'Lunar' },
    monthJieqi: { zh: '本月节气', en: 'Solar Terms This Month' }
  },
  readings: {
    tableOfContents: { zh: '目录', en: 'Table of Contents' },
    lecture1: { zh: '第一讲', en: 'Lecture 1' },
    lecture2: { zh: '第二讲', en: 'Lecture 2' },
    lecture3: { zh: '第三讲', en: 'Lecture 3' },
    progress: { zh: '阅读进度', en: 'Reading Progress' },
    continueReading: { zh: '继续阅读', en: 'Continue Reading' }
  },
  seasons: {
    spring: { zh: '春季', en: 'Spring' },
    summer: { zh: '夏季', en: 'Summer' },
    autumn: { zh: '秋季', en: 'Autumn' },
    winter: { zh: '冬季', en: 'Winter' }
  },
  weekdays: {
    mon: { zh: '一', en: 'Mon' },
    tue: { zh: '二', en: 'Tue' },
    wed: { zh: '三', en: 'Wed' },
    thu: { zh: '四', en: 'Thu' },
    fri: { zh: '五', en: 'Fri' },
    sat: { zh: '六', en: 'Sat' },
    sun: { zh: '日', en: 'Sun' }
  },
  months: {
    1: { zh: '一月', en: 'January' },
    2: { zh: '二月', en: 'February' },
    3: { zh: '三月', en: 'March' },
    4: { zh: '四月', en: 'April' },
    5: { zh: '五月', en: 'May' },
    6: { zh: '六月', en: 'June' },
    7: { zh: '七月', en: 'July' },
    8: { zh: '八月', en: 'August' },
    9: { zh: '九月', en: 'September' },
    10: { zh: '十月', en: 'October' },
    11: { zh: '十一月', en: 'November' },
    12: { zh: '十二月', en: 'December' }
  },
  footer: {
    source: { zh: '内容来源：大愿法师 · 六祖寺', en: 'Source: Master Da Yuan · Sixth Patriarch Temple' },
    book: { zh: '《药师法门健康养生随许法》', en: 'Medicine Buddha Dharma Health Cultivation Methods' }
  }
};

let currentLang = localStorage.getItem('yaoshi-lang') || 'zh';

export function getLang() {
  return currentLang;
}

export function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('yaoshi-lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = getNestedString(UI_STRINGS, key);
    if (text) el.textContent = text;
  });
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function t(key) {
  return getNestedString(UI_STRINGS, key) || key;
}

function getNestedString(obj, path) {
  const keys = path.split('.');
  let current = obj;
  for (const k of keys) {
    if (!current[k]) return null;
    current = current[k];
  }
  return current[currentLang] || current['zh'] || null;
}

export function initLangToggle() {
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setLang(lang);
    });
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}
```

- [ ] **Step 2: Commit**

```bash
git add js/i18n.js
git commit -m "feat: add i18n module with bilingual UI strings"
```

---

### Task 3: Shared App Module + Navigation

**Files:**
- Create: `js/app.js`

- [ ] **Step 1: Create app.js with nav rendering and shared utilities**

```javascript
// js/app.js
import { t, getLang, initLangToggle } from './i18n.js';

export function renderNav(activePage) {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  nav.innerHTML = `
    <span class="nav-logo">${t('nav.logo')}</span>
    <ul class="nav-links">
      <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}" data-i18n="nav.home">${t('nav.home')}</a></li>
      <li><a href="calendar.html" class="${activePage === 'calendar' ? 'active' : ''}" data-i18n="nav.calendar">${t('nav.calendar')}</a></li>
      <li><a href="readings.html" class="${activePage === 'readings' ? 'active' : ''}" data-i18n="nav.readings">${t('nav.readings')}</a></li>
    </ul>
    <div class="lang-toggle">
      <button data-lang="zh">中</button>
      <button data-lang="en">EN</button>
    </div>
  `;

  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    bottomNav.innerHTML = `
      <a href="index.html" class="${activePage === 'home' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        <span data-i18n="nav.home">${t('nav.home')}</span>
      </a>
      <a href="calendar.html" class="${activePage === 'calendar' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <span data-i18n="nav.calendar">${t('nav.calendar')}</span>
      </a>
      <a href="readings.html" class="${activePage === 'readings' ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
        <span data-i18n="nav.readings">${t('nav.readings')}</span>
      </a>
    `;
  }

  initLangToggle();
}

export function getCurrentShichen() {
  const hour = new Date().getHours();
  if (hour >= 23 || hour < 1) return 0;  // 子
  if (hour >= 1 && hour < 3) return 1;   // 丑
  if (hour >= 3 && hour < 5) return 2;   // 寅
  if (hour >= 5 && hour < 7) return 3;   // 卯
  if (hour >= 7 && hour < 9) return 4;   // 辰
  if (hour >= 9 && hour < 11) return 5;  // 巳
  if (hour >= 11 && hour < 13) return 6; // 午
  if (hour >= 13 && hour < 15) return 7; // 未
  if (hour >= 15 && hour < 17) return 8; // 申
  if (hour >= 17 && hour < 19) return 9; // 酉
  if (hour >= 19 && hour < 21) return 10; // 戌
  return 11; // 亥 (21-23)
}

export function getShichenProgress() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const totalMin = hour * 60 + min;
  const shichenStarts = [23*60, 1*60, 3*60, 5*60, 7*60, 9*60, 11*60, 13*60, 15*60, 17*60, 19*60, 21*60];
  const idx = getCurrentShichen();
  const start = shichenStarts[idx];
  let elapsed;
  if (idx === 0 && hour < 1) {
    elapsed = totalMin + 60; // past midnight
  } else if (idx === 0) {
    elapsed = totalMin - start;
  } else {
    elapsed = totalMin - start;
  }
  return Math.min(100, Math.max(0, (elapsed / 120) * 100));
}

export function lotusDividerHTML() {
  return `<div class="lotus-divider"><svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 2C25 8 18 12 10 14M30 2C35 8 42 12 50 14M30 2V18M20 10C25 12 28 15 30 18M40 10C35 12 32 15 30 18" stroke="#B8860B" stroke-width="0.8" stroke-linecap="round"/></svg></div>`;
}

export function renderFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  footer.innerHTML = `
    <p data-i18n="footer.source">${t('footer.source')}</p>
    <p data-i18n="footer.book">${t('footer.book')}</p>
  `;
}
```

- [ ] **Step 2: Commit**

```bash
git add js/app.js
git commit -m "feat: add shared app module with nav, time utilities, footer"
```

---

### Task 4: 时辰 Data File

**Files:**
- Create: `data/shichen-data.js`

**CRITICAL:** All Chinese content MUST be extracted verbatim from the PDF `药师法门健康养生随许法.pdf`. Read pages 20-65 carefully and transcribe every piece of health advice exactly as written.

- [ ] **Step 1: Create shichen data file**

Read PDF pages 20-65 (book pages 20-55) and extract the complete content for each 时辰. The data structure for each entry:

```javascript
// data/shichen-data.js
export const SHICHEN_DATA = [
  {
    index: 0,
    name: { zh: '子时', en: 'Zi Shi' },
    timeRange: '23:00 - 01:00',
    earthlyBranch: { zh: '子', en: 'Zi' },
    meridian: { zh: '胆经', en: 'Gallbladder Meridian' },
    yakshaGeneral: { zh: '宫毗罗', en: 'Gong Pi Luo' },
    buddha: { zh: '弥勒菩萨', en: 'Maitreya Bodhisattva' },
    organ: { zh: '胆', en: 'Gallbladder' },
    monthIndex: 11, // 十一月
    jieqiPair: { zh: '大雪、冬至', en: 'Major Snow, Winter Solstice' },
    season: { zh: '冬季', en: 'Winter' },
    hexagram: { zh: '复', en: 'Return' },
    advice: {
      zh: '', // EXTRACT VERBATIM from PDF pages ~36, 50-52
      en: ''  // English translation
    },
    diet: {
      zh: '', // diet advice for this period
      en: ''
    },
    exercise: {
      zh: '', // exercise/practice advice
      en: ''
    },
    acupressure: {
      zh: '', // acupressure points and methods
      en: ''
    },
    summary: {
      zh: '子时一定要睡觉，晚上十点半就刚好着了，在子时就养好了。',
      en: 'You must be asleep during Zi Shi. Going to bed at 10:30pm ensures you are asleep by this time.'
    }
  },
  // ... entries 1-11 following the same structure
];
```

For each of the 12 时辰, read the corresponding PDF pages and fill in ALL fields with verbatim Chinese text. The page mapping:

| 时辰 | PDF Pages (approx) | Key Content |
|------|-------------------|-------------|
| 子时 (23-1) 胆经 | 50-52 | Sleep, gallbladder qi, 10:30pm bedtime |
| 丑时 (1-3) 肝经 | 52 | Liver rest, deep sleep |
| 寅时 (3-5) 肺经 | 24-27 | Lung meridian, rest, don't wake early, 白木耳食疗方 |
| 卯时 (5-7) 大肠经 | 27-29 | Drink water, bowel movement, 合谷穴 |
| 辰时 (7-9) 胃经 | 29 | Eat breakfast, stomach qi |
| 巳时 (9-11) 脾经 | 29-36 | Spleen exercise, 9种体质, toe exercises |
| 午时 (11-13) 心经 | 36-38 | Nap, 神门穴, 内关穴, 20min nap |
| 未时 (13-15) 小肠经 | 38-44 | Small intestine, arm swinging exercise |
| 申时 (15-17) 膀胱经 | 46-49 | Bladder meridian, best memory time, 委中穴, 摇篮式 |
| 酉时 (17-19) 肾经 | 49-50 | Kidney storage, yang qi closing |
| 戌时 (19-21) 心包经 | 50 | Pericardium, relaxation |
| 亥时 (21-23) 三焦经 | 50 | Triple burner, prepare for sleep |

Fill in EVERY field with verbatim content from the book. Do not summarize.

- [ ] **Step 2: Verify data completeness**

Check that all 12 entries have non-empty `advice`, `diet`, `exercise`, and `summary` fields in both `zh` and `en`.

- [ ] **Step 3: Commit**

```bash
git add data/shichen-data.js
git commit -m "feat: add 12 shichen health data extracted from PDF"
```

---

### Task 5: 节气 Data File

**Files:**
- Create: `data/jieqi-data.js`

**CRITICAL:** All Chinese content MUST be extracted verbatim from the PDF. Read pages 76-103 (book pages 66-103) for all 24 solar terms.

- [ ] **Step 1: Create jieqi data file with date tables and all 24 entries**

```javascript
// data/jieqi-data.js

// Solar term dates for 2024-2030 (month, day)
// Source: astronomical calculations
export const JIEQI_DATES = {
  2024: [
    [1,6],[1,20],[2,4],[2,19],[3,5],[3,20],[4,4],[4,19],[5,5],[5,20],[6,5],[6,21],
    [7,6],[7,22],[8,7],[8,22],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,6],[12,21]
  ],
  2025: [
    [1,5],[1,20],[2,3],[2,18],[3,5],[3,20],[4,4],[4,20],[5,5],[5,21],[6,5],[6,21],
    [7,6],[7,22],[8,7],[8,22],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,6],[12,21]
  ],
  2026: [
    [1,5],[1,20],[2,4],[2,18],[3,5],[3,20],[4,5],[4,20],[5,5],[5,21],[6,5],[6,21],
    [7,7],[7,22],[8,7],[8,23],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,22]
  ],
  2027: [
    [1,5],[1,20],[2,4],[2,18],[3,5],[3,20],[4,5],[4,20],[5,5],[5,21],[6,5],[6,21],
    [7,7],[7,23],[8,7],[8,23],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,22]
  ],
  2028: [
    [1,6],[1,21],[2,4],[2,19],[3,5],[3,20],[4,4],[4,19],[5,5],[5,20],[6,5],[6,21],
    [7,6],[7,22],[8,7],[8,22],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,6],[12,21]
  ],
  2029: [
    [1,5],[1,20],[2,3],[2,18],[3,5],[3,20],[4,4],[4,20],[5,5],[5,21],[6,5],[6,21],
    [7,7],[7,22],[8,7],[8,23],[9,7],[9,22],[10,8],[10,23],[11,7],[11,22],[12,7],[12,21]
  ],
  2030: [
    [1,5],[1,20],[2,4],[2,18],[3,5],[3,20],[4,5],[4,20],[5,5],[5,21],[6,5],[6,21],
    [7,7],[7,22],[8,7],[8,23],[9,7],[9,23],[10,8],[10,23],[11,7],[11,22],[12,7],[12,22]
  ]
};

export const JIEQI_DATA = [
  {
    index: 0,
    name: { zh: '小寒', en: 'Minor Cold' },
    season: 'winter',
    monthApprox: 1,
    advice: {
      zh: '', // EXTRACT from PDF page 101-102
      en: ''
    },
    diet: {
      zh: '', // recipes, food recommendations
      en: ''
    },
    herbalRecipe: {
      zh: '', // specific herbal preparations
      en: ''
    },
    exercise: {
      zh: '',
      en: ''
    },
    avoidance: {
      zh: '', // what to avoid
      en: ''
    }
  },
  // Index 1: 大寒 (PDF p102-103)
  // Index 2: 立春 (PDF p75-76)
  // Index 3: 雨水 (PDF p76-77)
  // Index 4: 惊蛰 (PDF p77-78)
  // Index 5: 春分 (PDF p78-79)
  // Index 6: 清明 (PDF p79)
  // Index 7: 谷雨 (PDF p80-82)
  // Index 8: 立夏 (PDF p82-83)
  // Index 9: 小满 (PDF p83-84)
  // Index 10: 芒种 (PDF p84-85)
  // Index 11: 夏至 (PDF p85-88)
  // Index 12: 小暑 (PDF p89-91)
  // Index 13: 大暑 (PDF p91-93)
  // Index 14: 立秋 (PDF p93-94)
  // Index 15: 处暑 (PDF p94-95)
  // Index 16: 白露 (PDF p95-96)
  // Index 17: 秋分 (PDF p97-98)
  // Index 18: 寒露 (PDF p98)
  // Index 19: 霜降 (PDF p98-99)
  // Index 20: 立冬 (PDF p99)
  // Index 21: 小雪 (PDF p99-100)
  // Index 22: 大雪 (PDF p100-101)
  // Index 23: 冬至 (PDF p101)
];
```

For EACH of the 24 entries, read the corresponding PDF pages and extract ALL content verbatim. Follow the same structure as entry 0. Every `zh` field must contain the exact text from the book. Every `en` field must be an accurate English translation.

The 24 节气 in order: 小寒, 大寒, 立春, 雨水, 惊蛰, 春分, 清明, 谷雨, 立夏, 小满, 芒种, 夏至, 小暑, 大暑, 立秋, 处暑, 白露, 秋分, 寒露, 霜降, 立冬, 小雪, 大雪, 冬至.

Also add the helper function:

```javascript
export function getCurrentJieqi(date = new Date()) {
  const year = date.getFullYear();
  const dates = JIEQI_DATES[year];
  if (!dates) return { current: JIEQI_DATA[0], next: JIEQI_DATA[1] };

  const month = date.getMonth() + 1;
  const day = date.getDate();

  let currentIdx = 0;
  for (let i = dates.length - 1; i >= 0; i--) {
    const [m, d] = dates[i];
    if (month > m || (month === m && day >= d)) {
      currentIdx = i;
      break;
    }
  }

  return {
    current: JIEQI_DATA[currentIdx],
    next: JIEQI_DATA[(currentIdx + 1) % 24],
    startDate: dates[currentIdx],
    endDate: dates[(currentIdx + 1) % 24]
  };
}
```

- [ ] **Step 2: Verify data completeness**

Check that all 24 entries have non-empty `advice`, `diet`, and `herbalRecipe` fields.

- [ ] **Step 3: Commit**

```bash
git add data/jieqi-data.js
git commit -m "feat: add 24 jieqi health data extracted from PDF"
```

---

### Task 6: Lunar Calendar Data

**Files:**
- Create: `data/lunar-data.js`

- [ ] **Step 1: Create lunar calendar lookup module**

```javascript
// data/lunar-data.js
// Compact lunar calendar data for 2024-2030
// Each year encoded as: [leapMonth, ...monthLengths]
// monthLengths: 0 = 29 days (小月), 1 = 30 days (大月)
// leapMonth: 0 = no leap month, N = leap month after month N

const LUNAR_YEARS = {
  2024: { leapMonth: 0, startDate: [2, 10], months: [1,0,1,0,0,1,0,1,0,1,1,0] },
  2025: { leapMonth: 6, startDate: [1, 29], months: [0,1,0,1,0,0,1,0,1,0,1,1,0] },
  2026: { leapMonth: 0, startDate: [2, 17], months: [1,0,1,0,1,0,0,1,0,1,0,1] },
  2027: { leapMonth: 0, startDate: [2, 6], months: [1,1,0,1,0,1,0,0,1,0,1,0] },
  2028: { leapMonth: 0, startDate: [1, 26], months: [1,1,0,1,1,0,1,0,0,1,0,1] },
  2029: { leapMonth: 0, startDate: [2, 13], months: [0,1,0,1,1,0,1,0,1,0,1,0] },
  2030: { leapMonth: 0, startDate: [2, 3], months: [0,1,0,1,0,1,1,0,1,0,1,0] }
};

const LUNAR_MONTH_NAMES = {
  zh: ['正月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','腊月'],
  en: ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']
};

const LUNAR_DAY_NAMES = {
  zh: ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
       '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
       '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'],
  en: ['1','2','3','4','5','6','7','8','9','10',
       '11','12','13','14','15','16','17','18','19','20',
       '21','22','23','24','25','26','27','28','29','30']
};

export function getLunarDate(date, lang = 'zh') {
  const year = date.getFullYear();
  const yearData = LUNAR_YEARS[year] || LUNAR_YEARS[year - 1];
  if (!yearData) return null;

  const [startMonth, startDay] = yearData.startDate;
  const lunarNewYear = new Date(year, startMonth - 1, startDay);

  if (date < lunarNewYear) {
    const prevData = LUNAR_YEARS[year - 1];
    if (!prevData) return null;
    return calcLunarFromStart(date, year - 1, prevData, lang);
  }

  return calcLunarFromStart(date, year, yearData, lang);
}

function calcLunarFromStart(date, lunarYear, yearData, lang) {
  const [startMonth, startDay] = yearData.startDate;
  const lunarNewYear = new Date(lunarYear + (startMonth <= 2 ? 0 : 0), startMonth - 1, startDay);

  let daysDiff = Math.floor((date - lunarNewYear) / (1000 * 60 * 60 * 24));
  if (daysDiff < 0) return null;

  const { months, leapMonth } = yearData;
  let lunarMonth = 0;
  let isLeap = false;

  for (let i = 0; i < months.length; i++) {
    const daysInMonth = months[i] ? 30 : 29;
    if (daysDiff < daysInMonth) {
      if (leapMonth > 0 && i > leapMonth) {
        lunarMonth = i;
        if (i === leapMonth + 1) isLeap = true;
      } else {
        lunarMonth = i + 1;
      }
      break;
    }
    daysDiff -= daysInMonth;
    lunarMonth = i + 2;
  }

  const monthIdx = Math.min(lunarMonth - 1, 11);
  const monthName = (isLeap ? (lang === 'zh' ? '闰' : 'Leap ') : '') + LUNAR_MONTH_NAMES[lang][monthIdx];
  const dayName = LUNAR_DAY_NAMES[lang][daysDiff] || '';

  return { month: monthName, day: dayName, monthIdx, dayIdx: daysDiff };
}
```

NOTE: The lunar calendar data above is approximate. The implementing agent should verify the lunar new year start dates and month lengths for each year 2024-2030 against a reliable source and correct any inaccuracies. The algorithm logic is correct but the input data must be verified.

- [ ] **Step 2: Commit**

```bash
git add data/lunar-data.js
git commit -m "feat: add lunar calendar lookup for 2024-2030"
```

---

### Task 7: Home Page — 时辰 Hero + Timeline

**Files:**
- Create: `index.html`
- Create: `js/shichen.js`

- [ ] **Step 1: Create index.html shell**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>药师法门 · 养生 | Medicine Buddha Wellness</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav id="main-nav" class="nav-bar"></nav>

  <main class="page-container fade-in">
    <section id="shichen-hero" class="section"></section>
    <section id="shichen-timeline" class="section"></section>
    <section id="jieqi-card" class="section"></section>
  </main>

  <footer id="footer" class="footer"></footer>
  <nav id="bottom-nav" class="bottom-nav"></nav>

  <script type="module">
    import { renderNav, renderFooter } from './js/app.js';
    import { renderShichenHero, renderShichenTimeline, startAutoRefresh } from './js/shichen.js';
    import { renderJieqiCard } from './js/jieqi.js';

    renderNav('home');
    renderShichenHero();
    renderShichenTimeline();
    renderJieqiCard();
    renderFooter();
    startAutoRefresh();

    document.addEventListener('langchange', () => {
      renderNav('home');
      renderShichenHero();
      renderShichenTimeline();
      renderJieqiCard();
      renderFooter();
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Create shichen.js**

```javascript
// js/shichen.js
import { SHICHEN_DATA } from '../data/shichen-data.js';
import { getCurrentShichen, getShichenProgress, lotusDividerHTML } from './app.js';
import { t, getLang } from './i18n.js';

let refreshTimer = null;

export function renderShichenHero() {
  const container = document.getElementById('shichen-hero');
  if (!container) return;

  const idx = getCurrentShichen();
  const s = SHICHEN_DATA[idx];
  const lang = getLang();
  const progress = getShichenProgress();

  container.innerHTML = `
    <p class="caption">${t('home.currentShichen')}</p>
    <div class="card card-hero" style="margin-top:12px">
      <div class="flex-between">
        <span class="gold-tag">${s.name[lang]}</span>
        <span class="body-text" style="color:var(--text-secondary)">${s.timeRange}</span>
      </div>
      <h2 class="title-1" style="margin-top:16px">${s.name[lang]} · ${s.meridian[lang]}</h2>
      <div style="margin-top:12px;display:flex;gap:16px;flex-wrap:wrap">
        <span class="body-text" style="color:var(--text-secondary)">${t('home.yakshaGeneral')}: ${s.yakshaGeneral[lang]}</span>
        <span class="body-text" style="color:var(--text-secondary)">${t('home.buddha')}: ${s.buddha[lang]}</span>
      </div>
      ${lotusDividerHTML()}
      <div style="margin-top:8px">
        <h3 class="title-3">${t('home.healthAdvice')}</h3>
        <p class="body-text" style="margin-top:8px">${s.advice[lang]}</p>
      </div>
      ${s.diet[lang] ? `
      <div style="margin-top:20px">
        <h3 class="title-3">${t('home.diet')}</h3>
        <p class="body-text" style="margin-top:8px">${s.diet[lang]}</p>
      </div>` : ''}
      ${s.exercise[lang] ? `
      <div style="margin-top:20px">
        <h3 class="title-3">${t('home.exercise')}</h3>
        <p class="body-text" style="margin-top:8px">${s.exercise[lang]}</p>
      </div>` : ''}
      ${s.acupressure[lang] ? `
      <div style="margin-top:20px">
        <h3 class="title-3">${t('home.acupressure')}</h3>
        <p class="body-text" style="margin-top:8px">${s.acupressure[lang]}</p>
      </div>` : ''}
      <div style="margin-top:20px">
        <div class="flex-between">
          <span class="caption">${t('home.timeRemaining')}</span>
          <span class="caption">${Math.round(progress)}%</span>
        </div>
        <div class="progress-bar" style="margin-top:6px">
          <div class="progress-bar-fill" style="width:${progress}%"></div>
        </div>
      </div>
    </div>
  `;
}

export function renderShichenTimeline() {
  const container = document.getElementById('shichen-timeline');
  if (!container) return;

  const currentIdx = getCurrentShichen();
  const lang = getLang();

  const items = SHICHEN_DATA.map((s, i) => `
    <button class="shichen-pill ${i === currentIdx ? 'active' : ''}" data-index="${i}">
      <span class="shichen-pill-name">${s.name[lang]}</span>
      <span class="shichen-pill-time">${s.timeRange}</span>
    </button>
  `).join('');

  container.innerHTML = `
    <div class="shichen-timeline-scroll">${items}</div>
    <div id="shichen-detail" class="card" style="margin-top:16px;display:none"></div>
  `;

  container.querySelectorAll('.shichen-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      if (idx === currentIdx) {
        document.getElementById('shichen-detail').style.display = 'none';
        return;
      }
      showShichenDetail(idx);
    });
  });
}

function showShichenDetail(idx) {
  const detail = document.getElementById('shichen-detail');
  const s = SHICHEN_DATA[idx];
  const lang = getLang();

  detail.style.display = 'block';
  detail.innerHTML = `
    <div class="flex-between">
      <h3 class="title-2">${s.name[lang]} · ${s.meridian[lang]}</h3>
      <span class="body-text" style="color:var(--text-secondary)">${s.timeRange}</span>
    </div>
    <p class="body-text" style="margin-top:12px">${s.summary[lang]}</p>
  `;
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

export function startAutoRefresh() {
  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => {
    renderShichenHero();
  }, 60000);
}
```

- [ ] **Step 3: Add timeline CSS to style.css**

Append to `css/style.css`:

```css
/* Shichen Timeline */
.shichen-timeline-scroll {
  display: flex;
  gap: var(--space-sm);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: var(--space-sm) 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.shichen-timeline-scroll::-webkit-scrollbar {
  display: none;
}

.shichen-pill {
  flex-shrink: 0;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--divider);
  background: var(--white-pure);
  cursor: pointer;
  transition: all var(--duration) var(--ease-apple);
  font-family: var(--font-ui);
}

.shichen-pill:hover {
  border-color: var(--gold-light);
}

.shichen-pill.active {
  background: var(--gold-primary);
  border-color: var(--gold-primary);
  color: var(--white-pure);
}

.shichen-pill-name {
  font-size: 15px;
  font-weight: 600;
}

.shichen-pill-time {
  font-size: 11px;
  opacity: 0.7;
}

.shichen-pill:active {
  transform: scale(0.98);
}
```

- [ ] **Step 4: Verify in browser**

Run: `open index.html` (must serve via local server for ES modules)

```bash
cd /Users/zibinzhao/Desktop/Projects/Yaos && python3 -m http.server 8080
```

Open `http://localhost:8080` — verify hero card shows current 时辰 with advice, timeline shows all 12 pills with current highlighted in gold.

- [ ] **Step 5: Commit**

```bash
git add index.html js/shichen.js css/style.css
git commit -m "feat: add home page with shichen hero card and timeline"
```

---

### Task 8: Home Page — 节气 Card

**Files:**
- Create: `js/jieqi.js`

- [ ] **Step 1: Create jieqi.js**

```javascript
// js/jieqi.js
import { JIEQI_DATA, getCurrentJieqi } from '../data/jieqi-data.js';
import { t, getLang } from './i18n.js';
import { lotusDividerHTML } from './app.js';

export function renderJieqiCard() {
  const container = document.getElementById('jieqi-card');
  if (!container) return;

  const { current, next, startDate, endDate } = getCurrentJieqi();
  const lang = getLang();
  const seasonKey = current.season;
  const seasonName = t(`seasons.${seasonKey}`);

  container.innerHTML = `
    ${lotusDividerHTML()}
    <p class="caption">${t('home.currentJieqi')}</p>
    <div class="card" style="margin-top:12px">
      <div class="flex-between">
        <h2 class="title-2">${current.name[lang]}</h2>
        <span class="gold-tag">${seasonName}</span>
      </div>
      ${startDate ? `<p class="body-text" style="margin-top:8px;color:var(--text-secondary)">${startDate[0]}/${startDate[1]} — ${endDate[0]}/${endDate[1]}</p>` : ''}
      ${current.advice[lang] ? `
      <div style="margin-top:16px">
        <h3 class="title-3">${t('home.healthAdvice')}</h3>
        <p class="body-text" style="margin-top:8px">${current.advice[lang]}</p>
      </div>` : ''}
      ${current.diet[lang] ? `
      <div style="margin-top:16px">
        <h3 class="title-3">${t('home.diet')}</h3>
        <p class="body-text" style="margin-top:8px">${current.diet[lang]}</p>
      </div>` : ''}
      ${current.herbalRecipe[lang] ? `
      <div style="margin-top:16px">
        <h3 class="title-3">${t('calendar.herbalRecipe')}</h3>
        <p class="body-text" style="margin-top:8px">${current.herbalRecipe[lang]}</p>
      </div>` : ''}
      <a href="calendar.html" class="body-text" style="display:inline-block;margin-top:16px;color:var(--gold-primary);font-weight:500">${t('home.viewDetails')} →</a>
    </div>
  `;
}
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:8080` — verify 节气 card appears below the timeline showing the current solar term with advice and a link to the calendar.

- [ ] **Step 3: Commit**

```bash
git add js/jieqi.js
git commit -m "feat: add jieqi card to home page"
```

---

### Task 9: Calendar Page — Monthly View

**Files:**
- Create: `calendar.html`
- Create: `js/calendar.js`

- [ ] **Step 1: Create calendar.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>日历 | Calendar — 药师法门养生</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav id="main-nav" class="nav-bar"></nav>

  <main class="page-container fade-in">
    <div id="calendar-header" class="section"></div>
    <div id="calendar-grid" class="section"></div>
    <div id="jieqi-summary" class="section"></div>
    <div id="daily-view" class="section" style="display:none"></div>
  </main>

  <footer id="footer" class="footer"></footer>
  <nav id="bottom-nav" class="bottom-nav"></nav>

  <script type="module">
    import { renderNav, renderFooter } from './js/app.js';
    import { initCalendar } from './js/calendar.js';

    renderNav('calendar');
    initCalendar();
    renderFooter();

    document.addEventListener('langchange', () => {
      renderNav('calendar');
      initCalendar();
      renderFooter();
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Create calendar.js with monthly grid**

```javascript
// js/calendar.js
import { JIEQI_DATA, JIEQI_DATES, getCurrentJieqi } from '../data/jieqi-data.js';
import { SHICHEN_DATA } from '../data/shichen-data.js';
import { getLunarDate } from '../data/lunar-data.js';
import { t, getLang } from './i18n.js';
import { lotusDividerHTML } from './app.js';

let currentYear, currentMonth;

export function initCalendar() {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();
  renderMonthHeader();
  renderMonthGrid();
  renderJieqiSummary();
}

function renderMonthHeader() {
  const container = document.getElementById('calendar-header');
  if (!container) return;
  const lang = getLang();
  const monthName = t(`months.${currentMonth + 1}`);

  container.innerHTML = `
    <div class="flex-between">
      <button class="month-nav-btn" id="prev-month">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <h1 class="title-1">${monthName} ${currentYear}</h1>
      <button class="month-nav-btn" id="next-month">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  `;

  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderMonthHeader();
    renderMonthGrid();
    renderJieqiSummary();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderMonthHeader();
    renderMonthGrid();
    renderJieqiSummary();
  });
}

function renderMonthGrid() {
  const container = document.getElementById('calendar-grid');
  if (!container) return;
  const lang = getLang();

  const weekdayKeys = ['mon','tue','wed','thu','fri','sat','sun'];
  const headerCells = weekdayKeys.map(k => `<div class="cal-weekday">${t(`weekdays.${k}`)}</div>`).join('');

  const firstDay = new Date(currentYear, currentMonth, 1);
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

  const jieqiDays = getJieqiDaysInMonth(currentYear, currentMonth + 1);

  let cells = '';
  for (let i = 0; i < startDow; i++) {
    cells += '<div class="cal-cell cal-empty"></div>';
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear, currentMonth, d);
    const isToday = isCurrentMonth && d === today.getDate();
    const lunar = getLunarDate(date, lang);
    const jieqi = jieqiDays.find(j => j.day === d);

    cells += `
      <div class="cal-cell ${isToday ? 'cal-today' : ''} ${jieqi ? 'cal-jieqi' : ''}" data-date="${currentYear}-${currentMonth + 1}-${d}">
        <span class="cal-day">${d}</span>
        ${lunar ? `<span class="cal-lunar">${lunar.day}</span>` : ''}
        ${jieqi ? `<span class="cal-jieqi-name">${jieqi.name[lang]}</span>` : ''}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="cal-grid">
      ${headerCells}
      ${cells}
    </div>
  `;

  container.querySelectorAll('.cal-cell:not(.cal-empty)').forEach(cell => {
    cell.addEventListener('click', () => {
      const [y, m, d] = cell.dataset.date.split('-').map(Number);
      showDailyView(new Date(y, m - 1, d));
    });
  });
}

function getJieqiDaysInMonth(year, month) {
  const dates = JIEQI_DATES[year];
  if (!dates) return [];
  const result = [];
  dates.forEach(([m, d], idx) => {
    if (m === month) {
      result.push({ day: d, name: JIEQI_DATA[idx].name, index: idx });
    }
  });
  return result;
}

function renderJieqiSummary() {
  const container = document.getElementById('jieqi-summary');
  if (!container) return;
  const lang = getLang();
  const jieqis = getJieqiDaysInMonth(currentYear, currentMonth + 1);

  if (jieqis.length === 0) {
    container.innerHTML = '';
    return;
  }

  const cards = jieqis.map(j => {
    const data = JIEQI_DATA[j.index];
    return `
      <div class="card" style="margin-top:12px">
        <div class="flex-between">
          <h3 class="title-3">${data.name[lang]}</h3>
          <span class="body-text" style="color:var(--text-secondary)">${currentMonth + 1}/${j.day}</span>
        </div>
        ${data.diet[lang] ? `<p class="body-text" style="margin-top:8px;color:var(--text-secondary)">${data.diet[lang].substring(0, 100)}...</p>` : ''}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <p class="caption" style="margin-top:24px">${t('calendar.monthJieqi')}</p>
    ${cards}
  `;
}

function showDailyView(date) {
  document.getElementById('calendar-header').style.display = 'none';
  document.getElementById('calendar-grid').style.display = 'none';
  document.getElementById('jieqi-summary').style.display = 'none';

  const container = document.getElementById('daily-view');
  container.style.display = 'block';

  const lang = getLang();
  const lunar = getLunarDate(date, lang);
  const { current } = getCurrentJieqi(date);

  const scheduleItems = SHICHEN_DATA.map(s => `
    <div class="card-item">
      <div class="flex-between">
        <span class="body-text" style="font-weight:600">${s.name[lang]}</span>
        <span class="caption" style="text-transform:none">${s.timeRange}</span>
      </div>
      <p class="body-text" style="color:var(--text-secondary);margin-top:4px">${s.meridian[lang]} — ${s.summary[lang]}</p>
    </div>
  `).join('');

  container.innerHTML = `
    <button id="back-to-month" class="body-text" style="color:var(--gold-primary);background:none;border:none;cursor:pointer;font-family:var(--font-ui);font-weight:500;padding:0">← ${t('calendar.backToMonth')}</button>
    <div style="margin-top:16px">
      <h1 class="title-1">${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}</h1>
      ${lunar ? `<p class="body-text" style="color:var(--text-secondary)">${t('calendar.lunarDate')}: ${lunar.month}${lunar.day}</p>` : ''}
      <span class="gold-tag" style="margin-top:8px;display:inline-block">${current.name[lang]} · ${t(`seasons.${current.season}`)}</span>
    </div>
    ${current.advice[lang] ? `
    <div class="card" style="margin-top:24px">
      <h3 class="title-2">${t('calendar.recommendations')}</h3>
      ${current.diet[lang] ? `<div style="margin-top:12px"><h4 class="title-3">${t('home.diet')}</h4><p class="body-text" style="margin-top:4px">${current.diet[lang]}</p></div>` : ''}
      ${current.herbalRecipe[lang] ? `<div style="margin-top:12px"><h4 class="title-3">${t('calendar.herbalRecipe')}</h4><p class="body-text" style="margin-top:4px">${current.herbalRecipe[lang]}</p></div>` : ''}
      ${current.exercise[lang] ? `<div style="margin-top:12px"><h4 class="title-3">${t('home.exercise')}</h4><p class="body-text" style="margin-top:4px">${current.exercise[lang]}</p></div>` : ''}
    </div>` : ''}
    ${lotusDividerHTML()}
    <p class="caption">${t('calendar.dailySchedule')}</p>
    <div class="card card-grouped" style="margin-top:12px">
      ${scheduleItems}
    </div>
  `;

  document.getElementById('back-to-month').addEventListener('click', () => {
    container.style.display = 'none';
    document.getElementById('calendar-header').style.display = '';
    document.getElementById('calendar-grid').style.display = '';
    document.getElementById('jieqi-summary').style.display = '';
  });
}
```

- [ ] **Step 3: Add calendar CSS to style.css**

Append to `css/style.css`:

```css
/* Calendar */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: var(--divider);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.cal-weekday {
  background: var(--cream);
  text-align: center;
  padding: 8px 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.cal-cell {
  background: var(--white-pure);
  padding: 8px 4px;
  min-height: 72px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: background var(--duration) var(--ease-apple);
}

.cal-cell:hover {
  background: var(--cream);
}

.cal-empty {
  cursor: default;
}

.cal-empty:hover {
  background: var(--white-pure);
}

.cal-day {
  font-size: 17px;
  font-weight: 500;
}

.cal-lunar {
  font-size: 11px;
  color: var(--text-tertiary);
}

.cal-today {
  background: var(--cream);
}

.cal-today .cal-day {
  background: var(--gold-primary);
  color: var(--white-pure);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-jieqi-name {
  font-size: 10px;
  color: var(--gold-primary);
  font-weight: 600;
}

.month-nav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  color: var(--gold-primary);
  border-radius: var(--radius-sm);
  transition: background var(--duration) var(--ease-apple);
}

.month-nav-btn:hover {
  background: var(--cream);
}

@media (max-width: 768px) {
  .cal-cell {
    min-height: 56px;
    padding: 4px 2px;
  }
  .cal-day {
    font-size: 15px;
  }
}
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/calendar.html` — verify monthly grid renders with correct days, lunar dates appear, 节气 days are marked, clicking a day opens daily view with recommendations and 时辰 schedule.

- [ ] **Step 5: Commit**

```bash
git add calendar.html js/calendar.js css/style.css
git commit -m "feat: add calendar page with monthly grid and daily view"
```

---

### Task 10: Readings Data Extraction

**Files:**
- Create: `data/readings-data.js`

**CRITICAL:** This task requires reading the ENTIRE PDF (all ~196 pages) and extracting the full book content verbatim, organized by lecture and chapter.

- [ ] **Step 1: Create readings data structure and extract all content**

Read the PDF page by page and populate this structure:

```javascript
// data/readings-data.js
export const READINGS_DATA = {
  title: {
    zh: '药师法门健康养生随许法',
    en: 'Medicine Buddha Dharma Gate: Health Cultivation Methods'
  },
  author: {
    zh: '大愿法师 讲述',
    en: 'Lectured by Master Da Yuan'
  },
  preface: {
    id: 'preface',
    title: { zh: '编者按', en: "Editor's Preface" },
    content: {
      zh: '', // EXTRACT from PDF pages 7-9 (book pages before page 01)
      en: ''
    }
  },
  lectures: [
    {
      id: 'lecture-1',
      title: { zh: '第一讲', en: 'Lecture 1' },
      chapters: [
        {
          id: 'l1-intro',
          title: { zh: '药师法门与健康养生随许法', en: 'Medicine Buddha and Health Cultivation' },
          content: {
            zh: '', // PDF pages 11-12 (book pages 01-02)
            en: ''
          }
        },
        {
          id: 'l1-review',
          title: { zh: '回顾《药师七佛经学记》十讲的纲要', en: 'Review of Ten Lectures on Medicine Buddha Sutra' },
          content: {
            zh: '', // PDF pages 12-26 (book pages 02-16)
            en: ''
          }
        },
        {
          id: 'l1-health',
          title: { zh: '药师法门与健康养生', en: 'Medicine Buddha and Health' },
          content: {
            zh: '', // PDF pages 26-29 (book pages 16-19)
            en: ''
          }
        },
        {
          id: 'l1-material',
          title: { zh: '物质能量养生法', en: 'Material Energy Health Methods' },
          content: {
            zh: '', // PDF page 29 (book page 19)
            en: ''
          }
        },
        {
          id: 'l1-time',
          title: { zh: '时间养生法', en: 'Time-Based Health Methods' },
          content: {
            zh: '', // PDF pages 29-30 (book pages 19-20)
            en: ''
          }
        },
        {
          id: 'l1-shichen',
          title: { zh: '十二时辰养生法', en: 'Twelve Shichen Health Methods' },
          content: {
            zh: '', // PDF pages 30-65 (book pages 20-55)
            en: ''
          }
        }
      ]
    },
    {
      id: 'lecture-2',
      title: { zh: '第二讲', en: 'Lecture 2' },
      chapters: [
        {
          id: 'l2-jieqi',
          title: { zh: '二十四节气养生法', en: 'Twenty-Four Solar Terms Health Methods' },
          content: {
            zh: '', // PDF pages 76-113 (book pages 66-103)
            en: ''
          }
        },
        {
          id: 'l2-hexagram',
          title: { zh: '十二消息卦养生法', en: 'Twelve Hexagram Health Methods' },
          content: {
            zh: '', // PDF pages 115-124 (book pages 105-114)
            en: ''
          }
        },
        {
          id: 'l2-spiritual',
          title: { zh: '精神能量养生法', en: 'Spiritual Energy Health Methods' },
          content: {
            zh: '', // PDF pages 124-131 (book pages 114-121)
            en: ''
          }
        },
        {
          id: 'l2-cosmic',
          title: { zh: '宇宙生命能量养生法', en: 'Cosmic Life Energy Health Methods' },
          content: {
            zh: '', // PDF pages 131-146 (book pages 121-136)
            en: ''
          }
        }
      ]
    },
    {
      id: 'lecture-3',
      title: { zh: '第三讲', en: 'Lecture 3' },
      chapters: [
        {
          id: 'l3-balance',
          title: { zh: '身心柔软与平衡智慧养生法', en: 'Body-Mind Flexibility and Balance Wisdom' },
          content: {
            zh: '', // PDF pages 146-155 (book pages 136-145)
            en: ''
          }
        },
        {
          id: 'l3-mindpower',
          title: { zh: '心想事成心能养生法', en: 'Mind Power Health Methods' },
          content: {
            zh: '', // PDF pages 155-158 (book pages 145-148)
            en: ''
          }
        },
        {
          id: 'l3-western',
          title: { zh: '西方世界对身心灵修行方法的发展', en: 'Western Development of Mind-Body-Spirit Practices' },
          content: {
            zh: '', // PDF pages 158-165 (book pages 148-155)
            en: ''
          }
        },
        {
          id: 'l3-cancer',
          title: { zh: '预防癌症养生法', en: 'Cancer Prevention Health Methods' },
          content: {
            zh: '', // PDF pages 165-175 (book pages 155-165)
            en: ''
          }
        },
        {
          id: 'l3-nutrition',
          title: { zh: '药师法门养生法与营养学', en: 'Medicine Buddha Health and Nutrition' },
          content: {
            zh: '', // PDF pages 175-182 (book pages 165-172)
            en: ''
          }
        },
        {
          id: 'l3-space',
          title: { zh: '空间养生法', en: 'Spatial Health Methods' },
          content: {
            zh: '', // PDF pages 182-183 (book pages 172-173)
            en: ''
          }
        },
        {
          id: 'l3-inner',
          title: { zh: '内方位养生法', en: 'Inner Directional Health Methods' },
          content: {
            zh: '', // PDF pages 183-188 (book pages 173-178)
            en: ''
          }
        },
        {
          id: 'l3-outer',
          title: { zh: '外方位养生法', en: 'Outer Directional Health Methods' },
          content: {
            zh: '', // PDF pages 188-197 (book pages 178-187)
            en: ''
          }
        },
        {
          id: 'l3-secret',
          title: { zh: '密方位养生法', en: 'Secret Directional Health Methods' },
          content: {
            zh: '', // PDF pages 197-206 (book pages 187-196)
            en: ''
          }
        }
      ]
    }
  ],
  conclusion: {
    id: 'conclusion',
    title: { zh: '结语', en: 'Conclusion' },
    content: {
      zh: '', // PDF pages 206+ (book page 196+)
      en: ''
    }
  }
};
```

For EACH chapter, read the corresponding PDF pages and fill in the `content.zh` field with the EXACT text from the book. Preserve paragraph breaks as `\n\n`. The `content.en` field should be an accurate English translation.

This is the largest single task. Work through it systematically, lecture by lecture, chapter by chapter.

- [ ] **Step 2: Verify completeness**

Check that every chapter's `content.zh` is non-empty and matches the PDF content.

- [ ] **Step 3: Commit**

```bash
git add data/readings-data.js
git commit -m "feat: add full book content for readings page"
```

---

### Task 11: Readings Page

**Files:**
- Create: `readings.html`
- Create: `js/readings.js`

- [ ] **Step 1: Create readings.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>阅读 | Readings — 药师法门养生</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav id="main-nav" class="nav-bar"></nav>

  <div class="readings-layout">
    <aside id="readings-sidebar" class="readings-sidebar"></aside>
    <main id="readings-content" class="readings-content fade-in"></main>
  </div>

  <button id="sidebar-toggle" class="sidebar-toggle" aria-label="Toggle table of contents">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
  </button>

  <div id="reading-progress-bar" class="reading-progress-bar">
    <div id="reading-progress-fill" class="reading-progress-fill"></div>
  </div>

  <footer id="footer" class="footer"></footer>
  <nav id="bottom-nav" class="bottom-nav"></nav>

  <script type="module">
    import { renderNav, renderFooter } from './js/app.js';
    import { initReadings } from './js/readings.js';

    renderNav('readings');
    initReadings();
    renderFooter();

    document.addEventListener('langchange', () => {
      renderNav('readings');
      initReadings();
      renderFooter();
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Create readings.js**

```javascript
// js/readings.js
import { READINGS_DATA } from '../data/readings-data.js';
import { t, getLang } from './i18n.js';

let currentChapterId = null;

export function initReadings() {
  const saved = localStorage.getItem('yaoshi-reading-progress');
  if (saved) {
    try {
      const { chapterId } = JSON.parse(saved);
      currentChapterId = chapterId;
    } catch (e) {}
  }

  renderSidebar();
  renderContent(currentChapterId || 'preface');
  setupSidebarToggle();
  setupScrollProgress();
}

function getAllChapters() {
  const chapters = [];
  if (READINGS_DATA.preface) {
    chapters.push({ ...READINGS_DATA.preface, lectureTitle: null });
  }
  for (const lecture of READINGS_DATA.lectures) {
    for (const ch of lecture.chapters) {
      chapters.push({ ...ch, lectureTitle: lecture.title });
    }
  }
  if (READINGS_DATA.conclusion) {
    chapters.push({ ...READINGS_DATA.conclusion, lectureTitle: null });
  }
  return chapters;
}

function renderSidebar() {
  const sidebar = document.getElementById('readings-sidebar');
  if (!sidebar) return;
  const lang = getLang();

  let html = `<h2 class="title-3" style="padding:20px 20px 12px">${t('readings.tableOfContents')}</h2>`;

  if (READINGS_DATA.preface) {
    html += `<a class="toc-item ${currentChapterId === 'preface' ? 'active' : ''}" data-id="preface">${READINGS_DATA.preface.title[lang]}</a>`;
  }

  for (const lecture of READINGS_DATA.lectures) {
    html += `<div class="toc-lecture">${lecture.title[lang]}</div>`;
    for (const ch of lecture.chapters) {
      html += `<a class="toc-item ${currentChapterId === ch.id ? 'active' : ''}" data-id="${ch.id}">${ch.title[lang]}</a>`;
    }
  }

  if (READINGS_DATA.conclusion) {
    html += `<a class="toc-item ${currentChapterId === 'conclusion' ? 'active' : ''}" data-id="conclusion">${READINGS_DATA.conclusion.title[lang]}</a>`;
  }

  sidebar.innerHTML = html;

  sidebar.querySelectorAll('.toc-item').forEach(item => {
    item.addEventListener('click', () => {
      renderContent(item.dataset.id);
      sidebar.classList.remove('open');
    });
  });
}

function renderContent(chapterId) {
  currentChapterId = chapterId;
  const container = document.getElementById('readings-content');
  if (!container) return;
  const lang = getLang();

  const chapters = getAllChapters();
  const chapter = chapters.find(c => c.id === chapterId);
  if (!chapter) return;

  const contentText = chapter.content[lang] || chapter.content['zh'] || '';
  const paragraphs = contentText.split('\n\n').filter(p => p.trim()).map(p =>
    `<p class="reading-text" style="margin-bottom:1.2em;text-indent:2em">${p.trim()}</p>`
  ).join('');

  const currentIdx = chapters.findIndex(c => c.id === chapterId);
  const prevChapter = currentIdx > 0 ? chapters[currentIdx - 1] : null;
  const nextChapter = currentIdx < chapters.length - 1 ? chapters[currentIdx + 1] : null;

  container.innerHTML = `
    <div class="reading-area">
      ${chapter.lectureTitle ? `<p class="caption">${chapter.lectureTitle[lang]}</p>` : ''}
      <h1 class="title-1" style="margin-top:8px">${chapter.title[lang]}</h1>
      <div style="margin-top:32px">
        ${paragraphs}
      </div>
      <div class="reading-nav-buttons" style="margin-top:48px;display:flex;justify-content:space-between">
        ${prevChapter ? `<button class="reading-nav-btn" data-id="${prevChapter.id}">← ${prevChapter.title[lang]}</button>` : '<span></span>'}
        ${nextChapter ? `<button class="reading-nav-btn" data-id="${nextChapter.id}">${nextChapter.title[lang]} →</button>` : '<span></span>'}
      </div>
    </div>
  `;

  container.querySelectorAll('.reading-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => renderContent(btn.dataset.id));
  });

  container.scrollTop = 0;
  renderSidebar();
  saveProgress(chapterId);
}

function setupSidebarToggle() {
  const btn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('readings-sidebar');
  if (!btn || !sidebar) return;

  btn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
}

function setupScrollProgress() {
  const content = document.getElementById('readings-content');
  const fill = document.getElementById('reading-progress-fill');
  if (!content || !fill) return;

  content.addEventListener('scroll', () => {
    const scrollTop = content.scrollTop;
    const scrollHeight = content.scrollHeight - content.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    fill.style.width = `${progress}%`;
  });
}

function saveProgress(chapterId) {
  localStorage.setItem('yaoshi-reading-progress', JSON.stringify({ chapterId }));
}
```

- [ ] **Step 3: Add readings CSS to style.css**

Append to `css/style.css`:

```css
/* Readings */
.readings-layout {
  display: flex;
  min-height: calc(100vh - 48px);
  padding-top: 48px;
}

.readings-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--white-pure);
  border-right: 0.5px solid var(--divider);
  overflow-y: auto;
  position: sticky;
  top: 48px;
  height: calc(100vh - 48px);
}

.readings-content {
  flex: 1;
  overflow-y: auto;
  height: calc(100vh - 48px);
  position: relative;
}

.reading-area {
  max-width: 680px;
  margin: 0 auto;
  padding: var(--space-xl) var(--space-lg);
}

.toc-lecture {
  padding: 12px 20px 4px;
  font-size: 13px;
  font-weight: 700;
  color: var(--gold-primary);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.toc-item {
  display: block;
  padding: 8px 20px 8px 28px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--duration) var(--ease-apple);
  border-left: 3px solid transparent;
}

.toc-item:hover {
  color: var(--text-primary);
  background: var(--cream);
}

.toc-item.active {
  color: var(--gold-primary);
  border-left-color: var(--gold-primary);
  background: rgba(184, 134, 11, 0.05);
  font-weight: 600;
}

.reading-progress-bar {
  position: fixed;
  top: 48px;
  left: 280px;
  right: 0;
  height: 3px;
  background: var(--cream);
  z-index: 999;
}

.reading-progress-fill {
  height: 100%;
  background: var(--gold-gradient);
  width: 0;
  transition: width 100ms linear;
}

.reading-nav-btn {
  background: none;
  border: 1px solid var(--divider);
  border-radius: var(--radius-sm);
  padding: 8px 16px;
  font-size: 14px;
  color: var(--gold-primary);
  cursor: pointer;
  font-family: var(--font-ui);
  transition: all var(--duration) var(--ease-apple);
}

.reading-nav-btn:hover {
  background: var(--cream);
  border-color: var(--gold-light);
}

.sidebar-toggle {
  display: none;
  position: fixed;
  top: 56px;
  left: 12px;
  z-index: 1001;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 0.5px solid var(--divider);
  border-radius: var(--radius-sm);
  padding: 8px;
  cursor: pointer;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .readings-sidebar {
    position: fixed;
    left: -280px;
    top: 48px;
    z-index: 1002;
    transition: left var(--duration) var(--ease-apple);
    box-shadow: var(--shadow-hover);
  }

  .readings-sidebar.open {
    left: 0;
  }

  .sidebar-toggle {
    display: block;
  }

  .reading-progress-bar {
    left: 0;
  }

  .readings-content {
    padding-top: 0;
  }

  .reading-area {
    padding: var(--space-lg) var(--space-md);
  }
}
```

- [ ] **Step 4: Verify in browser**

Open `http://localhost:8080/readings.html` — verify sidebar shows TOC, clicking a chapter loads content, progress bar tracks scroll, previous/next navigation works, mobile sidebar collapses.

- [ ] **Step 5: Commit**

```bash
git add readings.html js/readings.js css/style.css
git commit -m "feat: add readings page with sidebar TOC and reading progress"
```

---

### Task 12: Final Polish & GitHub Pages Deploy

**Files:**
- Modify: `css/style.css` (minor fixes)
- Modify: all HTML files (meta tags)

- [ ] **Step 1: Add meta tags and favicon reference to all HTML files**

Add to the `<head>` of `index.html`, `calendar.html`, and `readings.html`:

```html
<meta name="description" content="药师法门健康养生随许法 — 大愿法师讲述。Medicine Buddha health cultivation practices by Master Da Yuan.">
<meta name="theme-color" content="#B8860B">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪷</text></svg>">
```

- [ ] **Step 2: Cross-page navigation test**

Open each page in the browser and verify:
1. `index.html`: Hero card shows current 时辰, timeline scrolls, 节气 card shows, language toggle works
2. `calendar.html`: Month grid renders, lunar dates show, 节气 days marked, daily view opens with advice + schedule
3. `readings.html`: Sidebar TOC loads, chapters render with verbatim content, progress bar tracks, prev/next works
4. Language toggle persists across pages via localStorage
5. All pages render correctly at mobile, tablet, and desktop widths
6. Navigation between pages works from both top nav and bottom tab bar

- [ ] **Step 3: Initialize git repo and commit everything**

```bash
cd /Users/zibinzhao/Desktop/Projects/Yaos
git init
git add css/ js/ data/ index.html calendar.html readings.html docs/
git commit -m "feat: complete Yaoshi Health Calendar app — 3 pages, bilingual, Apple-inspired design

Static web app presenting health cultivation practices from 《药师法门健康养生随许法》
by 大愿法师. Features: auto-detecting 时辰/节气 dashboard, monthly/daily calendar
with lunar dates, full book readings with progress tracking. Bilingual CN/EN."
```

- [ ] **Step 4: Deploy to GitHub Pages**

```bash
gh repo create Yaos --public --source=. --remote=origin
git push -u origin main
gh api repos/:owner/Yaos/pages -X POST -f source.branch=main -f source.path=/
```

Verify the site is live at `https://<username>.github.io/Yaos/`.

- [ ] **Step 5: Final commit with any deployment fixes**

If GitHub Pages requires any path adjustments (e.g., relative vs absolute paths), fix and push.

```bash
git add -A
git commit -m "fix: adjust paths for GitHub Pages deployment"
git push
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | CSS Design System | `css/style.css` |
| 2 | i18n Module | `js/i18n.js` |
| 3 | Shared App Module | `js/app.js` |
| 4 | 时辰 Data (PDF extraction) | `data/shichen-data.js` |
| 5 | 节气 Data (PDF extraction) | `data/jieqi-data.js` |
| 6 | Lunar Calendar | `data/lunar-data.js` |
| 7 | Home Page (时辰 hero + timeline) | `index.html`, `js/shichen.js` |
| 8 | Home Page (节气 card) | `js/jieqi.js` |
| 9 | Calendar Page | `calendar.html`, `js/calendar.js` |
| 10 | Readings Data (full PDF extraction) | `data/readings-data.js` |
| 11 | Readings Page | `readings.html`, `js/readings.js` |
| 12 | Polish & Deploy | All files, GitHub Pages |

Tasks 4, 5, and 10 are the most labor-intensive — they require reading the entire PDF and extracting content verbatim. Tasks 7-9 and 11 are the UI implementation. Task 1-3 and 6 are foundational.
