document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.movies-filter-nav button');
  const sections = document.querySelectorAll('.movies-section');
  const todasSection = document.querySelector('.movies-section[data-section="todas"]');
  // Guarda los artículos originales por sección
  const articlesBySection = {};
  sections.forEach(section => {
    if (section.dataset.section !== "todas") {
      articlesBySection[section.dataset.section] = Array.from(section.children);
    }
  });

  function showSection(filter) {
    // Limpia la sección "todas"
    if (todasSection) todasSection.innerHTML = '';
    sections.forEach(section => section.classList.remove('active'));
    if (filter === 'todas') {
      // Mueve todos los artículos a la sección "todas"
      Object.values(articlesBySection).forEach(articles => {
        articles.forEach(article => todasSection.appendChild(article));
      });
      todasSection.classList.add('active');
    } else {
      // Devuelve los artículos a su sección original
      Object.entries(articlesBySection).forEach(([sectionName, articles]) => {
        const section = document.querySelector(`.movies-section[data-section="${sectionName}"]`);
        articles.forEach(article => section.appendChild(article));
      });
      // Muestra solo la sección filtrada
      const section = document.querySelector(`.movies-section[data-section="${filter}"]`);
      if (section) section.classList.add('active');
    }
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.movies-filter-nav button[data-filter="${filter}"]`).classList.add('active');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      showSection(btn.dataset.filter);
    });
  });

  // Mostrar todas al cargar
  showSection('todas');
});