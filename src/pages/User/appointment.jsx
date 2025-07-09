// src/pages/Appointment.js

import { useEffect, useState } from "react";
import appointmentHero from "../../assets/app.png";
import EnhancedDoctorCards from "../../components/DoctorCard";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

// ✅ FilterBar Component
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
    const reset = {
      specialty: '',
      rating: '',
      experience: '',
      bookingFee: ''
    };
    setFilters(reset);
    resetFilters();
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 -mt-24 relative z-10 mx-6 md:mx-20 mb-12 border border-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1d1d48] mb-2">
          Find Your Perfect Veterinarian
        </h3>
        <p className="text-gray-600 text-sm">
          Filter through our trusted network of veterinary professionals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-end">
        {/* Specialty Filter */}
        <div className="space-y-3">
          <label className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <span className="text-[#8a8a3b]">🏥</span>
            Specialty
          </label>
          <select
            value={filters.specialty}
            onChange={(e) => handleFilterChange('specialty', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8a8a3b]/30 focus:border-[#8a8a3b] outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="">All Specialties</option>
            <option value="general">General Practice</option>
            <option value="surgery">Surgery</option>
            <option value="dermatology">Dermatology</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedic">Orthopedic</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <label className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8a8a3b]/30 focus:border-[#8a8a3b] outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="">All Ratings</option>
            <option value="5">⭐ 5 Stars</option>
            <option value="4">⭐ 4+ Stars</option>
            <option value="3">⭐ 3+ Stars</option>
          </select>
        </div>

        {/* Experience Filter */}
        <div className="space-y-3">
          <label className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <span className="text-[#8a8a3b]">👨‍⚕️</span>
            Experience
          </label>
          <select
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8a8a3b]/30 focus:border-[#8a8a3b] outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="">All Experience</option>
            <option value="1-3">1-3 Years</option>
            <option value="4-6">4-6 Years</option>
            <option value="7-10">7-10 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </div>

        {/* Booking Fee Filter */}
        <div className="space-y-3">
          <label className="text-sm text-gray-700 font-semibold flex items-center gap-2">
            <span className="text-green-500">💰</span>
            Booking Fee
          </label>
          <select
            value={filters.bookingFee}
            onChange={(e) => handleFilterChange('bookingFee', e.target.value)}
            className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-xl focus:ring-2 focus:ring-[#8a8a3b]/30 focus:border-[#8a8a3b] outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
          >
            <option value="">All Fees</option>
            <option value="free">Free</option>
            <option value="low">Under $50</option>
            <option value="medium">$50 - $100</option>
            <option value="high">$100+</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 col-span-full lg:col-span-1">
          <button
            onClick={() => onFilterChange(filters)}
            className="flex-1 bg-gradient-to-r from-[#8a8a3b] to-[#7a7a33] text-white px-8 py-3.5 rounded-xl font-semibold hover:from-[#7a7a33] hover:to-[#6a6a2b] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            🔍 Search
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            ↻ Reset
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Appointment Page Component
export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5005/vet/all");
        const data = await res.json();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...doctors];

    if (filters.specialty) {
      filtered = filtered.filter(doc => doc.specialization === filters.specialty);
    }

    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      filtered = filtered.filter(doc => doc.rating >= minRating);
    }

    if (filters.experience) {
      filtered = filtered.filter(doc => {
        const exp = doc.experience;
        switch (filters.experience) {
          case '1-3': return exp >= 1 && exp <= 3;
          case '4-6': return exp >= 4 && exp <= 6;
          case '7-10': return exp >= 7 && exp <= 10;
          case '10+': return exp >= 10;
          default: return true;
        }
      });
    }

    if (filters.bookingFee) {
      filtered = filtered.filter(doc => doc.bookingFee === filters.bookingFee);
    }

    setFilteredDoctors(filtered);
  };

  const resetFilters = () => {
    setFilteredDoctors(doctors);
  };

  return (
    <>
      <Navbar />
      <main className="mt-4 text-[#1d1d48] bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#8a8a3b] via-[#7a7a33] to-[#6a6a2b] overflow-hidden pb-28">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative grid md:grid-cols-2 h-[600px] items-center">
            <div className="px-6 md:px-20 flex flex-col justify-center text-white space-y-8 z-10">
              <div className="space-y-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  🐾 Trusted Veterinary Care
                </div>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Book Your Next Doctor Visit in{" "}
                  <span className="text-yellow-300">Seconds</span>
                </h1>
                <p className="text-lg text-white/90 max-w-lg leading-relaxed">
                  PawSewa helps you care for your pets by connecting you to trusted vets, adoption services,
                  quality products, and instant AI support—all in one place.
                </p>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Trusted Vets</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">Support</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">4.9★</div>
                  <div className="text-sm text-white/80">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-full relative">
              <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
              <img
                src={appointmentHero}
                alt="Doctor and Pet"
                className="w-full h-full object-cover object-center rounded-3xl relative z-10"
              />
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} resetFilters={resetFilters} />

        {/* Doctor Cards Section */}
        <section className="px-6 md:px-20 pb-20">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8a8a3b] border-t-transparent mx-auto mb-2"></div>
              <h3 className="text-xl font-semibold text-gray-600 ">Loading doctors...</h3>
              <p className="text-gray-500">Please wait while we fetch the best veterinarians for you</p>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="space-y-2">
              <div className="text-center space-y">
                {/* <h2 className="text-3xl font-bold text-[#1d1d48]">
                  Available Veterinarians
                </h2> */}
                {/* <p className="text-gray-600">
                  Found {filteredDoctors.length} professional{filteredDoctors.length !== 1 ? 's' : ''} ready to help your pet
                </p> */}
              </div>
              <EnhancedDoctorCards doctors={filteredDoctors} />
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-lg mx-auto max-w-md">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">No doctors found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to see more results or browse all available veterinarians
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#8a8a3b] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#7a7a33] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Show All Doctors
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}