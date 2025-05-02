document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  
  // Improved Lazy Loading
  const lazyLoadIframes = () => {
    const lazyIframes = document.querySelectorAll('iframe.lazy-iframe');
    
    if ('IntersectionObserver' in window) {
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target;
            const container = iframe.parentElement;
            
            iframe.src = iframe.dataset.src;
            
            iframe.onload = () => {
              iframe.classList.add('loaded');
              // Remove container styles after load
              container.style.background = 'none';
              container.style.removeProperty('position');
              container.style.removeProperty('height');
            };
            
            observer.unobserve(iframe);
          }
        });
      }, {
        rootMargin: '200px',
        threshold: 0.1
      });

      lazyIframes.forEach(iframe => {
        iframeObserver.observe(iframe);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyIframes.forEach(iframe => {
        iframe.src = iframe.dataset.src;
      });
    }
  };

  // Delegación de eventos
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
  
  // Scroll event for back-to-top button
  window.addEventListener('scroll', () => {
    const backToTop = document.querySelector('.back-to-top');
    backToTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  });

  // Section change handler
  function handleSectionChange(btn) {
    document.querySelector('.section-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const sectionId = `${btn.dataset.section}-section`;
    document.querySelectorAll('main > section').forEach(section => {
      section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  // Series change handler
  function handleSeriesChange(btn) {
    document.querySelector('.series-btn.active')?.classList.remove('active');
    btn.classList.add('active');
    
    const seriesId = `${btn.dataset.series}-series`;
    document.querySelectorAll('.series-subsection').forEach(subsection => {
      subsection.classList.add('hidden');
    });
    document.getElementById(seriesId).classList.remove('hidden');
  }
  
  // Initialize lazy loading
  lazyLoadIframes();
  
// Modifica la función lazyLoadIframes
const lazyLoadIframes = () => {
  const lazyIframes = document.querySelectorAll('iframe.lazy-iframe');
  const isMobile = window.innerWidth <= 768;

  if ('IntersectionObserver' in window) {
    const observerOptions = isMobile ? {
      rootMargin: '50px',
      threshold: 0.01
    } : {
      rootMargin: '200px',
      threshold: 0.1
    };

    const iframeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.dataset.src;
          
          iframe.onload = () => {
            iframe.classList.add('loaded');
            iframe.parentElement.style.background = 'none';
          };
          
          iframeObserver.unobserve(iframe);
        }
      });
    }, observerOptions);

    lazyIframes.forEach(iframe => {
      iframeObserver.observe(iframe);
    });
  } else {
    // Fallback más ligero para móviles antiguos
    lazyIframes.forEach(iframe => {
      setTimeout(() => {
        iframe.src = iframe.dataset.src;
      }, 100);
    });
  }
};
