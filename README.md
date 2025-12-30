# Personal Portfolio Website

A modern, professional, and responsive personal portfolio website built with HTML5, CSS3, and JavaScript. Designed to showcase projects, research papers, certifications, and achievements in a clean, social media feed-like interface.

## 🚀 Features

- **Dark/Light Mode Toggle** - Seamless theme switching with persistent storage
- **Fully Responsive** - Mobile-first design that works on all devices
- **Smooth Animations** - AOS (Animate On Scroll) library for elegant section reveals
- **Dynamic Content Loading** - Projects, research, and certifications loaded from JSON
- **Modern UI/UX** - Clean, minimal design with card-based layouts
- **Sticky Navigation** - Smooth scrolling with active section highlighting
- **Image Modal** - Click-to-enlarge for certificates and images
- **SEO Optimized** - Semantic HTML with proper meta tags

## 📁 Project Structure

```
Port/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles (dark/light theme, responsive)
├── js/
│   ├── main.js        # Main JavaScript logic
│   └── data.js        # Data files (projects, research, etc.)
├── assets/            # Images, PDFs, and other assets
│   ├── images/        # Project images, certificates
│   └── research-papers/ # Research paper PDFs
└── README.md          # This file
```

## 🛠️ Setup Instructions

### 1. Clone or Download

```bash
git clone <your-repo-url>
cd Port
```

### 2. Customize Your Information

#### Update Personal Information in `index.html`:
- Replace "Your Name" with your actual name
- Update email addresses and social media links
- Modify the hero section tagline and about section

#### Update Data in `js/data.js`:
- **Skills**: Edit `skillsData` object to match your skills
- **Projects**: Update `projectsData` array with your projects
- **Research**: Update `researchData` array with your publications
- **Certifications**: Update `certificationsData` array with your certificates
- **Timeline**: Update `timelineData` array with your journey

### 3. Add Your Assets

1. **Project Images**: Add project screenshots to `assets/images/` folder
2. **Certificates**: Add certificate images to `assets/images/` folder
3. **Research Papers**: Add PDF files to `assets/research-papers/` folder
4. **Resume**: Add your resume PDF as `resume.pdf` in the root directory

### 4. Update Image URLs

In `js/data.js`, update image URLs:
- Replace placeholder URLs with your actual image paths
- Use relative paths like `assets/images/project1.jpg`
- Or use external URLs (e.g., from Unsplash, your CDN, etc.)

## 📝 Adding New Projects

To add a new project, simply add an object to the `projectsData` array in `js/data.js`:

```javascript
{
    id: 7,  // Unique ID
    title: "Your Project Title",
    category: "AI / ML",  // Category tag
    description: "A brief description of your project...",
    techStack: ["Python", "TensorFlow", "React"],  // Technologies used
    image: "assets/images/project7.jpg",  // Project image path
    github: "https://github.com/yourusername/project",  // GitHub link (optional)
    demo: "https://your-demo.onrender.com",  // Live demo link (optional)
    paper: null,  // Research paper PDF path (optional)
    date: "2024-04",  // Date in YYYY-MM format
    status: "Completed"  // Status: "Completed", "In Progress", "Published", etc.
}
```

## 📄 Adding Research Papers

Add a new object to the `researchData` array:

```javascript
{
    id: 4,
    title: "Your Research Paper Title",
    conference: "Conference Name",
    abstract: "Brief abstract of your research...",
    pdf: "assets/research-papers/paper4.pdf",
    year: "2024",
    authors: "Your Name, Co-Author"
}
```

## 🏆 Adding Certifications

Add a new object to the `certificationsData` array:

```javascript
{
    id: 7,
    title: "Certificate Name",
    issuer: "Issuing Organization",
    year: "2024",
    image: "assets/images/cert7.jpg"
}
```

## 🎨 Customization

### Colors & Theme

The website uses CSS variables for easy theming. Edit the `:root` and `[data-theme="dark"]` sections in `css/style.css`:

```css
:root {
    --accent-primary: #6366f1;  /* Change primary color */
    --accent-secondary: #8b5cf6; /* Change secondary color */
    /* ... other variables */
}
```

### Fonts

Currently using Inter and Poppins from Google Fonts. To change:
1. Update the Google Fonts link in `index.html`
2. Update `font-family` in `css/style.css`

### Animations

AOS (Animate On Scroll) is used for animations. Customize in `js/main.js`:

```javascript
AOS.init({
    duration: 800,      // Animation duration
    easing: 'ease-in-out',
    once: true,         // Animate only once
    offset: 100         // Trigger offset
});
```

## 🚀 Deployment on Render

### Step 1: Prepare Your Repository

1. Make sure all files are committed to Git
2. Push to GitHub, GitLab, or Bitbucket

### Step 2: Deploy on Render

1. **Sign up/Login** to [Render](https://render.com)

2. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect your repository
   - Choose your repository and branch

3. **Configure Build Settings**:
   - **Name**: Your portfolio name
   - **Build Command**: Leave empty (no build needed)
   - **Publish Directory**: Leave empty (root directory)

4. **Deploy**:
   - Click "Create Static Site"
   - Render will automatically deploy your site
   - Your site will be available at `https://your-site.onrender.com`

### Step 3: Custom Domain (Optional)

1. Go to your site settings on Render
2. Click "Custom Domains"
3. Add your domain and follow DNS configuration instructions

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern CSS with Flexbox, Grid, and CSS Variables
- **JavaScript (ES6+)** - Dynamic content loading and interactions
- **AOS Library** - Scroll animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter, Poppins)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

For questions or suggestions, feel free to reach out through the contact form on the website.

---

**Note**: Remember to replace all placeholder content (names, links, images) with your actual information before deploying!

