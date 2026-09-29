
(() => {
  const root = document.documentElement;
  const langBtn = document.querySelector('[data-lang-toggle]');
  const themeBtn = document.querySelector('[data-theme-toggle]');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav');

  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') === 'en' ? 'en' : (localStorage.getItem('portfolioLang') || 'fr');

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'fr';
    root.lang = lang;
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
      const value = el.dataset[lang];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-fr-aria][data-en-aria]').forEach(el => {
      el.setAttribute('aria-label', lang === 'fr' ? el.dataset.frAria : el.dataset.enAria);
    });
    if (langBtn) langBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
    localStorage.setItem('portfolioLang', lang);
  }
  applyLang(lang);
  if (langBtn) langBtn.addEventListener('click', () => applyLang(lang === 'fr' ? 'en' : 'fr'));

  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) root.dataset.theme = savedTheme;
  if (themeBtn) themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('portfolioTheme', root.dataset.theme);
  });

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded','false');
    }));
  }
  const topBtn = document.querySelector('.backtop');
  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
