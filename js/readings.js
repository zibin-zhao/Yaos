/**
 * readings.js — Chapter navigation, reading progress, sidebar TOC
 * Yaoshi Health Calendar App
 *
 * Exports: initReadings()
 */

import { t, getLang } from './i18n.js';
import { READINGS_DATA } from '../data/readings-data.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'yaoshi-reading-progress';

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

let currentChapterId = null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Flatten all chapters into a single ordered array with lecture metadata.
 * @returns {{ id: string, title: {zh,en}, content: {zh,en}, lectureTitle: {zh,en}|null }[]}
 */
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

/**
 * Find a chapter by id from the flattened list.
 */
function findChapter(id) {
  return getAllChapters().find(ch => ch.id === id) || null;
}

/**
 * Save current chapter id to localStorage.
 */
function saveProgress(chapterId) {
  try {
    localStorage.setItem(STORAGE_KEY, chapterId);
  } catch (_) {}
}

/**
 * Load saved chapter id from localStorage.
 */
function loadProgress() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (_) {
    return null;
  }
}

/**
 * Escape HTML entities in a string.
 */
function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Convert plain text content to HTML paragraphs with reading indent.
 * Lines separated by blank lines become separate <p> elements.
 */
function textToHTML(text) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map(para => para.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return `<p style="text-indent:2em">${esc(text)}</p>`;

  return paragraphs
    .map(para => {
      const lines = para.split('\n').map(l => esc(l.trim())).join('<br>');
      return `<p style="text-indent:2em">${lines}</p>`;
    })
    .join('\n');
}

// ---------------------------------------------------------------------------
// Navigation: navigate to a chapter
// ---------------------------------------------------------------------------

function navigateTo(chapterId, { closeSidebar = false } = {}) {
  const allChapters = getAllChapters();
  const idx = allChapters.findIndex(ch => ch.id === chapterId);
  if (idx === -1) return;

  currentChapterId = chapterId;
  saveProgress(chapterId);

  if (closeSidebar) {
    closeMobileSidebar();
  }

  renderContent(allChapters, idx);
  renderSidebar(allChapters);
  resetScrollProgress();
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function resetScrollProgress() {
  const fill = document.getElementById('reading-progress-fill');
  if (fill) fill.style.width = '0%';

  const contentEl = document.getElementById('readings-content');
  if (!contentEl) return;

  // Scroll content area back to top
  contentEl.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function updateScrollProgress() {
  const fill = document.getElementById('reading-progress-fill');
  if (!fill) return;

  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
  fill.style.width = `${progress}%`;
}

// ---------------------------------------------------------------------------
// Mobile sidebar
// ---------------------------------------------------------------------------

function openMobileSidebar() {
  const sidebar = document.getElementById('readings-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.add('readings-sidebar--open');
  if (overlay) overlay.classList.add('sidebar-overlay--visible');
  document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('readings-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.remove('readings-sidebar--open');
  if (overlay) overlay.classList.remove('sidebar-overlay--visible');
  document.body.style.overflow = '';
}

// ---------------------------------------------------------------------------
// Render sidebar
// ---------------------------------------------------------------------------

function renderSidebar(allChapters) {
  const sidebar = document.getElementById('readings-sidebar');
  if (!sidebar) return;

  const lang = getLang();
  const tocTitle = lang === 'zh' ? '目录' : 'Table of Contents';

  let html = `
    <div class="readings-sidebar__header">${esc(tocTitle)}</div>
    <div class="readings-sidebar__list">
  `;

  // Preface
  if (READINGS_DATA.preface) {
    const isActive = currentChapterId === READINGS_DATA.preface.id;
    const title = READINGS_DATA.preface.title[lang] || READINGS_DATA.preface.title.zh;
    html += `
      <div
        class="sidebar-item${isActive ? ' sidebar-item--active' : ''}"
        data-chapter="${esc(READINGS_DATA.preface.id)}"
        role="button"
        tabindex="0"
      >
        <span class="sidebar-item__title">${esc(title)}</span>
      </div>
    `;
  }

  // Lectures and their chapters
  for (const lecture of READINGS_DATA.lectures) {
    const lectureLabel = lecture.title[lang] || lecture.title.zh;
    html += `
      <div class="sidebar-item" style="opacity:0.5;cursor:default;padding-top:var(--space-16,16px)">
        <span class="sidebar-item__title" style="font-size:11px;text-transform:uppercase;letter-spacing:0.8px;color:var(--color-text-tertiary)">${esc(lectureLabel)}</span>
      </div>
    `;
    for (const ch of lecture.chapters) {
      const isActive = currentChapterId === ch.id;
      const title = ch.title[lang] || ch.title.zh;
      html += `
        <div
          class="sidebar-item${isActive ? ' sidebar-item--active' : ''}"
          data-chapter="${esc(ch.id)}"
          role="button"
          tabindex="0"
          style="padding-left:var(--space-32,32px)"
        >
          <span class="sidebar-item__title">${esc(title)}</span>
        </div>
      `;
    }
  }

  // Conclusion
  if (READINGS_DATA.conclusion) {
    const isActive = currentChapterId === READINGS_DATA.conclusion.id;
    const title = READINGS_DATA.conclusion.title[lang] || READINGS_DATA.conclusion.title.zh;
    html += `
      <div
        class="sidebar-item${isActive ? ' sidebar-item--active' : ''}"
        data-chapter="${esc(READINGS_DATA.conclusion.id)}"
        role="button"
        tabindex="0"
      >
        <span class="sidebar-item__title">${esc(title)}</span>
      </div>
    `;
  }

  html += `</div>`;
  sidebar.innerHTML = html;

  // Scroll active item into view within the sidebar list
  const activeEl = sidebar.querySelector('.sidebar-item--active');
  if (activeEl) {
    activeEl.scrollIntoView({ block: 'nearest' });
  }

  // Attach click handlers
  sidebar.querySelectorAll('[data-chapter]').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo(el.dataset.chapter, { closeSidebar: true });
    });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo(el.dataset.chapter, { closeSidebar: true });
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Render content area
// ---------------------------------------------------------------------------

function renderContent(allChapters, idx) {
  const contentEl = document.getElementById('readings-content');
  if (!contentEl) return;

  const chapter = allChapters[idx];
  const lang = getLang();
  const prevChapter = idx > 0 ? allChapters[idx - 1] : null;
  const nextChapter = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;

  const chapterTitle = chapter.title[lang] || chapter.title.zh;
  const chapterContent = chapter.content[lang] || chapter.content.zh;
  const lectureLabel = chapter.lectureTitle
    ? (chapter.lectureTitle[lang] || chapter.lectureTitle.zh)
    : null;

  const prevLabel = lang === 'zh' ? '上一章' : 'Previous';
  const nextLabel = lang === 'zh' ? '下一章' : 'Next';

  let html = `<div class="reading-area">`;

  // Header
  html += `<div class="reading-header">`;
  html += `<div class="reading-header__tags">`;
  if (lectureLabel) {
    html += `<span class="gold-tag caption">${esc(lectureLabel)}</span>`;
  }
  html += `</div>`;
  html += `<h1 class="reading-header__title">${esc(chapterTitle)}</h1>`;

  // Book meta on first chapter
  if (idx === 0) {
    const bookTitle = READINGS_DATA.title[lang] || READINGS_DATA.title.zh;
    const bookAuthor = READINGS_DATA.author[lang] || READINGS_DATA.author.zh;
    html += `<div class="reading-header__meta">`;
    html += `<span>${esc(bookTitle)}</span>`;
    html += `<span>${esc(bookAuthor)}</span>`;
    html += `</div>`;
  }

  html += `</div>`; // .reading-header

  // Content
  html += `<div class="reading-content">`;
  html += textToHTML(chapterContent);
  html += `</div>`;

  // Prev / Next navigation
  html += `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-48,48px);padding-top:var(--space-24,24px);border-top:1px solid var(--color-divider)">`;

  if (prevChapter) {
    const prevTitle = prevChapter.title[lang] || prevChapter.title.zh;
    html += `
      <button
        class="sidebar-item"
        data-chapter="${esc(prevChapter.id)}"
        style="background:var(--color-bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card);border:none;cursor:pointer;flex-direction:column;align-items:flex-start;gap:2px;padding:var(--space-12,12px) var(--space-16,16px)"
      >
        <span class="caption" style="color:var(--color-text-tertiary);font-size:11px">&larr; ${esc(prevLabel)}</span>
        <span class="sidebar-item__title">${esc(prevTitle)}</span>
      </button>
    `;
  } else {
    html += `<div></div>`;
  }

  if (nextChapter) {
    const nextTitle = nextChapter.title[lang] || nextChapter.title.zh;
    html += `
      <button
        class="sidebar-item"
        data-chapter="${esc(nextChapter.id)}"
        style="background:var(--color-bg-card);border-radius:var(--radius-card);box-shadow:var(--shadow-card);border:none;cursor:pointer;flex-direction:column;align-items:flex-end;gap:2px;padding:var(--space-12,12px) var(--space-16,16px);text-align:right"
      >
        <span class="caption" style="color:var(--color-text-tertiary);font-size:11px">${esc(nextLabel)} &rarr;</span>
        <span class="sidebar-item__title">${esc(nextTitle)}</span>
      </button>
    `;
  } else {
    html += `<div></div>`;
  }

  html += `</div>`; // nav row
  html += `</div>`; // .reading-area

  contentEl.innerHTML = html;

  // Attach prev/next nav handlers
  contentEl.querySelectorAll('[data-chapter]').forEach(el => {
    el.addEventListener('click', () => {
      navigateTo(el.dataset.chapter);
    });
  });
}

// ---------------------------------------------------------------------------
// Public: initReadings
// ---------------------------------------------------------------------------

export function initReadings() {
  const allChapters = getAllChapters();
  if (allChapters.length === 0) return;

  // Restore saved progress or start at first chapter
  const savedId = loadProgress();
  const startChapter = savedId && findChapter(savedId) ? savedId : allChapters[0].id;

  currentChapterId = startChapter;

  const idx = allChapters.findIndex(ch => ch.id === startChapter);
  renderSidebar(allChapters);
  renderContent(allChapters, idx >= 0 ? idx : 0);

  // Scroll progress tracking
  window.removeEventListener('scroll', updateScrollProgress);
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // Mobile sidebar toggle
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay = document.getElementById('sidebar-overlay');

  if (toggleBtn) {
    // Remove previous listener by replacing the element clone trick
    const newToggle = toggleBtn.cloneNode(true);
    toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
    newToggle.addEventListener('click', () => {
      const sidebar = document.getElementById('readings-sidebar');
      if (sidebar && sidebar.classList.contains('readings-sidebar--open')) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (overlay) {
    const newOverlay = overlay.cloneNode(true);
    overlay.parentNode.replaceChild(newOverlay, overlay);
    newOverlay.addEventListener('click', closeMobileSidebar);
  }
}
