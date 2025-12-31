// ============================================
// Firebase Imports
// ============================================

import {
    collection,
    getDocs
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  
  // ============================================
  // AOS Init
  // ============================================
  
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
  
  const currentTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fa fa-sun' : 'fa fa-moon';
  }
  
  // ============================================
  // Navigation
  // ============================================
  
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // ============================================
  // LOAD PROJECTS FROM FIREBASE (IMPORTANT)
  // ============================================
  
  async function loadProjects() {
    const projectsFeed = document.getElementById('projectsFeed');
    projectsFeed.innerHTML = '';
  
    const snapshot = await getDocs(collection(window.db, "projects"));
    let index = 0;
  
    snapshot.forEach(doc => {
      const p = doc.data();
  
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-aos', 'fade-up');
      card.style.animationDelay = `${index * 0.1}s`;
      index++;
  
      card.innerHTML = `
        <div class="project-image-container">
          ${p.image ? `<img src="${p.image}" alt="${p.title}" class="project-image">`
            : `<div class="project-image-placeholder"><i class="fas fa-image"></i></div>`}
        </div>
  
        <div class="project-content">
          <h3>${p.title}</h3>
          <span class="project-category">${p.category}</span>
          <p>${p.description}</p>
  
          <div class="project-meta">
            <span><i class="fas fa-calendar"></i> ${p.date}</span>
          </div>
  
          <div class="project-actions">
            ${p.github ? `<a href="${p.github}" target="_blank" class="btn btn-secondary">
              <i class="fab fa-github"></i> GitHub</a>` : ''}
            ${p.demo ? `<a href="${p.demo}" target="_blank" class="btn btn-primary">
              <i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
          </div>
        </div>
      `;
  
      projectsFeed.appendChild(card);
    });
  
    AOS.refresh();
  }
  
  // ============================================
  // Admin Login Functions
  // ============================================

  function showAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
      modal.style.display = 'flex';
      const passwordInput = document.getElementById('adminPassword');
      if (passwordInput) passwordInput.focus();
    }
  }

  function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) modal.style.display = 'none';
  }

  function handleAdminLogin(event) {
    event.preventDefault();
    const password = document.getElementById('adminPassword').value;
    if (window.adminLogin && window.adminLogin(password)) {
      closeAdminLogin();
      const trigger = document.getElementById('adminLoginTrigger');
      if (trigger) trigger.style.display = 'none';
      location.reload();
    } else {
      alert('Incorrect password!');
      document.getElementById('adminPassword').value = '';
      document.getElementById('adminPassword').focus();
    }
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    const adminLoginModal = document.getElementById('adminLoginModal');
    const adminModal = document.getElementById('adminModal');
    
    if (e.target === adminLoginModal) {
      closeAdminLogin();
    }
    if (e.target === adminModal && window.closeAdminPanel) {
      window.closeAdminPanel();
    }
  });

  // ============================================
  // INIT
  // ============================================

  document.addEventListener('DOMContentLoaded', async () => {
    // Wait for Firebase to initialize
    if (window.db) {
      await loadProjects();
    } else {
      // Retry after a short delay if db isn't ready
      setTimeout(async () => {
        if (window.db) {
          await loadProjects();
        } else {
          console.error('Firebase not initialized');
        }
      }, 100);
    }

    // Initialize admin system
    if (typeof window.initAdmin === 'function') {
      window.initAdmin();
    }
    
    // Check for admin login trigger in URL
    if (window.location.search.includes('admin')) {
      showAdminLogin();
    }
    
    // Show admin login button if not logged in
    if (!window.isAdmin || !window.isAdmin()) {
      const trigger = document.getElementById('adminLoginTrigger');
      if (trigger) trigger.style.display = 'block';
    }
  });

  // Make admin functions globally available
  window.showAdminLogin = showAdminLogin;
  window.closeAdminLogin = closeAdminLogin;
  window.handleAdminLogin = handleAdminLogin;
  