// ============================================
// Portfolio Data
// ============================================

// Skills Data
const skillsData = {
    programming: {
        title: "Programming Languages",
        icon: "fas fa-code",
        skills: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL", "R"]
    },
    ai_ml: {
        title: "AI / ML / Data Science",
        icon: "fas fa-brain",
        skills: ["Machine Learning", "Deep Learning", "Neural Networks", "NLP", "Computer Vision", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"]
    },
    web_app: {
        title: "Web & App Development",
        icon: "fas fa-laptop-code",
        skills: ["React", "Node.js", "HTML5", "CSS3", "Android Development", "REST APIs", "MongoDB", "Firebase"]
    },
    tools: {
        title: "Tools & Platforms",
        icon: "fas fa-tools",
        skills: ["Git", "Docker", "AWS", "Google Cloud", "Jupyter", "Tableau", "Power BI", "Linux"]
    }
};

// Projects Data
const projectsData = [
    {
        id: 1,
        title: "Intelligent Disease Prediction System",
        category: "AI / ML",
        description: "A machine learning-based system that predicts diseases using patient symptoms and medical history. Implemented using ensemble methods and deep learning for improved accuracy.",
        techStack: ["Python", "TensorFlow", "Scikit-learn", "Flask", "React"],
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
        github: "https://github.com/yourusername/disease-prediction",
        demo: "https://your-demo.onrender.com",
        paper: null,
        date: "2024-01",
        status: "Completed"
    },
    {
        id: 2,
        title: "IoT-Based Smart Home Automation",
        category: "IoT",
        description: "A comprehensive IoT solution for home automation using ESP32 microcontrollers. Features include smart lighting, temperature control, and security monitoring with mobile app integration.",
        techStack: ["C++", "Arduino", "ESP32", "Android", "Firebase", "MQTT"],
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        github: "https://github.com/yourusername/smart-home",
        demo: "https://your-demo.onrender.com",
        paper: null,
        date: "2023-11",
        status: "Completed"
    },
    {
        id: 3,
        title: "Real-Time Sentiment Analysis Dashboard",
        category: "AI / ML",
        description: "A web application that performs real-time sentiment analysis on social media data. Features include live data streaming, interactive visualizations, and trend analysis.",
        techStack: ["Python", "NLP", "React", "Node.js", "WebSocket", "D3.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        github: "https://github.com/yourusername/sentiment-analysis",
        demo: "https://your-demo.onrender.com",
        paper: null,
        date: "2024-02",
        status: "Completed"
    },
    {
        id: 4,
        title: "Android Fitness Tracker App",
        category: "Android",
        description: "A comprehensive fitness tracking application with workout planning, progress tracking, and social features. Includes integration with wearable devices and cloud synchronization.",
        techStack: ["Java", "Android SDK", "Firebase", "SQLite", "Material Design"],
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
        github: "https://github.com/yourusername/fitness-tracker",
        demo: null,
        paper: null,
        date: "2023-09",
        status: "Completed"
    },
    {
        id: 5,
        title: "Deep Learning for Medical Image Classification",
        category: "Research",
        description: "Research project exploring the use of convolutional neural networks for medical image classification. Achieved state-of-the-art results on benchmark datasets.",
        techStack: ["Python", "PyTorch", "CNN", "Computer Vision", "Medical Imaging"],
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800",
        github: "https://github.com/yourusername/medical-cnn",
        demo: null,
        paper: "research-papers/medical-cnn.pdf",
        date: "2024-03",
        status: "Published"
    },
    {
        id: 6,
        title: "E-Commerce Platform with AI Recommendations",
        category: "Web Development",
        description: "A full-stack e-commerce platform with AI-powered product recommendations, personalized shopping experience, and advanced search capabilities.",
        techStack: ["React", "Node.js", "MongoDB", "TensorFlow", "Stripe API"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
        github: "https://github.com/yourusername/ecommerce-ai",
        demo: "https://your-demo.onrender.com",
        paper: null,
        date: "2023-12",
        status: "Completed"
    }
];

// Research Papers Data
const researchData = [
    {
        id: 1,
        title: "Deep Learning Approaches for Medical Image Classification: A Comparative Study",
        conference: "IEEE International Conference on AI & Healthcare",
        abstract: "This paper presents a comprehensive comparison of various deep learning architectures for medical image classification. We evaluate CNNs, ResNets, and Vision Transformers on multiple medical imaging datasets, achieving significant improvements in accuracy and efficiency.",
        pdf: "research-papers/medical-cnn.pdf",
        year: "2024",
        authors: "Your Name, Co-Author"
    },
    {
        id: 2,
        title: "IoT-Based Smart Agriculture: A Machine Learning Approach",
        conference: "ACM Conference on IoT and Smart Systems",
        abstract: "We propose an intelligent agriculture system using IoT sensors and machine learning algorithms to optimize crop yield, monitor soil conditions, and predict weather patterns. The system demonstrates improved efficiency and reduced resource consumption.",
        pdf: "research-papers/smart-agriculture.pdf",
        year: "2023",
        authors: "Your Name, Co-Author"
    },
    {
        id: 3,
        title: "Natural Language Processing for Sentiment Analysis in Social Media",
        conference: "International Conference on NLP and Data Science",
        abstract: "This research explores advanced NLP techniques for real-time sentiment analysis on social media platforms. We propose a hybrid model combining transformer architectures with traditional ML methods, achieving superior performance on benchmark datasets.",
        pdf: "research-papers/nlp-sentiment.pdf",
        year: "2023",
        authors: "Your Name, Co-Author"
    }
];

// Certifications Data
const certificationsData = [
    {
        id: 1,
        title: "Machine Learning Specialization",
        issuer: "Stanford University (Coursera)",
        year: "2024",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
    },
    {
        id: 2,
        title: "Deep Learning Specialization",
        issuer: "deeplearning.ai",
        year: "2023",
        image: "https://images.unsplash.com/photo-1527477396000-e27137b2a0e7?w=400"
    },
    {
        id: 3,
        title: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        year: "2024",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
    },
    {
        id: 4,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023",
        image: "https://images.unsplash.com/photo-1527477396000-e27137b2a0e7?w=400"
    },
    {
        id: 5,
        title: "TensorFlow Developer Certificate",
        issuer: "TensorFlow",
        year: "2024",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400"
    },
    {
        id: 6,
        title: "Data Science with Python",
        issuer: "IBM (Coursera)",
        year: "2023",
        image: "https://images.unsplash.com/photo-1527477396000-e27137b2a0e7?w=400"
    }
];

// Timeline Data
const timelineData = [
    {
        id: 1,
        date: "2024 - Present",
        title: "AI Research Intern",
        organization: "Tech Research Lab",
        description: "Working on cutting-edge AI research projects, focusing on computer vision and natural language processing applications."
    },
    {
        id: 2,
        date: "2023",
        title: "Data Science Intern",
        organization: "Data Analytics Company",
        description: "Developed machine learning models for predictive analytics, improved model accuracy by 25%, and created interactive dashboards."
    },
    {
        id: 3,
        date: "2023",
        title: "1st Place - AI Hackathon",
        organization: "National Tech Conference",
        description: "Won first place in a 48-hour AI hackathon with a real-time disease prediction system using ensemble learning."
    },
    {
        id: 4,
        date: "2022 - Present",
        title: "Bachelor's in Computer Science",
        organization: "University Name",
        description: "Specializing in AI & Data Science. Maintaining 3.8+ GPA. Active member of AI research club and open-source contributor."
    },
    {
        id: 5,
        date: "2022",
        title: "Best Paper Award",
        organization: "IEEE Student Conference",
        description: "Received best paper award for research on IoT-based smart agriculture systems using machine learning."
    }
];

