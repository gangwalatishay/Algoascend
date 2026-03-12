const courses = [
    {
        courseId: "1",
        title: "Programming with Python",
        description: "Learn Python from beginner to advanced",
        price: "₹1,000",
        image: "",
        features: ["Programming with Python – Beginner to Advanced", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "2",
        title: "Data Structures & Algorithms Mastery",
        description: "Master DSA with hands-on coding problems",
        price: "₹500",
        image: "",
        features: ["Data Structures & Algorithms Mastery", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "3",
        title: "System Design Fundamentals",
        description: "Learn to design scalable systems",
        price: "₹500",
        image: "",
        features: ["System Design Fundamentals", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "4",
        title: "Git, Linux & Developer Tools Bootcamp",
        description: "Essential tools for every developer",
        price: "₹500",
        image: "",
        features: ["Git, Linux & Developer Tools Bootcamp", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "5",
        title: "Java Full Stack Development Program",
        description: "Complete Java full stack course",
        price: "₹500,000",
        image: "",
        features: ["Java Full Stack Development Program", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "6",
        title: "Backend Engineering with Spring Boot",
        description: "Build robust backends with Spring Boot",
        price: "₹500,000",
        image: "",
        features: ["Backend Engineering with Spring Boot", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "7",
        title: "Frontend Engineering with React",
        description: "Master React and modern frontend",
        price: "₹500,000",
        image: "",
        features: ["Frontend Engineering with React", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "8",
        title: "REST API & Microservices Development",
        description: "Build APIs and microservices",
        price: "₹500,000",
        image: "",
        features: ["REST API & Microservices Development", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "9",
        title: "DevOps & Cloud Deployment (Docker + AWS)",
        description: "Learn DevOps and cloud deployment",
        price: "₹500,000",
        image: "",
        features: ["DevOps & Cloud Deployment (Docker + AWS)", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "10",
        title: "Data Analytics Professional Program",
        description: "Become a data analytics professional",
        price: "₹500,000",
        image: "",
        features: ["Data Analytics Professional Program", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "11",
        title: "SQL for Data Professionals",
        description: "Master SQL for data analysis",
        price: "₹500,000",
        image: "",
        features: ["SQL for Data Professionals", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "12",
        title: "Advanced Excel for Business Intelligence",
        description: "Excel for business intelligence",
        price: "₹500,000",
        image: "",
        features: ["Advanced Excel for Business Intelligence", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "13",
        title: "Power BI & Tableau Dashboard Mastery",
        description: "Create stunning dashboards",
        price: "₹500,000",
        image: "",
        features: ["Power BI & Tableau Dashboard Mastery", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "14",
        title: "Data Engineering with Kafka & Spark",
        description: "Big data engineering course",
        price: "₹500,000",
        image: "",
        features: ["Data Engineering with Kafka & Spark", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "15",
        title: "Machine Learning Engineering Program",
        description: "Complete ML engineering course",
        price: "₹500,000",
        image: "",
        features: ["Machine Learning Engineering Program", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "16",
        title: "Deep Learning & Computer Vision",
        description: "Deep learning and CV fundamentals",
        price: "₹500,000",
        image: "",
        features: ["Deep Learning & Computer Vision", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "17",
        title: "MLOps & Production ML Systems",
        description: "Deploy ML models to production",
        price: "₹500,000",
        image: "",
        features: ["MLOps & Production ML Systems", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "18",
        title: "AI Model Deployment",
        description: "Deploy AI models at scale",
        price: "₹500,000",
        image: "",
        features: ["AI Model Deployment", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "19",
        title: "Generative AI Engineering Program",
        description: "Master generative AI",
        price: "₹500,000",
        image: "",
        features: ["Generative AI Engineering Program", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "20",
        title: "Transformer Architecture & LLM Fundamentals",
        description: "Understand transformers and LLMs",
        price: "₹500,000",
        image: "",
        features: ["Transformer Architecture & LLM Fundamentals", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "21",
        title: "Retrieval-Augmented Generation (RAG) Systems",
        description: "Build RAG applications",
        price: "₹500,000",
        image: "",
        features: ["Retrieval-Augmented Generation (RAG) Systems", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "23",
        title: "Multi-Agent Architectures",
        description: "Build multi-agent AI systems",
        price: "₹500,000",
        image: "",
        features: ["Multi-Agent Architectures", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "24",
        title: "Agentic AI",
        description: "Learn agentic AI concepts",
        price: "₹500,000",
        image: "",
        features: ["Agentic AI", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "25",
        title: "Advanced AI System Design",
        description: "Design complex AI systems",
        price: "₹500,000",
        image: "",
        features: ["Advanced AI System Design", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "26",
        title: "FAANG Interview Preparation (DSA + System Design)",
        description: "Crack FAANG interviews",
        price: "₹500,000",
        image: "",
        features: ["FAANG Interview Preparation (DSA + System Design)", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "27",
        title: "AI Startup Builder Program",
        description: "Build your own AI startup",
        price: "₹500,000",
        image: "",
        features: ["AI Startup Builder Program", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "28",
        title: "Resume, LinkedIn & Personal Branding Mastery",
        description: "Build your personal brand",
        price: "₹500,000",
        image: "",
        features: ["Resume, LinkedIn & Personal Branding Mastery", "Description"],
        demoVideo: "",
        brochureUrl: ""
    },
    {
        courseId: "29",
        title: "Open Source & Research Publishing Bootcamp",
        description: "Contribute to open source",
        price: "₹500,000",
        image: "",
        features: ["Open Source & Research Publishing Bootcamp", "Description"],
        demoVideo: "",
        brochureUrl: ""
    }
];

module.exports = courses;
