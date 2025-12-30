// ============================================
// Main JavaScript File
// ============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================================
// Theme Toggle
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme or default to light
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ============================================
// Navigation
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Add shadow to navbar on scroll
    if (scrollPos > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Load Skills
// ============================================

function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';

    Object.values(skillsData).forEach(category => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';
        skillCard.setAttribute('data-aos', 'fade-up');

        const skillsHTML = category.skills.map(skill => 
            `<span class="skill-tag">${skill}</span>`
        ).join('');

        skillCard.innerHTML = `
            <h3><i class="${category.icon}"></i> ${category.title}</h3>
            <div class="skill-tags">${skillsHTML}</div>
        `;

        skillsGrid.appendChild(skillCard);
    });
}

// ============================================
// Load Projects
// ============================================

function loadProjects() {
    const projectsFeed = document.getElementById('projectsFeed');
    projectsFeed.innerHTML = '';

    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-aos', 'fade-up');
        projectCard.style.animationDelay = `${index * 0.1}s`;

        const techStackHTML = project.techStack.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');

        const imageHTML = project.image 
            ? `<img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">`
            : `<div class="project-image-placeholder"><i class="fas fa-image"></i></div>`;

        const actionsHTML = `
            ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fab fa-github"></i> View Code</a>` : ''}
            ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            ${project.paper ? `<a href="${project.paper}" target="_blank" rel="noopener noreferrer" class="btn btn-outline"><i class="fas fa-file-pdf"></i> Research Paper</a>` : ''}
        `;

        projectCard.innerHTML = `
            <div class="project-image-container">
                ${imageHTML}
            </div>
            <div class="project-content">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-category">${project.category}</span>
                    </div>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">${techStackHTML}</div>
                <div class="project-meta">
                    <span><i class="fas fa-calendar"></i> ${project.date}</span>
                    <span><i class="fas fa-check-circle"></i> ${project.status}</span>
                </div>
                <div class="project-actions">
                    ${actionsHTML}
                </div>
            </div>
        `;

        projectsFeed.appendChild(projectCard);
    });
}

// ============================================
// Load Research Papers
// ============================================

function loadResearch() {
    const researchGrid = document.getElementById('researchGrid');
    researchGrid.innerHTML = '';

    researchData.forEach((research, index) => {
        const researchCard = document.createElement('div');
        researchCard.className = 'research-card';
        researchCard.setAttribute('data-aos', 'fade-up');
        researchCard.style.animationDelay = `${index * 0.1}s`;

        researchCard.innerHTML = `
            <h3>${research.title}</h3>
            <p class="research-conference"><i class="fas fa-university"></i> ${research.conference} (${research.year})</p>
            <p class="research-abstract">${research.abstract}</p>
            <div class="research-links">
                <a href="${research.pdf}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <i class="fas fa-file-pdf"></i> Read Paper
                </a>
            </div>
        `;

        researchGrid.appendChild(researchCard);
    });
}

// ============================================
// Load Certifications
// ============================================

function loadCertifications() {
    const certificationsGrid = document.getElementById('certificationsGrid');
    certificationsGrid.innerHTML = '';

    certificationsData.forEach((cert, index) => {
        const certCard = document.createElement('div');
        certCard.className = 'certificate-card';
        certCard.setAttribute('data-aos', 'fade-up');
        certCard.style.animationDelay = `${index * 0.1}s`;

        certCard.innerHTML = `
            <img src="${cert.image}" alt="${cert.title}" class="certificate-image" loading="lazy">
            <div class="certificate-content">
                <h3 class="certificate-title">${cert.title}</h3>
                <p class="certificate-issuer">${cert.issuer}</p>
                <p class="certificate-year">${cert.year}</p>
            </div>
        `;

        // Add click event to open modal
        certCard.addEventListener('click', () => {
            openImageModal(cert.image, cert.title);
        });

        certificationsGrid.appendChild(certCard);
    });
}

// ============================================
// Load Timeline
// ============================================

function loadTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    timelineContainer.innerHTML = '';

    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');

        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <p class="timeline-date">${item.date}</p>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-organization" style="color: var(--accent-primary); margin-bottom: 0.5rem; font-weight: 500;">${item.organization}</p>
                <p class="timeline-description">${item.description}</p>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });
}

// ============================================
// Image Modal
// ============================================

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

function openImageModal(imageSrc, caption) {
    modal.style.display = 'block';
    modalImage.src = imageSrc;
    modalCaption.textContent = caption;
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeImageModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeImageModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeImageModal();
    }
});

// ============================================
// Contact Form
// ============================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // In a real application, you would send this to a backend
    // For now, we'll just show an alert
    alert('Thank you for your message! In a production environment, this would be sent to a backend server.\n\n' +
          `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`);
    
    // Reset form
    contactForm.reset();
});

// ============================================
// Update Copyright Year
// ============================================

document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
    loadResearch();
    loadCertifications();
    loadTimeline();
});

// ============================================
// Lazy Loading Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

