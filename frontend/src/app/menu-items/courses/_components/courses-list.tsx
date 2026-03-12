import course1 from "@/assets/courses/courses1.jpg";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadRazorpayCheckout, openCheckout } from "@/lib/razorpay";

const courseGroups = [
  {
    slug: "foundations",
    groupName: "Foundations Track",
    courses: [
      {
        id: 1,
        price: "₹1,000,000",
        image: course1,
        features: ["Programming with Python – Beginner to Advanced", "Description",],
      },
      {
        id: 2,
        price: "₹500,000",
        image: course1,
        features: ["Data Structures & Algorithms Mastery", "Description",],
      },
      {
        id: 3,
        price: "₹500,000",
        image: course1,
        features: ["System Design Fundamentals", "Description",],
      },
      {
        id: 4,
        price: "₹500,000",
        image: course1,
        features: ["Git, Linux & Developer Tools Bootcamp", "Description",],
      },
    ],
  },

  {
    slug: "software-engineering",
    groupName: "Software Engineering Track",
    courses: [
      {
        id: 5,
        price: "₹500,000",
        image: course1,
        features: ["Java Full Stack Development Program", "Description",],
      },
      {
        id: 6,
        price: "₹500,000",
        image: course1,
        features: ["Backend Engineering with Spring Boot", "Description",],
      },
      {
        id: 7,
        price: "₹500,000",
        image: course1,
        features: ["Frontend Engineering with React", "Description",],
      },
      {
        id: 8,
        price: "₹500,000",
        image: course1,
        features: ["REST API & Microservices Development", "Description",],
      },
      {
        id: 9,
        price: "₹500,000",
        image: course1,
        features: ["DevOps & Cloud Deployment (Docker + AWS)", "Description",],
      },
    ],
  },

  {
    slug: "data-analytics",
    groupName: "Data & Analytics Track",
    courses: [
      {
        id: 10,
        price: "₹500,000",
        image: course1,
        features: ["Data Analytics Professional Program", "Description",],
      },
      {
        id: 11,
        price: "₹500,000",
        image: course1,
        features: ["SQL for Data Professionals", "Description",],
      },
      {
        id: 12,
        price: "₹500,000",
        image: course1,
        features: ["Advanced Excel for Business Intelligence", "Description",],
      },
      {
        id: 13,
        price: "₹500,000",
        image: course1,
        features: ["Power BI & Tableau Dashboard Mastery", "Description",],
      },
      {
        id: 14,
        price: "₹500,000",
        image: course1,
        features: ["Data Engineering with Kafka & Spark", "Description",],
      },
    ],
  },

  {
    slug: "ai-ml",
    groupName: "AI & Machine Learning Track",
    courses: [
      {
        id: 15,
        price: "₹500,000",
        image: course1,
        features: ["Machine Learning Engineering Program", "Description",],
      },
      {
        id: 16,
        price: "₹500,000",
        image: course1,
        features: ["Deep Learning & Computer Vision", "Description",],
      },
      {
        id: 17,
        price: "₹500,000",
        image: course1,
        features: ["MLOps & Production ML Systems", "Description",],
      },
      {
        id: 18,
        price: "₹500,000",
        image: course1,
        features: ["AI Model Deployment", "Description",],
      },
    ],
  },

  {
    slug: "generative-ai",
    groupName: "Generative AI & LLM Track",
    courses: [
      {
        id: 19,
        price: "₹500,000",
        image: course1,
        features: ["Generative AI Engineering Program", "Description",],
      },
      {
        id: 20,
        price: "₹500,000",
        image: course1,
        features: ["Transformer Architecture & LLM Fundamentals", "Description",],
      },
      {
        id: 21,
        price: "₹500,000",
        image: course1,
        features: ["Retrieval-Augmented Generation (RAG) Systems", "Description",],
      },
    ],
  },

  {
    slug: "agentic-ai",
    groupName: "Agentic AI Track (Flagship)",
    courses: [
      {
        id: 23,
        price: "₹500,000",
        image: course1,
        features: ["Multi-Agent Architectures", "Description",],
      },
      {
        id: 24,
        price: "₹500,000",
        image: course1,
        features: ["Agentic AI", "Description",],
      },
      {
        id: 25,
        price: "₹500,000",
        image: course1,
        features: ["Advanced AI System Design", "Description",],
      },
    ],
  },

  {
    slug: "career-acceleration",
    groupName: "Career Acceleration Track",
    courses: [
      {
        id: 26,
        price: "₹500,000",
        image: course1,
        features: ["FAANG Interview Preparation (DSA + System Design)", "Description",],
      },
      {
        id: 27,
        price: "₹500,000",
        image: course1,
        features: ["AI Startup Builder Program", "Description",],
      },
      {
        id: 28,
        price: "₹500,000",
        image: course1,
        features: ["Resume, LinkedIn & Personal Branding Mastery", "Description",],
      },
      {
        id: 29,
        price: "₹500,000",
        image: course1,
        features: ["Open Source & Research Publishing Bootcamp", "Description",],
      },
    ],
  },
];

function rupeesToPaise(str: string) {
  const clean = str.replace(/[^\d]/g, "");
  const rupees = parseInt(clean, 10);
  return rupees * 100;
}

export default function CoursesList() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  async function handleBuy(course: { id: number; price: string; features: string[] }) {
    const userId = localStorage.getItem("userId") || "guest";
    const amount = rupeesToPaise(course.price);

    const loaded = await loadRazorpayCheckout();
    if (!loaded) {
      alert("Failed to load Razorpay");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/payment/create-order", {
        courseId: String(course.id),
        amount,
        userId,
      });

      const { orderId, key_id, currency } = res.data;
      const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

      openCheckout(
        {
          key: key_id,
          amount,
          currency,
          name: "Algoascend",
          description: course.features[0] || "Course",
          order_id: orderId,
          prefill: {
            name: user.name || "",
            email: user.email || "",
            contact: user.mobile || "",
          },
        },
        async (resp) => {
          try {
            const verify = await axios.post("http://127.0.0.1:5000/api/payment/verify", {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
              courseId: String(course.id),
              userId,
            });
            if (verify.data?.success) {
              alert("Payment successful. Course unlocked!");
            } else {
              alert("Payment verification failed");
            }
          } catch (err: unknown) {
            const e = err as { response?: { data?: { error?: string } }; message?: string };
            alert("Payment verification error: " + (e.response?.data?.error || e.message || "Unknown error"));
          }
        },
        () => {
          alert("Payment popup closed");
        }
      );
    } catch (err: unknown) {
      const e = err as { response?: { data?: { error?: string } }; message?: string };
      alert("Order creation failed: " + (e.response?.data?.error || e.message || "Unknown error"));
    }
  }

  return (
    <div className="mt-20 md:mt-30 w-full flex flex-col items-center coursespage gap-16 md:gap-32 px-4 md:px-8 lg:px-12">
      {courseGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          id={group.slug}
          className="w-full scroll-mt-24 md:scroll-mt-32"
        >
          {/* GROUP TITLE */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-10 text-start text-muted-foreground">
            {group.groupName}
          </h2>
          {/* GROUP CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {group.courses.map((course) => (
              <div
                className="card cursor-pointer"
                key={course.id}
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div
                  className="imgBx"
                  style={{ backgroundImage: `url(${course.image})` }}
                ></div>
                <div className="content">
                  <span className="price">
                    <a href="#">{course.price}</a>
                  </span>
                  <ul>
                    {course.features.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-row justify-center items-center mt-8 gap-x-2">
                    <Button
                      variant="default"
                      className="text-white bg-[#970747] hover:bg-[#970747] text-xs px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Added to wishlist!");
                      }}
                    >
                      WishList
                    </Button>
                    <Button
                      variant="outline"
                      className="text-[#970747] hover:text-[#970747] bg-[#232949] hover:bg-[#232949] border-[#970747] text-xs px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert("Added to cart!");
                      }}
                    >
                      Add to cart
                    </Button>
                    <Button
                      className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuy(course);
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}
