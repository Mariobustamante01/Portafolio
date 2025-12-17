document.addEventListener("DOMContentLoaded", function () {
  // === MODO CLARO/OSCURO ===
  const toggleSwitch = document.querySelector(".toggle-switch");
  const circle = toggleSwitch.querySelector(".switch-circle");
  const icon = circle.querySelector("i");

  const setTheme = (dark) => {
    document.body.classList.toggle("dark-mode", dark);
    toggleSwitch.classList.toggle("dark", dark);
    icon.className = dark ? "fa-solid fa-moon" : "fa-solid fa-sun";
    localStorage.setItem("theme", dark ? "dark" : "light");
  };

  const savedTheme = localStorage.getItem("theme");
  setTheme(savedTheme === "dark");

  toggleSwitch.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    setTheme(isDark);
  });

  // === ÍCONO PORTAFOLIO ROTATIVO ===
  const portfolioIcon = document.getElementById("portfolio-icon");
  const icons = ["fa-briefcase", "fa-pen-nib", "fa-code", "fa-palette", "fa-laptop-code"];
  let index = 0;
  const interval = setInterval(() => {
    index++;
    if (index < icons.length) {
      portfolioIcon.classList.add("animate");
      setTimeout(() => {
        portfolioIcon.className = `fa-solid ${icons[index]} animate`;
      }, 100);
      setTimeout(() => {
        portfolioIcon.classList.remove("animate");
      }, 500);
    } else {
      clearInterval(interval);
      portfolioIcon.className = "fa-solid fa-briefcase";
    }
  }, 700);

  // === SVG CONNECTOR ENTRE LAS TARJETAS ===
  function drawConnectorLines() {
    const pins = document.querySelectorAll('.card .pin');
    const path = document.querySelector('.connector path');

    if (pins.length < 2 || !path) return;

    let d = "";
    for (let i = 0; i < pins.length - 1; i++) {
      const start = pins[i].getBoundingClientRect();
      const end = pins[i + 1].getBoundingClientRect();
      const container = document.querySelector('.card-container').getBoundingClientRect();

      const startX = start.left + start.width / 2 - container.left;
      const startY = start.top + start.height / 2 - container.top;

      const endX = end.left + end.width / 2 - container.left;
      const endY = end.top + end.height / 2 - container.top;

      d += `M${startX},${startY} L${endX},${endY} `;
    }

    path.setAttribute("d", d);
  }

  window.addEventListener('load', drawConnectorLines);
  window.addEventListener('resize', drawConnectorLines);
});
