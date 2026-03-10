import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import { courseGroups, type Course } from "./course-data";
import { loadRazorpayCheckout, openCheckout } from "@/lib/razorpay";
import { Button } from "@/components/ui/button";

type CourseItem = {
  id: number;
  price: string;
  image: string;
  features: string[];
};

function rupeesToPaise(str: string) {
  const clean = str.replace(/[^\d]/g, "");
  const rupees = parseInt(clean, 10);
  return rupees * 100;
}

export default function CourseDetail() {
  const { courseId } = useParams();

  const course: CourseItem | undefined = useMemo(() => {
    const idNum = Number(courseId);
    for (const g of courseGroups) {
      const found = g.courses.find((c: Course) => c.id === idNum);
      if (found) return found as CourseItem;
    }
    return undefined;
  }, [courseId]);

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

  if (!course) {
    return (
      <div className="flex flex-col w-full items-center justify-center md:justify-start">
        <Navbar />
        <div className="max-w-5xl w-full px-6 py-24 text-center">
          <h1 className="text-2xl mb-6">Course not found</h1>
          <Link to="/app/courses" className="text-sky-400">Back to courses</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const title = course.features[0] || "Course";
  const videoMap: Record<number, string> = {
    1: "https://www.youtube.com/embed/ysz5S6PUM-U",
    2: "https://www.youtube.com/embed/2tFnmLvz6A4",
    3: "https://www.youtube.com/embed/XBu54nfzxAQ",
  };
  const videoUrl = videoMap[course.id] || "https://www.youtube.com/embed/ysz5S6PUM-U";

  return (
    <div className="flex flex-col w-full items-center justify-center md:justify-start">
      <Navbar />
      <div className="max-w-6xl w-full px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-lg bg-zinc-800 px-4 py-2 rounded-md">{course.price}</span>
            <Button onClick={handleBuy} className="bg-sky-500 hover:bg-sky-600">Buy Now</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 w-full aspect-video bg-zinc-900 rounded-lg overflow-hidden">
            <iframe
              src={videoUrl}
              title="Course preview"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="bg-zinc-900 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold">About this course</h2>
            <p className="text-zinc-300">Comprehensive, project-based learning path designed to build real-world skills.</p>
            <ul className="list-disc list-inside space-y-2 text-zinc-300">
              {course.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="pt-4">
              <Button onClick={handleBuy} className="w-full bg-sky-500 hover:bg-sky-600">Buy Now</Button>
            </div>
            <div className="pt-2">
              <Link to="/app/courses" className="text-sky-400">Back to courses</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
