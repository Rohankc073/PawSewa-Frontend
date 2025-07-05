// src/pages/PetDetailPage.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const PetDetailPage = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:5005/adoption/all`);
        const found = res.data.find((p) => p._id === petId);
        setPet(found);
      } catch (err) {
        console.error("Error fetching pet:", err);
      }
    };

    fetchPet();
  }, [petId]);

  if (!pet) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#747134] mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg font-medium">Loading pet details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <span className="hover:text-[#747134] cursor-pointer">Home</span> 
              <span className="mx-2">›</span>
              <span className="hover:text-[#747134] cursor-pointer">Pets</span>
              <span className="mx-2">›</span>
              <span className="text-[#747134] font-medium">{pet.name}</span>
            </nav>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Pet Image Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 flex items-center justify-center relative">
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="relative group">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 group-hover:shadow-2xl transition-all duration-300">
                    <img
                      src={`http://localhost:5005/${pet.image?.replace(/\\/g, "/")}`}
                      alt={pet.name}
                      className="w-full max-w-md max-h-[400px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-[#747134] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Available
                  </div>
                </div>
              </div>

              {/* Pet Info Section */}
              <div className="p-8 md:p-12 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#747134] to-[#5a5628]"></div>
                
                <div className="mb-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d48] mb-3 leading-tight">{pet.name}</h1>
                  <p className="text-gray-600 text-lg leading-relaxed">{pet.description || "A lovable companion waiting for a new home."}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Type", value: pet.animalType, icon: "🐾" },
                    { label: "Breed", value: pet.breed, icon: "🏷️" },
                    { label: "Gender", value: pet.gender, icon: "⚧" },
                    { label: "Size", value: pet.size, icon: "📏" },
                    { label: "Age", value: `${pet.age} ${pet.age === 1 ? "year" : "years"}`, icon: "🎂" },
                    { label: "Height", value: pet.height, icon: "📐" },
                    { label: "Color", value: pet.color, icon: "🎨" },
                    { label: "Location", value: pet.location, icon: "📍" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-500">{item.label}</p>
                          <p className="text-base font-semibold text-gray-800">{item.value}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Link to={`/adoption-form/${pet._id}`} className="block">
  <button className="w-full px-8 py-4 bg-gradient-to-r from-[#747134] to-[#5a5628] text-white text-lg font-semibold rounded-xl hover:from-[#5a5628] hover:to-[#444021] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
    Adopt Me
  </button>
</Link>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-6 py-3 border-2 border-[#747134] text-[#747134] font-semibold rounded-xl hover:bg-[#747134] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Message
                    </button>
                    <button className="px-6 py-3 border-2 border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-[#747134]/10 to-[#5a5628]/10 rounded-xl border border-[#747134]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="font-semibold text-[#1d1d48]">Adoption Info</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ready to give {pet.name} a forever home? Contact us to learn more about our adoption process and requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#747134]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1d1d48]">Health Checked</h3>
              </div>
              <p className="text-gray-600 text-sm">All our pets receive comprehensive health checks before adoption.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#747134]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1d1d48]">Loving Care</h3>
              </div>
              <p className="text-gray-600 text-sm">We provide ongoing support to ensure successful adoptions.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#747134]/10 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1d1d48]">Quick Process</h3>
              </div>
              <p className="text-gray-600 text-sm">Our streamlined adoption process gets pets home faster.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PetDetailPage;