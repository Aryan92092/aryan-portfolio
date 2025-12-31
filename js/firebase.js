// ============================================
// Firebase Configuration & Initialization
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAQazmvlyYnIQyp6Ah0S3goe3OUuXHILvw",
  authDomain: "aryan-portfolio-f5efe.firebaseapp.com",
  projectId: "aryan-portfolio-f5efe",
  storageBucket: "aryan-portfolio-f5efe.firebasestorage.app",
  messagingSenderId: "196416618810",
  appId: "1:196416618810:web:79ae8f6342a1cbd5c99003"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Make db available globally for other scripts
window.db = db;

export { db };
