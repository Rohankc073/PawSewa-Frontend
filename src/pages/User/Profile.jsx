import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const userData = JSON.parse(localStorage.getItem("user")) || {
  name: "Mark Cole",
  email: "swoo@gmail.com",
  phone: "",
};

const Profile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: userData.name?.split(" ")[0] || "",
    lastName: userData.name?.split(" ")[1] || "",
    email: userData.email || "",
    phone: userData.phone || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex flex-1 px-12 py-10 mt-20">
        {/* Sidebar */}
        <aside className="w-1/4 pr-10 border-r">
          <div className="bg-white shadow rounded-xl p-6 text-center">
            <img
              src="https://i.pravatar.cc/120"
              alt="Avatar"
              className="w-28 h-28 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-[#1d1d48]">
              {userData.name}
            </h3>
            <p className="text-sm text-gray-500">{userData.email}</p>
            <div className="mt-6 space-y-2">
              {["Account Info", "My order", "My Adoption", "My Address", "Change password"].map((item) => (
                <button
                  key={item}
                  className="w-full text-left py-2 px-4 bg-[#8b8a47] text-white rounded hover:bg-[#6d6a35]"
                >
                  {item}
                </button>
              ))}
              <button
                className="w-full text-left py-2 px-4 text-red-600 border border-red-500 rounded hover:bg-red-100"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Form section */}
        <section className="w-3/4 pl-10">
          <h2 className="text-2xl font-bold mb-6 text-[#1d1d48]">
            Account Info
          </h2>

          <form onSubmit={handleSave} className="space-y-4 max-w-xl">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block font-medium mb-1">First Name *</label>
                <input
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block font-medium mb-1">Last Name *</label>
                <input
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone Number (Optional)</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-[#8b8a47] text-white px-6 py-2 rounded hover:bg-[#6d6a35]"
            >
              Save
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
