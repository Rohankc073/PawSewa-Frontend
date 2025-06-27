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

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onFilterChange(filters)}
            className="flex-1 bg-[#8a8a3b] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#7a7a33] transition"
          >
            Search
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Reset
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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("http://localhost:5005/vet/all");
        const data = await res.json();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
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
      <main className="mt-4 text-[#1d1d48]">
        {/* Hero Section */}
        <section className="relative bg-[#8a8a3b] overflow-hidden pb-20">
          <div className="grid md:grid-cols-2 h-[540px]">
            <div className="px-6 md:px-20 flex flex-col justify-center text-white space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Book Your Next Doctor Visit in Seconds.
              </h1>
              <p className="text-sm max-w-md">
                PawSewa helps you care for your pets by connecting you to trusted vets, adoption services,
                quality products, and instant AI support—all in one place.
              </p>
            </div>
            <div className="w-full h-full">
              <img
                src={appointmentHero}
                alt="Doctor and Pet"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} resetFilters={resetFilters} />

        {/* Doctor Cards Section */}
        <section className="px-6 md:px-20 -mt-20">
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
