import { AlertCircle, Calendar, CheckCircle, Clock, Heart, MapPin, PawPrint, User, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const MyAdoptions = () => {
  const [adoptions, setAdoptions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const res = await fetch(`http://localhost:5005/adoption/user/${user._id}`);
        const data = await res.json();
        setAdoptions(data);
      } catch (err) {
        console.error("Error fetching adoptions:", err);
      }
    };

    if (user?._id) fetchAdoptions();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-16 px-6">
        {/* Header */}
        <div className="text-center mb-12 mt-20">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-[#1d1d48]">My Adoption Requests</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track the status of your pet adoption applications and manage your requests
          </p>
        </div>

        {/* Content */}
        {adoptions.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <PawPrint className="w-12 h-12 text-[#1d1d48]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d48] mb-3">
                No Adoption Requests Yet
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't submitted any adoption requests yet. Start your journey to find your perfect companion!
              </p>
              <button className="bg-[#1d1d48] hover:bg-[#2d2d58] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Browse Pets
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {adoptions.map((req, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border"
              >
                {/* Status Header */}
                <div className="bg-gradient-to-r from-[#1d1d48] to-[#2d2d58] p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-lg">#{index + 1}</span>
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-xl">
                          Request #{req._id}
                        </h2>
                        <p className="text-blue-100 text-sm">
                          {req.petId?.animalType} - {req.petId?.breed}
                        </p>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(req.status)}`}>
                      {getStatusIcon(req.status)}
                      <span className="font-semibold capitalize">{req.status}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#1d1d48]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1d1d48] mb-2">Visit Location</h4>
                          <p className="text-gray-600">
                            {req.visitLocation || "Not scheduled"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1d1d48] mb-2">Visit Date</h4>
                          <p className="text-gray-600">
                            {req.visitDate 
                              ? new Date(req.visitDate).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : "Not scheduled"
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1d1d48] mb-2">Pet Care Capability</h4>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            req.capability 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {req.capability ? "Capable" : "Needs Support"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <PawPrint className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#1d1d48] mb-2">Other Pets</h4>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            req.hasOtherPets 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {req.hasOtherPets ? "Has Other Pets" : "No Other Pets"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reason Section */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border-l-4 border-[#1d1d48]">
                    <h4 className="font-semibold text-[#1d1d48] mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Reason for Adoption
                    </h4>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{req.reasonForAdoption}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {req.status?.toLowerCase() === "pending" && (
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 bg-[#1d1d48] hover:bg-[#2d2d58] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-[#1d1d48] font-semibold py-3 px-4 rounded-lg transition-colors border">
                        Edit Request
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAdoptions;