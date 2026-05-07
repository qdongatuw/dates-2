const STORAGE_KEY = "birthday-manager.people.v1";
const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0,
  0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540,
  0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50,
  0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0,
  0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2,
  0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573,
  0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4,
  0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5,
  0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46,
  0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58,
  0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50,
  0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0,
  0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260,
  0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0,
  0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0,
  0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
  0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0,
  0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50,
  0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, 0x0b273, 0x06930, 0x07337, 0x06aa0,
  0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, 0x0e968, 0x0d520,
  0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
  0x0d520,
];

const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
const lunarDays = [
  "初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
  "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十",
];

let people = loadPeople();
let calendarCursor = startOfMonth(new Date());

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  navTabs: $$(".nav-tab"),
  views: $$(".view"),
  form: $("#birthdayForm"),
  personId: $("#personId"),
  name: $("#nameInput"),
  month: $("#monthInput"),
  day: $("#dayInput"),
  leapLabel: $("#leapMonthLabel"),
  leap: $("#leapMonthInput"),
  reminder: $("#reminderInput"),
  note: $("#noteInput"),
  peopleList: $("#peopleList"),
  upcomingList: $("#upcomingList"),
  totalPeople: $("#totalPeople"),
  nextThirty: $("#nextThirty"),
  todayCount: $("#todayCount"),
  resetForm: $("#resetFormBtn"),
  exportAll: $("#exportAllBtn"),
  requestNotify: $("#requestNotifyBtn"),
  currentMonth: $("#currentMonthLabel"),
  calendarGrid: $("#calendarGrid"),
  prevMonth: $("#prevMonthBtn"),
  nextMonth: $("#nextMonthBtn"),
  solarLookupForm: $("#solarLookupForm"),
  solarLookupInput: $("#solarLookupInput"),
  solarLookupResult: $("#solarLookupResult"),
  lunarLookupForm: $("#lunarLookupForm"),
  lunarYear: $("#lunarYearInput"),
  lunarMonth: $("#lunarMonthInput"),
  lunarDay: $("#lunarDayInput"),
  lunarLeap: $("#lunarLeapInput"),
  lunarLookupResult: $("#lunarLookupResult"),
  emptyStateTemplate: $("#emptyStateTemplate"),
};

init();

function init() {
  fillSelect(els.month, 1, 12, (value) => `${value} 月`);
  fillSelect(els.day, 1, 31, (value) => `${value} 日`);
  fillSelect(els.lunarMonth, 1, 12, (value) => `${lunarMonths[value - 1]}月`);
  fillSelect(els.lunarDay, 1, 30, (value) => lunarDays[value - 1]);

  const today = new Date();
  els.solarLookupInput.valueAsDate = today;
  els.lunarYear.value = today.getFullYear();

  bindEvents();
  updateTypeControls();
  render();
}

function bindEvents() {
  els.navTabs.forEach((tab) => {
    tab.addEventListener("click", () => switchView(tab.dataset.view));
  });

  $$("input[name='birthdayType']").forEach((input) => {
    input.addEventListener("change", updateTypeControls);
  });

  els.form.addEventListener("submit", savePersonFromForm);
  els.resetForm.addEventListener("click", resetForm);
  els.exportAll.addEventListener("click", () => exportPeopleIcs(people, 10));
  els.requestNotify.addEventListener("click", requestNotifications);
  els.prevMonth.addEventListener("click", () => changeMonth(-1));
  els.nextMonth.addEventListener("click", () => changeMonth(1));
  els.solarLookupForm.addEventListener("submit", lookupSolar);
  els.lunarLookupForm.addEventListener("submit", lookupLunar);
}

function switchView(viewId) {
  els.navTabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.view === viewId));
  els.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
}

function updateTypeControls() {
  const type = getBirthdayType();
  els.leapLabel.classList.toggle("hidden", type !== "lunar");
  els.day.options[30].disabled = type === "lunar";
  if (type === "lunar" && Number(els.day.value) > 30) els.day.value = "30";
}

function savePersonFromForm(event) {
  event.preventDefault();
  const type = getBirthdayType();
  const person = {
    id: els.personId.value || createId(),
    name: els.name.value.trim(),
    type,
    month: Number(els.month.value),
    day: Number(els.day.value),
    isLeap: type === "lunar" && els.leap.checked,
    reminderDays: Number(els.reminder.value),
    note: els.note.value.trim(),
  };

  if (!person.name) return;
  if (person.type === "lunar" && person.day > 30) {
    alert("农历日期最多到三十。");
    return;
  }

  const index = people.findIndex((item) => item.id === person.id);
  if (index >= 0) people[index] = person;
  else people.push(person);

  savePeople();
  resetForm();
  render();
}

function resetForm() {
  els.form.reset();
  els.personId.value = "";
  updateTypeControls();
}

function editPerson(id) {
  const person = people.find((item) => item.id === id);
  if (!person) return;
  els.personId.value = person.id;
  els.name.value = person.name;
  document.querySelector(`input[name='birthdayType'][value='${person.type}']`).checked = true;
  els.month.value = String(person.month);
  els.day.value = String(person.day);
  els.leap.checked = Boolean(person.isLeap);
  els.reminder.value = String(person.reminderDays);
  els.note.value = person.note || "";
  updateTypeControls();
  switchView("people");
}

function deletePerson(id) {
  const person = people.find((item) => item.id === id);
  if (!person || !confirm(`删除 ${person.name} 的生日资料？`)) return;
  people = people.filter((item) => item.id !== id);
  savePeople();
  render();
}

function render() {
  const upcoming = getUpcoming(people, 370);
  const nextThirty = upcoming.filter((item) => item.daysAway <= 30);
  els.totalPeople.textContent = String(people.length);
  els.nextThirty.textContent = String(nextThirty.length);
  els.todayCount.textContent = String(upcoming.filter((item) => item.daysAway === 0).length);
  renderUpcoming(nextThirty.length ? nextThirty : upcoming.slice(0, 5));
  renderPeople();
  renderCalendar();
  maybeShowNotification(upcoming);
}

function renderUpcoming(items) {
  els.upcomingList.innerHTML = "";
  if (!items.length) {
    els.upcomingList.append(emptyState());
    return;
  }

  items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "upcoming-item";
    row.innerHTML = `
      <div>
        <div class="item-title">
          <strong>${escapeHtml(item.person.name)}</strong>
          <span class="tag">${item.person.type === "lunar" ? "农历" : "公历"}</span>
        </div>
        <p class="date-line">${formatDate(item.date)} · ${describeBirthday(item.person, item.date)}</p>
        ${item.person.note ? `<p class="note">${escapeHtml(item.person.note)}</p>` : ""}
      </div>
      <div class="countdown">${item.daysAway === 0 ? "今天" : `${item.daysAway} 天后`}</div>
    `;
    els.upcomingList.append(row);
  });
}

function renderPeople() {
  els.peopleList.innerHTML = "";
  if (!people.length) {
    els.peopleList.append(emptyState());
    return;
  }

  getUpcoming(people, 730).forEach((item) => {
    const person = item.person;
    const card = document.createElement("article");
    card.className = "person-card";
    card.innerHTML = `
      <div>
        <div class="item-title">
          <strong>${escapeHtml(person.name)}</strong>
          <span class="tag">${person.type === "lunar" ? "农历" : "公历"}</span>
        </div>
        <p class="date-line">${describeBirthday(person)} · 下次：${formatDate(item.date)}</p>
        ${person.note ? `<p class="note">${escapeHtml(person.note)}</p>` : ""}
      </div>
      <div class="card-actions">
        <button class="secondary" data-action="google" data-id="${person.id}" type="button">Google</button>
        <button class="secondary" data-action="ics" data-id="${person.id}" type="button">ICS</button>
        <button class="ghost" data-action="edit" data-id="${person.id}" type="button">编辑</button>
        <button class="danger" data-action="delete" data-id="${person.id}" type="button">删除</button>
      </div>
    `;
    els.peopleList.append(card);
  });

  els.peopleList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const { action, id } = button.dataset;
      if (action === "edit") editPerson(id);
      if (action === "delete") deletePerson(id);
      if (action === "ics") exportPeopleIcs(people.filter((item) => item.id === id), 10);
      if (action === "google") openGoogleCalendar(id);
    });
  });
}

function renderCalendar() {
  els.currentMonth.textContent = `${calendarCursor.getFullYear()} 年 ${calendarCursor.getMonth() + 1} 月`;
  els.calendarGrid.innerHTML = "";

  const firstDay = startOfMonth(calendarCursor);
  const start = addDays(firstDay, -firstDay.getDay());
  const birthdayMap = mapBirthdaysForMonth(calendarCursor);
  const todayKey = dateKey(new Date());

  for (let i = 0; i < 42; i += 1) {
    const date = addDays(start, i);
    const key = dateKey(date);
    const lunar = solarToLunar(date);
    const cell = document.createElement("div");
    cell.className = "day-cell";
    if (date.getMonth() !== calendarCursor.getMonth()) cell.classList.add("muted");
    if (key === todayKey) cell.classList.add("today");

    const birthdays = birthdayMap.get(key) || [];
    cell.innerHTML = `
      <div class="day-top">
        <span class="solar-day">${date.getDate()}</span>
        <span class="lunar-day">${formatLunarShort(lunar)}</span>
      </div>
      ${birthdays.map((person) => `<span class="birthday-chip">${escapeHtml(person.name)}</span>`).join("")}
    `;
    els.calendarGrid.append(cell);
  }
}

function changeMonth(delta) {
  calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + delta, 1);
  renderCalendar();
}

function lookupSolar(event) {
  event.preventDefault();
  const date = parseDateInput(els.solarLookupInput.value);
  if (!date) return;
  try {
    const lunar = solarToLunar(date);
    els.solarLookupResult.textContent = `${formatDate(date)} 是农历 ${formatLunarFull(lunar)}。`;
  } catch (error) {
    els.solarLookupResult.textContent = error.message;
  }
}

function lookupLunar(event) {
  event.preventDefault();
  const year = Number(els.lunarYear.value);
  const month = Number(els.lunarMonth.value);
  const day = Number(els.lunarDay.value);
  const isLeap = els.lunarLeap.checked;
  try {
    const date = lunarToSolar(year, month, day, isLeap);
    els.lunarLookupResult.textContent = `${year} 年${isLeap ? "闰" : ""}${lunarMonths[month - 1]}月${lunarDays[day - 1]} 是公历 ${formatDate(date)}。`;
  } catch (error) {
    els.lunarLookupResult.textContent = error.message;
  }
}

function getUpcoming(sourcePeople, horizonDays) {
  const today = stripTime(new Date());
  return sourcePeople
    .map((person) => {
      const date = nextOccurrence(person, today);
      return date ? { person, date, daysAway: diffDays(today, date) } : null;
    })
    .filter(Boolean)
    .filter((item) => item.daysAway <= horizonDays)
    .sort((a, b) => a.daysAway - b.daysAway || a.person.name.localeCompare(b.person.name, "zh-CN"));
}

function nextOccurrence(person, fromDate) {
  const from = stripTime(fromDate);
  if (person.type === "solar") {
    let date = makeSolarBirthday(from.getFullYear(), person.month, person.day);
    if (date < from) date = makeSolarBirthday(from.getFullYear() + 1, person.month, person.day);
    return date;
  }

  for (let year = from.getFullYear(); year <= from.getFullYear() + 3; year += 1) {
    try {
      const date = lunarToSolar(year, person.month, person.day, person.isLeap);
      if (date >= from) return date;
    } catch {
      continue;
    }
  }
  return null;
}

function makeSolarBirthday(year, month, day) {
  if (month === 2 && day === 29 && !isLeapYear(year)) return new Date(year, 1, 28);
  return new Date(year, month - 1, day);
}

function mapBirthdaysForMonth(monthDate) {
  const map = new Map();
  people.forEach((person) => {
    const candidates = [];
    if (person.type === "solar") {
      candidates.push(makeSolarBirthday(monthDate.getFullYear(), person.month, person.day));
    } else {
      [monthDate.getFullYear() - 1, monthDate.getFullYear(), monthDate.getFullYear() + 1].forEach((year) => {
        try {
          candidates.push(lunarToSolar(year, person.month, person.day, person.isLeap));
        } catch {
          // Some lunar dates do not exist every year, especially leap-month birthdays.
        }
      });
    }

    candidates.forEach((date) => {
      if (date.getFullYear() === monthDate.getFullYear() && date.getMonth() === monthDate.getMonth()) {
        const key = dateKey(date);
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(person);
      }
    });
  });
  return map;
}

function requestNotifications() {
  if (!("Notification" in window)) {
    alert("当前浏览器不支持系统通知。");
    return;
  }
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      alert("已开启。页面打开时，会弹出达到提醒日期的生日通知。");
      render();
    }
  });
}

function maybeShowNotification(upcoming) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const due = upcoming.filter((item) => item.daysAway <= item.person.reminderDays);
  if (!due.length) return;
  const lastKey = localStorage.getItem("birthday-manager.notification-date");
  const today = dateKey(new Date());
  if (lastKey === today) return;
  localStorage.setItem("birthday-manager.notification-date", today);
  new Notification("生日提醒", {
    body: due.map((item) => `${item.person.name}：${item.daysAway === 0 ? "今天" : `${item.daysAway} 天后`}`).join("；"),
  });
}

function openGoogleCalendar(id) {
  const person = people.find((item) => item.id === id);
  if (!person) return;
  const occurrence = nextOccurrence(person, new Date());
  if (!occurrence) return;
  const start = formatGoogleDate(occurrence);
  const end = formatGoogleDate(addDays(occurrence, 1));
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${person.name}生日`,
    dates: `${start}/${end}`,
    details: `${describeBirthday(person, occurrence)}\n${person.note || ""}`.trim(),
  });
  window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, "_blank", "noopener");
}

function exportPeopleIcs(sourcePeople, years) {
  if (!sourcePeople.length) return;
  const today = stripTime(new Date());
  const events = [];
  sourcePeople.forEach((person) => {
    for (let offset = 0; offset < years; offset += 1) {
      const targetYear = today.getFullYear() + offset;
      let date = null;
      try {
        date = person.type === "solar"
          ? makeSolarBirthday(targetYear, person.month, person.day)
          : lunarToSolar(targetYear, person.month, person.day, person.isLeap);
      } catch {
        date = null;
      }
      if (date) events.push({ person, date });
    }
  });

  const ics = buildIcs(events);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `birthdays-${today.getFullYear()}-${today.getFullYear() + years - 1}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

function buildIcs(events) {
  const stamp = formatIcsDateTime(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Birthday Manager//CN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  events
    .sort((a, b) => a.date - b.date)
    .forEach(({ person, date }) => {
      const uid = `${person.id}-${date.getFullYear()}@birthday-manager.local`;
      lines.push(
        "BEGIN:VEVENT",
        `UID:${escapeIcs(uid)}`,
        `DTSTAMP:${stamp}`,
        `DTSTART;VALUE=DATE:${formatIcsDate(date)}`,
        `DTEND;VALUE=DATE:${formatIcsDate(addDays(date, 1))}`,
        `SUMMARY:${escapeIcs(`${person.name}生日`)}`,
        `DESCRIPTION:${escapeIcs(`${describeBirthday(person, date)}\n${person.note || ""}`.trim())}`,
        "TRANSP:TRANSPARENT",
        "END:VEVENT",
      );
    });

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

function describeBirthday(person, date) {
  if (person.type === "solar") return `公历 ${person.month} 月 ${person.day} 日`;
  if (!date) return `农历 ${person.isLeap ? "闰" : ""}${lunarMonths[person.month - 1]}月${lunarDays[person.day - 1]}`;
  const lunar = solarToLunar(date);
  return `农历 ${formatLunarFull(lunar)}`;
}

function lunarYearDays(year) {
  let sum = 348;
  for (let mask = 0x8000; mask > 0x8; mask >>= 1) {
    if (lunarInfo[year - 1900] & mask) sum += 1;
  }
  return sum + leapDays(year);
}

function leapMonth(year) {
  return lunarInfo[year - 1900] & 0xf;
}

function leapDays(year) {
  if (leapMonth(year)) return lunarInfo[year - 1900] & 0x10000 ? 30 : 29;
  return 0;
}

function monthDays(year, month) {
  return lunarInfo[year - 1900] & (0x10000 >> month) ? 30 : 29;
}

function solarToLunar(date) {
  const min = new Date(1900, 0, 31);
  const max = new Date(2100, 11, 31);
  const target = stripTime(date);
  if (target < min || target > max) throw new Error("支持 1900-01-31 至 2100-12-31 的日期。");

  let offset = diffDays(min, target);
  let year = 1900;
  let daysOfYear = lunarYearDays(year);
  while (year < 2101 && offset >= daysOfYear) {
    offset -= daysOfYear;
    year += 1;
    daysOfYear = lunarYearDays(year);
  }

  const leap = leapMonth(year);
  let isLeap = false;
  let month = 1;
  let daysOfMonth = monthDays(year, month);

  while (month <= 12 && offset >= daysOfMonth) {
    offset -= daysOfMonth;
    if (leap && month === leap && !isLeap) {
      isLeap = true;
      daysOfMonth = leapDays(year);
    } else {
      if (isLeap) isLeap = false;
      month += 1;
      daysOfMonth = monthDays(year, month);
    }
  }

  return { year, month, day: offset + 1, isLeap };
}

function lunarToSolar(year, month, day, isLeap = false) {
  if (year < 1900 || year > 2100) throw new Error("农历年份需在 1900 至 2100 之间。");
  if (month < 1 || month > 12) throw new Error("农历月份需在 1 至 12 之间。");
  const leap = leapMonth(year);
  if (isLeap && leap !== month) throw new Error(`${year} 年没有闰${lunarMonths[month - 1]}月。`);
  const maxDay = isLeap ? leapDays(year) : monthDays(year, month);
  if (day < 1 || day > maxDay) throw new Error(`该农历月份只有 ${maxDay} 天。`);

  let offset = 0;
  for (let y = 1900; y < year; y += 1) offset += lunarYearDays(y);
  for (let m = 1; m < month; m += 1) {
    offset += monthDays(year, m);
    if (leap === m) offset += leapDays(year);
  }
  if (isLeap) offset += monthDays(year, month);
  offset += day - 1;
  return addDays(new Date(1900, 0, 31), offset);
}

function formatLunarShort(lunar) {
  if (lunar.day === 1) return `${lunar.isLeap ? "闰" : ""}${lunarMonths[lunar.month - 1]}月`;
  return lunarDays[lunar.day - 1];
}

function formatLunarFull(lunar) {
  return `${lunar.year} 年${lunar.isLeap ? "闰" : ""}${lunarMonths[lunar.month - 1]}月${lunarDays[lunar.day - 1]}`;
}

function fillSelect(select, start, end, formatter) {
  for (let value = start; value <= end; value += 1) {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = formatter(value);
    select.append(option);
  }
}

function loadPeople() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function savePeople() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

function getBirthdayType() {
  return document.querySelector("input[name='birthdayType']:checked").value;
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function emptyState() {
  return els.emptyStateTemplate.content.cloneNode(true);
}

function stripTime(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return stripTime(next);
}

function diffDays(a, b) {
  return Math.round((stripTime(b) - stripTime(a)) / 86400000);
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateInput(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
}

function formatGoogleDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
}

function formatIcsDate(date) {
  return formatGoogleDate(date);
}

function formatIcsDateTime(date) {
  return `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}T${String(date.getUTCHours()).padStart(2, "0")}${String(date.getUTCMinutes()).padStart(2, "0")}${String(date.getUTCSeconds()).padStart(2, "0")}Z`;
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
