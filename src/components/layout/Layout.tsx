
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  hideAuth?: boolean; // Add option to hide auth components for auth pages
}

const Layout = ({ children, hideAuth = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header hideAuth={hideAuth} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
