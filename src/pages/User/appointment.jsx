// src/pages/Appointment.js

import { useEffect, useState } from "react";
import appointmentHero from "../../assets/app.png";
import EnhancedDoctorCards from "../../components/DoctorCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// Filter Component
const FilterBar = ({ onFilterChange, resetFilters }) => {
  const [filters, setFilters] = useState({
    specialty: '',
    rating: '',
    experience: '',
    bookingFee: ''
  });

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      specialty: '',
      rating: '',
      experience: '',
      bookingFee: ''
    };
    setFilters(resetFilters);
    resetFilters();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 -mt-20 relative z-10 mx-6 md:mx-20 mb-8">
      <h3 className="text-lg font-semibold text-[#1d1d48] mb-4">
        Find a doctor at your own ease
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
        {/* Specialty Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Specialty</label>
          <select
            value={filters.specialty}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a8a3b] focus:border-transparent outline-none transition-all"
          >
            <option value="">Veterinary</option>
            <option value="general">General Practice</option>
            <option value="surgery">Surgery</option>
            <option value="dermatology">Dermatology</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedic">Orthopedic</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Rating</label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a8a3b] focus:border-transparent outline-none transition-all"
          >
            <option value="">⭐ 5</option>
            <option value="5">⭐ 5 Stars</option>
            <option value="4">⭐ 4+ Stars</option>
            <option value="3">⭐ 3+ Stars</option>
          </select>
        </div>

        {/* Experience Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Experience</label>
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a8a3b] focus:border-transparent outline-none transition-all"
          >
            <option value="">2-10 years</option>
            <option value="1-3">1-3 Years</option>
            <option value="4-6">4-6 Years</option>
            <option value="7-10">7-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </div>

        {/* Booking Fee Filter */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600 font-medium">Booking Fee</label>
          <select
            value={filters.bookingFee}
            onChange={(e) => handleFilterChange('bookingFee', e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8a8a3b] focus:border-transparent outline-none transition-all"
          >
            <option value="">💰 No</option>
            <option value="free">Free</option>
            <option value="low">Under $50</option>
            <option value="medium">$50 - $100</option>
            <option value="high">$100+</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onFilterChange(filters)}
            className="flex-1 bg-[#8a8a3b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a7a33] transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const dummyDoctors = [
      { 
        id: 1, 
        name: "Dr Anjali Shrestha", 
        experience: 9, 
        rating: 5, 
        specialty: "surgery",
        bookingFee: "medium",
        imageUrl: "https://via.placeholder.com/100" 
      },
      { 
        id: 2, 
        name: "Dr Dhiraj Bolero", 
        experience: 5, 
        rating: 5, 
        specialty: "general",
        bookingFee: "free",
        imageUrl: "https://via.placeholder.com/100" 
      },
      { 
        id: 3, 
        name: "Dr Pepper Potts", 
        experience: 5, 
        rating: 5, 
        specialty: "cardiology",
        bookingFee: "low",
        imageUrl: "https://via.placeholder.com/100" 
      },
      { 
        id: 4, 
        name: "Dr Tony Stark", 
        experience: 4, 
        rating: 5, 
        specialty: "orthopedic",
        bookingFee: "high",
        imageUrl: "https://via.placeholder.com/100" 
      },
      { 
        id: 5, 
        name: "Dr Meghan Carter", 
        experience: 3, 
        rating: 4, 
        specialty: "dermatology",
        bookingFee: "medium",
        imageUrl: "https://via.placeholder.com/100" 
      },
      { 
        id: 6, 
        name: "Dr Dev Patel", 
        experience: 2, 
        rating: 5, 
        specialty: "general",
        bookingFee: "free",
        imageUrl: "https://via.placeholder.com/100" 
      },
    ];
    setDoctors(dummyDoctors);
    setFilteredDoctors(dummyDoctors);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...doctors];

    // Filter by specialty
    if (filters.specialty) {
      filtered = filtered.filter(doctor => doctor.specialty === filters.specialty);
    }

    // Filter by rating
    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      filtered = filtered.filter(doctor => doctor.rating >= minRating);
    }

    // Filter by experience
    if (filters.experience) {
      filtered = filtered.filter(doctor => {
        const exp = doctor.experience;
        switch (filters.experience) {
          case '1-3':
            return exp >= 1 && exp <= 3;
          case '4-6':
            return exp >= 4 && exp <= 6;
          case '7-10':
            return exp >= 7 && exp <= 10;
          case '10+':
            return exp >= 10;
          default:
            return true;
        }
      });
    }

    // Filter by booking fee
    if (filters.bookingFee) {
      filtered = filtered.filter(doctor => doctor.bookingFee === filters.bookingFee);
    }

    setFilteredDoctors(filtered);
  };

  const resetFilters = () => {
    setFilteredDoctors(doctors);
  };

  return (
    <>
      <Navbar />
      <main className="mt-12 text-[#1d1d48]">

        {/* ✅ Hero Section */}
        <section className="relative bg-[#8a8a3b] overflow-hidden pb-20">
          <div className="grid md:grid-cols-2 h-[540px]">
            {/* Left: Text */}
            <div className="px-6 md:px-20 flex flex-col justify-center text-white space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Book Your Next Doctor Visit in Seconds.
              </h1>
              <p className="text-sm max-w-md">
                PawSewa helps you care for your pets by connecting you to trusted vets, adoption services,
                quality products, and instant AI support—all in one place.
              </p>
            </div>

            {/* Right: Image */}
            <div className="w-full h-full">
              <img
                src={appointmentHero}
                alt="Doctor and Pet"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* ✅ Filter Bar - Overlapping the hero section */}
        <FilterBar 
          onFilterChange={handleFilterChange}
          resetFilters={resetFilters}
        />

        {/* ✅ Doctor Cards Grid */}
        <section className="px-6 md:px-20 pb-20">
          {filteredDoctors.length > 0 ? (
            <EnhancedDoctorCards doctors={filteredDoctors} />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No doctors found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}






{/* ✅ Overlapping Filter Bar */}
          {/* <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-20">
            <div className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full">
                <option>🐾 Veterinary</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full">
                <option>⭐ 5</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full">
                <option>⏳ 2-10 years</option>
              </select>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full">
                <option>💰 No</option>
              </select>
              <div className="flex gap-2">
                <button className="bg-[#747134] text-white px-4 py-2 rounded-md text-sm hover:bg-[#5f5e2a]">
                  Search
                </button>
                <button className="border border-[#747134] text-[#747134] px-4 py-2 rounded-md text-sm hover:bg-[#f8f8f1]">
                  Reset
                </button>
              </div>
            </div>
          </div> */}