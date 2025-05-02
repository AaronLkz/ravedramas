document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  
  // Cargar iframes lazy cuando son visibles
  const lazyLoadIframes = () => {
    const lazyIframes = [].slice.call(document.querySelectorAll("iframe.lazy-iframe"));
    
    if ("IntersectionObserver" in window) {
      let lazyIframeObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyIframe = entry.target;
            lazyIframe.src = lazyIframe.dataset.src;
            lazyIframeObserver.unobserve(lazyIframe);
          }
        });
      });

      lazyIframes.forEach(function(lazyIframe) {
        lazyIframeObserver.observe(lazyIframe);
      });
    }
  };
  
  // Delegación de eventos para toda la página
  container.addEventListener('click', (e) => {
    const sectionBtn = e.target.closest('.section-btn');
    const seriesBtn = e.target.closest('.series-btn');
    const backToTop = e.target.closest('.back-to-top');
    
    if (sectionBtn) {
      handleSectionChange(sectionBtn);
    }
    
    if (seriesBtn) {
      handleSeriesChange(seriesBtn);
    }

    if (backToTop) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
  
  // Mostrar/ocultar botón "Volver arriba" al hacer scroll
  window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
    } else {
      backToTop.style.display = 'none';
    }
  });

  // Manejar cambio de sección principal
  function handleSectionChange(btn) {
    const currentActive = document.querySelector('.section-btn.active');
    if (currentActive) currentActive.classList.remove('active');
    btn.classList.add('active');
    
    const sectionId = btn.dataset.section + '-section';
    document.querySelectorAll('main > section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  // Manejar cambio de serie
  function handleSeriesChange(btn) {
    const currentActive = document.querySelector('.series-btn.active');
    if (currentActive) currentActive.classList.remove('active');
    btn.classList.add('active');
    
    const seriesId = btn.dataset.series + '-series';
    document.querySelectorAll('.series-subsection').forEach(subsection => {
      subsection.classList.add('hidden');
    });
    document.getElementById(seriesId).classList.remove('hidden');
  }
  
  // Inicializar lazy loading de iframes
  lazyLoadIframes();
});
