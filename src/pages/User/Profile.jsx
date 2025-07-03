import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Camera, Edit3, Heart, Lock, LogOut, Mail, MapPin, Package, Phone, Settings, User } from "lucide-react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const userData = {
  name: "Mark Cole",
  email: "swoo@gmail.com",
  phone: "",
};

const Profile = () => {
  // const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: userData.name?.split(" ")[0] || "",
    lastName: userData.name?.split(" ")[1] || "",
    email: userData.email || "",
    phone: userData.phone || "",
  });
  const [activeTab, setActiveTab] = useState("Account Info");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile updated");
  };

  const menuItems = [
    { name: "Account Info", icon: User },
    { name: "My order", icon: Package },
    { name: "My Adoption", icon: Heart },
    { name: "My Address", icon: MapPin },
    { name: "Change password", icon: Lock },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <main className="flex-1 flex mt-32 px-6 md:px-10 lg:px-20 gap-8 pb-16">
        {/* Enhanced Sidebar */}
        <aside className="w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Profile Header */}
          <div className="relative bg-gradient-to-br from-[#747134] to-[#5f5e2a] p-8 text-center">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <User className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h3 className="font-bold text-white text-xl mt-4 mb-1">
                {userData.name}
              </h3>
              <p className="text-white text-opacity-90 text-sm">{userData.email}</p>
              <div className="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-full inline-block">
                <span className="text-white text-sm font-medium">Premium Member</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full text-left px-4 py-3 my-1 text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${
                    activeTab === item.name
                      ? "bg-gradient-to-r from-[#747134] to-[#5f5e2a] text-white shadow-md"
                      : "text-[#1d1d48] hover:bg-gray-50 hover:shadow-sm"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                  <span className="ml-auto text-lg">➜</span>
                </button>
              );
            })}
            
            <div className="border-t border-gray-100 mt-4 pt-4">
              <button
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-all duration-200"
                onClick={() => {
                  // navigate("/login");
                  alert("Logging out...");
                }}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Enhanced Main Content */}
        <section className="flex-1 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#747134] to-[#5f5e2a] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Settings className="w-6 h-6" />
                Account Information
              </h2>
              <p className="text-white text-opacity-80 mt-1">Manage your personal information and preferences</p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] focus:ring-opacity-20 transition-all duration-200 outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] focus:ring-opacity-20 transition-all duration-200 outline-none"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={form.email}
                      readOnly
                      className="w-full border-2 border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-gray-600 cursor-not-allowed"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">Verified</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Email address cannot be changed for security reasons</p>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] focus:ring-opacity-20 transition-all duration-200 outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-[#747134] to-[#5f5e2a] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                  >
                    <Edit3 className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                    onClick={() => setForm({
                      firstName: userData.name?.split(" ")[0] || "",
                      lastName: userData.name?.split(" ")[1] || "",
                      email: userData.email || "",
                      phone: userData.phone || "",
                    })}
                  >
                    Reset Changes
                  </button>
                </div>
              </div>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Account Security</h4>
                  <p className="text-sm text-blue-600 mb-3">Keep your account secure with strong authentication</p>
                  <button className="text-blue-700 hover:text-blue-800 text-sm font-medium">
                    Manage Security →
                  </button>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Privacy Settings</h4>
                  <p className="text-sm text-green-600 mb-3">Control how your information is used and shared</p>
                  <button className="text-green-700 hover:text-green-800 text-sm font-medium">
                    Privacy Center →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;