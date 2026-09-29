(() => {
  const root = document.documentElement;
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('.nav');
  const langBtn = document.querySelector('[data-lang-toggle]');
  const texts = [...document.querySelectorAll('[data-fr][data-en]')];
  const params = new URLSearchParams(location.search);
  let lang = params.get('lang') === 'en' ? 'en' : (localStorage.getItem('portfolio-lang') || 'fr');
  if (!['fr','en'].includes(lang)) lang='fr';
  function applyLang(){
    root.lang = lang;
    texts.forEach(el => { el.textContent = el.dataset[lang]; });
    if (langBtn) langBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
    localStorage.setItem('portfolio-lang',lang);
  }
  applyLang();
  langBtn?.addEventListener('click', () => { lang = lang === 'fr' ? 'en' : 'fr'; applyLang(); });
  menuBtn?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false'); }));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
