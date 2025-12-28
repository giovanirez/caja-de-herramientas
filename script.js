document.addEventListener('DOMContentLoaded', () => {
    
    // Funcionalidade do FAQ (Accordion)
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Fecha outros itens abertos (opcional, para manter um por vez)
            const currentActive = document.querySelector('.accordion-header.active');
            if (currentActive && currentActive !== header) {
                currentActive.classList.remove('active');
                currentActive.nextElementSibling.style.maxHeight = null;
            }

            // Alterna o estado atual
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Scroll Suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Offset para não colar no topo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação Fade-In ao rolar a página
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Dispara quando 10% do elemento é visível
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Inicialização da animação do Hero para garantir que apareça logo no carregamento
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 300);
});