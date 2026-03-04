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

const MAINTENANCE_MODE = true;

function App() {
  if (MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] pointer-events-none" />

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-center tracking-tight relative z-10">
          <span className="text-[#fbd38d]">Your</span>Service
        </h1>

        <div className="relative z-10 border border-white/10 bg-[#1F1F1F]/50 backdrop-blur rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sitio en Construcción</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Estamos preparando la red de especialistas más importante de Santiago. Vuelve pronto para descubrir la nueva plataforma.
          </p>
        </div>
      </div>
    );
  }

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
