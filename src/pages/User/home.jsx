// import {
//   Bath,
//   Brain,
//   Cpu,
//   Heart,
//   HeartHandshake,
//   Lightbulb,
//   MessageCircle,
//   PawPrint,
//   Scissors,
//   ShieldCheck,
//   ShoppingCart,
//   Stethoscope,
//   Syringe,
//   Users,
// } from "lucide-react";

// import { useEffect, useRef, useState } from "react";
// import trio from "../../assets/3dogs.png";
// import hero from "../../assets/hero.png";
// import AIChat from "../../components/Aichatbot"; // You must create this component
// import Footer from "../../components/footer";
// import Navbar from "../../components/navbar";
// import ScrollToTopButton from "../../components/scrolltotop";

// export default function App() {
//   const footerRef = useRef(null);
//   const [showAIButton, setShowAIButton] = useState(true);
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   // Hide AI button when footer is in view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setShowAIButton(!entry.isIntersecting);
//       },
//       { threshold: 0.1 }
//     );
//     if (footerRef.current) {
//       observer.observe(footerRef.current);
//     }
//     return () => {
//       if (footerRef.current) observer.unobserve(footerRef.current);
//     };
//   }, []);
//   return (
//     <>
//       <Navbar />
//       <main className="mt-12 text-[#1d1d48]">
//         {/* Hero Section */}
//         <section className="relative bg-white px-6 md:px-20 py-20 grid md:grid-cols-2 items-center gap-10 overflow-hidden">
//           {/* Decorative Icons */}
//           <div className="absolute top-20 left-6 text-8xl opacity-10 select-none rotate-20 hidden lg:block">🐾</div>
//           <div className="absolute bottom-10 left-1/3 text-8xl opacity-10 rotate-20 select-none hidden lg:block">🐾</div>
//           <div className="absolute top-1/2 left-1/2 text-8xl opacity-10 rotate-12 select-none hidden lg:block">🐾</div>

//           {/* Left Text */}
//           <div className="translate-x-0 md:translate-x-5 relative z-10">
//             <span className="inline-flex items-center text-sm px-4 py-1 rounded-full border border-[#1d1d48] bg-[#f0f0f4] text-[#1d1d48] font-medium">
//   #1 Petcare in Nepal <span className="ml-2">🇳🇵</span>
// </span>

//             <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-5">
//   Compassionate Care <br /> for Pets You <br /> Call Family
// </h1>

//             <p className="text-sm text-[#333] mt-4 max-w-md">
//               Our veterinary clinic provides comprehensive and compassionate care for your beloved pets
//             </p>
//             <div className="flex flex-wrap gap-4 mt-6">
//               <button className="bg-[#747134] text-white px-6 py-2 rounded-md font-medium hover:bg-[#63602a] transition">
//                 Book Appointment
//               </button>
//               <button className="border border-[#747134] px-6 py-2 rounded-md text-[#747134] font-medium hover:bg-[#f8f8f1] transition">
//                 Get Started
//               </button>
//             </div>
//           </div>

//           {/* Right Image */}
//           <div className="md:translate-x-20">
//             <div className="flex justify-center relative z-10">
//               <img src={hero} alt="Dog and Cat" className="max-h-[380px] md:max-h-[420px] z-10" />
//             </div>
//           </div>
//         </section>

//         {/* Scrolling Category Strip */}
//         <div className="overflow-hidden bg-[#747134] py-3 shadow">
//           <div className="flex animate-marquee whitespace-nowrap space-x-16 text-white text-sm font-medium tracking-wide">
//             {[...Array(4)].map((_, loopIdx) => (
//               <div className="flex items-center space-x-10" key={loopIdx}>
//                 <span className="flex items-center gap-2"><Cpu size={18} className="text-white" /> AI Integration</span>
//                 <span className="flex items-center gap-2"><ShoppingCart size={18} className="text-white" /> Pet Supplies</span>
//                 <span className="flex items-center gap-2"><Scissors size={18} className="text-white" /> Grooming Service</span>
//                 <span className="flex items-center gap-2"><Stethoscope size={18} className="text-white" /> Veterinary Support</span>
//                 <span className="flex items-center gap-2"><HeartHandshake size={18} className="text-white" /> Pet Adoption</span>
//                 <span className="flex items-center gap-2"><Heart size={18} className="text-white" /> Pet Care</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Features Section */}
//         <section className="bg-[#f8f8f8] px-6 md:px-20 py-20 text-[#1d1d48]">
//   <h2 className="text-2xl md:text-3xl font-bold mb-10">
//     What Makes Us Exceptional in Pet Care
//   </h2>

//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//     {[
//       {
//         title: "Safe & Secure Spaces",
//         desc: "Clean, hygienic, and secure environments designed for your pet’s comfort and wellbeing.",
//         icon: ShieldCheck,
//       },
//       {
//         title: "Tailored Advice",
//         desc: "Expert recommendations and ongoing support personalized to your pet’s needs.",
//         icon: Lightbulb,
//       },
//       {
//         title: "Pawfect Care",
//         desc: "We treat your pets like family with love, compassion, and professional attention.",
//         icon: PawPrint,
//       },
//       {
//         title: "Pet Community",
//         desc: "A vibrant community of pet lovers working together for happier, healthier pets.",
//         icon: Users,
//       },
//     ].map((item, i) => (
//       <div
//         key={i}
//         className="rounded-xl p-6 group bg-white shadow-sm hover:bg-[#e4e2cf] hover:border hover:border-[#747134] transition-all duration-300 cursor-pointer border border-transparent"
//       >
//         <div className="w-10 h-10 rounded-full bg-[#747134] flex items-center justify-center mb-4">
//           <item.icon size={20} className="text-white" />
//         </div>
//         <h4 className="font-semibold mb-2 group-hover:text-[#1d1d48]">{item.title}</h4>
//         <p className="text-sm text-gray-600">{item.desc}</p>
//       </div>
//     ))}
//   </div>
// </section>

// {showAIButton && (
//   <button
//     onClick={() => setIsChatOpen(true)}
//     className="fixed bottom-5 right-5 bg-[#747134] p-3 rounded-full text-white shadow-lg hover:bg-[#5f5e2a] transition-all z-50"
//     aria-label="Ask PawSewa AI"
//   >
//     <MessageCircle size={22} />
//   </button>
// )}

// <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />


//         {/* Mission Section */}
  

// <section className="bg-white px-6 md:px-20 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
//   {/* Left Image */}
//   <div className="md:order-2 flex justify-center w-full md:w-1/2">
//     <img src={trio} alt="Trio Pets" className="w-[90%] md:w-[480px]" />
//   </div>

//   {/* Right Content */}
//   <div className="max-w-xl md:w-1/2">
//     <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug text-[#1d1d48]">
//       Because They’re Family — <br /> Not Just Pets
//     </h2>
//     <p className="text-gray-700 text-sm mb-6 leading-relaxed">
//       At PawSewa, we go beyond pet care — we nurture bonds. From regular health checkups to stress-free grooming, we treat your pets with the same love and care they give you every day.
//     </p>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-800">
//       <div className="flex gap-3 items-start">
//         <div className="bg-[#747134] p-2 rounded-full">
//           <Bath size={18} className="text-white" />
//         </div>
//         <p>
//           <strong>Gentle Grooming</strong><br />
//           Comfortable, calming spaces with soft, skillful hands.
//         </p>
//       </div>
//       <div className="flex gap-3 items-start">
//         <div className="bg-[#747134] p-2 rounded-full">
//           <Syringe size={18} className="text-white" />
//         </div>
//         <p>
//           <strong>Preventive Vet Care</strong><br />
//           Proactive support from caring medical professionals.
//         </p>
//       </div>
//       <div className="flex gap-3 items-start">
//         <div className="bg-[#747134] p-2 rounded-full">
//           <Brain size={18} className="text-white" />
//         </div>
//         <p>
//           <strong>Smart Pet Solutions</strong><br />
//           Tech-backed insights for lifelong pet wellness.
//         </p>
//       </div>
//       <div className="flex gap-3 items-start">
//         <div className="bg-[#747134] p-2 rounded-full">
//           <Users size={18} className="text-white" />
//         </div>
//         <p>
//           <strong>A Caring Community</strong><br />
//           Built for pet lovers, by pet lovers — always.
//         </p>
//       </div>
//     </div>
//   </div>
// </section>





//       </main>
//       <ScrollToTopButton />
//       <Footer />
//     </>
//   );
// }


import { Award, Clock, Globe, Medal, Star, Target, TrendingUp, Trophy, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState('both');
  const [hoveredStat, setHoveredStat] = useState(null);

  // Career Summary Data
  const careerStats = {
    messi: {
      name: "Lionel Messi",
      goals: 838,
      assists: 359,
      matches: 1069,
      trophies: 44,
      ballonDors: 8,
      goalsPer90: 0.79,
      assistsPer90: 0.34,
      conversionRate: 17.8,
      shotAccuracy: 52.3,
      penaltyConversion: 77.4,
      dribblesCompleted: 2847,
      keyPasses: 4521,
      chancesCreated: 6234,
      teamTrophies: 35,
      individualAwards: 41
    },
    ronaldo: {
      name: "Cristiano Ronaldo",
      goals: 908,
      assists: 251,
      matches: 1237,
      trophies: 35,
      ballonDors: 5,
      goalsPer90: 0.72,
      assistsPer90: 0.20,
      conversionRate: 15.2,
      shotAccuracy: 48.7,
      penaltyConversion: 84.8,
      dribblesCompleted: 1892,
      keyPasses: 2134,
      chancesCreated: 3567,
      teamTrophies: 28,
      individualAwards: 34
    }
  };

  // Goals by Club Data
  const clubGoalsData = [
    { club: 'Barcelona', messi: 672, ronaldo: 0, messiYears: '2004-2021', ronaldoYears: '-' },
    { club: 'PSG', messi: 32, ronaldo: 0, messiYears: '2021-2023', ronaldoYears: '-' },
    { club: 'Inter Miami', messi: 34, ronaldo: 0, messiYears: '2023-', ronaldoYears: '-' },
    { club: 'Sporting', messi: 0, ronaldo: 5, messiYears: '-', ronaldoYears: '2002-2003' },
    { club: 'Man United', messi: 0, ronaldo: 145, messiYears: '-', ronaldoYears: '2003-2009, 2021-2022' },
    { club: 'Real Madrid', messi: 0, ronaldo: 451, messiYears: '-', ronaldoYears: '2009-2018' },
    { club: 'Juventus', messi: 0, ronaldo: 101, messiYears: '-', ronaldoYears: '2018-2021' },
    { club: 'Al Nassr', messi: 0, ronaldo: 74, messiYears: '-', ronaldoYears: '2023-' }
  ];

  // League Performance Data
  const leagueData = [
    { league: 'La Liga', messi: 474, ronaldo: 311, messiApps: 520, ronaldoApps: 292 },
    { league: 'Premier League', messi: 0, ronaldo: 103, messiApps: 0, ronaldoApps: 236 },
    { league: 'Serie A', messi: 0, ronaldo: 81, messiApps: 0, ronaldoApps: 98 },
    { league: 'Ligue 1', messi: 16, ronaldo: 0, messiApps: 32, ronaldoApps: 0 },
    { league: 'Saudi Pro League', messi: 0, ronaldo: 68, messiApps: 0, ronaldoApps: 74 },
    { league: 'Champions League', messi: 129, ronaldo: 140, messiApps: 163, ronaldoApps: 183 }
  ];

  // Playing Style Radar Data
  const playingStyleData = [
    { attribute: 'Goals', messi: 95, ronaldo: 100, fullMark: 100 },
    { attribute: 'Assists', messi: 100, ronaldo: 70, fullMark: 100 },
    { attribute: 'Dribbling', messi: 100, ronaldo: 80, fullMark: 100 },
    { attribute: 'Pace', messi: 85, ronaldo: 88, fullMark: 100 },
    { attribute: 'Physicality', messi: 72, ronaldo: 95, fullMark: 100 },
    { attribute: 'Positioning', messi: 88, ronaldo: 96, fullMark: 100 }
  ];

  // Goals by Season Data
  const goalsBySeasonData = [
    { year: '2009', messi: 38, ronaldo: 26, messiAssists: 18, ronaldoAssists: 7 },
    { year: '2010', messi: 47, ronaldo: 33, messiAssists: 11, ronaldoAssists: 9 },
    { year: '2011', messi: 53, ronaldo: 54, messiAssists: 24, ronaldoAssists: 12 },
    { year: '2012', messi: 91, ronaldo: 63, messiAssists: 22, ronaldoAssists: 15 },
    { year: '2013', messi: 45, ronaldo: 69, messiAssists: 12, ronaldoAssists: 16 },
    { year: '2014', messi: 58, ronaldo: 61, messiAssists: 22, ronaldoAssists: 22 },
    { year: '2015', messi: 58, ronaldo: 57, messiAssists: 29, ronaldoAssists: 16 },
    { year: '2016', messi: 59, ronaldo: 55, messiAssists: 21, ronaldoAssists: 15 },
    { year: '2017', messi: 54, ronaldo: 53, messiAssists: 16, ronaldoAssists: 12 },
    { year: '2018', messi: 51, ronaldo: 49, messiAssists: 26, ronaldoAssists: 8 },
    { year: '2019', messi: 51, ronaldo: 39, messiAssists: 19, ronaldoAssists: 14 },
    { year: '2020', messi: 31, ronaldo: 37, messiAssists: 27, ronaldoAssists: 7 },
    { year: '2021', messi: 38, ronaldo: 47, messiAssists: 14, ronaldoAssists: 6 },
    { year: '2022', messi: 23, ronaldo: 32, messiAssists: 20, ronaldoAssists: 2 },
    { year: '2023', messi: 21, ronaldo: 54, messiAssists: 20, ronaldoAssists: 13 },
    { year: '2024', messi: 25, ronaldo: 44, messiAssists: 18, ronaldoAssists: 13 }
  ];

  // Trophies breakdown
  const trophiesData = [
    { name: 'Champions League', messi: 4, ronaldo: 5 },
    { name: 'League Titles', messi: 12, ronaldo: 7 },
    { name: 'Domestic Cups', messi: 9, ronaldo: 4 },
    { name: 'International', messi: 3, ronaldo: 2 },
    { name: 'Individual', messi: 16, ronaldo: 17 }
  ];

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
          : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md'
      }`}
    >
      {label}
    </button>
  );

  const MetricCard = ({ icon: Icon, title, messiValue, ronaldoValue, unit = "", description, color = "blue" }) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onMouseEnter={() => setHoveredStat(title)}
      onMouseLeave={() => setHoveredStat(null)}
    >
      <div className="flex items-center mb-4">
        <Icon className="w-6 h-6 text-blue-500 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">{messiValue}{unit}</div>
          <div className="text-sm text-gray-600 font-medium">Messi</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
          <div className="text-3xl font-bold text-red-600">{ronaldoValue}{unit}</div>
          <div className="text-sm text-gray-600 font-medium">Ronaldo</div>
        </div>
      </div>
      {hoveredStat === title && (
        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
          {description}
        </div>
      )}
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent mb-2">
                GOAT Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-600">Comprehensive Career Analysis: Messi vs Ronaldo</p>
            </div>
            
            {/* Player Profiles */}
            <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="text-center group">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">LM</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Trophy className="w-5 h-5 text-yellow-800" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-blue-600 mb-1">Lionel Messi</h2>
                <p className="text-gray-600 mb-2">Argentina • Inter Miami</p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">8 Ballon d'Or</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">World Cup Winner</span>
                </div>
              </div>
              
              <div className="text-4xl font-bold text-gray-400 hidden md:block">VS</div>
              
              <div className="text-center group">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 via-red-500 to-red-600 flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white text-4xl font-bold">CR</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Trophy className="w-5 h-5 text-yellow-800" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-red-600 mb-1">Cristiano Ronaldo</h2>
                <p className="text-gray-600 mb-2">Portugal • Al Nassr</p>
                <div className="flex justify-center space-x-2">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">5 Ballon d'Or</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Euro Winner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <TabButton 
            id="overview" 
            label="📊 Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="goals" 
            label="⚽ Goals Analysis" 
            isActive={activeTab === 'goals'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="performance" 
            label="🔥 Performance" 
            isActive={activeTab === 'performance'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="style" 
            label="🎯 Playing Style" 
            isActive={activeTab === 'style'} 
            onClick={setActiveTab}
          />
          <TabButton 
            id="trophies" 
            label="🏆 Trophies" 
            isActive={activeTab === 'trophies'} 
            onClick={setActiveTab}
          />
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                icon={Target} 
                title="Career Goals" 
                messiValue={careerStats.messi.goals}
                ronaldoValue={careerStats.ronaldo.goals}
                description="Total goals scored across all competitions"
              />
              <MetricCard 
                icon={Users} 
                title="Career Assists" 
                messiValue={careerStats.messi.assists}
                ronaldoValue={careerStats.ronaldo.assists}
                description="Total assists provided to teammates"
              />
              <MetricCard 
                icon={Award} 
                title="Ballon d'Or Awards" 
                messiValue={careerStats.messi.ballonDors}
                ronaldoValue={careerStats.ronaldo.ballonDors}
                description="FIFA's highest individual honor"
              />
              <MetricCard 
                icon={Trophy} 
                title="Total Trophies" 
                messiValue={careerStats.messi.trophies}
                ronaldoValue={careerStats.ronaldo.trophies}
                description="All team and individual trophies won"
              />
              <MetricCard 
                icon={Clock} 
                title="Goals per 90min" 
                messiValue={careerStats.messi.goalsPer90}
                ronaldoValue={careerStats.ronaldo.goalsPer90}
                description="Average goals scored per full match"
              />
              <MetricCard 
                icon={Star} 
                title="Matches Played" 
                messiValue={careerStats.messi.matches}
                ronaldoValue={careerStats.ronaldo.matches}
                description="Total professional matches played"
              />
            </div>

            {/* Goals and Assists Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Goals Timeline (2009-2024)</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={goalsBySeasonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="messi" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    name="Messi Goals" 
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ronaldo" 
                    stroke="#EF4444" 
                    strokeWidth={3} 
                    name="Ronaldo Goals"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-8">
            {/* Goals by Club */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Goals by Club</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={clubGoalsData.filter(club => club.messi > 0 || club.ronaldo > 0)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="club" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="messi" fill="#3B82F6" name="Messi" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ronaldo" fill="#EF4444" name="Ronaldo" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* League Performance */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Goals by League/Competition</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={leagueData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="league" type="category" width={120} stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="messi" fill="#3B82F6" name="Messi" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="ronaldo" fill="#EF4444" name="Ronaldo" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard 
                icon={Target} 
                title="Conversion Rate" 
                messiValue={careerStats.messi.conversionRate}
                ronaldoValue={careerStats.ronaldo.conversionRate}
                unit="%"
                description="Percentage of shots converted to goals"
              />
              <MetricCard 
                icon={Zap} 
                title="Shot Accuracy" 
                messiValue={careerStats.messi.shotAccuracy}
                ronaldoValue={careerStats.ronaldo.shotAccuracy}
                unit="%"
                description="Percentage of shots on target"
              />
              <MetricCard 
                icon={Medal} 
                title="Penalty Conversion" 
                messiValue={careerStats.messi.penaltyConversion}
                ronaldoValue={careerStats.ronaldo.penaltyConversion}
                unit="%"
                description="Penalty kick success rate"
              />
              <MetricCard 
                icon={TrendingUp} 
                title="Key Passes" 
                messiValue={careerStats.messi.keyPasses}
                ronaldoValue={careerStats.ronaldo.keyPasses}
                description="Passes leading to scoring opportunities"
              />
              <MetricCard 
                icon={Star} 
                title="Dribbles Completed" 
                messiValue={careerStats.messi.dribblesCompleted}
                ronaldoValue={careerStats.ronaldo.dribblesCompleted}
                description="Successful dribbles past opponents"
              />
              <MetricCard 
                icon={Globe} 
                title="Chances Created" 
                messiValue={careerStats.messi.chancesCreated}
                ronaldoValue={careerStats.ronaldo.chancesCreated}
                description="Total goal-scoring opportunities created"
              />
            </div>

            {/* Head-to-Head */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Head-to-Head Record</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="text-5xl font-bold text-blue-600 mb-2">16</div>
                  <div className="text-gray-700 font-semibold">Messi Wins</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <div className="text-5xl font-bold text-gray-600 mb-2">12</div>
                  <div className="text-gray-700 font-semibold">Draws</div>
                </div>
                <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                  <div className="text-5xl font-bold text-red-600 mb-2">11</div>
                  <div className="text-gray-700 font-semibold">Ronaldo Wins</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">23</div>
                    <div className="text-sm text-gray-600">Messi Goals</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">22</div>
                    <div className="text-sm text-gray-600">Ronaldo Goals</div>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">Total meetings: 39 matches across all competitions</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Playing Style Comparison</h3>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={playingStyleData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="attribute" tick={{ fontSize: 14, fontWeight: 'bold' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }}
                    tickCount={6}
                  />
                  <Radar 
                    name="Messi" 
                    dataKey="messi" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Radar 
                    name="Ronaldo" 
                    dataKey="ronaldo" 
                    stroke="#EF4444" 
                    fill="#EF4444" 
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                  <Legend />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'trophies' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Trophy Comparison</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={trophiesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="messi" fill="#3B82F6" name="Messi" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="ronaldo" fill="#EF4444" name="Ronaldo" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Trophy Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-700 mb-4">🏆 Messi's Major Achievements</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />World Cup 2022 (Golden Ball)</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />8 Ballon d'Or Awards</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />4 Champions League Titles</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />10 La Liga Titles</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />Copa América 2021</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                <h4 className="text-xl font-bold text-red-700 mb-4">🏆 Ronaldo's Major Achievements</h4>
                <ul className="space-y-2 text-red-800">
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />5 Champions League Titles</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />5 Ballon d'Or Awards</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />Euro 2016 & Nations League</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />3 Premier League Titles</li>
                  <li className="flex items-center"><Trophy className="w-4 h-4 mr-2" />2 La Liga Titles</li>
                </ul>
              </div>
            </div>

            {/* Clutch Performance Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🔥 Clutch Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <h4 className="text-lg font-bold text-yellow-700 mb-4">Goals in Finals</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">28</div>
                      <div className="text-sm text-gray-600">Messi</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">24</div>
                      <div className="text-sm text-gray-600">Ronaldo</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <h4 className="text-lg font-bold text-green-700 mb-4">Knockout Goals</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">49</div>
                      <div className="text-sm text-gray-600">Messi</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">67</div>
                      <div className="text-sm text-gray-600">Ronaldo</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <h4 className="text-lg font-bold text-purple-700 mb-4">vs Top 5 Teams</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-bold text-blue-600">32</div>
                      <div className="text-sm text-gray-600">Messi</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-red-600">29</div>
                      <div className="text-sm text-gray-600">Ronaldo</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* El Clasico & Big Match Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">El Clásico Record</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Matches</span>
                    <span className="font-bold">48</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">26</div>
                      <div className="text-sm text-gray-600">Messi Goals</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">18</div>
                      <div className="text-sm text-gray-600">Ronaldo Goals</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Champions League Finals</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Finals Played</span>
                    <span className="font-bold">Messi: 4 | Ronaldo: 5</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">2</div>
                      <div className="text-sm text-gray-600">Goals in Finals</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">4</div>
                      <div className="text-sm text-gray-600">Goals in Finals</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Impact Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🧩 Team Impact Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
              <h4 className="text-lg font-bold text-indigo-700 mb-2">Minutes per Goal</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-2xl font-bold text-blue-600">101</div>
                  <div className="text-xs text-gray-600">Messi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">112</div>
                  <div className="text-xs text-gray-600">Ronaldo</div>
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
              <h4 className="text-lg font-bold text-teal-700 mb-2">Team Win %</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-2xl font-bold text-blue-600">73%</div>
                  <div className="text-xs text-gray-600">Messi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">68%</div>
                  <div className="text-xs text-gray-600">Ronaldo</div>
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <h4 className="text-lg font-bold text-orange-700 mb-2">Goal Contribution</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-2xl font-bold text-blue-600">1.12</div>
                  <div className="text-xs text-gray-600">Messi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">0.94</div>
                  <div className="text-xs text-gray-600">Ronaldo</div>
                </div>
              </div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
              <h4 className="text-lg font-bold text-pink-700 mb-2">Big Chances Created</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-2xl font-bold text-blue-600">892</div>
                  <div className="text-xs text-gray-600">Messi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">534</div>
                  <div className="text-xs text-gray-600">Ronaldo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            Data compiled from official sources including FIFA, UEFA, La Liga, Premier League, and club statistics
          </p>
          <p className="text-sm text-gray-500">
            Last updated: June 2024 | Career statistics through current season
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;