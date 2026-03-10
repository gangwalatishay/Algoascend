import { Route, Routes } from "react-router-dom";

import Page from "./app/page";

import Courses from "./app/menu-items/courses/courses";
import CourseDetail from "./app/menu-items/courses/course-detail";


export default function App() {
  const isAuthed = Boolean(localStorage.getItem("token"));
  return (
    <div className="min-h-screen bg-[#0F1115] text-white">
      <div className="flex flex-col items-center justify-center md:justify-start">
        <Routes>
          <Route path="/" element={<Navigate to={isAuthed ? "/app" : "/login"} replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<Page />} />
          <Route path="/app/courses" element={<Courses />} />
          <Route path="/app/courses/:courseId" element={<CourseDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};
