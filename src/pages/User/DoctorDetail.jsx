import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import doctorHero from "../../assets/docDetail.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function DoctorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5005/vet/${id}`)
      .then((res) => {
        setDoctor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching doctor", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-600">Loading...</div>;
  }

  if (!doctor) {
    return <div className="p-10 text-center text-red-500">Doctor not found</div>;
  }

  return (
    <>
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="relative w-full h-[420px] md:h-[600px]  overflow-hidden">
        <img
          src={doctorHero}
          alt="Doctor Hero"
          className="absolute w-full h-full object-contain md:object-contain brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Doctor Detail</h1>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-2 bg-gray-100" />

      {/* ✅ Doctor Info */}
      <main className="px-6 md:px-20 pt-14 pb-12 text-[#1d1d48] bg-gray-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-10 flex flex-col md:flex-row gap-8 items-center">
          {/* Profile Image */}
          <img
            src={doctor.image || "https://via.placeholder.com/150"}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
            <p className="text-gray-700 mb-1">{doctor.specialization || "Specialization not available"}</p>
            <p className="text-gray-600 mb-1">{doctor.experience} years experience</p>
            <p className="text-gray-600 mb-1">Qualification: {doctor.qualifications || "N/A"}</p>
            <p className="text-gray-600 mb-1">Email: {doctor.email || "N/A"}</p>
            <p className="text-gray-600">Contact: {doctor.contact || "N/A"}</p>
          </div>
        </div>

        {/* Book Now CTA */}
        <div className="text-center mt-10">
          <button
  className="bg-[#747134] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5f5e2a] transition"
  onClick={() => navigate(`/appointment-booking/${doctor._id}`)}
>
  Book Now
</button>
        </div>
      </main>

      <Footer />
    </>
  );
}
