import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const steps = ["Start", "Address", "Other animals", "Confirm"];

const AdoptionForm = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    userId: user._id || "",
    fullName: user.name || "",
    email: user.email || "",
    phone: user.mobile || "",
    address: "",
    capability: "",
    housingType: "",
    hasOtherPets: false,
    experienceWithPets: "",
    reasonForAdoption: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5005/adoption/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, petId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Adoption request submitted!");
        navigate("/");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form.");
    }
  };

  const getStepIcon = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="text-sm text-gray-500 mb-4">
              <span className="hover:text-[#747134] cursor-pointer">Home</span> 
              <span className="mx-2">›</span>
              <span className="hover:text-[#747134] cursor-pointer">Adoption</span>
              <span className="mx-2">›</span>
              <span className="text-[#747134] font-medium">Application Form</span>
            </nav>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 backdrop-blur-sm">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#747134] to-[#5a5628] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Adoption Application</h1>
                    <p className="text-xl text-white/90">Find your perfect companion</p>
                  </div>
                </div>
                
                {/* Step Indicator */}
                <div className="flex justify-between items-center relative bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  {steps.map((label, index) => (
                    <div key={index} className="flex-1 text-center relative">
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                        step >= index 
                          ? "bg-white text-[#747134] shadow-lg transform scale-110" 
                          : "bg-white/20 text-white/60"
                      }`}>
                        {step > index ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          getStepIcon(index)
                        )}
                      </div>
                      <div className={`mt-3 text-sm font-medium transition-all duration-300 ${
                        step >= index ? "text-white" : "text-white/60"
                      }`}>
                        {label}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`absolute top-6 left-1/2 right-[-50%] h-1 rounded-full transition-all duration-300 ${
                          step > index ? "bg-white" : "bg-white/20"
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-[#1d1d48] mb-3">Personal Information</h2>
                      <p className="text-gray-600">Let's start with your basic details</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName" 
                          value={form.fullName} 
                          onChange={handleChange} 
                          placeholder="Enter your full name" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={form.email} 
                          onChange={handleChange} 
                          placeholder="your.email@example.com" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input 
                          type="text" 
                          name="phone" 
                          value={form.phone} 
                          onChange={handleChange} 
                          placeholder="(555) 123-4567" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                        <input 
                          type="text" 
                          name="address" 
                          value={form.address} 
                          onChange={handleChange} 
                          placeholder="123 Main Street, City, State" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-[#1d1d48] mb-3">Living Situation</h2>
                      <p className="text-gray-600">Tell us about your home environment</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Housing Type *</label>
                        <select 
                          name="housingType" 
                          value={form.housingType} 
                          onChange={handleChange} 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white"
                        >
                          <option value="">Select Housing Type</option>
                          <option value="Apartment">Apartment</option>
                          <option value="House">House</option>
                          <option value="Farm">Farm</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pet Care Capability *</label>
                        <input 
                          type="text" 
                          name="capability" 
                          value={form.capability} 
                          onChange={handleChange} 
                          placeholder="Are you capable of raising a pet?" 
                          required 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold text-[#1d1d48] mb-3">Pet Experience</h2>
                      <p className="text-gray-600">Share your experience with animals</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            name="hasOtherPets" 
                            checked={form.hasOtherPets} 
                            onChange={handleChange} 
                            className="w-5 h-5 text-[#747134] border-gray-300 rounded focus:ring-[#747134] focus:ring-2"
                          />
                          <span className="text-gray-700 font-medium">Do you have other pets?</span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience with Pets</label>
                        <input 
                          type="text" 
                          name="experienceWithPets" 
                          value={form.experienceWithPets} 
                          onChange={handleChange} 
                          placeholder="Tell us about your experience with pets" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Adoption</label>
                        <textarea 
                          name="reasonForAdoption" 
                          value={form.reasonForAdoption} 
                          onChange={handleChange} 
                          placeholder="Why do you want to adopt a pet?" 
                          rows={4} 
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-[#747134]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-[#747134]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-[#1d1d48] mb-3">Review & Submit</h2>
                      <p className="text-gray-600 mb-8">Please review your information and submit your adoption request</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-left space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-gray-500">Name:</span>
                          <p className="font-medium">{form.fullName}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Email:</span>
                          <p className="font-medium">{form.email}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Phone:</span>
                          <p className="font-medium">{form.phone}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Housing:</span>
                          <p className="font-medium">{form.housingType}</p>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Address:</span>
                        <p className="font-medium">{form.address}</p>
                      </div>
                      {form.reasonForAdoption && (
                        <div>
                          <span className="text-sm text-gray-500">Reason for Adoption:</span>
                          <p className="font-medium">{form.reasonForAdoption}</p>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full px-8 py-4 bg-gradient-to-r from-[#747134] to-[#5a5628] text-white text-lg font-semibold rounded-xl hover:from-[#5a5628] hover:to-[#444021] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Submit Application
                    </button>
                  </div>
                )}
              </form>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={prev} 
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    step === 0 
                      ? "text-gray-400 cursor-not-allowed" 
                      : "text-gray-600 hover:text-[#747134] hover:bg-gray-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                
                <div className="flex items-center gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        step >= index ? "bg-[#747134]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                
                {step < steps.length - 1 && (
                  <button 
                    onClick={next} 
                    className="flex items-center gap-2 px-6 py-3 bg-[#747134] text-white rounded-xl font-medium hover:bg-[#5a5628] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AdoptionForm;