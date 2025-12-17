document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     MODO CLARO / OSCURO
     =============================== */
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

  /* ===============================
     ICONO PORTAFOLIO ROTATIVO
     =============================== */
  const portfolioIcon = document.getElementById("portfolio-icon");
  const icons = [
    "fa-briefcase",
    "fa-pen-nib",
    "fa-code",
    "fa-palette",
    "fa-laptop-code"
  ];

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

  /* ===============================
     SVG CONNECTOR ENTRE TARJETAS
     =============================== */
  function drawConnectorLines() {
    const pins = document.querySelectorAll(".card .pin");
    const path = document.querySelector(".connector path");
    const container = document.querySelector(".card-container");

    if (!pins.length || !path || !container) return;

    const containerRect = container.getBoundingClientRect();
    let d = "";

    for (let i = 0; i < pins.length - 1; i++) {
      const start = pins[i].getBoundingClientRect();
      const end = pins[i + 1].getBoundingClientRect();

      const startX = start.left + start.width / 2 - containerRect.left;
      const startY = start.top + start.height / 2 - containerRect.top;

      const endX = end.left + end.width / 2 - containerRect.left;
      const endY = end.top + end.height / 2 - containerRect.top;

      d += `M${startX},${startY} L${endX},${endY} `;
    }

    path.setAttribute("d", d);
  }

  window.addEventListener("load", drawConnectorLines);
  window.addEventListener("resize", drawConnectorLines);

  /* ===============================
     HAMBURGER MENU (MOBILE)
     =============================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");

      // Bloquear scroll cuando menú está abierto
      document.body.style.overflow =
        navLinks.classList.contains("active") ? "hidden" : "";
    });

    // Cerrar menú al hacer click en un link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Cerrar menú al cambiar a desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 430) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

});

