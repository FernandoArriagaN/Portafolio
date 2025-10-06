// Active navigation link
ScrollTrigger.batch('section', {
    onEnter: (elements) => {
        elements.forEach(section => {
            const id = section.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        });
    }
});



// Parallax effect
gsap.utils.toArray('.hero-content > *').forEach((element, index) => {
    gsap.to(element, {
        yPercent: -50 * (index + 1),
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// Mobile menu toggle
function createMobileMenu() {
    const nav = document.querySelector('nav');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Crear botón  móvil
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 1001;
    `;
    
    navContainer.appendChild(mobileMenuBtn);
    
    let isMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            gsap.to(navLinks, {
                display: 'flex',
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(navLinks, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    navLinks.style.display = 'none';
                }
            });
        }
    });
    
    // Responsive 
    ScrollTrigger.matchMedia({
        "(max-width: 768px)": function() {
            mobileMenuBtn.style.display = 'block';
            navLinks.style.display = 'none';
        },
        "(min-width: 769px)": function() {
            mobileMenuBtn.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    });
}
createMobileMenu();

// Scroll to top mejorado
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gradient-2);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(60, 19, 97, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide con GSAP
    ScrollTrigger.create({
        start: "top -300",
        end: 99999,
        onToggle: self => {
            if (self.isActive) {
                gsap.to(scrollBtn, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            } else {
                gsap.to(scrollBtn, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.3,
                    ease: "back.in(1.7)"
                });
            }
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: 0,
            ease: "power2.inOut"
        });
    });
}

// Initialize scroll to top button
createScrollToTop();

// Efectos interactividad
function initInteractiveEffects() {
    // Efecto de ondas al hacer clic
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
            transform: scale(0);
            pointer-events: none;
            z-index: 9999;
            width: 100px;
            height: 100px;
            left: ${e.clientX - 50}px;
            top: ${e.clientY - 50}px;
        `;
        
        document.body.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                ripple.remove();
            }
        });
    });
    
    // Efecto de flotación para las cards
    gsap.utils.toArray('.skill-card, .project-card').forEach(card => {
        gsap.set(card, {
            transformOrigin: "center center"
        });
        
        const tl = gsap.timeline({ paused: true });
        tl.to(card, {
            y: -10,
            rotationY: 5,
            rotationX: 5,
            duration: 0.3,
            ease: "power2.out"
        });
        
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
    });
    
    // Efecto de partículas al hacer hover en botones
    document.querySelectorAll('.cta-button, .submit-btn , .cta-button-Cv' ).forEach(button => {
        button.addEventListener('mouseenter', function() {
            for(let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: rgba(139, 92, 246, 0.8);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 1;
                    `;
                    
                    this.appendChild(particle);
                    
                    gsap.fromTo(particle, 
                        {
                            x: this.offsetWidth / 2,
                            y: this.offsetHeight / 2,
                            scale: 0
                        },
                        {
                            x: (Math.random() - 0.5) * 100,
                            y: (Math.random() - 0.5) * 100,
                            scale: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            onComplete: () => {
                                particle.remove();
                            }
                        }
                    );
                }, i * 100);
            }
        });
    });
}

// Inicializar efectos interactivos
initInteractiveEffects();

function optimizePerformance() {
    // eventos de mouse
    let mouseTimeout;
    document.addEventListener('mousemove', function(e) {
        if (mouseTimeout) return;
        mouseTimeout = setTimeout(() => {
            mouseTimeout = null;
        }, 16); 
    });
    

    const imagePreloader = () => {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    };
    
    imagePreloader();
}

// Inicializar optimizaciones
optimizePerformance();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power2.inOut"
            });
        }
    });
});

// Navbar background on scroll
gsap.to('nav', {
    backgroundColor: 'rgba(10, 10, 31, 0.98)',
    borderBottomColor: 'rgba(139, 92, 246, 0.2)',
    duration: 0.3,
    scrollTrigger: {
        trigger: 'body',
        start: 'top -100px',
        end: 'top -100px',
        toggleActions: 'play none none reverse'
    }
});




// Registrar ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Variables globales
let particles = [];
let canvas, ctx;
let mouseX = 0, mouseY = 0;

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initCursorEffects();
    initGSAPAnimations();
    initScrollAnimations();
});

// Sistema de partículas 
function initParticles() {
    canvas = document.getElementById('particlesCanvas');
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear partículas
    for(let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            color: `hsla(${270 + Math.random() * 60}, 80%, 70%, ${Math.random() * 0.8 + 0.2})`
        });
    }
    
    animateParticles();
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Interacción con el mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x -= dx * force * 0.01;
            particle.y -= dy * force * 0.01;
        }
        
        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Mantener dentro de los límites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        // Conectar partículas cercanas
        for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];
            const dist = Math.sqrt((particle.x - other.x) ** 2 + (particle.y - other.y) ** 2);
            
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
        
        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Efecto de brillo
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, 0.1)`;
        ctx.fill();
    });
    
    requestAnimationFrame(animateParticles);
}

//Efecto de cursor pixelado 
function initCursorEffects() {
    const cursorFollower = document.querySelector('.cursor-follower');
    let trails = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Cursor principal
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.15,
            ease: "power2.out"
        });
        
        // Crear pixeles de rastro
        if (Math.random() > 0.7) {
            createPixelTrail(e.clientX, e.clientY);
        }
    });
    
    // Efectos hover 
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursorFollower, {
                scale: 1.5,
                backgroundColor: 'rgba(168, 139, 250, 1)',
                duration: 0.3
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorFollower, {
                scale: 1,
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                duration: 0.3
            });
        });
    });
}

function createPixelTrail(x, y) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel-trail';
    pixel.style.left = x + (Math.random() - 0.5) * 20 + 'px';
    pixel.style.top = y + (Math.random() - 0.5) * 20 + 'px';
    
    // Variaciones de color
    const colors = [
        'rgba(139, 92, 246, 0.8)',
        'rgba(168, 139, 250, 0.8)',
        'rgba(196, 181, 253, 0.8)',
        'rgba(109, 40, 217, 0.8)'
    ];
    pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    document.body.appendChild(pixel);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (pixel.parentNode) {
            pixel.parentNode.removeChild(pixel);
        }
    }, 1000);
}


function initGSAPAnimations() {
    // Timeline para el hero
    const heroTL = gsap.timeline();
    
    heroTL
        .from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.5")
        .from('.cta-button', {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3");
    
}

// Animaciones de scroll 
function initScrollAnimations() {
    // Animaciones para las cards
    gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.fromTo(card, 
            {
                y: 100,
                opacity: 0,
                rotation: 5
            },
            {
                y: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animaciones para proyectos
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            {
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                rotation: index % 2 === 0 ? -5 : 5
            },
            {
                x: 0,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Animación parallax para el hero
    gsap.to('.particles-container', {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Animación para títulos 
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            {
                y: 50,
                opacity: 0,
                scale: 0.8
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Form submission para Netlify
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    
    // Enviar a Netlify
    fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        // Mensaje de éxito
        alert('¡Gracias por tu mensaje! Te contactaré pronto.');
        form.reset();
    
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '¡Enviado!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    })
    .catch((error) => {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
        console.error('Error:', error);
    });
});

// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link highlight
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});



// Parallax effect para titulo
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});



// Scroll to top button
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--purple-600);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
        } else {
            scrollBtn.style.opacity = '0';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
createScrollToTop();

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScrollHandler = debounce(function() {
}, 10);


window.addEventListener('scroll', debouncedScrollHandler);