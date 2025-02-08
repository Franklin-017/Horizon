import { PropsWithChildren } from "react";
import Header from "./header";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-br from-background to-muted">
            <Header />
            <main className="min-h-screen w-[95vw] mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="border-t backdrop-blur py-6 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto text-xs px-4 text-center text-gray-400">
                    <p>Made with by Franklin</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
