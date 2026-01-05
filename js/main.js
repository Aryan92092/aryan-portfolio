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
  // LOAD SKILLS
  // ============================================

  function loadSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    if (!skillsGrid) {
      console.error('Skills grid element not found');
      return;
    }

    skillsGrid.innerHTML = '';

    // Check localStorage first (for admin panel edits), then fallback to static data
    let skillsToLoad = window.skillsData;
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.skills && Object.keys(parsed.skills).length > 0) {
          skillsToLoad = parsed.skills;
          console.log('Loading skills from localStorage (admin edits)');
        }
      }
    } catch (e) {
      console.warn('Could not load skills from localStorage, using default data');
    }

    if (!skillsToLoad || Object.keys(skillsToLoad).length === 0) {
      skillsGrid.innerHTML = '<p style="text-align: center; color: #999;">No skills data available.</p>';
      return;
    }

    Object.keys(skillsToLoad).forEach((key, index) => {
      const category = skillsToLoad[key];
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'skill-category';
      categoryDiv.setAttribute('data-aos', 'fade-up');
      categoryDiv.style.animationDelay = `${index * 0.1}s`;

      const skillsList = category.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
      ).join('');

      categoryDiv.innerHTML = `
        <div class="skill-category-header">
          <i class="${category.icon || 'fas fa-code'}"></i>
          <h3>${category.title || 'Skills'}</h3>
        </div>
        <div class="skill-tags">
          ${skillsList}
        </div>
      `;

      skillsGrid.appendChild(categoryDiv);
    });

    AOS.refresh();
  }

  // ============================================
  // LOAD RESEARCH PAPERS
  // ============================================

  function loadResearch() {
    const researchGrid = document.getElementById('researchGrid');
    if (!researchGrid) {
      console.error('Research grid element not found');
      return;
    }

    researchGrid.innerHTML = '';

    // Check localStorage first (for admin panel edits), then fallback to static data
    let researchToLoad = window.researchData;
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.research && parsed.research.length > 0) {
          researchToLoad = parsed.research;
          console.log('Loading research from localStorage (admin edits)');
        }
      }
    } catch (e) {
      console.warn('Could not load research from localStorage, using default data');
    }

    if (!researchToLoad || researchToLoad.length === 0) {
      researchGrid.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No research papers available.</p>';
      return;
    }

    researchToLoad.forEach((research, index) => {
      const card = document.createElement('div');
      card.className = 'research-card';
      card.setAttribute('data-aos', 'fade-up');
      card.style.animationDelay = `${index * 0.1}s`;

      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      card.innerHTML = `
        <div class="research-content">
          <h3>${escapeHtml(research.title || 'Untitled Paper')}</h3>
          <div class="research-meta">
            <span class="research-conference">${escapeHtml(research.conference || 'N/A')}</span>
            <span class="research-year">${escapeHtml(research.year || 'N/A')}</span>
          </div>
          <p class="research-abstract">${escapeHtml(research.abstract || 'No abstract available.')}</p>
          <div class="research-authors">
            <i class="fas fa-users"></i> ${escapeHtml(research.authors || 'N/A')}
          </div>
          ${research.pdf ? `<a href="${escapeHtml(research.pdf)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fas fa-file-pdf"></i> View PDF</a>` : ''}
        </div>
      `;

      researchGrid.appendChild(card);
    });

    AOS.refresh();
  }

  // ============================================
  // LOAD CERTIFICATIONS
  // ============================================

  function loadCertifications() {
    const certificationsGrid = document.getElementById('certificationsGrid');
    if (!certificationsGrid) {
      console.error('Certifications grid element not found');
      return;
    }

    certificationsGrid.innerHTML = '';

    // Check localStorage first (for admin panel edits), then fallback to static data
    let certsToLoad = window.certificationsData;
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.certifications && parsed.certifications.length > 0) {
          certsToLoad = parsed.certifications;
          console.log('Loading certifications from localStorage (admin edits)');
        }
      }
    } catch (e) {
      console.warn('Could not load certifications from localStorage, using default data');
    }

    if (!certsToLoad || certsToLoad.length === 0) {
      certificationsGrid.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No certifications available.</p>';
      return;
    }

    certsToLoad.forEach((cert, index) => {
      const card = document.createElement('div');
      card.className = 'certification-card';
      card.setAttribute('data-aos', 'fade-up');
      card.style.animationDelay = `${index * 0.1}s`;

      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      card.innerHTML = `
        <div class="certification-image">
          ${cert.image ? `<img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.title || 'Certification')}" loading="lazy">` 
            : `<div class="cert-image-placeholder"><i class="fas fa-certificate"></i></div>`}
        </div>
        <div class="certification-content">
          <h3>${escapeHtml(cert.title || 'Untitled Certification')}</h3>
          <p class="certification-issuer">${escapeHtml(cert.issuer || 'N/A')}</p>
          <span class="certification-year">${escapeHtml(cert.year || 'N/A')}</span>
        </div>
      `;

      certificationsGrid.appendChild(card);
    });

    AOS.refresh();
  }

  // ============================================
  // LOAD TIMELINE
  // ============================================

  function loadTimeline() {
    const timelineContainer = document.getElementById('timelineContainer');
    if (!timelineContainer) {
      console.error('Timeline container element not found');
      return;
    }

    timelineContainer.innerHTML = '';

    // Check localStorage first (for admin panel edits), then fallback to static data
    let timelineToLoad = window.timelineData;
    try {
      const savedData = localStorage.getItem('portfolio_data');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.timeline && parsed.timeline.length > 0) {
          timelineToLoad = parsed.timeline;
          console.log('Loading timeline from localStorage (admin edits)');
        }
      }
    } catch (e) {
      console.warn('Could not load timeline from localStorage, using default data');
    }

    if (!timelineToLoad || timelineToLoad.length === 0) {
      timelineContainer.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No timeline items available.</p>';
      return;
    }

    timelineToLoad.forEach((item, index) => {
      const timelineItem = document.createElement('div');
      timelineItem.className = 'timeline-item';
      timelineItem.setAttribute('data-aos', index % 2 === 0 ? 'fade-right' : 'fade-left');
      timelineItem.style.animationDelay = `${index * 0.1}s`;

      const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      };

      timelineItem.innerHTML = `
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="timeline-date">${escapeHtml(item.date || 'N/A')}</div>
          <h3>${escapeHtml(item.title || 'Untitled')}</h3>
          <p class="timeline-organization">${escapeHtml(item.organization || 'N/A')}</p>
          <p class="timeline-description">${escapeHtml(item.description || 'No description available.')}</p>
        </div>
      `;

      timelineContainer.appendChild(timelineItem);
    });

    AOS.refresh();
  }

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

  // Fetch research from Firebase for public site
  async function fetchResearchFromFirebase() {
    if (!window.db) return;
    try {
      const { collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");
      const snapshot = await getDocs(collection(window.db, "research"));
      const arr = [];
      snapshot.forEach(docSnap => {
        const d = docSnap.data();
        if (d.authors && !Array.isArray(d.authors) && typeof d.authors === 'string') {
          d.authors = d.authors.split(',').map(s => s.trim()).filter(Boolean);
        }
        arr.push(d);
      });
      window.researchData = arr;
      console.log(`Fetched ${arr.length} research paper(s) from Firebase`);
    } catch (err) {
      console.error('Error fetching research from Firebase (public):', err);
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
    // Load static data sections first (don't require Firebase)
    loadSkills();
    loadResearch();
    loadCertifications();
    loadTimeline();

    // Wait for Firebase to initialize with proper retry
    const firebaseReady = await waitForFirebase();
    
    if (firebaseReady) {
      await loadProjects();
      // Fetch research from Firebase and re-render research section
      try {
        await fetchResearchFromFirebase();
        loadResearch();
      } catch (e) {
        console.warn('Could not fetch research from Firebase for public site:', e);
      }
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
  window.loadSkills = loadSkills;
  window.loadResearch = loadResearch;
  window.loadCertifications = loadCertifications;
  window.loadTimeline = loadTimeline;
  window.showAdminLogin = showAdminLogin;
  window.closeAdminLogin = closeAdminLogin;
  window.handleAdminLogin = handleAdminLogin;
  