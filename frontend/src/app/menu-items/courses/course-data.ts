import course1 from "@/assets/courses/courses1.jpg";

export type Course = {
  id: number;
  price: string;
  image: string;
  features: string[];
};

export type CourseGroup = {
  groupName: string;
  slug?: string;
  courses: Course[];
};

export const courseGroups: CourseGroup[] = [
  {
    groupName: "Foundations Track",
    courses: [
      {
        id: 1,
        price: "₹1,000",
        image: course1,
        features: ["Programming with Python – Beginner to Advanced", "Description"],
      },
      {
        id: 2,
        price: "₹500",
        image: course1,
        features: ["Data Structures & Algorithms Mastery", "Description"],
      },
      {
        id: 3,
        price: "₹500",
        image: course1,
        features: ["System Design Fundamentals", "Description"],
      },
      {
        id: 4,
        price: "₹500",
        image: course1,
        features: ["Git, Linux & Developer Tools Bootcamp", "Description"],
      },
    ],
  },
  {
    groupName: "Software Engineering Track",
    courses: [
      {
        id: 5,
        price: "₹500,000",
        image: course1,
        features: ["Java Full Stack Development Program", "Description"],
      },
      {
        id: 6,
        price: "₹500,000",
        image: course1,
        features: ["Backend Engineering with Spring Boot", "Description"],
      },
      {
        id: 7,
        price: "₹500,000",
        image: course1,
        features: ["Frontend Engineering with React", "Description"],
      },
      {
        id: 8,
        price: "₹500,000",
        image: course1,
        features: ["REST API & Microservices Development", "Description"],
      },
      {
        id: 9,
        price: "₹500,000",
        image: course1,
        features: ["DevOps & Cloud Deployment (Docker + AWS)", "Description"],
      },
    ],
  },
  {
    groupName: "Data & Analytics Track",
    courses: [
      {
        id: 10,
        price: "₹500,000",
        image: course1,
        features: ["Data Analytics Professional Program", "Description"],
      },
      {
        id: 11,
        price: "₹500,000",
        image: course1,
        features: ["SQL for Data Professionals", "Description"],
      },
      {
        id: 12,
        price: "₹500,000",
        image: course1,
        features: ["Advanced Excel for Business Intelligence", "Description"],
      },
      {
        id: 13,
        price: "₹500,000",
        image: course1,
        features: ["Power BI & Tableau Dashboard Mastery", "Description"],
      },
      {
        id: 14,
        price: "₹500,000",
        image: course1,
        features: ["Data Engineering with Kafka & Spark", "Description"],
      },
    ],
  },
  {
    groupName: "AI & Machine Learning Track",
    courses: [
      {
        id: 15,
        price: "₹500,000",
        image: course1,
        features: ["Machine Learning Engineering Program", "Description"],
      },
      {
        id: 16,
        price: "₹500,000",
        image: course1,
        features: ["Deep Learning & Computer Vision", "Description"],
      },
      {
        id: 17,
        price: "₹500,000",
        image: course1,
        features: ["MLOps & Production ML Systems", "Description"],
      },
      {
        id: 18,
        price: "₹500,000",
        image: course1,
        features: ["AI Model Deployment", "Description"],
      },
    ],
  },
  {
    groupName: "Generative AI & LLM Track",
    courses: [
      {
        id: 19,
        price: "₹500,000",
        image: course1,
        features: ["Generative AI Engineering Program", "Description"],
      },
      {
        id: 20,
        price: "₹500,000",
        image: course1,
        features: ["Transformer Architecture & LLM Fundamentals", "Description"],
      },
      {
        id: 21,
        price: "₹500,000",
        image: course1,
        features: ["Retrieval-Augmented Generation (RAG) Systems", "Description"],
      },
    ],
  },
  {
    groupName: "Agentic AI Track (Flagship)",
    courses: [
      {
        id: 23,
        price: "₹500,000",
        image: course1,
        features: ["Multi-Agent Architectures", "Description"],
      },
      {
        id: 24,
        price: "₹500,000",
        image: course1,
        features: ["Agentic AI", "Description"],
      },
      {
        id: 25,
        price: "₹500,000",
        image: course1,
        features: ["Advanced AI System Design", "Description"],
      },
    ],
  },
  {
    groupName: "Career Acceleration Track",
    courses: [
      {
        id: 26,
        price: "₹500,000",
        image: course1,
        features: ["FAANG Interview Preparation (DSA + System Design)", "Description"],
      },
      {
        id: 27,
        price: "₹500,000",
        image: course1,
        features: ["AI Startup Builder Program", "Description"],
      },
      {
        id: 28,
        price: "₹500,000",
        image: course1,
        features: ["Resume, LinkedIn & Personal Branding Mastery", "Description"],
      },
      {
        id: 29,
        price: "₹500,000",
        image: course1,
        features: ["Open Source & Research Publishing Bootcamp", "Description"],
      },
    ],
  },
];

