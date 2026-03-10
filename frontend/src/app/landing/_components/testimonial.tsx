import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// const testimonial = [
//   {
//     src: "/testimonial/testi1.jpg",
//     name: "Anita Sharma",
//     experience:
//       "CookCart made my daily meal planning so easy! The food tastes just like home and the service is always prompt.",
//     color: "from-teal-500 to-teal-700",
//   },
//   {
//     src: "/testimonial/testi2.jpg",
//     name: "Sunil Verma",
//     experience:
//       "I love the variety and freshness. My kids enjoy every meal and I get more time for myself. Highly recommended!",
//     color: "from-pink-500 to-pink-700",
//   },
//   {
//     src: "/testimonial/testi3.jpg",
//     name: "Meena Gupta",
//     experience:
//       "The chefs are amazing and the menu is perfect for busy families. CookCart truly brings comfort food to our table.",
//     color: "from-sky-500 to-sky-700",
//   },
// ];

export default function Testimonial() {
  return (
    <div className="px-4 md:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl md:text-4xl font-medium">
          Success Stories
        </h2>
        <p className="font-medium mt-2 max-w-2xl">
          Hear from our alumni who have successfully transitioned into tech careers
        </p>
      </div>

      <div className="container max-w-6xl mx-auto">
        <div className="box">
          <div className="content">
            <img src="../src/assets/testimonial/img.png" alt="" className="quote" />
            <p>
              "Yugank Singh played a huge role in helping me land my Software Engineering Internship. His guidance and the way he broke down complex concepts made a big difference in my preparation."
            </p>
            <img src="../src/assets/testimonial/sohome.png" alt="" className="user" />
            <h3>
              Sohome Mandal
              <br />
              <span>
                Software Engineering Intern
              </span>
            </h3>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <img src="../src/assets/testimonial/img.png" alt="" className="quote" />
            <p>
              "The system design sessions by the Google engineer were eye-opening. I gained insights that I couldn't find in any online course. Now I'm working at Flipkart!"
            </p>
            <img src="" alt="" className="user" />
            <h3>
              Priya Patel
              <br />
              <span>
                Frontend Developer at Flipkart
              </span>
            </h3>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <img src="../src/assets/testimonial/img.png" alt="" className="quote" />
            <p>
              "I started as a complete beginner. The structured curriculum and supportive instructors helped me build confidence. I'm now working as a backend developer at Swiggy."
            </p>
            <img src="" alt="" className="user" />
            <h3>
              Arjun Reddy
              <br />
              <span>
                Backend Developer at Swiggy
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
