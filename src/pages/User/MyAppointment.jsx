import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`http://localhost:5005/appointment/user/${user._id}`);
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    if (user?._id) {
      fetchAppointments();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-28 pb-16 px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1d1d48] mb-4">My Appointments</h1>
          <p className="text-gray-600 text-lg">Manage and view your veterinary appointments</p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d48] mb-2">No Appointments Yet</h3>
              <p className="text-gray-600">You haven't scheduled any appointments yet. Book your first appointment to get started!</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {appointments.map((appt, index) => {
              const doctor = appt.doctorId;
              return (
                <div key={index} className="bg-white shadow-xl rounded-2xl overflow-hidden border-l-4 border-[#1d1d48] hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Doctor Image */}
                      {doctor?.image && (
                        <div className="flex-shrink-0">
                          <img
                            src={`http://localhost:5005/${doctor.image.replace(/\\/g, "/")}`}
                            alt="Doctor"
                            className="w-32 h-32 object-cover rounded-xl shadow-md"
                          />
                        </div>
                      )}
                      
                      {/* Main Content */}
                      <div className="flex-1">
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-[#1d1d48] mb-2">
                            Dr. {doctor?.name || "N/A"}
                          </h2>
                          <p className="text-lg text-blue-600 font-medium">{doctor?.specialization || "N/A"}</p>
                        </div>

                        {/* Doctor Details Grid */}
                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#1d1d48] mb-2">Contact Information</h4>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Phone:</span> {doctor?.contact || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Email:</span> {doctor?.email || "N/A"}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-[#1d1d48] mb-2">Professional Details</h4>
                            <p className="text-sm text-gray-600 mb-1">
                              <span className="font-medium">Experience:</span> {doctor?.experience || "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Qualifications:</span> {doctor?.qualifications || "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="bg-blue-50 p-6 rounded-xl">
                          <h3 className="text-lg font-semibold text-[#1d1d48] mb-4">Appointment Details</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-center mb-3">
                                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium text-[#1d1d48]">Schedule</span>
                              </div>
                              <p className="text-gray-700 mb-1">
                                <span className="font-medium">Date:</span> {new Date(appt.schedule?.date).toLocaleDateString()}
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Time:</span> {appt.schedule?.time}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center mb-3">
                                <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span className="font-medium text-[#1d1d48]">Pet Information</span>
                              </div>
                              <p className="text-gray-700 mb-1">
                                <span className="font-medium">Pet:</span> {appt.pet?.name} ({appt.pet?.type})
                              </p>
                              <p className="text-gray-700">
                                <span className="font-medium">Concern:</span> {appt.pet?.problem}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Footer */}
                  <div className="bg-gray-50 px-8 py-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Scheduled
                      </span>
                      <span className="text-sm text-gray-500">
                        Appointment #{index + 1}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyAppointment;