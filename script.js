const mine = [
  { name: "Индонезия", y2024: 2310, y2025: 2600, hot: true },
  { name: "Филиппины", y2024: 354, y2025: 270, hot: false },
  { name: "Россия", y2024: 205, y2025: 200, hot: false },
  { name: "Н. Каледония", y2024: 116, y2025: 140, hot: false },
  { name: "Канада", y2024: 125, y2025: 140, hot: false },
  { name: "Китай", y2024: 115, y2025: 120, hot: false },
  { name: "Бразилия", y2024: 68, y2025: 70, hot: false },
  { name: "Австралия", y2024: 98, y2025: 45, hot: false },
  { name: "Прочие", y2024: 315, y2025: 300, hot: false },
];

const nf = new Intl.NumberFormat("ru-RU");
const bars = document.querySelector("#bars");
const worldEl = document.querySelector("#stat-world");
const worldLabel = document.querySelector("#stat-world-label");
const shareEl = document.querySelector("#stat-share");
const indoEl = document.querySelector("#stat-indo");
const yearButtons = document.querySelectorAll("[data-year]");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#site-nav");

function render(year) {
  const key = year === "2024" ? "y2024" : "y2025";
  const rows = mine
    .map((row) => ({ name: row.name, kt: row[key], hot: row.hot }))
    .sort((a, b) => b.kt - a.kt);
  const max = rows[0].kt;
  const total = rows.reduce((sum, row) => sum + row.kt, 0);
  const indo = rows.find((row) => row.hot);

  worldEl.textContent = year === "2025" ? "3,9 млн т" : "3,71 млн т";
  worldLabel.textContent = year === "2025" ? "оценка 2025" : "2024, сводка USGS";
  shareEl.textContent = "~" + Math.round((indo.kt / total) * 100) + "%";
  indoEl.textContent = "Индонезия, " + nf.format(indo.kt) + " тыс. т";

  bars.replaceChildren();
  for (const row of rows) {
    const line = document.createElement("div");
    line.className = "bar-row";
    const name = document.createElement("div");
    name.className = "bar-name";
    name.textContent = row.name + "  " + nf.format(row.kt);
    const track = document.createElement("div");
    track.className = "bar-track";
    const fill = document.createElement("span");
    fill.className = "bar-fill " + (row.hot ? "is-hot" : "is-dim");
    fill.style.width = Math.max(0.8, (row.kt / max) * 100) + "%";
    track.append(fill);
    line.append(name, track);
    bars.append(line);
  }

  yearButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.year === year ? "true" : "false");
  });
}

yearButtons.forEach((button) => {
  button.addEventListener("click", () => render(button.dataset.year));
});

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  menuBtn.textContent = open ? "Закрыть" : "Меню";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "Меню";
  });
});

render("2025");
