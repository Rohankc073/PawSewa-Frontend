import { Star, Stethoscope } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Dummy data — replace later with backend
    const dummyDoctors = [
      { id: 1, name: "Dr Anjali Shrestha", experience: 9, rating: 5, imageUrl: "https://via.placeholder.com/100" },
      { id: 2, name: "Dr Dhiraj Bolero", experience: 5, rating: 5, imageUrl: "https://via.placeholder.com/100" },
      { id: 3, name: "Dr Pepper Potts", experience: 5, rating: 5, imageUrl: "https://via.placeholder.com/100" },
      { id: 4, name: "Dr Tony Stark", experience: 4, rating: 5, imageUrl: "https://via.placeholder.com/100" },
      { id: 5, name: "Dr Meghan Carter", experience: 3, rating: 5, imageUrl: "https://via.placeholder.com/100" },
      { id: 6, name: "Dr Dev Patel", experience: 2, rating: 5, imageUrl: "https://via.placeholder.com/100" },
    ];
    setDoctors(dummyDoctors);
  }, []);

  return (
    <>
      <Navbar />

      <main className="mt-12 text-[#1d1d48]">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 bg-white px-6 md:px-20 py-20 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Book Your Next Doctor Visit in Seconds.
            </h1>
            <p className="text-sm text-[#333] max-w-md">
              PawSewa helps you care for your pets by connecting you to trusted vets, adoption services, quality products, and instant AI support — all in one place.
            </p>
          </div>
          <div>
            <img src="https://via.placeholder.com/500x400" alt="Pet Doctor" className="rounded-lg shadow" />
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white px-6 md:px-20 -mt-10 relative z-10">
          <div className="bg-white shadow rounded-xl p-6 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>🐾 Veterinary</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>⭐ 5</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>⏳ 2-10 years</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>💰 No</option>
            </select>
            <div className="flex gap-2">
              <button className="bg-[#747134] text-white px-4 py-2 rounded-md text-sm hover:bg-[#5f5e2a]">Search</button>
              <button className="border border-[#747134] text-[#747134] px-4 py-2 rounded-md text-sm hover:bg-[#f8f8f1]">Reset</button>
            </div>
          </div>
        </section>

        {/* Doctor Cards */}
        <section className="px-6 md:px-20 py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#f8f8f8] p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold mb-1">{doc.name}</h3>
                <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mb-1">
                  <Stethoscope size={14} /> Vet &nbsp; | &nbsp; {doc.experience} Years
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  Ratings: {Array.from({ length: doc.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <button className="border border-[#747134] px-4 py-2 rounded-md text-sm text-[#747134] font-medium hover:bg-[#f8f8f1] transition">
                  Book Appointment
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Next &gt;</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
