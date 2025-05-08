document.addEventListener('DOMContentLoaded', function() {
  // Navegación entre secciones principales
  const sectionButtons = document.querySelectorAll('.nav-buttons .nav-btn[data-section]');
  sectionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSection = this.getAttribute('data-section');
      
      // Actualizar botones activos
      sectionButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Ocultar todas las secciones
      document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
      });
      
      // Mostrar sección objetivo
      document.getElementById(`${targetSection}-section`).classList.remove('hidden');
    });
  });
  
  // Navegación entre series
  const seriesButtons = document.querySelectorAll('.nav-buttons .nav-btn[data-series]');
  seriesButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetSeries = this.getAttribute('data-series');
      
      // Actualizar botones activos
      seriesButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Ocultar todos los contenidos de series
      document.querySelectorAll('.series-content').forEach(content => {
        content.classList.add('hidden');
      });
      
      // Mostrar contenido de la serie seleccionada
      document.getElementById(`${targetSeries}-series`).classList.remove('hidden');
    });
  });
  
  // Botón para volver arriba
  const backToTopButton = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
