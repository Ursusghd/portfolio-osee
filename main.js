/**
 * SNOW DIGITAL ECOSYSTEM - VERSION 2.1 "DYNAMIC IDENTITY"
 * CEO: BAMIDELE KEADEN OSÉE
 */

// 1. Particle System: SNOW 2.0
const canvas = document.getElementById('snow-particles');
const ctx = canvas.getContext('2d');
let particles = [];
let w, h;
const mouse = { x: -100, y: -100, radius: 150 };

function initParticles() {
    if (!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.8 + 0.2,
            opacity: Math.random() * 0.6 + 0.2,
            drift: Math.random() * 1 - 0.5,
            blur: Math.random() > 0.8 ? 2 : 0
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 5;
            p.y += Math.sin(angle) * force * 5;
        }

        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        p.y += p.speed;
        p.x += p.drift + Math.sin(Date.now() * 0.001) * 0.2;
        
        if (p.y > h) p.y = -10;
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;
    });
    requestAnimationFrame(drawParticles);
}

// 2. Identity Rotation System (n1 -> n2 -> n3)
const profileImg = document.getElementById('profile-img');
const images = ['/n1.jpeg', '/n2.jpeg', '/n3.jpeg'];
let currentImgIndex = 0;

function rotateIdentity() {
    if (!profileImg) return;
    
    // Add the soft crystal flip class
    profileImg.parentElement.classList.add('identity-flip');
    
    setTimeout(() => {
        currentImgIndex = (currentImgIndex + 1) % images.length;
        profileImg.src = images[currentImgIndex];
        
        // Remove class after animation to allow restart
        setTimeout(() => {
            profileImg.parentElement.classList.remove('identity-flip');
        }, 600);
    }, 300);
}

// Sync with CSS animation duration (4s for .scanning-bar)
setInterval(rotateIdentity, 4000);

// 3. Reveal System & Visibility Fix
const revealElements = document.querySelectorAll('[data-reveal]');
const loadingElements = document.querySelectorAll('.data-loading');
const originalContent = new Map();

loadingElements.forEach(el => {
    originalContent.set(el, el.textContent);
    el.textContent = ''; 
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Lower threshold and check if it's already past the top
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add('revealed');
            
            if (entry.target.getAttribute('data-reveal') === 'snow-build') {
                createCrystalBurst(entry.target);
            }

            const loadingTexts = entry.target.querySelectorAll('.data-loading');
            loadingTexts.forEach((el, i) => {
                if (el.textContent === '') simulateLoading(el, i);
            });
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

function createCrystalBurst(el) {
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
        const p = {
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            size: Math.random() * 4 + 1,
            speed: Math.random() * 2 + 1,
            opacity: 1,
            drift: Math.random() * 2 - 1
        };
        particles.push(p);
        setTimeout(() => {
            const idx = particles.indexOf(p);
            if (idx > -1) particles.splice(idx, 1);
        }, 800);
    }
}

function simulateLoading(el, index) {
    const text = originalContent.get(el);
    el.textContent = 'EXECUTING_CORE_PROTOCOL...';
    el.style.opacity = 0.4;
    setTimeout(() => {
        el.textContent = text;
        el.style.opacity = 1;
    }, 800 + (index * 200));
}

// 4. Initialization
function startSystem() {
    document.body.classList.remove('system-initializing');
    initParticles();
    drawParticles();
    
    // Force immediate check and periodic check for visibility
    const checkVisibility = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.95) {
                el.classList.add('revealed');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Initial check

    console.log("%c SNOW REFINED INTERFACE v2.2 - ACTIVE ", "background: #00F0FF; color: #080808; font-weight: bold;");
}

window.addEventListener('DOMContentLoaded', startSystem);
window.addEventListener('load', startSystem);
window.addEventListener('resize', initParticles);

// 5. Smooth Scroll & Interaction
const menuToggle = document.getElementById('menu-toggle');
const systemNav = document.getElementById('system-nav');

if (menuToggle && systemNav) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        systemNav.classList.toggle('active');
    });

    // Close menu when clicking a link
    systemNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            systemNav.classList.remove('active');
        });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const cursor = document.getElementById('custom-cursor');
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
    if (cursorGlow) {
        cursorGlow.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 600, fill: "forwards" });
    }
});
