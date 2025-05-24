document.addEventListener('DOMContentLoaded', function() {

    // Efecto de carga para las tarjetas
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.5s ease ${index * 0.1}s`;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    });
  
    // Efecto hover mejorado para enlaces
    const links = document.querySelectorAll('.content-link');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateX(5px)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateX(0)';
      });
    });
  });