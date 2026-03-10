import {
  Mail,
  MapPin,
  Phone
} from "lucide-react";

export default function Footer() {
  return (
    <>
      <div className="mt-20 bg-[#18181B] w-full py-12 px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <img src="../src/assets/logo.png" alt="Logo" className="h-16 w-16" />
            <p className="text-sm text-gray-300">
              Transforming programming education with industry-aligned curriculum and expert instructors.
            </p>
          </div>
          <div>
            <h2 className="text-2xl mb-4">Quick Links</h2>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#">Home</a></li>
              <li><a href="#">Courses</a></li>
              <li><a href="#">Instructors</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl mb-4">Contact Us</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-0.5">
                  <Mail />
                </span>
                <p>
                  <a href="mailto:info@algoascend.in">info@algoascend.in</a>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">
                  <Phone />
                </span>
                <p>
                  <a href="tel:+918873368527">+91 88733 68527</a>
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5">
                  <MapPin />
                </span>
                <span>123 Main Street, City, Country</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-zinc-800 py-4 text-center bg-[#18181B]">
        <p className="text-sm text-gray-400">&copy; 2025 AlgoAscend. All rights reserved.</p>
      </div>
    </>
  )
}
