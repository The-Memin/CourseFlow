import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "@/pages/public/Home";
import Login from "@/pages/public/Login";
import Register from "@/pages/public/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import Courses from "@/pages/dashboard/courses/Courses";
import CreateCourse from "@/pages/dashboard/courses/CreateCourse";
import Profile from "@/pages/dashboard/profile/Profile";
import CourseDetail from "@/pages/dashboard/courses/CourseDetail";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login"
            element={ <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }/>
          <Route path="/register"
                  element={<PublicRoute><Register/></PublicRoute>} />
        </Route>

        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/courses" element={<Courses/>}/>
          <Route path="/dashboard/courses/:id" element={<CourseDetail/>}/>
          <Route path="/dashboard/new-course" element={<CreateCourse/>}/>
          <Route path="/dashboard/profile" element={<Profile/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}