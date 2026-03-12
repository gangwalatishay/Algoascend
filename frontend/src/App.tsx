import { Route, Routes } from "react-router-dom";

import Page from "./app/page";
import Courses from "./app/menu-items/courses/courses";
import Gallery from "./app/menu-items/gallery/gallerypage";
import CourseDetail from "./app/menu-items/courses/course-detail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="flex flex-col items-center justify-center md:justify-start">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
}
