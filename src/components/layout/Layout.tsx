import { Outlet } from "react-router-dom"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
            <Navbar />
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
