import {
  Bath,
  Brain,
  Cpu,
  Heart,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  PawPrint,
  Scissors,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import trio from "../../assets/3dogs.png";
import hero from "../../assets/hero.png";
import AIChat from "../../components/Aichatbot"; // You must create this component
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScrollToTopButton from "../../components/scrolltotop";

export default function Home() {
  const footerRef = useRef(null);
  const [showAIButton, setShowAIButton] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Hide AI button when footer is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowAIButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);
  return (
    <>
      <Navbar />
      <main className="mt-12 text-[#1d1d48]">
        {/* Hero Section */}
        <section className="relative bg-white px-6 md:px-20 py-20 grid md:grid-cols-2 items-center gap-10 overflow-hidden">
          {/* Decorative Icons */}
          <div className="absolute top-20 left-6 text-8xl opacity-10 select-none rotate-20 hidden lg:block">🐾</div>
          <div className="absolute bottom-10 left-1/3 text-8xl opacity-10 rotate-20 select-none hidden lg:block">🐾</div>
          <div className="absolute top-1/2 left-1/2 text-8xl opacity-10 rotate-12 select-none hidden lg:block">🐾</div>

          {/* Left Text */}
          <div className="translate-x-0 md:translate-x-5 relative z-10">
            <span className="inline-flex items-center text-sm px-4 py-1 rounded-full border border-[#1d1d48] bg-[#f0f0f4] text-[#1d1d48] font-medium">
  #1 Petcare in Nepal <span className="ml-2">🇳🇵</span>
</span>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-5">
  Compassionate Care <br /> for Pets You <br /> Call Family
</h1>

            <p className="text-sm text-[#333] mt-4 max-w-md">
              Our veterinary clinic provides comprehensive and compassionate care for your beloved pets
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="bg-[#747134] text-white px-6 py-2 rounded-md font-medium hover:bg-[#63602a] transition">
                Book Appointment
              </button>
              <button className="border border-[#747134] px-6 py-2 rounded-md text-[#747134] font-medium hover:bg-[#f8f8f1] transition">
                Get Started
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:translate-x-20">
            <div className="flex justify-center relative z-10">
              <img src={hero} alt="Dog and Cat" className="max-h-[380px] md:max-h-[420px] z-10" />
            </div>
          </div>
        </section>

        {/* Scrolling Category Strip */}
        <div className="overflow-hidden bg-[#747134] py-3 shadow">
          <div className="flex animate-marquee whitespace-nowrap space-x-16 text-white text-sm font-medium tracking-wide">
            {[...Array(4)].map((_, loopIdx) => (
              <div className="flex items-center space-x-10" key={loopIdx}>
                <span className="flex items-center gap-2"><Cpu size={18} className="text-white" /> AI Integration</span>
                <span className="flex items-center gap-2"><ShoppingCart size={18} className="text-white" /> Pet Supplies</span>
                <span className="flex items-center gap-2"><Scissors size={18} className="text-white" /> Grooming Service</span>
                <span className="flex items-center gap-2"><Stethoscope size={18} className="text-white" /> Veterinary Support</span>
                <span className="flex items-center gap-2"><HeartHandshake size={18} className="text-white" /> Pet Adoption</span>
                <span className="flex items-center gap-2"><Heart size={18} className="text-white" /> Pet Care</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <section className="bg-[#f8f8f8] px-6 md:px-20 py-20 text-[#1d1d48]">
  <h2 className="text-2xl md:text-3xl font-bold mb-10">
    What Makes Us Exceptional in Pet Care
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      {
        title: "Safe & Secure Spaces",
        desc: "Clean, hygienic, and secure environments designed for your pet’s comfort and wellbeing.",
        icon: ShieldCheck,
      },
      {
        title: "Tailored Advice",
        desc: "Expert recommendations and ongoing support personalized to your pet’s needs.",
        icon: Lightbulb,
      },
      {
        title: "Pawfect Care",
        desc: "We treat your pets like family with love, compassion, and professional attention.",
        icon: PawPrint,
      },
      {
        title: "Pet Community",
        desc: "A vibrant community of pet lovers working together for happier, healthier pets.",
        icon: Users,
      },
    ].map((item, i) => (
      <div
        key={i}
        className="rounded-xl p-6 group bg-white shadow-sm hover:bg-[#e4e2cf] hover:border hover:border-[#747134] transition-all duration-300 cursor-pointer border border-transparent"
      >
        <div className="w-10 h-10 rounded-full bg-[#747134] flex items-center justify-center mb-4">
          <item.icon size={20} className="text-white" />
        </div>
        <h4 className="font-semibold mb-2 group-hover:text-[#1d1d48]">{item.title}</h4>
        <p className="text-sm text-gray-600">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

{showAIButton && (
  <button
    onClick={() => setIsChatOpen(true)}
    className="fixed bottom-5 right-5 bg-[#747134] p-3 rounded-full text-white shadow-lg hover:bg-[#5f5e2a] transition-all z-50"
    aria-label="Ask PawSewa AI"
  >
    <MessageCircle size={22} />
  </button>
)}

<AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />


        {/* Mission Section */}
  

<section className="bg-white px-6 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
  {/* Left Image */}
  <div className="md:order-2 flex justify-center w-full md:w-1/2">
    <img src={trio} alt="Trio Pets" className="w-[90%] md:w-[480px]" />
  </div>

  {/* Right Content */}
  <div className="max-w-xl md:w-1/2">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug text-[#1d1d48]">
      Because They’re Family — <br /> Not Just Pets
    </h2>
    <p className="text-gray-700 text-sm mb-6 leading-relaxed">
      At PawSewa, we go beyond pet care — we nurture bonds. From regular health checkups to stress-free grooming, we treat your pets with the same love and care they give you every day.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
      <div className="flex gap-3 items-start">
        <div className="bg-[#747134] p-2 rounded-full">
          <Bath size={18} className="text-white" />
        </div>
        <p>
          <strong>Gentle Grooming</strong><br />
          Comfortable, calming spaces with soft, skillful hands.
        </p>
      </div>
      <div className="flex gap-3 items-start">
        <div className="bg-[#747134] p-2 rounded-full">
          <Syringe size={18} className="text-white" />
        </div>
        <p>
          <strong>Preventive Vet Care</strong><br />
          Proactive support from caring medical professionals.
        </p>
      </div>
      <div className="flex gap-3 items-start">
        <div className="bg-[#747134] p-2 rounded-full">
          <Brain size={18} className="text-white" />
        </div>
        <p>
          <strong>Smart Pet Solutions</strong><br />
          Tech-backed insights for lifelong pet wellness.
        </p>
      </div>
      <div className="flex gap-3 items-start">
        <div className="bg-[#747134] p-2 rounded-full">
          <Users size={18} className="text-white" />
        </div>
        <p>
          <strong>A Caring Community</strong><br />
          Built for pet lovers, by pet lovers — always.
        </p>
      </div>
    </div>
  </div>
</section>





      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );

  
};



