import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Layout } from "@/components/layout/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import Home from "@/pages/Home"
import SearchPage from "@/pages/Search"
import LoginPage from "@/pages/Login"
import RegisterPage from "@/pages/Register"
import JoinProPage from "@/pages/JoinPro"
import ProfessionalProfile from "@/pages/Profile"
import BookPage from "@/pages/Book"
import InfoPage from "@/pages/Info"
import HelpPage from "@/pages/Help"
import ClientDashboard from "@/pages/ClientDashboard"
import ProDashboard from "@/pages/ProDashboard"
import AdminDashboard from "@/pages/AdminDashboard"
import { Toaster } from "sonner"

import ForgotPasswordPage from "@/pages/ForgotPassword"
import ResetPasswordPage from "@/pages/ResetPassword"

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <Toaster theme="dark" position="bottom-right" richColors />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/join-pro" element={<JoinProPage />} />
            <Route path="/professionals/:id" element={<ProfessionalProfile />} />
            <Route path="/book/:proId" element={<BookPage />} />
            <Route path="/info/:slug" element={<InfoPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-white">404 - Página no encontrada</div>} />
          </Route>
          {/* Dashboards without general navbar/footer */}
          <Route path="/dashboard/pro" element={<ProDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
