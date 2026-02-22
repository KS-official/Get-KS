// ==================== CUSTOM CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
const mouseGlow = document.getElementById('mouseGlow');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    mouseGlow.style.left = mouseX + 'px';
    mouseGlow.style.top = mouseY + 'px';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

const interactiveElements = document.querySelectorAll('a, button, [data-hover-3d], [data-tilt], .nav-link, input, textarea, .guide-step, .api-item, .preview-feature');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('hover');
    });
});

document.addEventListener('mousedown', () => {
    cursorFollower.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
    cursorFollower.classList.remove('clicking');
});

// ==================== 3D HOVER EFFECT ====================
const hover3DElements = document.querySelectorAll('[data-hover-3d]');

hover3DElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        
        el.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(500px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ==================== TILT EFFECT ====================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    const maxTilt = parseFloat(el.dataset.tiltMax) || 10;
    
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const glow = el.querySelector('.feature-glow');
        if (glow) {
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.transform = 'translate(-50%, -50%)';
        }
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        
        const glow = el.querySelector('.feature-glow');
        if (glow) {
            glow.style.left = '50%';
            glow.style.top = '0';
            glow.style.transform = 'translateX(-50%)';
        }
    });
});

// ==================== RIPPLE EFFECT ====================
const rippleElements = document.querySelectorAll('[data-ripple]');

rippleElements.forEach(el => {
    el.addEventListener('click', function(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== PARTICLES ====================
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        
        container.appendChild(particle);
    }
}

createParticles();

// ==================== SCROLL INDICATOR ====================
const scrollIndicator = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    } else {
        scrollIndicator.classList.remove('hidden');
    }
});

// ==================== HEADER SCROLL ====================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ==================== MOBILE MENU ====================
const mobileMenu = document.getElementById('mobileMenu');
const mobileNav = document.getElementById('mobileNav');

mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('show');
    const icon = mobileMenu.querySelector('i');
    icon.className = mobileNav.classList.contains('show') ? 'fas fa-times' : 'fas fa-bars';
});

document.querySelectorAll('.mobile-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('show');
        mobileMenu.querySelector('i').className = 'fas fa-bars';
    });
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== DOWNLOAD BUTTON ====================
document.querySelector('.download-btn').addEventListener('click', () => {
    showToast();
});

// ==================== TOAST ====================
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==================== API TOGGLE ====================
function toggleAPI() {
    const apiList = document.getElementById('apiList');
    const toggleBtn = document.querySelector('.api-toggle');
    
    apiList.classList.toggle('show');
    toggleBtn.classList.toggle('active');
    
    // Animate stat bars when opened
    if (apiList.classList.contains('show')) {
        setTimeout(() => {
            document.querySelectorAll('.stat-fill').forEach(fill => {
                const width = fill.dataset.width;
                fill.style.width = width + '%';
            });
        }, 100);
    } else {
        document.querySelectorAll('.stat-fill').forEach(fill => {
            fill.style.width = '0';
        });
    }
}

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            setTimeout(() => {
                entry.target.classList.add('tilt-ready');
            }, 800);
        }
    });
}, observerOptions);

const style = document.createElement('style');
style.textContent = `
    .feature-card, .download-info-card, .social-card, .section-header, .preview-container {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                    transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275),
                    border-color 0.3s, box-shadow 0.3s;
    }
    
    .feature-card.visible, .download-info-card.visible, 
    .social-card.visible, .section-header.visible, .preview-container.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card.tilt-ready,
    .download-info-card.tilt-ready,
    .social-card.tilt-ready,
    .preview-container.tilt-ready {
        transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .feature-card:nth-child(1) { transition-delay: 0s; }
    .feature-card:nth-child(2) { transition-delay: 0.1s; }
    .feature-card:nth-child(3) { transition-delay: 0.2s; }
    .feature-card:nth-child(4) { transition-delay: 0.3s; }
    .feature-card:nth-child(5) { transition-delay: 0.4s; }
    .feature-card:nth-child(6) { transition-delay: 0.5s; }
    
    .feature-card.tilt-ready { transition-delay: 0s !important; }
`;
document.head.appendChild(style);

document.querySelectorAll('.feature-card, .download-info-card, .social-card, .section-header, .preview-container').forEach(el => {
    observer.observe(el);
});

// ==================== PARALLAX ORBS ====================
let orbMouseX = 0;
let orbMouseY = 0;
let currentOrbX = 0;
let currentOrbY = 0;

document.addEventListener('mousemove', (e) => {
    orbMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    orbMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateOrbs() {
    currentOrbX += (orbMouseX - currentOrbX) * 0.03;
    currentOrbY += (orbMouseY - currentOrbY) * 0.03;
    
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 40;
        orb.style.transform = `translate(${currentOrbX * speed}px, ${currentOrbY * speed}px)`;
    });
    
    requestAnimationFrame(animateOrbs);
}

animateOrbs();

// ==================== INTERACTIVE SHAPES ====================
const shapes = document.querySelectorAll('.shape');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 15;
        const moveX = (x - 0.5) * speed;
        const moveY = (y - 0.5) * speed;
        shape.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX}deg)`;
    });
});

// ==================== IMAGE ERROR HANDLING ====================
const previewImage = document.getElementById('previewImage');
if (previewImage) {
    previewImage.addEventListener('error', function() {
        this.style.display = 'none';
        this.parentElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 400px; background: rgba(0,0,0,0.3); color: var(--text-muted);">
                <div style="text-align: center;">
                    <i class="fas fa-image" style="font-size: 60px; margin-bottom: 20px; opacity: 0.5;"></i>
                    <p>Image not found</p>
                    <p style="font-size: 13px; opacity: 0.6;">Place "KS.png" in the same folder</p>
                </div>
            </div>
        `;
    });
}

// ==================== INIT ====================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});
