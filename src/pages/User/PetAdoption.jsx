import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PetCard from "../../components/PetCard";

const PetAdoption = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5005/adoption/all");
        const data = await res.json();
        setPets(data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="text-center py-16 px-4 bg-white">
          <h1 className="text-4xl font-bold text-[#1d1d48] mb-4">GET YOUR FAMILY A NEW MEMBER</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Welcome to our pet care service, where your pets receive top-notch care and endless love.
          </p>
        </section>

        {/* Filters and Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 max-w-7xl mx-auto px-4 py-12">
          {/* Sidebar Filters (UI only for now) */}
          <aside className="bg-white rounded-xl shadow p-4 border">
            <h2 className="text-lg font-semibold text-[#1d1d48] mb-4">Filters</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <label className="block font-medium mb-1">Location</label>
                <input
                  type="text"
                  placeholder="City or Zip"
                  className="w-full border px-3 py-2 rounded-md text-sm"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Breed</label>
                <select className="w-full border px-2 py-2 rounded-md">
                  <option>Any</option>
                  <option>Labrador</option>
                  <option>Shiba Inu</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Size</label>
                <select className="w-full border px-2 py-2 rounded-md">
                  <option>Any</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Gender</label>
                <select className="w-full border px-2 py-2 rounded-md">
                  <option>Any</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <button className="w-full mt-4 bg-[#747134] text-white py-2 rounded-md hover:bg-[#5f5e2a] transition">
                Apply Filter
              </button>
            </div>
          </aside>

          {/* Pet Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="col-span-full text-center text-gray-600">Loading pets...</p>
            ) : pets.length > 0 ? (
              pets.map((pet) => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <p className="col-span-full text-center text-gray-600">No pets available for adoption.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetAdoption;
