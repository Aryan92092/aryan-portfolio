# Admin Panel Instructions

This document explains how to use the admin panel to edit your portfolio information.

## 🔐 Setting Up Admin Access

### Step 1: Set Your Admin Password

1. Open `js/admin.js` in a text editor
2. Find the `ADMIN_CONFIG` object at the top of the file (around line 5)
3. Change the `password` value to your desired password:

```javascript
const ADMIN_CONFIG = {
    password: 'your-secure-password-here', // Change this!
    sessionKey: 'admin_session',
    dataKey: 'portfolio_data'
};
```

**⚠️ Important:** Choose a strong password and keep it secure. Anyone with this password can edit your portfolio.

### Step 2: Save the File

Save `js/admin.js` after changing the password.

## 🚪 How to Login as Admin

There are **two ways** to access the admin login:

### Method 1: URL Parameter
1. Add `?admin` to the end of your website URL
   - Example: `https://yoursite.com?admin`
   - Or locally: `http://localhost:8080?admin`
2. The admin login modal will appear automatically

### Method 2: Login Button
1. Look for a **lock icon** (🔒) in the bottom-right corner of the page
2. Click it to open the admin login modal
3. Enter your admin password
4. Click "Login"

## ✏️ Editing Your Portfolio

Once logged in, you'll see:

1. **Admin Button** in the navigation menu (top right)
2. **Edit Icons** (✏️) next to each section title

### Using the Admin Panel

1. Click the **"Admin"** button in the navigation or click any **edit icon** (✏️)
2. The admin panel will open with different tabs:
   - **Personal Info**: Edit your name, role, tagline, about section, email, GitHub, LinkedIn
   - **Projects**: Add, edit, or delete projects
   - **Research**: Manage research papers
   - **Certifications**: Add or remove certifications
   - **Timeline**: Edit your journey/timeline items
   - **Skills**: Update your skills categories

### Editing Projects

1. Go to the **Projects** tab in the admin panel
2. Edit any field directly:
   - **Title**: Project name
   - **Category**: e.g., "AI / ML", "Web Development"
   - **Description**: Detailed project description
   - **Tech Stack**: Comma-separated list (e.g., "Python, TensorFlow, React")
   - **Image URL**: Link to project image
   - **Date**: Format as YYYY-MM (e.g., "2024-01")
   - **GitHub URL**: Link to GitHub repository
   - **Demo URL**: Link to live demo
   - **Status**: e.g., "Completed", "In Progress"
3. Click **"Add Project"** to create a new project
4. Click the **trash icon** (🗑️) to delete a project

### Editing Other Sections

The process is similar for all sections:
- **Research**: Edit paper titles, conferences, abstracts, PDF paths
- **Certifications**: Update certificate titles, issuers, years, images
- **Timeline**: Modify dates, titles, organizations, descriptions
- **Skills**: Edit skill categories, icons, and skill lists

## 💾 Saving Your Changes

1. After making edits, scroll to the bottom of the admin panel
2. Click **"Save All Changes"**
3. Your changes will be:
   - Saved to browser's localStorage
   - Applied to the website immediately
   - Persist when you reload the page

**Note:** Changes are saved locally in your browser. If you clear browser data, you'll need to re-enter your information.

## 📥 Exporting Your Data

To backup your portfolio data:

1. Open the admin panel
2. Click **"Export Data"**
3. A JSON file (`portfolio-data.json`) will download
4. Keep this file as a backup

## 📤 Importing Your Data

To restore from a backup:

1. Open the admin panel
2. Click **"Import Data"**
3. Select your `portfolio-data.json` file
4. Your data will be restored immediately

## 🚪 Logging Out

1. Click **"Logout"** in the admin panel footer
2. The page will reload
3. Edit buttons and admin features will be hidden
4. Visitors will only see the read-only portfolio

## 🔄 How Data is Stored

- **Default Data**: Stored in `js/data.js` (original source)
- **Edited Data**: Saved in browser's localStorage
- **Priority**: If localStorage has data, it overrides `data.js`

### Resetting to Default

To reset to original data from `data.js`:

1. Open browser Developer Tools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** → your website
4. Delete the `portfolio_data` key
5. Reload the page

## 🛡️ Security Notes

1. **Password Security**: 
   - Never share your admin password
   - Don't commit the password to public repositories
   - Consider changing it periodically

2. **Client-Side Only**: 
   - This admin system works entirely in the browser
   - No server-side authentication
   - Anyone with the password can edit (if they have access to your site)

3. **For Production**: 
   - For a more secure setup, consider implementing server-side authentication
   - Use environment variables for sensitive data
   - Implement proper user authentication and authorization

## 📝 Quick Reference

| Action | Steps |
|--------|-------|
| **Login** | Add `?admin` to URL or click lock icon → Enter password |
| **Edit Info** | Click "Admin" → Select tab → Edit fields → Save |
| **Add Item** | Admin panel → Tab → "Add" button → Fill form → Save |
| **Delete Item** | Admin panel → Tab → Trash icon → Confirm |
| **Export** | Admin panel → "Export Data" button |
| **Import** | Admin panel → "Import Data" button → Select file |
| **Logout** | Admin panel → "Logout" button |

## ❓ Troubleshooting

### Can't see the login button?
- Make sure you're not already logged in
- Try adding `?admin` to the URL
- Check browser console for errors

### Changes not saving?
- Make sure you clicked "Save All Changes"
- Check browser console for errors
- Verify localStorage is enabled in your browser

### Want to edit the original data file?
- Edit `js/data.js` directly
- Clear localStorage to use the new data
- Or import the updated data through the admin panel

## 🎯 Tips

1. **Backup Regularly**: Export your data after making significant changes
2. **Test Changes**: Preview changes before logging out
3. **Organize Data**: Keep your exported JSON files organized by date
4. **Multiple Devices**: Export/import data to sync across devices

---

**Need Help?** Check the main README.md for general portfolio setup instructions.

