import { Outlet } from "react-router"
import { Toaster } from "sonner"

const RootLayout = () => {
    return (
        <div className="min-h-screen bg-white text-black">
            <header className="border-b border-gray-200 px-8 py-4">
                <span className="text-lg text-center font-semibold tracking-tight">
                    Sales Order App
                </span>
            </header>
            <main className="p-8">
                <Outlet />
                <Toaster richColors position="top-right" />
            </main>
        </div>
    )
}

export default RootLayout