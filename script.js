document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.movies-filter-nav button');
  const sections = document.querySelectorAll('.movies-section');

  function showSection(filter) {
    sections.forEach(section => {
      if (filter === 'todas' || section.dataset.section === filter) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
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