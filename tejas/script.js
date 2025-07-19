// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// EmailJS

function sendEmail(){
    let params ={
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    }
    emailjs.send('service_no116tb', 'template_xjqj9vb', params)
    .then(function(res){
        alert('Message Sent Successfully');
    })
    .catch(function(error){})
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
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

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Add your form submission logic here
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Example: Send data to server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Message sent successfully!');
    contactForm.reset();
});

// Skill Cards Animation
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to the name
const nameElement = document.querySelector('.name');
const name = nameElement.textContent;
nameElement.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < name.length) {
        nameElement.textContent += name.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add parallax effect to tech circle
const techCircle = document.querySelector('.tech-circle');

window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    techCircle.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Gaming shockwave effect on link click

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const shockwave = document.createElement('div');
        shockwave.className = 'shockwave';
        shockwave.style.left = (e.clientX - 20) + 'px';
        shockwave.style.top = (e.clientY - 20) + 'px';
        document.body.appendChild(shockwave);
        setTimeout(() => {
            shockwave.remove();
        }, 400);
    });
});



function handleStatsAnimation() {
    const stats = document.querySelectorAll('.stat-item .number');
    stats.forEach(stat => {
        if (!stat.classList.contains('animated')) {
            const value = parseInt(stat.textContent);
            const suffix = stat.textContent.replace(/\d+/g, '');
            stat.dataset.suffix = suffix;
            animateCounter(stat, value);
            stat.classList.add('animated');
        }
    });
}

const aboutSection = document.querySelector('#about');
let statsAnimated = false;
window.addEventListener('scroll', () => {
    const rect = aboutSection.getBoundingClientRect();
    if (!statsAnimated && rect.top < window.innerHeight && rect.bottom > 0) {
        handleStatsAnimation();
        statsAnimated = true;
    }
});

// 3D Card Tilt Effect
function handleTilt(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });
}
document.querySelectorAll('.skill-card, .project-card').forEach(handleTilt);

// Bullet shot effect on card hover with sound
function addBulletImpact(card) {
    card.addEventListener('mouseenter', (e) => {
        // Remove any existing impacts
        card.querySelectorAll('.bullet-impact').forEach(el => el.remove());
        // Pick a random spot within the card
        const rect = card.getBoundingClientRect();
        const x = Math.random() * (rect.width - 40) + 20;
        const y = Math.random() * (rect.height - 40) + 20;
        const impact = document.createElement('div');
        impact.className = 'bullet-impact';
        impact.style.left = `${x}px`;
        impact.style.top = `${y}px`;
        card.appendChild(impact);
        // Play shot sound
        const audio = new Audio('sounds/gun.mp3');
        audio.volume = 0.25;
        audio.play();
        setTimeout(() => impact.remove(), 600);
    });
    card.addEventListener('mouseleave', () => {
        card.querySelectorAll('.bullet-impact').forEach(el => el.remove());
    });
}
document.querySelectorAll('.skill-card, .project-card').forEach(addBulletImpact);

// Play sound effect on all links and buttons
function addLinkButtonSound() {
    const playSound = () => {
        const audio = new Audio('sounds/button_link.mp3');
        audio.volume = 1.0;
        audio.play();
    };
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', playSound);
    });
}
addLinkButtonSound();

// Effect toggle button logic
const effectToggle = document.getElementById('effectToggle');
const effectIcon = document.getElementById('effectIcon');
let effectState = 0; // 0: default, 1: rain
let rainAudio = null;

function createRain() {
    if (document.getElementById('rainEffect')) return;
    const rain = document.createElement('div');
    rain.id = 'rainEffect';
    rain.style.position = 'fixed';
    rain.style.left = 0;
    rain.style.top = 0;
    rain.style.width = '100vw';
    rain.style.height = '100vh';
    rain.style.pointerEvents = 'none';
    rain.style.zIndex = 9999;
    rain.innerHTML = Array.from({length: 80}).map(() => `<div class="raindrop"></div>`).join('');
    document.body.appendChild(rain);
}

function removeRain() {
    const rain = document.getElementById('rainEffect');
    if (rain) rain.remove();
}

function playRainSound() {
    if (rainAudio) { rainAudio.pause(); rainAudio = null; }
    rainAudio = new Audio('sounds/rain.mp3');
    rainAudio.loop = true;
    rainAudio.volume = 1.0;
    rainAudio.play();
}
function stopRainSound() {
    if (rainAudio) { rainAudio.pause(); rainAudio = null; }
}

function setEffect(state) {
    // Reset all
    removeRain();
    stopRainSound();
    if (state === 1) {
        // Rain
        effectIcon.className = 'fas fa-cloud-showers-heavy';
        createRain();
        playRainSound();
    } else {
        // Default
        effectIcon.className = 'fas fa-cloud';
    }
}

effectToggle.addEventListener('click', () => {
    effectState = (effectState + 1) % 2;
    setEffect(effectState);
});

// Rain drop CSS
const rainStyle = document.createElement('style');
rainStyle.innerHTML = `
#rainEffect { pointer-events: none; }
.raindrop {
  position: absolute;
  top: -10vh;
  width: 2px;
  height: 40px;
  background: linear-gradient(180deg, #94D2BD 0%, #0A9396 100%);
  opacity: 0.5;
  border-radius: 1px;
  animation: raindrop-fall 1.2s linear infinite;
  left: calc(100vw * var(--x));
  animation-delay: var(--delay);
}
@keyframes raindrop-fall {
  0% { top: -10vh; opacity: 0.5; }
  80% { opacity: 0.5; }
  100% { top: 110vh; opacity: 0; }
}
#rainEffect .raindrop { --x: 0.1; --delay: 0s; }
`;
document.head.appendChild(rainStyle);

// Randomize raindrop positions and delays after rain is created
const observer = new MutationObserver(() => {
    const drops = document.querySelectorAll('#rainEffect .raindrop');
    drops.forEach(drop => {
        drop.style.setProperty('--x', Math.random());
        drop.style.setProperty('--delay', `${Math.random()}s`);
    });
});
observer.observe(document.body, { childList: true });

// Console boot up overlay
window.addEventListener('DOMContentLoaded', () => {
    const boot = document.getElementById('bootOverlay');
    setTimeout(() => {
        boot.classList.add('hide');
        setTimeout(() => boot.style.display = 'none', 800);
    }, 2600);

    // Show boost popup for 4 seconds
    const boostPopup = document.getElementById('boostPopup');
    if (boostPopup) {
        setTimeout(() => {
            boostPopup.classList.add('show');
            setTimeout(() => boostPopup.classList.remove('show'), 4000);
        }, 400); // Show after a short delay so it appears after boot
    }
});



// Music play/pause logic
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
let musicAudio = null;
let musicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (!musicAudio) {
        musicAudio = new Audio('sounds/Onmywway.mp3');
        musicAudio.loop = true;
        musicAudio.volume = 0.5;
    }
    if (musicPlaying) {
        musicAudio.pause();
        musicToggle.classList.remove('active');
        musicPlaying = false;
    } else {
        musicAudio.play();
        musicToggle.classList.add('active');
        musicPlaying = true;
    }
}); 
