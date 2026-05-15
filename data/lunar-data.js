/**
 * Chinese Lunar Calendar lookup module — 2024–2030
 * Pure ES module, no external dependencies.
 *
 * Month lengths encoded as arrays of 0/1 per lunar month:
 *   0 = small month (29 days), 1 = large month (30 days)
 *
 * Leap month is indicated by leapMonth (1-indexed, 0 = none).
 * When leapMonth = N, the Nth entry in months[] is the regular Nth month,
 * and the (N)th entry (0-indexed: N) is the leap copy inserted after it.
 * i.e. months[] has 13 entries for leap years, ordered:
 *   [M1, M2, ..., MN, leap-MN, MN+1, ..., M12]
 */

// ---------------------------------------------------------------------------
// Year data
// ---------------------------------------------------------------------------

const LUNAR_YEARS = {
  2024: {
    // 甲辰龙年 — CNY: Feb 10 2024
    cny: new Date(2024, 1, 10), // month is 0-indexed
    leapMonth: 0,
    // 12 months: 正 二 三 四 五 六 七 八 九 十 十一 腊
    months: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    //        30 29 30 29 30 29 30 30 29 30 29 30  = 354 days
  },
  2025: {
    // 乙巳蛇年 — CNY: Jan 29 2025
    cny: new Date(2025, 0, 29),
    leapMonth: 6, // 闰六月
    // 13 months: 正 二 三 四 五 六 闰六 七 八 九 十 十一 腊
    months: [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    //        30 29 30 29 30 30 29 30 29 30 29 30 29 = 383 days
  },
  2026: {
    // 丙午马年 — CNY: Feb 17 2026
    cny: new Date(2026, 1, 17),
    leapMonth: 0,
    // 12 months
    months: [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    //        30 29 30 30 29 30 29 30 29 30 29 30 = 355 days
  },
  2027: {
    // 丁未羊年 — CNY: Feb 6 2027
    cny: new Date(2027, 1, 6),
    leapMonth: 0,
    // 12 months
    months: [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
    //        29 30 29 30 29 30 29 30 30 29 30 29 = 354 days
  },
  2028: {
    // 戊申猴年 — CNY: Jan 26 2028
    cny: new Date(2028, 0, 26),
    leapMonth: 0,
    // 12 months
    months: [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    //        30 29 30 29 30 29 30 29 30 30 29 30 = 355 days
  },
  2029: {
    // 己酉鸡年 — CNY: Feb 13 2029
    cny: new Date(2029, 1, 13),
    leapMonth: 0,
    // 12 months
    months: [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    //        29 30 29 30 29 30 30 29 30 29 30 29 = 354 days
  },
  2030: {
    // 庚戌狗年 — CNY: Feb 3 2030
    cny: new Date(2030, 1, 3),
    leapMonth: 0,
    // 12 months
    months: [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    //        30 29 30 29 30 29 30 30 29 30 29 30 = 354 days
  },
};

// Gregorian years in ascending CNY order for range checks
const CNY_YEARS = Object.keys(LUNAR_YEARS)
  .map(Number)
  .sort((a, b) => a - b);

// ---------------------------------------------------------------------------
// Month and day name tables
// ---------------------------------------------------------------------------

const MONTH_NAMES = {
  zh: ['正月', '二月', '三月', '四月', '五月', '六月',
       '七月', '八月', '九月', '十月', '十一月', '腊月'],
  en: ['1st Month', '2nd Month', '3rd Month', '4th Month',
       '5th Month', '6th Month', '7th Month', '8th Month',
       '9th Month', '10th Month', '11th Month', '12th Month'],
};

const DAY_NAMES_ZH = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return a Date with time zeroed, in local time. */
function toLocalMidnight(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Days elapsed from dateA (midnight) to dateB (midnight). May be negative. */
function daysBetween(dateA, dateB) {
  return Math.round((dateB - dateA) / 86400000);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Convert a Gregorian Date to its Chinese lunar calendar equivalent.
 *
 * @param {Date}   date - The date to convert.
 * @param {string} [lang='zh'] - Language: 'zh' or 'en'.
 * @returns {{ month: string, day: string, monthIdx: number, dayIdx: number } | null}
 *   monthIdx: 1-based lunar month number (leap month shares the same number as its base month)
 *   dayIdx:   1-based lunar day number
 *   Returns null if the date is outside the 2024–2030 coverage.
 */
export function getLunarDate(date, lang = 'zh') {
  const d = toLocalMidnight(date);

  // Find which lunar year this date belongs to.
  // A lunar year starts on its CNY and ends the day before the next CNY.
  let yearKey = null;
  for (let i = 0; i < CNY_YEARS.length; i++) {
    const yr = CNY_YEARS[i];
    const cny = LUNAR_YEARS[yr].cny;
    const nextCny =
      i + 1 < CNY_YEARS.length
        ? LUNAR_YEARS[CNY_YEARS[i + 1]].cny
        : null;

    if (d < cny) break; // date is before this year's CNY

    if (nextCny === null || d < nextCny) {
      yearKey = yr;
      break;
    }
  }

  if (yearKey === null) return null; // out of range

  const yearData = LUNAR_YEARS[yearKey];
  const elapsed = daysBetween(yearData.cny, d); // 0 = CNY day itself

  // Walk through months to find which month and day
  const { months, leapMonth } = yearData;
  let remaining = elapsed;
  let monthSlot = 0; // index into months[]

  while (monthSlot < months.length) {
    const monthLen = months[monthSlot] === 1 ? 30 : 29;
    if (remaining < monthLen) break;
    remaining -= monthLen;
    monthSlot++;
  }

  if (monthSlot >= months.length) return null; // date is past the end of this year's data

  const dayIdx = remaining + 1; // 1-based

  // Determine 1-based lunar month number and whether this slot is the leap month.
  // Months array layout when leapMonth = N (1-based):
  //   indices 0..N-1 → months 1..N  (regular)
  //   index N        → leap month N
  //   indices N+1..12 → months N+1..12 (regular)
  let monthIdx; // 1-based calendar month number
  let isLeap = false;

  if (leapMonth > 0 && monthSlot >= leapMonth) {
    // slots 0..leapMonth-1 → regular months 1..leapMonth
    // slot leapMonth       → leap month (leapMonth)
    // slots leapMonth+1..12 → regular months leapMonth+1..12
    if (monthSlot === leapMonth) {
      isLeap = true;
      monthIdx = leapMonth;
    } else {
      monthIdx = monthSlot; // slot leapMonth+1 → month leapMonth+1, etc.
    }
  } else {
    monthIdx = monthSlot + 1; // no leap adjustment needed
  }

  // Build display strings
  const baseName =
    lang === 'zh'
      ? MONTH_NAMES.zh[monthIdx - 1]
      : MONTH_NAMES.en[monthIdx - 1];

  const month =
    isLeap
      ? lang === 'zh'
        ? `闰${baseName}`
        : `Leap ${baseName}`
      : baseName;

  const day =
    lang === 'zh'
      ? DAY_NAMES_ZH[dayIdx - 1]
      : String(dayIdx);

  return { month, day, monthIdx, dayIdx };
}
