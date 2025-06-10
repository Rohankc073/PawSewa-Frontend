import { ArrowUp } from "lucide-react"; // Or use any icon you prefer
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#747134] hover:bg-[#5f5e2a] text-white p-3 rounded-full shadow-lg transition duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
};

export default ScrollToTopButton;
