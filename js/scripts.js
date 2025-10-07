// js/script.js

// Animated code background
(function() {
    const canvas = document.getElementById('code-animation');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Code snippets to display
    const codeChars = ['0', '1', '{', '}', '<', '>', '/', '=', ';', '(', ')', '[', ']', 'def', 'class', 'function', 'const', 'let', 'var', 'if', 'else', 'for', 'while', 'return', 'import', 'from', 'async', 'await'];
    
    // Particle class for falling code
    class CodeParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.speed = 0.5 + Math.random() * 1.5;
            this.char = codeChars[Math.floor(Math.random() * codeChars.length)];
            this.size = 10 + Math.random() * 6;
            this.opacity = 0.3 + Math.random() * 0.7;
        }
        
        update() {
            this.y += this.speed;
            
            // Reset to top when particle goes off screen
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
                this.char = codeChars[Math.floor(Math.random() * codeChars.length)];
            }
        }
        
        draw() {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
            ctx.font = `${this.size}px "JetBrains Mono", monospace`;
            ctx.fillText(this.char, this.x, this.y);
        }
    }
    
    // Create particles
    const particleCount = 50;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new CodeParticle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();

// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Simple animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item');
    animateElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});