# Yaoshi Health Calendar App — Design Spec

A bilingual (Chinese/English) static web app that presents health cultivation practices from the Medicine Buddha teachings (药师法门健康养生随许法 by 大愿法师). Auto-detects the current 时辰 (2-hour time period) and 节气 (solar term) to show relevant health advice. Includes a monthly/daily calendar and full book readings. Deployed on GitHub Pages.

## Architecture

Static multi-page site. No framework, no build step. Pure HTML/CSS/JS.

```
Yaos/
├── index.html            # Home — current 时辰 + 节气 dashboard
├── calendar.html         # Monthly/daily calendar view
├── readings.html         # Full book content as chapters
├── css/
│   └── style.css         # Shared styles — gold/white theme
├── js/
│   ├── shichen.js        # 12 时辰 detection + rendering
│   ├── jieqi.js          # 24 节气 detection + rendering
│   ├── calendar.js       # Calendar grid + daily view
│   ├── readings.js       # Chapter navigation + reading progress
│   ├── i18n.js           # Bilingual strings + language toggle
│   └── app.js            # Shared: nav, theme, time utilities
└── data/
    ├── shichen-data.js   # 12 time periods with full advice
    ├── jieqi-data.js     # 24 solar terms with full advice
    └── readings-data.js  # Full book content by lecture/chapter
```

Persistent top nav bar across all 3 pages. Language toggle (中/EN) in top right.

## Home Page — 时辰 & 节气 Dashboard

Top to bottom:

### Header
App title "药师法门 · 养生" with subtle lotus motif. Language toggle top-right.

### Current 时辰 Hero Card
The main focal point of the app.
- Large display of current 时辰 name (e.g., "辰时 · 胃经") with time range
- Active meridian highlighted
- Corresponding Yaksha general (药叉大将) and Buddha name
- Health advice summary: what to do NOW
- Specific recommendations: diet tips, acupressure points, exercises
- Progress bar showing how far into the current 时辰

### 时辰 Timeline
Horizontal strip showing all 12 时辰. Current one highlighted in gold. Tapping any 时辰 expands its advice below.

### Current 节气 Card
- 节气 name, date range, season
- Key dietary advice and herbal recipes
- Link to full 节气 details on calendar page

### Footer
Source attribution: 大愿法师 / 六祖寺. Minimal.

### Auto-detection
On page load, `new Date()` maps the hour to the correct 时辰. The 节气 is determined from the current date. Auto-refreshes every minute.

## Calendar Page — Monthly & Daily Views

### Monthly View (default)

**Month Header**: "< May 2026 >" with left/right arrows. Current month highlighted in gold.

**Calendar Grid**: Standard 7-column grid (Mon-Sun).
- Each cell: Gregorian date + lunar date (农历)
- 节气 transition days highlighted with gold accent dot and 节气 name
- Today outlined distinctly
- Tapping a day opens Daily View

**Month 节气 Summary**: Below the grid, a card showing the 1-2 节气 in this month with key advice previewed.

### Daily View (when a day is tapped)

**Date Header**: Full Gregorian + lunar date. Active 节气 period and season.

**Daily Recommendations Card** (based on active 节气):
- Diet recommendations (what to eat, what to avoid)
- Herbal recipes / food therapy (食疗方)
- Exercises or practices
- Health warnings

**12 时辰 Schedule**: Vertical timeline for the day showing all 12 time periods with brief advice — a daily health schedule from 子时 to 亥时.

**Back to Month** button to return to the grid.

### Lunar Date Calculation
Lightweight lunar calendar lookup table in JS (no external library). Covers years 2024-2030. Each year's data encodes month lengths and leap month info as a compact integer, decoded at runtime to produce 农历 month/day for any Gregorian date in range. Dates outside 2024-2030 show Gregorian only (no error).

## Readings Page — Full Book Content

### Sidebar Table of Contents (collapsible on mobile)
Mirrors the book structure:
- **第一讲**: 回顾《药师七佛经学记》十讲纲要 / 药师法门与健康养生 / 物质能量养生法 (时间养生法: 十二时辰养生法)
- **第二讲**: 二十四节气养生法 / 十二消息卦养生法 / 精神能量养生法 (宇宙生命能量养生法)
- **第三讲**: 身心柔软与平衡智慧养生法 / 心想事成心能养生法 / 预防癌症养生法 / 药师法门养生法与营养学 / 空间养生法 (内方位/外方位/密方位)

Current chapter highlighted in gold. Click to jump.

### Reading Area
- Clean, book-like typography with large readable text and comfortable line spacing
- Section headers styled distinctly
- EN mode shows English translations
- Smooth scroll between sections

### Reading Progress
Thin gold progress bar at top of reading area. Progress saved in localStorage for resumption.

### Mobile Behavior
Sidebar collapses into hamburger menu. Reading area full width.

## Design System — Apple-Inspired Gold & White

An Apple-like design language: generous whitespace, SF-style typography hierarchy, frosted glass (backdrop-blur) surfaces, fluid animations, and precise spatial relationships. Combined with a gold accent palette for the Buddhist/wellness context.

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| Primary Gold | `#B8860B` | Primary accent, CTAs, active states |
| Light Gold | `#D4A843` | Secondary accent, icon tints |
| Warm White | `#FAF8F5` | Page background |
| Pure White | `#FFFFFF` | Card surfaces |
| Frosted Glass | `rgba(255,255,255,0.72)` | Nav bar, overlays (with backdrop-blur: 20px) |
| Text Primary | `#1D1D1F` | Headlines, primary text (Apple dark) |
| Text Secondary | `#6E6E73` | Captions, labels (Apple grey) |
| Text Tertiary | `#AEAEB2` | Placeholder, disabled |
| Accent Cream | `#F5ECD7` | Subtle section backgrounds |
| Divider | `rgba(0,0,0,0.06)` | Hairline separators |

### Typography (Apple-style hierarchy)
- **Font stack**: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Noto Sans SC", "Helvetica Neue", sans-serif`
- **Chinese reading**: `"Noto Serif SC", "Songti SC", serif` — kept for book reading mode only
- **Large Title**: 34px / 700 weight / -0.4px tracking (page headers)
- **Title 1**: 28px / 700 weight (section headers)
- **Title 2**: 22px / 700 weight (card headers)
- **Title 3**: 20px / 600 weight (subsection headers)
- **Body**: 17px / 400 weight / 1.6 line-height
- **Caption**: 13px / 400 weight / uppercase tracking 0.6px for labels
- **Reading body**: 18px serif / 1.8 line-height (readings page only)

### Card & Surface Style
- White cards with `border-radius: 16px` (Apple's larger radius)
- `box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)`
- Hero cards: subtle gold gradient left border (`4px, linear-gradient(#D4A843, #B8860B)`)
- Grouped card style for related items (like iOS Settings groups)
- Hairline dividers between list items: `0.5px solid rgba(0,0,0,0.06)`

### Navigation Bar
- Fixed top, frosted glass: `background: rgba(255,255,255,0.72); backdrop-filter: blur(20px)`
- Hairline bottom border
- Compact height: 48px
- Nav items with subtle gold highlight on active page
- Language toggle as a segmented control (中 | EN)

### Interactions & Motion
- **Transitions**: 350ms cubic-bezier(0.25, 0.1, 0.25, 1) — Apple's ease curve
- **Hover**: Cards lift slightly (`translateY(-2px)`, shadow deepens)
- **Tap/Click**: Subtle scale-down (`scale(0.98)`) then release
- **Page transitions**: Fade-in 400ms on load
- **时辰 timeline**: Smooth horizontal scroll with snap points
- **Calendar day tap**: Card expands with spring animation
- **Progress bars**: Animated gold fill with subtle shimmer

### Responsive Breakpoints
- Desktop (> 1024px): Multi-column, generous padding (80px sides)
- Tablet (768-1024px): 2-column, reduced padding (40px)
- Mobile (< 768px): Single column, 20px padding, bottom tab bar replaces top nav
- Mobile nav: Bottom tab bar with 3 tabs (Home/Calendar/Readings) + language toggle, frosted glass style

### Buddhist Touches (Apple-minimal)
- Thin lotus-petal SVG used as section divider — single stroke, gold, very subtle
- Subtle radial gradient glow behind hero card (warm gold, `opacity: 0.04`)
- Design relies on whitespace, typography, and gold accents — no decorative clutter

## Data & Logic

### 时辰 Detection
- `new Date().getHours()` maps to 时辰:
  - 子(23-1), 丑(1-3), 寅(3-5), 卯(5-7), 辰(7-9), 巳(9-11)
  - 午(11-13), 未(13-15), 申(15-17), 酉(17-19), 戌(19-21), 亥(21-23)
- Auto-refresh every 60 seconds to detect transitions

### 时辰 Data (per entry)
- Name (zh/en), time range
- Meridian (经络) name and function
- Yaksha general (药叉大将)
- Buddha/Bodhisattva
- Health advice: diet, exercises, acupressure points, warnings
- Source page references from the book

### 节气 Calculation
- Hardcoded solar term dates for years 2024-2030
- On load, find which 节气 period the current date falls in

### 节气 Data (per entry)
- Name (zh/en), approximate date, season
- Dietary recommendations
- Herbal recipes with ingredients and preparation
- Exercises and practices
- Health warnings

### i18n Strategy
- All strings as `{ zh: "...", en: "..." }` pairs in `i18n.js`
- Language preference in `localStorage`
- Toggle re-renders all visible text without page reload
- Book content translations in `readings-data.js`

### localStorage Usage
- `lang`: language preference
- `readingProgress`: last chapter + scroll position
- Fully offline-capable, no server, no cookies

## Content Fidelity
All Chinese content must be extracted verbatim from the PDF without any modification, summarization, or paraphrasing. Every piece of health advice, herbal recipe, acupressure instruction, dietary recommendation, and teaching must faithfully preserve 大愿法师's exact words as written in the book. The English translations are the only new content — they must accurately translate the original without altering meaning.

## Content Source
《药师法门健康养生随许法》 by 大愿法师 (Master Da Yuan), 六祖寺 (Sixth Patriarch Temple). Lecture delivered May 2011 at 武汉灵泉寺. The entire PDF (~196 pages, 3 lectures) must be extracted and included in the app.

## Deployment
GitHub Pages from the repository root. No build step required.
