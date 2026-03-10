import axios from "axios";
import { loadRazorpayCheckout, openCheckout } from "@/lib/razorpay";
import { Link } from "react-router-dom";
import { courseGroups } from "../course-data";

export default function CoursesList() {

  const location = useLocation();

export default function CoursesList() {
  function rupeesToPaise(str: string) {
    const clean = str.replace(/[^\d]/g, "");
    const rupees = parseInt(clean, 10);
    return rupees * 100;
  }

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
          } catch (err: any) {
            console.error("Verification error:", err);
            alert("Payment verification error: " + (err.response?.data?.error || err.message));
          }
        },
        () => {
          alert("Payment popup closed");
        }
      );
    } catch (err: any) {
      console.error("Order creation error:", err);
      alert("Order creation failed: " + (err.response?.data?.error || err.message));
    }
  }

  return (
    <div className="mt-30 w-full flex flex-col items-center coursespage gap-32">
      {courseGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          id={group.slug}
          className="w-full pl-20 scroll-mt-32"
        >
          {/* GROUP TITLE */}
          <h2 className="text-3xl font-bold mb-10 text-start text-muted-foreground">
            {group.groupName}
          </h2>
          {/* GROUP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {group.courses.map((course) => (
              <div className="card" key={course.id}>
                <Link to={`/app/courses/${course.id}`}>
                  <div
                    className="imgBx"
                    style={{ backgroundImage: `url(${course.image})` }}
                  ></div>
                </Link>

                <div className="content">
                  <Link to={`/app/courses/${course.id}`}>
                    <span className="price">
                      <a href="#">{course.price}</a>
                    </span>
                    <ul>
                      {course.features.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Link>
                  <div className="button-group">
                    <button className="wishlist-btn">
                      WishList
                    </button>
                    <button className="add-to-cart-btn">
                      Add to card
                    </button>
                    <button
                      className="buy-now-btn"
                      onClick={() => handleBuy(course)}
                    >
                      Buy Now
                    </button>
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
