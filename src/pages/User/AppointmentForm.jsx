import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import doctorHero from "../../assets/docDetail.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function AppointmentForm() {
  const { id } = useParams(); // doctorId
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [doctorName, setDoctorName] = useState("");
  

  const [formData, setFormData] = useState({
    user: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      address: "",
    },
    pet: {
      name: "",
      type: "",
      breed: "",
      age: "",
      illnessPeriod: "",
      problem: "",
    },
    schedule: {
      date: "",
      time: "",
      clinic: "",
    },
    payment: {
      method: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  // Prefill user data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user: {
          firstName: user.name || "",
          lastName: user.lastName || "",
          mobileNumber: user.mobile || "",
          email: user.email || "",
          address: user.address || "",
        },
      }));
    }
  }, []);

  // Fetch doctor name using ID
  useEffect(() => {
  axios
    .get(`http://localhost:5005/vet/${id}`)
    .then((res) => {
      setDoctorName(res.data.name); // or res.data.fullName if that’s your schema
    })
    .catch((err) => {
      console.error("Failed to fetch doctor name", err);
    });
}, [id]);
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5005/appointment/book", {
        doctorId: id,
        ...formData,
      });
      alert("Appointment booked successfully!");
      navigate("/");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to book appointment.");
    }
  };

  return (
    <>
      <Navbar />
      {/* Top Banner */}
      <section className="relative w-full h-[420px] md:h-[600px] overflow-hidden">
        <img
          src={doctorHero}
          alt="Doctor Hero"
          className="absolute w-full h-full object-contain brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Appointment Booking</h1>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-6 py-16 bg-white rounded-xl shadow-lg -mt-16 relative z-10">
        {/* Header */}
        <div className="bg-[#747134] text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Booking Visit Form</h2>
          <button onClick={() => navigate(-1)} className="text-white text-xl font-bold">×</button>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-8 mt-6 mb-10">
          {["Booking Details", "Select Date & Time", "Select Payment"].map((stepLabel, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step === idx + 1 ? "bg-[#747134] text-white" : "bg-gray-300 text-gray-700"}`}>
                {idx + 1}
              </div>
              <span className={`text-sm font-medium ${step === idx + 1 ? "text-[#747134]" : "text-gray-500"}`}>{stepLabel}</span>
              {idx < 2 && <span className="text-gray-400">—</span>}
            </div>
          ))}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input className="input" placeholder="First Name" value={formData.user.firstName} onChange={(e) => handleChange("user", "firstName", e.target.value)} />
              <input className="input" placeholder="Last Name" value={formData.user.lastName} onChange={(e) => handleChange("user", "lastName", e.target.value)} />
              <input className="input" placeholder="Mobile Number" value={formData.user.mobileNumber} onChange={(e) => handleChange("user", "mobileNumber", e.target.value)} />
              <input className="input" placeholder="Email" value={formData.user.email} onChange={(e) => handleChange("user", "email", e.target.value)} />
              <input className="input md:col-span-2" placeholder="Address" value={formData.user.address} onChange={(e) => handleChange("user", "address", e.target.value)} />
            </div>

            <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="input" placeholder="Pet Name" onChange={(e) => handleChange("pet", "name", e.target.value)} />
              <input className="input" placeholder="Type (Dog/Cat)" onChange={(e) => handleChange("pet", "type", e.target.value)} />
              <input className="input" placeholder="Breed" onChange={(e) => handleChange("pet", "breed", e.target.value)} />
              <input className="input" placeholder="Age" onChange={(e) => handleChange("pet", "age", e.target.value)} />
              <select className="input" onChange={(e) => handleChange("pet", "illnessPeriod", e.target.value)}>
                <option>Period of Illness</option>
                <option value="1 day">1 day</option>
                <option value="2 days">2 days</option>
                <option value="3 days">3 days</option>
              </select>
              <input className="input" placeholder="Problem" onChange={(e) => handleChange("pet", "problem", e.target.value)} />
            </div>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-6">Schedule Date & Time</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2 space-y-4">
                <input type="date" className="input" onChange={(e) => handleChange("schedule", "date", e.target.value)} />
                <input type="time" className="input" onChange={(e) => handleChange("schedule", "time", e.target.value)} />
                <select className="input" onChange={(e) => handleChange("schedule", "clinic", e.target.value)}>
                  <option value="">Select Clinic</option>
                  <option value="KTM">KTM</option>
                  <option value="Lalitpur">Lalitpur</option>
                </select>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md space-y-3 text-sm text-gray-700">
                <div><h4 className="font-semibold text-base text-[#1d1d48]">Pet Name</h4><p>{formData.pet.name || "N/A"}</p></div>
                <div><h4 className="font-semibold text-base text-[#1d1d48]">Breed</h4><p>{formData.pet.breed || "N/A"}</p></div>
                <div><h4 className="font-semibold text-base text-[#1d1d48]">Age</h4><p>{formData.pet.age || "N/A"}</p></div>
                <div><h4 className="font-semibold text-base text-[#1d1d48]">Problem</h4><p>{formData.pet.problem || "N/A"}</p></div>
              </div>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="md:flex md:gap-10">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-xl font-semibold mb-2">Payment</h2>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Choose Payment Method</label>
                <select
                  className="input w-full"
                  value={formData.payment.method}
                  onChange={(e) => handleChange("payment", "method", e.target.value)}
                >
                  <option value="">Select Method</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              {formData.payment.method === "Credit Card" && (
                <div className="space-y-4">
                  <input type="text" placeholder="Card Name" className="input w-full" value={formData.payment.cardName} onChange={(e) => handleChange("payment", "cardName", e.target.value)} />
                  <input type="text" placeholder="Card Number" className="input w-full" value={formData.payment.cardNumber} onChange={(e) => handleChange("payment", "cardNumber", e.target.value)} />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="input" value={formData.payment.expiry} onChange={(e) => handleChange("payment", "expiry", e.target.value)} />
                    <input type="text" placeholder="CVV" className="input" value={formData.payment.cvv} onChange={(e) => handleChange("payment", "cvv", e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md space-y-4 text-sm text-[#1d1d48] w-full md:w-1/2 mt-10 md:mt-0">
  {/* Pet Info */}
  <div>
    <h4 className="font-semibold text-base mb-2">Pet Information</h4>
    <p><strong>Name:</strong> {formData.pet.name || "N/A"}</p>
    <p><strong>Breed:</strong> {formData.pet.breed || "N/A"}</p>
    <p><strong>Age:</strong> {formData.pet.age || "N/A"}</p>
    <p><strong>Problem:</strong> {formData.pet.problem || "N/A"}</p>
  </div>

  {/* Schedule Info */}
  <div className="space-y-2 text-sm">
    <p><strong>Date & Time:</strong> {formData.schedule.date ? new Date(formData.schedule.date).toLocaleDateString() + ", " + formData.schedule.time : "Not selected"}</p>
    <p><strong>Clinic:</strong> {formData.schedule.clinic || "N/A"}</p>
    <div>
  <h4 className="font-semibold text-base text-[#1d1d48]">Doctor</h4>
  <span>{doctorName || "Doctor"}</span>
</div>



  </div>
</div>

          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-10">
          {step > 1 && (
            <button className="border border-[#747134] text-[#747134] px-6 py-2 rounded-md" onClick={() => setStep(step - 1)}>⟵ Back</button>
          )}
          {step < 3 ? (
            <button className="bg-[#747134] text-white px-6 py-2 rounded-md" onClick={() => setStep(step + 1)}>Continue →</button>
          ) : (
            <button className="bg-[#747134] text-white px-6 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
