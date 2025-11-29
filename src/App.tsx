import { useState, useEffect } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { ServicesPage } from "./components/ServicesPage";
import imgImage from "figma:asset/6c66aba246da7499b22a27291bf2594c089e5e76.png";

type Page = "chatbot" | "services";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => {
    // Check URL params on initial load
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('page') === 'services' ? 'services' : 'chatbot';
  });

  // Listen for URL changes (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      setCurrentPage(urlParams.get('page') === 'services' ? 'services' : 'chatbot');
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (currentPage === "services") {
      url.searchParams.set('page', 'services');
    } else {
      url.searchParams.delete('page');
    }
    window.history.pushState({}, '', url);
  }, [currentPage]);

  // Services Page
  if (currentPage === "services") {
    return <ServicesPage onBack={() => setCurrentPage("chatbot")} />;
  }

  // Chatbot Page (default)
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-[#002faf] px-6 py-5 flex items-center justify-between">
        <div className="h-8 w-[125px]">
          <img alt="Slalom" className="h-full w-full object-contain" src={imgImage} />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => setCurrentPage("services")}
            className="text-white hover:text-[#6da1fd] hover:font-bold transition-all cursor-pointer font-semibold"
            style={{ fontFamily: 'Montserrat', fontWeight: 600 }}
          >
            Services
          </button>
          <a href="#" className="text-white hover:text-[#6da1fd] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Industries</a>
          <a href="#" className="text-white hover:text-[#6da1fd] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Insights</a>
          <a href="#" className="text-white hover:text-[#6da1fd] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Stories</a>
          <a href="#" className="text-white hover:text-[#6da1fd] hover:font-bold transition-all font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Who we are</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-[#002faf] flex items-start justify-center px-4 py-8 md:py-16">
        <div className="w-full max-w-[900px]">
          <ChatInterface />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f1c41] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-[#6da1fd] tracking-[2px] uppercase mb-2">Fiercely Human Consulting</p>
              <p className="text-white text-sm tracking-[2px] uppercase">©2025 Slalom, Inc. All Rights Reserved</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-white hover:text-[#6da1fd] tracking-[2px] uppercase transition-colors">Privacy Policy</a>
              <a href="#" className="text-white hover:text-[#6da1fd] tracking-[2px] uppercase transition-colors">Terms of Use</a>
              <a href="#" className="text-white hover:text-[#6da1fd] tracking-[2px] uppercase transition-colors">Cookie Settings</a>
              <a href="https://www.slalom.com/ca/en/legal/accessibility" className="text-white hover:text-[#6da1fd] tracking-[2px] uppercase transition-colors">Accessibility Statement</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
