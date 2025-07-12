import axios from "axios";
import {
  Award,
  Calendar,
  MapPin,
  Phone,
  Star,
  Stethoscope
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EnhancedDoctorCards() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5005/vet/all")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Failed to fetch doctors", err));
  }, []);

  return (
    <section className="px-6 md:px-20 pt-28 pb-20 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            {/* Verified Badge */}
            <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
              <Award size={12} />
              Verified
            </div>

            <div className="p-6">
              {/* Image */}
              <div className="mb-6 text-center">
                <div className="w-24 h-24 mx-auto relative">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg text-[#1d1d48] mb-1">{doc.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-700 mb-1">
                  <Stethoscope size={14} />
                  {doc.specialization}
                </div>
                <p className="text-sm text-gray-600">{doc.experience} Years Experience</p>
                <p className="text-sm text-gray-600">Qualification: {doc.qualifications}</p>
              </div>

              {/* Rating (Static) */}
              <div className="flex justify-center items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-yellow-400 fill-current"
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">(5.0)</span>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#747134]" />
                  <span>Location: Not specified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#747134]" />
                  <span>Next: Not Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#747134]">💰</span>
                  <span>Fee: Not Available</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link to={`/doctor/${doc._id}`} className="flex-1">
                  <button className="w-full bg-[#747134] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#5f5e2a] transition">
                    View Doctor
                  </button>
                </Link>
                <button className="p-2 border border-gray-300 rounded-md hover:border-[#747134] hover:bg-[#f8f8f1] transition">
                  <Phone size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
//Doctor Card 
