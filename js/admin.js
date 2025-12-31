// ============================================
// Admin Authentication & Edit System
// ============================================

// Admin Configuration
const ADMIN_CONFIG = {
    // CHANGE THIS PASSWORD - Set your admin password here
    password: 'admin123', // Change this to your secure password
    sessionKey: 'admin_session',
    dataKey: 'portfolio_data'
};

// Check if user is admin
function isAdmin() {
    return localStorage.getItem(ADMIN_CONFIG.sessionKey) === 'true';
}

// Login function
function adminLogin(password) {
    if (password === ADMIN_CONFIG.password) {
        localStorage.setItem(ADMIN_CONFIG.sessionKey, 'true');
        return true;
    }
    return false;
}

// Logout function
function adminLogout() {
    localStorage.removeItem(ADMIN_CONFIG.sessionKey);
    location.reload();
}

// Save data to localStorage
function savePortfolioData() {
    const data = {
        skills: skillsData,
        projects: projectsData,
        research: researchData,
        certifications: certificationsData,
        timeline: timelineData,
        personalInfo: getPersonalInfo()
    };
    localStorage.setItem(ADMIN_CONFIG.dataKey, JSON.stringify(data));
}

// Load data from localStorage or use default
function loadPortfolioData() {
    const saved = localStorage.getItem(ADMIN_CONFIG.dataKey);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.skills) skillsData = data.skills;
            if (data.projects) projectsData = data.projects;
            if (data.research) researchData = data.research;
            if (data.certifications) certificationsData = data.certifications;
            if (data.timeline) timelineData = data.timeline;
            if (data.personalInfo) setPersonalInfo(data.personalInfo);
        } catch (e) {
            console.error('Error loading saved data:', e);
        }
    }
}

// Get personal info from HTML
function getPersonalInfo() {
    return {
        name: document.querySelector('.hero-name')?.textContent || '',
        role: document.querySelector('.hero-role')?.textContent || '',
        tagline: document.querySelector('.hero-tagline')?.textContent || '',
        about: document.querySelector('.about-intro')?.textContent || '',
        email: document.querySelector('a[href^="mailto:"]')?.href.replace('mailto:', '') || '',
        github: document.querySelector('a[href*="github.com"]')?.href || '',
        linkedin: document.querySelector('a[href*="linkedin.com"]')?.href || ''
    };
}

// Set personal info to HTML
function setPersonalInfo(info) {
    if (info.name) {
        const nameEl = document.querySelector('.hero-name');
        if (nameEl) nameEl.textContent = info.name;
        document.querySelectorAll('footer p, .footer p').forEach(el => {
            if (el.textContent.includes('Your Name')) {
                el.textContent = el.textContent.replace('Your Name', info.name);
            }
        });
    }
    if (info.role) {
        const roleEl = document.querySelector('.hero-role');
        if (roleEl) roleEl.textContent = info.role;
    }
    if (info.tagline) {
        const taglineEl = document.querySelector('.hero-tagline');
        if (taglineEl) taglineEl.textContent = info.tagline;
    }
    if (info.about) {
        const aboutEl = document.querySelector('.about-intro');
        if (aboutEl) aboutEl.textContent = info.about;
    }
    if (info.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
            el.href = `mailto:${info.email}`;
            if (el.textContent.includes('@')) el.textContent = info.email;
        });
    }
    if (info.github) {
        document.querySelectorAll('a[href*="github.com"]').forEach(el => {
            el.href = info.github;
        });
    }
    if (info.linkedin) {
        document.querySelectorAll('a[href*="linkedin.com"]').forEach(el => {
            el.href = info.linkedin;
        });
    }
}

// Show edit buttons
function showEditButtons() {
    if (!isAdmin()) return;
    
    // Add edit button to navbar
    const navMenu = document.getElementById('navMenu');
    if (navMenu && !document.getElementById('adminNavBtn')) {
        const adminBtn = document.createElement('li');
        adminBtn.id = 'adminNavBtn';
        adminBtn.innerHTML = `
            <button class="nav-link admin-btn" onclick="openAdminPanel()" style="background: none; border: none; cursor: pointer;">
                <i class="fas fa-cog"></i> Admin
            </button>
        `;
        navMenu.appendChild(adminBtn);
    }
    
    // Add edit icons to sections
    document.querySelectorAll('.section-title').forEach(title => {
        if (!title.querySelector('.edit-section-btn')) {
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-section-btn';
            editBtn.innerHTML = '<i class="fas fa-edit"></i>';
            editBtn.onclick = () => editSection(title.closest('section').id);
            title.style.position = 'relative';
            title.appendChild(editBtn);
        }
    });
}

// Hide edit buttons
function hideEditButtons() {
    document.querySelectorAll('.edit-section-btn, .admin-btn').forEach(btn => btn.remove());
    const adminBtn = document.getElementById('adminNavBtn');
    if (adminBtn) adminBtn.remove();
}

// Open admin panel
function openAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.style.display = 'flex';
        loadAdminPanelContent();
    }
}

// Close admin panel
function closeAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.style.display = 'none';
}

// Load admin panel content
function loadAdminPanelContent() {
    const content = document.getElementById('adminPanelContent');
    if (!content) return;
    
    content.innerHTML = `
        <div class="admin-panel-header">
            <h2><i class="fas fa-cog"></i> Admin Panel</h2>
            <button class="close-admin" onclick="closeAdminPanel()"><i class="fas fa-times"></i></button>
        </div>
        <div class="admin-panel-body">
            <div class="admin-tabs">
                <button class="admin-tab active" onclick="switchAdminTab('personal', event)">Personal Info</button>
                <button class="admin-tab" onclick="switchAdminTab('projects', event)">Projects</button>
                <button class="admin-tab" onclick="switchAdminTab('research', event)">Research</button>
                <button class="admin-tab" onclick="switchAdminTab('certifications', event)">Certifications</button>
                <button class="admin-tab" onclick="switchAdminTab('timeline', event)">Timeline</button>
                <button class="admin-tab" onclick="switchAdminTab('skills', event)">Skills</button>
            </div>
            <div class="admin-tab-content" id="adminTabContent">
                ${getPersonalInfoTab()}
            </div>
            <div class="admin-panel-footer">
                <button class="btn btn-primary" onclick="saveAllChanges()">
                    <i class="fas fa-save"></i> Save All Changes
                </button>
                <button class="btn btn-secondary" onclick="exportData()">
                    <i class="fas fa-download"></i> Export Data
                </button>
                <button class="btn btn-outline" onclick="importData()">
                    <i class="fas fa-upload"></i> Import Data
                </button>
                <button class="btn btn-secondary" onclick="adminLogout()" style="background: #dc3545; color: white;">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    `;
}

// Switch admin tab
function switchAdminTab(tab, event) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        // If called programmatically, find the tab button
        document.querySelectorAll('.admin-tab').forEach(btn => {
            if (btn.textContent.toLowerCase().includes(tab.toLowerCase())) {
                btn.classList.add('active');
            }
        });
    }
    
    const content = document.getElementById('adminTabContent');
    switch(tab) {
        case 'personal':
            content.innerHTML = getPersonalInfoTab();
            break;
        case 'projects':
            content.innerHTML = getProjectsTab();
            break;
        case 'research':
            content.innerHTML = getResearchTab();
            break;
        case 'certifications':
            content.innerHTML = getCertificationsTab();
            break;
        case 'timeline':
            content.innerHTML = getTimelineTab();
            break;
        case 'skills':
            content.innerHTML = getSkillsTab();
            break;
    }
}

// Get personal info tab
function getPersonalInfoTab() {
    const info = getPersonalInfo();
    return `
        <div class="admin-form">
            <h3>Personal Information</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" id="admin-name" value="${info.name || ''}" placeholder="Your Name">
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" id="admin-role" value="${info.role || ''}" placeholder="AI & Data Science Undergraduate">
            </div>
            <div class="form-group">
                <label>Tagline</label>
                <textarea id="admin-tagline" rows="2" placeholder="Your tagline">${info.tagline || ''}</textarea>
            </div>
            <div class="form-group">
                <label>About Me</label>
                <textarea id="admin-about" rows="5" placeholder="About me description">${info.about || ''}</textarea>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="admin-email" value="${info.email || ''}" placeholder="your.email@example.com">
            </div>
            <div class="form-group">
                <label>GitHub URL</label>
                <input type="url" id="admin-github" value="${info.github || ''}" placeholder="https://github.com/yourusername">
            </div>
            <div class="form-group">
                <label>LinkedIn URL</label>
                <input type="url" id="admin-linkedin" value="${info.linkedin || ''}" placeholder="https://linkedin.com/in/yourusername">
            </div>
        </div>
    `;
}

// Get projects tab
function getProjectsTab() {
    let html = '<div class="admin-form"><h3>Projects <button class="btn btn-primary" onclick="addNewProject()" style="float: right; padding: 0.5rem 1rem;"><i class="fas fa-plus"></i> Add Project</button></h3>';
    projectsData.forEach((project, index) => {
        html += `
            <div class="admin-item-card" data-index="${index}">
                <div class="admin-item-header">
                    <h4>${project.title || 'New Project'}</h4>
                    <button class="btn-icon" onclick="deleteProject(${index})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="project-field" data-field="title" data-index="${index}" value="${project.title || ''}">
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <input type="text" class="project-field" data-field="category" data-index="${index}" value="${project.category || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="project-field" data-field="description" data-index="${index}" rows="3">${project.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Tech Stack (comma-separated)</label>
                    <input type="text" class="project-field" data-field="techStack" data-index="${index}" value="${(project.techStack || []).join(', ')}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Image URL</label>
                        <input type="url" class="project-field" data-field="image" data-index="${index}" value="${project.image || ''}">
                    </div>
                    <div class="form-group">
                        <label>Date (YYYY-MM)</label>
                        <input type="text" class="project-field" data-field="date" data-index="${index}" value="${project.date || ''}">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>GitHub URL</label>
                        <input type="url" class="project-field" data-field="github" data-index="${index}" value="${project.github || ''}">
                    </div>
                    <div class="form-group">
                        <label>Demo URL</label>
                        <input type="url" class="project-field" data-field="demo" data-index="${index}" value="${project.demo || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <input type="text" class="project-field" data-field="status" data-index="${index}" value="${project.status || ''}">
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// Get research tab
function getResearchTab() {
    let html = '<div class="admin-form"><h3>Research Papers <button class="btn btn-primary" onclick="addNewResearch()" style="float: right; padding: 0.5rem 1rem;"><i class="fas fa-plus"></i> Add Paper</button></h3>';
    researchData.forEach((research, index) => {
        html += `
            <div class="admin-item-card" data-index="${index}">
                <div class="admin-item-header">
                    <h4>${research.title || 'New Paper'}</h4>
                    <button class="btn-icon" onclick="deleteResearch(${index})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="research-field" data-field="title" data-index="${index}" value="${research.title || ''}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Conference</label>
                        <input type="text" class="research-field" data-field="conference" data-index="${index}" value="${research.conference || ''}">
                    </div>
                    <div class="form-group">
                        <label>Year</label>
                        <input type="text" class="research-field" data-field="year" data-index="${index}" value="${research.year || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Abstract</label>
                    <textarea class="research-field" data-field="abstract" data-index="${index}" rows="4">${research.abstract || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>PDF Path</label>
                    <input type="text" class="research-field" data-field="pdf" data-index="${index}" value="${research.pdf || ''}">
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// Get certifications tab
function getCertificationsTab() {
    let html = '<div class="admin-form"><h3>Certifications <button class="btn btn-primary" onclick="addNewCertification()" style="float: right; padding: 0.5rem 1rem;"><i class="fas fa-plus"></i> Add Certification</button></h3>';
    certificationsData.forEach((cert, index) => {
        html += `
            <div class="admin-item-card" data-index="${index}">
                <div class="admin-item-header">
                    <h4>${cert.title || 'New Certification'}</h4>
                    <button class="btn-icon" onclick="deleteCertification(${index})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="cert-field" data-field="title" data-index="${index}" value="${cert.title || ''}">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Issuer</label>
                        <input type="text" class="cert-field" data-field="issuer" data-index="${index}" value="${cert.issuer || ''}">
                    </div>
                    <div class="form-group">
                        <label>Year</label>
                        <input type="text" class="cert-field" data-field="year" data-index="${index}" value="${cert.year || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Image URL</label>
                    <input type="url" class="cert-field" data-field="image" data-index="${index}" value="${cert.image || ''}">
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// Get timeline tab
function getTimelineTab() {
    let html = '<div class="admin-form"><h3>Timeline <button class="btn btn-primary" onclick="addNewTimelineItem()" style="float: right; padding: 0.5rem 1rem;"><i class="fas fa-plus"></i> Add Item</button></h3>';
    timelineData.forEach((item, index) => {
        html += `
            <div class="admin-item-card" data-index="${index}">
                <div class="admin-item-header">
                    <h4>${item.title || 'New Item'}</h4>
                    <button class="btn-icon" onclick="deleteTimelineItem(${index})"><i class="fas fa-trash"></i></button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Date</label>
                        <input type="text" class="timeline-field" data-field="date" data-index="${index}" value="${item.date || ''}">
                    </div>
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="timeline-field" data-field="title" data-index="${index}" value="${item.title || ''}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Organization</label>
                    <input type="text" class="timeline-field" data-field="organization" data-index="${index}" value="${item.organization || ''}">
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea class="timeline-field" data-field="description" data-index="${index}" rows="3">${item.description || ''}</textarea>
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// Get skills tab
function getSkillsTab() {
    let html = '<div class="admin-form"><h3>Skills</h3>';
    Object.keys(skillsData).forEach(key => {
        const category = skillsData[key];
        html += `
            <div class="admin-item-card">
                <h4>${category.title}</h4>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="skill-category-field" data-category="${key}" data-field="title" value="${category.title || ''}">
                </div>
                <div class="form-group">
                    <label>Icon Class (Font Awesome)</label>
                    <input type="text" class="skill-category-field" data-category="${key}" data-field="icon" value="${category.icon || ''}">
                </div>
                <div class="form-group">
                    <label>Skills (comma-separated)</label>
                    <input type="text" class="skill-category-field" data-category="${key}" data-field="skills" value="${(category.skills || []).join(', ')}">
                </div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// Save all changes
function saveAllChanges() {
    // Save personal info
    const personalInfo = {
        name: document.getElementById('admin-name')?.value || '',
        role: document.getElementById('admin-role')?.value || '',
        tagline: document.getElementById('admin-tagline')?.value || '',
        about: document.getElementById('admin-about')?.value || '',
        email: document.getElementById('admin-email')?.value || '',
        github: document.getElementById('admin-github')?.value || '',
        linkedin: document.getElementById('admin-linkedin')?.value || ''
    };
    
    // Save projects
    document.querySelectorAll('.project-field').forEach(field => {
        const index = parseInt(field.dataset.index);
        const fieldName = field.dataset.field;
        if (!projectsData[index]) projectsData[index] = { id: index + 1 };
        
        if (fieldName === 'techStack') {
            projectsData[index][fieldName] = field.value.split(',').map(s => s.trim()).filter(s => s);
        } else {
            projectsData[index][fieldName] = field.value;
        }
    });
    
    // Save research
    document.querySelectorAll('.research-field').forEach(field => {
        const index = parseInt(field.dataset.index);
        const fieldName = field.dataset.field;
        if (!researchData[index]) researchData[index] = { id: index + 1 };
        researchData[index][fieldName] = field.value;
    });
    
    // Save certifications
    document.querySelectorAll('.cert-field').forEach(field => {
        const index = parseInt(field.dataset.index);
        const fieldName = field.dataset.field;
        if (!certificationsData[index]) certificationsData[index] = { id: index + 1 };
        certificationsData[index][fieldName] = field.value;
    });
    
    // Save timeline
    document.querySelectorAll('.timeline-field').forEach(field => {
        const index = parseInt(field.dataset.index);
        const fieldName = field.dataset.field;
        if (!timelineData[index]) timelineData[index] = { id: index + 1 };
        timelineData[index][fieldName] = field.value;
    });
    
    // Save skills
    document.querySelectorAll('.skill-category-field').forEach(field => {
        const category = field.dataset.category;
        const fieldName = field.dataset.field;
        if (!skillsData[category]) return;
        
        if (fieldName === 'skills') {
            skillsData[category][fieldName] = field.value.split(',').map(s => s.trim()).filter(s => s);
        } else {
            skillsData[category][fieldName] = field.value;
        }
    });
    
    // Update personal info in HTML
    setPersonalInfo(personalInfo);
    
    // Save to localStorage
    savePortfolioData();
    
    // Reload content
    loadSkills();
    loadProjects();
    loadResearch();
    loadCertifications();
    loadTimeline();
    
    alert('All changes saved successfully!');
}

// Add new project
function addNewProject() {
    projectsData.push({
        id: projectsData.length + 1,
        title: '',
        category: '',
        description: '',
        techStack: [],
        image: '',
        github: '',
        demo: '',
        date: '',
        status: 'Completed'
    });
    switchAdminTab('projects', null);
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        projectsData.splice(index, 1);
        switchAdminTab('projects', null);
    }
}

// Add new research
function addNewResearch() {
    researchData.push({
        id: researchData.length + 1,
        title: '',
        conference: '',
        abstract: '',
        pdf: '',
        year: ''
    });
    switchAdminTab('research', null);
}

// Delete research
function deleteResearch(index) {
    if (confirm('Are you sure you want to delete this research paper?')) {
        researchData.splice(index, 1);
        switchAdminTab('research', null);
    }
}

// Add new certification
function addNewCertification() {
    certificationsData.push({
        id: certificationsData.length + 1,
        title: '',
        issuer: '',
        year: '',
        image: ''
    });
    switchAdminTab('certifications', null);
}

// Delete certification
function deleteCertification(index) {
    if (confirm('Are you sure you want to delete this certification?')) {
        certificationsData.splice(index, 1);
        switchAdminTab('certifications', null);
    }
}

// Add new timeline item
function addNewTimelineItem() {
    timelineData.push({
        id: timelineData.length + 1,
        date: '',
        title: '',
        organization: '',
        description: ''
    });
    switchAdminTab('timeline', null);
}

// Delete timeline item
function deleteTimelineItem(index) {
    if (confirm('Are you sure you want to delete this timeline item?')) {
        timelineData.splice(index, 1);
        switchAdminTab('timeline', null);
    }
}

// Export data
function exportData() {
    const data = {
        skills: skillsData,
        projects: projectsData,
        research: researchData,
        certifications: certificationsData,
        timeline: timelineData,
        personalInfo: getPersonalInfo()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Import data
function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (data.skills) skillsData = data.skills;
                    if (data.projects) projectsData = data.projects;
                    if (data.research) researchData = data.research;
                    if (data.certifications) certificationsData = data.certifications;
                    if (data.timeline) timelineData = data.timeline;
                    savePortfolioData();
                    loadSkills();
                    loadProjects();
                    loadResearch();
                    loadCertifications();
                    loadTimeline();
                    if (data.personalInfo) setPersonalInfo(data.personalInfo);
                    alert('Data imported successfully!');
                    closeAdminPanel();
                } catch (e) {
                    alert('Error importing data: ' + e.message);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// Edit section (inline editing)
function editSection(sectionId) {
    openAdminPanel();
    switch(sectionId) {
        case 'about':
            switchAdminTab('personal', null);
            break;
        case 'projects':
            switchAdminTab('projects', null);
            break;
        case 'research':
            switchAdminTab('research', null);
            break;
        case 'certifications':
            switchAdminTab('certifications', null);
            break;
        case 'timeline':
            switchAdminTab('timeline', null);
            break;
        case 'skills':
            switchAdminTab('skills', null);
            break;
    }
}

// Initialize admin system
function initAdmin() {
    // Load saved data on page load
    loadPortfolioData();
    
    // Show/hide edit buttons based on admin status
    if (isAdmin()) {
        showEditButtons();
    } else {
        hideEditButtons();
    }
}

// Make functions globally available
window.isAdmin = isAdmin;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.openAdminPanel = openAdminPanel;
window.closeAdminPanel = closeAdminPanel;
window.switchAdminTab = switchAdminTab;
window.saveAllChanges = saveAllChanges;
window.addNewProject = addNewProject;
window.deleteProject = deleteProject;
window.addNewResearch = addNewResearch;
window.deleteResearch = deleteResearch;
window.addNewCertification = addNewCertification;
window.deleteCertification = deleteCertification;
window.addNewTimelineItem = addNewTimelineItem;
window.deleteTimelineItem = deleteTimelineItem;
window.exportData = exportData;
window.importData = importData;
window.editSection = editSection;

