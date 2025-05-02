document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Lazy Loading optimizado para móvil
  const lazyLoadIframes = () => {
    const lazyIframes = document.querySelectorAll('iframe.lazy-iframe');
    
    if ('IntersectionObserver' in window) {
      const observerOptions = isMobile ? {
        rootMargin: '100px 0px',
        threshold: 0.01
      } : {
        rootMargin: '300px 0px',
        threshold: 0.1
      };

      const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.dataset.src;
            
            iframe.onload = () => {
              iframe.classList.add('loaded');
              // Elimina el placeholder después de cargar
              const container = iframe.parentElement;
              container.style.background = 'none';
              container.style.removeProperty('height');
            };
            
            iframeObserver.unobserve(iframe);
          }
        });
      }, observerOptions);

      // Carga los primeros 2 iframes inmediatamente en móvil
      if (isMobile) {
        const firstTwo = Array.from(lazyIframes).slice(0, 2);
        firstTwo.forEach(iframe => {
          iframe.src = iframe.dataset.src;
          iframeObserver.unobserve(iframe);
        });
        
        // Observa solo los iframes restantes
        Array.from(lazyIframes).slice(2).forEach(iframe => {
          iframeObserver.observe(iframe);
        });
      } else {
        lazyIframes.forEach(iframe => {
          iframeObserver.observe(iframe);
        });
      }
    } else {
      // Fallback para navegadores antiguos
      lazyIframes.forEach((iframe, index) => {
        setTimeout(() => {
          iframe.src = iframe.dataset.src;
        }, isMobile ? index * 300 : index * 100);
      });
    }
  };

  // Resto del código permanece igual...
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

  function handleSectionChange(btn) {
    document.querySelector('.section-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const sectionId = `${btn.dataset.section}-section`;
    document.querySelectorAll('main > section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  function handleSeriesChange(btn) {
    document.querySelector('.series-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const seriesId = `${btn.dataset.series}-series`;
    document.querySelectorAll('.series-subsection').forEach(subsection => {
      subsection.classList.add('hidden');
    });
    document.getElementById(seriesId).classList.remove('hidden');
  }
  
  // Inicialización optimizada
  if (document.fonts) {
    document.fonts.ready.then(() => {
      lazyLoadIframes();
    });
  } else {
    setTimeout(lazyLoadIframes, 500);
  }
});
