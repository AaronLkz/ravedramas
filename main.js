document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  let currentSection = 'series'; // Sección por defecto
  let loadedSections = new Set(); // Para registrar qué secciones ya cargaron sus iframes

  // Función mejorada de carga de iframes con lazy loading
  const loadSectionIframes = (sectionId) => {
    // Si ya cargamos esta sección, no hacer nada
    if (loadedSections.has(sectionId)) return;
    
    const section = document.getElementById(sectionId);
    if (!section) return;

    const lazyIframes = section.querySelectorAll('iframe.lazy-iframe');
    
    // Carga inmediata de los primeros 3 iframes de la sección
    const initialLoadCount = Math.min(3, lazyIframes.length);
    for (let i = 0; i < initialLoadCount; i++) {
      loadIframe(lazyIframes[i]);
    }

    // Lazy loading para el resto con IntersectionObserver
    if (lazyIframes.length > initialLoadCount && 'IntersectionObserver' in window) {
      const remainingIframes = Array.from(lazyIframes).slice(initialLoadCount);
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadIframe(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '200px',
        threshold: 0.1
      });

      remainingIframes.forEach(iframe => iframeObserver.observe(iframe));
    }

    // Marcamos la sección como cargada
    loadedSections.add(sectionId);
  };

  // Función auxiliar para cargar un iframe individual
  const loadIframe = (iframe) => {
    if (iframe.src) return; // Si ya está cargado, no hacer nada
    
    const container = iframe.parentElement;
    iframe.src = iframe.dataset.src;
    
    iframe.onload = () => {
      iframe.classList.add('loaded');
      container.style.background = 'none';
      container.style.removeProperty('position');
      container.style.removeProperty('height');
    };
  };

  // Handler de cambio de sección mejorado
  function handleSectionChange(btn) {
    document.querySelector('.section-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const newSection = `${btn.dataset.section}-section`;
    document.querySelectorAll('main > section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(newSection).classList.remove('hidden');
    
    // Cargar los iframes de la nueva sección
    loadSectionIframes(newSection);
    currentSection = newSection;
  }

  // Handler de cambio de serie
  function handleSeriesChange(btn) {
    document.querySelector('.series-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const seriesId = `${btn.dataset.series}-series`;
    document.querySelectorAll('.series-subsection').forEach(subsection => {
      subsection.classList.add('hidden');
    });
    document.getElementById(seriesId).classList.remove('hidden');
    
    // Cargar los iframes de la subsección de serie si no están cargados
    loadSectionIframes(seriesId);
  }

  // [El resto del código se mantiene igual]
  container.addEventListener('click', (e) => {
    const sectionBtn = e.target.closest('.section-btn');
    const seriesBtn = e.target.closest('.series-btn');
    const backToTop = e.target.closest('.back-to-top');
    
    if (sectionBtn) handleSectionChange(sectionBtn);
    if (seriesBtn) handleSeriesChange(seriesBtn);
    if (backToTop) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
  
  window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  // Inicialización: cargar solo la sección activa al inicio
  loadSectionIframes(`${currentSection}-section`);
});
