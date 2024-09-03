import { ProtectedRoute } from "protected-route-react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About/About";
import AdminCourses from "./components/Admin/AdminCourses/AdminCourses";
import CreateCourse from "./components/Admin/CreateCourse/CreateCourse";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Users from "./components/Admin/Users/Users";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ResetPassword from "./components/Auth/ResetPassword";
import Contact from "./components/Contact/Contact";
import CoursePage from "./components/CoursePage/CoursePage";
import Courses from "./components/Courses/Courses";
import Home from "./components/Home/Home";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Loader from "./components/Layout/Loader";
import NotFound from "./components/Layout/NotFound";
import PaymentFail from "./components/Payments/PaymentFail";
import PaymentSuccess from "./components/Payments/PaymentSuccess";
import Subscribe from "./components/Payments/Subscribe";
import ChangePassword from "./components/Profile/ChangePassword";
import Profile from "./components/Profile/Profile";
import UpdateProfile from "./components/Profile/UpdateProfile";
import Request from "./components/Request/Request";
import { useGetMyProfileQuery } from "./redux/api/userApi";

function App() {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  const { isLoading } = useGetMyProfileQuery();

  // Use useSelector to access the cached data directly
  const profile = useSelector(
    (state) => state.api.queries["getMyProfile(undefined)"]?.data
  );

  console.log(profile);

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header isAuthenticated={profile?.user} user={profile?.user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route
              path="/course/:id"
              element={
                <ProtectedRoute isAuthenticated={profile?.user}>
                  <CoursePage user={profile?.user} />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request" element={<Request />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={profile?.user}>
                  <Profile user={profile?.user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateProfile"
              element={
                <ProtectedRoute isAuthenticated={profile?.user}>
                  <UpdateProfile user={profile?.user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={profile?.user}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!profile?.user}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute
                  isAuthenticated={!profile?.user}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <ProtectedRoute
                  isAuthenticated={!profile?.user}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resetpassword/:token"
              element={
                <ProtectedRoute
                  isAuthenticated={!profile?.user}
                  redirect="/profile"
                >
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/subscribe"
              element={
                <ProtectedRoute isAuthenticated={profile?.user}>
                  <Subscribe user={profile?.user} />
                </ProtectedRoute>
              }
            />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfail" element={<PaymentFail />} />

            {/* Admin Routes  */}

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute
                  isAuthenticated={profile?.user}
                  adminRoute={true}
                  isAdmin={profile?.user?.role === "admin"}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/createcourse"
              element={
                <ProtectedRoute
                  isAuthenticated={profile?.user}
                  adminRoute={true}
                  isAdmin={profile?.user?.role === "admin"}
                >
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/courses"
              element={
                <ProtectedRoute
                  isAuthenticated={profile?.user}
                  adminRoute={true}
                  isAdmin={profile?.user?.role === "admin"}
                >
                  <AdminCourses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute
                  isAuthenticated={profile?.user}
                  adminRoute={true}
                  isAdmin={profile?.user?.role === "admin"}
                >
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </>
      )}
    </Router>
  );
}

export default App;

// CourseDetailPage
