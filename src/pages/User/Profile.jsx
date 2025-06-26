import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile.png"; // <-- ✅ Make sure this path matches
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex mt-40 px-10 md:px-20 gap-10">
        {/* Sidebar */}
        <aside className="w-[260px] bg-white rounded-lg shadow border">
          <div className="text-center p-6">
            <img
              src={profileIcon}
              alt="User"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="font-semibold text-[#1d1d48] text-lg mb-1">
              {userData.name}
            </h3>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          <div className="flex flex-col gap-1 p-4">
            {["Account Info", "My order", "My Adoption", "My Address", "Change password"].map((item, i) => (
              <button
                key={i}
                className="w-full text-left px-4 py-2 text-sm text-[#1d1d48] border rounded hover:bg-[#f5f5ea] hover:border-[#747134] flex justify-between items-center"
              >
                {item} <span className="text-lg">➜</span>
              </button>
            ))}
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 border border-red-400 rounded hover:bg-red-50"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Log Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-6 text-[#1d1d48]">Account Info</h2>
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                value={form.email}
                readOnly
                className="w-full border border-gray-200 bg-gray-100 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#747134] text-white px-6 py-2 rounded hover:bg-[#5f5e2a]"
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
