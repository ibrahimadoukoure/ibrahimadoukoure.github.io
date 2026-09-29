
(() => {
  const langBtn = document.querySelector('.lang-toggle');
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const setLang = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-fr][data-en]').forEach(el => {
      el.textContent = el.dataset[lang] || el.textContent;
    });
    if (langBtn) langBtn.textContent = lang === 'fr' ? 'EN' : 'FR';
    localStorage.setItem('portfolio-lang', lang);
  };
  setLang(localStorage.getItem('portfolio-lang') || 'fr');
  langBtn?.addEventListener('click', () => setLang(document.documentElement.lang === 'fr' ? 'en' : 'fr'));
  menuBtn?.addEventListener('click', () => {
    nav?.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', nav?.classList.contains('open') ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.verification-page .doc-card');
  const groups = document.querySelectorAll('.doc-group');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(card => card.style.display = (f === 'all' || card.dataset.category === f) ? '' : 'none');
    groups.forEach(g => {
      if (f === 'all') g.style.display = '';
      else g.style.display = g.dataset.group === f ? '' : 'none';
    });
  }));
})();
