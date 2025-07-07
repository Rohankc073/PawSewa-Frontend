import {
  Camera, Edit3,
  Lock, LogOut, Mail, MapPin,
  Package, Phone, Settings, User, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { MdMeetingRoom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedInUser?._id;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [activeTab, setActiveTab] = useState("Account Info");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5005/user/${userId}`);
        const data = await res.json();
        setForm({
          firstName: data.name?.split(" ")[0] || "",
          lastName: data.name?.split(" ")[1] || "",
          email: data.email || "",
          phone: data.phone || "",
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
      };

      const res = await fetch(`http://localhost:5005/user/update/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updatedUser = {
        ...loggedInUser,
        ...updatedData,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong while updating.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    { name: "Account Info", icon: User },
    { name: "My order", icon: Package },
    { name: "My Appointment", icon: MdMeetingRoom },
    { name: "My Adoption", icon: MapPin },
    { name: "Change password", icon: Lock },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 text-center">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Confirm Logout</h3>
              <p className="text-red-100">Are you sure you want to log out of your account?</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Yes, Log Out
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex mt-32 px-6 md:px-10 lg:px-20 gap-8 pb-16">
        {/* Sidebar */}
        <aside className="w-80 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                {form.firstName} {form.lastName}
              </h3>
              <p className="text-white text-opacity-90 text-sm">{form.email}</p>
              <div className="mt-4 px-4 py-2 bg-white bg-opacity-20 rounded-full inline-block">
                <span className="text-white text-sm font-medium">Premium Member</span>
              </div>
            </div>
          </div>

          <div className="p-2">
            {menuItems.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => {
                  if (name === "Change password") {
                    navigate("/forgot-password");
                  } else if (name === "My Appointment") {
                    navigate("/my-appointments");
                  } else if (name === "My order") {
                    navigate("/my-orders");
                  } else if (name === "My Adoption") {
                    navigate("/my-adoptions");
                  } else {
                    setActiveTab(name);
                  }
                }}
                className={`w-full text-left px-4 py-3 my-1 text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${
                  activeTab === name
                    ? "bg-gradient-to-r from-[#747134] to-[#5f5e2a] text-white shadow-md"
                    : "text-[#1d1d48] hover:bg-gray-50 hover:shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
                <span className="ml-auto text-lg">➜</span>
              </button>
            ))}

            <div className="border-t border-gray-100 mt-4 pt-4">
              <button
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-all duration-200"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Form */}
        <section className="flex-1 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#747134] to-[#5f5e2a] px-8 py-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Settings className="w-6 h-6" />
                Account Information
              </h2>
              <p className="text-white text-opacity-80 mt-1">
                Manage your personal information and preferences
              </p>
            </div>
            <div className="p-8">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] transition-all outline-none"
                      placeholder="Enter your first name"
                    />
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
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] transition-all outline-none"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

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
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#747134] focus:ring-2 focus:ring-[#747134] transition-all outline-none"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#747134] to-[#5f5e2a] text-white px-8 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                  >
                    <Edit3 className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 font-semibold"
                    onClick={() =>
                      setForm({
                        firstName: loggedInUser?.name?.split(" ")[0] || "",
                        lastName: loggedInUser?.name?.split(" ")[1] || "",
                        email: loggedInUser?.email || "",
                        phone: loggedInUser?.phone || "",
                      })
                    }
                  >
                    Reset Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;