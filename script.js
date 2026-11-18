(function () {
  const ES = window.I18N_ES || {};
  const nodes = document.querySelectorAll("[data-i18n]");
  const EN = {};
  nodes.forEach((el) => (EN[el.dataset.i18n] = el.textContent));

  const toggle = document.getElementById("lang-toggle");

  function setLang(lang) {
    const dict = lang === "es" ? ES : EN;
    nodes.forEach((el) => {
      const val = dict[el.dataset.i18n];
      if (val) el.textContent = val;
    });
    document.documentElement.lang = lang;
    toggle.textContent = lang === "es" ? "EN" : "ES";
    toggle.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
    document.title = lang === "es"
      ? "Eugenio Santisteban — Ingeniero de Datos"
      : "Eugenio Santisteban — Data Engineer";
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  let initial = "en";
  const param = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (param === "es" || param === "en") initial = param;
  else if (saved) initial = saved;
  else if ((navigator.language || "").toLowerCase().startsWith("es")) initial = "es";

  setLang(initial);
  toggle.addEventListener("click", () =>
    setLang(document.documentElement.lang === "es" ? "en" : "es")
  );

  document.getElementById("year").textContent = new Date().getFullYear();
})();
