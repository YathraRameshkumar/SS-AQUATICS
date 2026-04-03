// Initialize Lenis for Smooth Scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initial Loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.progress');
    
    gsap.to(progressBar, {
        width: '100%',
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 1,
                pointerEvents: 'none',
                onComplete: () => {
                    initAnimations();
                }
            });
        }
    });
});

// Animations Init
function initAnimations() {
    // Parallax Hero
    gsap.to(".parallax-bg", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
        y: "20%",
        scale: 1.1
    });

    // Fade-ins for sections
    const fadeElements = document.querySelectorAll('.hero-content > *, .section-header, .variety-card, .shipping-content, .contact-info, .touch-form-container');

    fadeElements.forEach((el, index) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "expo.out",
            delay: index % 3 * 0.1 // Staggered effect for cards
        });
    });

    // Navbar Scroll Class
    ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
            const nav = document.querySelector('.navbar');
            if (self.direction === 1) {
                nav.classList.add('scrolled');
            } else if (self.scroll() < 50) {
                nav.classList.remove('scrolled');
            }
        }
    });

    // Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.variety-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            cards.forEach(card => {
                if(filter === 'all' || card.dataset.category === filter) {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.5, display: 'block' });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.8, duration: 0.5, display: 'none' });
                }
            });
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.innerText;
        gsap.from(counter, {
            scrollTrigger: {
                trigger: counter,
                start: "top 90%",
            },
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
        });
    });
}

// Contact Form WhatsApp Redirect
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect Form Data
        const name = contactForm.querySelector('input[placeholder="Full Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Email Address"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Your WhatsApp Number
        const phone = '918610604518';
        
        // Construct WhatsApp Message
        const text = `🌊 *AQUATIC VISIONS INQUIRY*%0A%0A` +
                     `*Name:* ${name}%0A` +
                     `*Email:* ${email}%0A` +
                     `*Inquiry:* ${message}`;
        
        // WhatsApp API URL
        const waUrl = `https://wa.me/${phone}?text=${text}`;
        
        // Redirect to WhatsApp
        window.open(waUrl, '_blank');
        
        // Visual Feedback
        const btn = contactForm.querySelector('.submit-btn');
        btn.innerHTML = 'OPENING WHATSAPP...';
        btn.style.background = '#25d366';
        
        setTimeout(() => {
            btn.innerHTML = 'SCHEDULE DIVE';
            btn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}
