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
    if (!projectsFeed) {
      console.error('Projects feed element not found');
      return;
    }

    // Show loading state
    projectsFeed.innerHTML = '<div style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Loading projects...</div>';

    try {
      // Verify Firebase is connected
      if (!window.db) {
        throw new Error('Firebase database not initialized. Check Firebase configuration.');
      }

      console.log('Fetching projects from Firebase...');
      const snapshot = await getDocs(collection(window.db, "projects"));
      
      // Clear loading state
      projectsFeed.innerHTML = '';

      if (snapshot.empty) {
        projectsFeed.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">No projects found in Firebase. Please add projects to your Firestore database.</div>';
        console.warn('No projects found in Firebase Firestore collection "projects"');
        return;
      }

      let index = 0;
      const projects = [];

      snapshot.forEach(doc => {
        const p = doc.data();
        projects.push(p);

        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-aos', 'fade-up');
        card.style.animationDelay = `${index * 0.1}s`;
        index++;

        // Sanitize HTML to prevent XSS
        const escapeHtml = (text) => {
          const div = document.createElement('div');
          div.textContent = text;
          return div.innerHTML;
        };

        card.innerHTML = `
          <div class="project-image-container">
            ${p.image ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title || 'Project')}" class="project-image" loading="lazy">`
              : `<div class="project-image-placeholder"><i class="fas fa-image"></i></div>`}
          </div>

          <div class="project-content">
            <h3>${escapeHtml(p.title || 'Untitled Project')}</h3>
            <span class="project-category">${escapeHtml(p.category || 'Uncategorized')}</span>
            <p>${escapeHtml(p.description || 'No description available.')}</p>

            <div class="project-meta">
              <span><i class="fas fa-calendar"></i> ${escapeHtml(p.date || 'N/A')}</span>
            </div>

            <div class="project-actions">
              ${p.github ? `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <i class="fab fa-github"></i> GitHub</a>` : ''}
              ${p.demo ? `<a href="${escapeHtml(p.demo)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
            </div>
          </div>
        `;

        projectsFeed.appendChild(card);
      });

      console.log(`Successfully loaded ${projects.length} project(s) from Firebase`);
      AOS.refresh();
    } catch (error) {
      console.error('Error loading projects from Firebase:', error);
      projectsFeed.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #dc3545;">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Error Loading Projects</h3>
          <p>${error.message}</p>
          <p style="font-size: 0.9rem; margin-top: 1rem; color: #666;">
            Check browser console for details. Verify Firebase connection and Firestore rules.
          </p>
        </div>
      `;
    }
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

  // Wait for Firebase to be ready with retry logic
  async function waitForFirebase(maxRetries = 10, delay = 200) {
    for (let i = 0; i < maxRetries; i++) {
      if (window.db) {
        console.log('Firebase connected successfully');
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    return false;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    // Wait for Firebase to initialize with proper retry
    const firebaseReady = await waitForFirebase();
    
    if (firebaseReady) {
      await loadProjects();
    } else {
      console.error('Firebase initialization timeout. Check Firebase configuration and network connection.');
      const projectsFeed = document.getElementById('projectsFeed');
      if (projectsFeed) {
        projectsFeed.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: #dc3545;">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Firebase Connection Error</h3>
            <p>Unable to connect to Firebase. Please check your Firebase configuration.</p>
          </div>
        `;
      }
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

  // Make functions globally available for admin.js and debugging
  window.loadProjects = loadProjects;
  window.showAdminLogin = showAdminLogin;
  window.closeAdminLogin = closeAdminLogin;
  window.handleAdminLogin = handleAdminLogin;
  