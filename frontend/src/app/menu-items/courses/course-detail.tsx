import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "@/app/navbar/navbar";
import Footer from "./_components/footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, FileText } from "lucide-react";
import { loadRazorpayCheckout, openCheckout } from "@/lib/razorpay";

type CourseItem = {
  id: number;
  price: string;
  image: string;
  features: string[];
  demoVideo?: string;
  title?: string;
  description?: string;
};

// Validate AWS S3 video URL
function isValidS3Url(url: string): boolean {
  if (!url) return false;
  // Check if it's an S3 URL or a direct video file URL
  return url.includes("amazonaws.com") || url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".ogg");
}

function rupeesToPaise(str: string) {
  const clean = str.replace(/[^\d]/g, "");
  const rupees = parseInt(clean, 10);
  return rupees * 100;
}



export default function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      if (!courseId) return;

      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:5000/api/courses/${courseId}`);
        const data = response.data;

        setCourse({
          id: Number(data.courseId),
          price: data.price,
          image: data.image || "",
          features: data.features || [],
          demoVideo: data.demoVideo,
          title: data.title,
          description: data.description,
        });
        setError(null);
      } catch (err: unknown) {
        const e = err as { response?: { data?: { error?: string } }; message?: string };
        setError(e.response?.data?.error || e.message || "Failed to fetch course");
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#0F1115]">
        <Navbar />
        <div className="flex-1 w-full px-4 md:px-8 lg:px-12 pt-24 pb-12 flex items-center justify-center">
          <h1 className="text-2xl mb-6">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-[#0F1115]">
        <Navbar />
        <div className="flex-1 w-full px-4 md:px-8 lg:px-12 pt-24 pb-12 flex items-center justify-center text-center">
          <div>
            <h1 className="text-2xl mb-6">{error || "Course not found"}</h1>
            <Link to="/app/courses" className="text-sky-400 hover:underline">← Back to courses</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const title = course.title || course.features[0] || "Course";
  const description = course.description || "Comprehensive, project-based learning path designed to build real-world skills.";
  const hasDemoVideo = isValidS3Url(course.demoVideo || "");

  async function handleBuy() {
    if (!course) return;
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
    <div className="flex flex-col w-full min-h-screen bg-[#0F1115]">
      <Navbar />
      <div className="flex-1 w-full px-4 md:px-8 lg:px-12 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          {/* Left side - Demo Video (50% width) */}
          <div className="w-full lg:w-1/2">
            {hasDemoVideo ? (
              <div className="w-full h-full min-h-[400px] lg:min-h-[500px] bg-zinc-900 rounded-lg overflow-hidden">
                <video controls className="w-full h-full min-h-[400px] lg:min-h-[500px] rounded-lg">
                  <source src={course.demoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="w-full h-full min-h-[400px] lg:min-h-[500px] bg-zinc-900 rounded-lg flex items-center justify-center">
                <span className="text-zinc-500">Demo video coming soon</span>
              </div>
            )}
          </div>

          {/* Right side - Course Details (50% width) */}
          <div className="w-full lg:w-1/2 bg-zinc-900 rounded-lg p-6 md:p-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
            <p className="text-zinc-300 text-lg">{description}</p>
            <div className="text-3xl font-bold text-sky-400">{course.price}</div>
            <div className="pt-4 space-y-3">
              <Button
                onClick={handleBuy}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white text-lg py-3 h-auto"
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border-2 border-zinc-500 text-white hover:bg-zinc-700 hover:text-white hover:border-zinc-400 text-lg py-3 h-auto"
                onClick={() => alert("Added to cart!")}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border-2 border-zinc-500 text-white hover:bg-zinc-700 hover:text-white hover:border-zinc-400 text-lg py-3 h-auto"
                onClick={() => alert("Added to wishlist!")}
              >
                <Heart className="w-5 h-5 mr-2" />
                Add to Wishlist
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent border-2 border-green-600 text-green-500 hover:bg-green-600 hover:text-white hover:border-green-600 text-lg py-3 h-auto"
                onClick={() => alert("Downloading Course Brochure...")}
              >
                <FileText className="w-5 h-5 mr-2" />
                Download Course Brochure
              </Button>
            </div>
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-2">Course Features</h3>
              <ul className="list-disc list-inside space-y-2 text-zinc-300">
                {course.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="pt-4">
              <Link to="/courses" className="text-sky-400 hover:underline">← Back to courses</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
