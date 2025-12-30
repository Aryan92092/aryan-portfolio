# Quick Start Guide

## 🎯 Quick Customization Checklist

### 1. Personal Information (5 minutes)
- [ ] Open `index.html`
- [ ] Replace "Your Name" (3 occurrences)
- [ ] Update email addresses
- [ ] Update GitHub and LinkedIn URLs
- [ ] Customize hero tagline
- [ ] Update About Me section

### 2. Skills (5 minutes)
- [ ] Open `js/data.js`
- [ ] Edit `skillsData` object
- [ ] Add/remove skills in each category
- [ ] Update category titles if needed

### 3. Projects (15 minutes)
- [ ] Open `js/data.js`
- [ ] Edit `projectsData` array
- [ ] Replace with your actual projects
- [ ] Add project images to `assets/images/`
- [ ] Update image paths in project objects
- [ ] Add GitHub and demo links

### 4. Research Papers (5 minutes)
- [ ] Edit `researchData` array in `js/data.js`
- [ ] Add your research papers
- [ ] Place PDFs in `assets/research-papers/`
- [ ] Update PDF paths

### 5. Certifications (5 minutes)
- [ ] Edit `certificationsData` array
- [ ] Add certificate images to `assets/images/`
- [ ] Update image paths

### 6. Timeline (5 minutes)
- [ ] Edit `timelineData` array
- [ ] Add your education, internships, achievements

### 7. Resume (2 minutes)
- [ ] Add your resume PDF as `resume.pdf` in root directory
- [ ] Update download link in `index.html` if needed

## 📝 Example: Adding a New Project

```javascript
// In js/data.js, add to projectsData array:
{
    id: 7,
    title: "My Awesome Project",
    category: "Web Development",
    description: "A full-stack web application that does amazing things...",
    techStack: ["React", "Node.js", "MongoDB"],
    image: "assets/images/project-awesome.jpg",
    github: "https://github.com/yourusername/awesome-project",
    demo: "https://awesome-project.onrender.com",
    paper: null,
    date: "2024-05",
    status: "Completed"
}
```

## 🎨 Quick Theme Customization

In `css/style.css`, find `:root` and change colors:

```css
:root {
    --accent-primary: #6366f1;  /* Your brand color */
    --accent-secondary: #8b5cf6;
}
```

## 🚀 Deploy Checklist

- [ ] All personal info updated
- [ ] All placeholder images replaced
- [ ] All links working
- [ ] Tested on mobile
- [ ] Tested dark/light mode
- [ ] Resume PDF added
- [ ] Git repository ready
- [ ] Deploy to Render

## 💡 Pro Tips

1. **Images**: Use optimized images (WebP format recommended)
2. **Performance**: Keep images under 500KB each
3. **Links**: Always use `target="_blank" rel="noopener noreferrer"` for external links
4. **Testing**: Test on multiple browsers before deploying
5. **SEO**: Update meta tags in `index.html` head section

## 🆘 Common Issues

**Images not showing?**
- Check file paths are correct
- Ensure images are in `assets/images/` folder
- Use relative paths: `assets/images/image.jpg`

**Theme not persisting?**
- Check browser localStorage is enabled
- Clear cache and try again

**Animations not working?**
- Ensure AOS library is loaded (check browser console)
- Check internet connection (AOS loads from CDN)

---

**Total Setup Time**: ~40 minutes for complete customization

