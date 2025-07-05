import { useEffect, useState } from "react";
import petImage from "../../assets/adopt1.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PetCard from "../../components/PetCard";

const PetAdoption = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch("http://localhost:5005/adoption/all");
        const data = await res.json();
        setPets(data);
        setFilteredPets(data);
      } catch (err) {
        console.error("Failed to fetch pets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    filterPets();
  }, [pets, selectedType, selectedSize, selectedBreed, selectedColor, selectedGender, selectedAge, location]);

  const filterPets = () => {
    let filtered = pets;

    if (selectedType) {
      filtered = filtered.filter(pet => 
        pet.type?.toLowerCase() === selectedType.toLowerCase()
      );
    }

    if (selectedSize) {
      filtered = filtered.filter(pet => 
        pet.size?.toLowerCase() === selectedSize.toLowerCase()
      );
    }

    if (selectedBreed) {
      filtered = filtered.filter(pet => 
        pet.breed?.toLowerCase().includes(selectedBreed.toLowerCase())
      );
    }

    if (selectedColor) {
      filtered = filtered.filter(pet => 
        pet.color?.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    if (selectedGender) {
      filtered = filtered.filter(pet => 
        pet.gender?.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    if (selectedAge) {
      filtered = filtered.filter(pet => {
        const age = parseInt(pet.age);
        if (selectedAge === "young") return age >= 0 && age <= 2;
        if (selectedAge === "adult") return age >= 3 && age <= 7;
        if (selectedAge === "senior") return age >= 8;
        return true;
      });
    }

    if (location) {
      filtered = filtered.filter(pet => 
        pet.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredPets(filtered);
  };

  const resetFilters = () => {
    setSelectedType("");
    setSelectedSize("");
    setSelectedBreed("");
    setSelectedColor("");
    setSelectedGender("");
    setSelectedAge("");
    setLocation("");
  };

  const applyFilters = () => {
    filterPets();
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-white py-16 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="text-left space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1d1d48] leading-tight">
                  GET YOUR FAMILY<br />
                  <span className="text-[#1d1d48]">A NEW MEMBER</span>
                </h1>
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-md">
                  Welcome to our pet care service, where your pets<br />
                  receive top-notch care and endless love
                </p>
              </div>
              
              {/* Right Content - Rectangular Pet Image without Circular Background */}
                <div className="relative flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Pet image only (no circular shape) */}
      <div className="w-full flex justify-center">
  <img 
    src={petImage}
    alt="Happy pets family"
    className="max-w-[500px] w-full h-auto object-contain"
  />
</div>



                    {/* Floating decorative elements */}
                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-2xl">🐾</span>
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-14 h-14 bg-[#747134] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl">❤️</span>
                    </div>
                    <div className="absolute top-8 -right-8 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md opacity-80">
                      <span className="text-lg">🐾</span>
                    </div>
                  </div>
                </div>
                </div>


          </div>
        </section>

        {/* Services Section */}
        <section className="bg-[#747134] py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
              {[
                { icon: "🤖", title: "AI Integration", arrow: "→" },
                { icon: "🛍️", title: "Pet Supplies", arrow: "→" },
                { icon: "✂️", title: "Grooming Service", arrow: "→" },
                { icon: "🏥", title: "Veterinary Support", arrow: "→" },
                { icon: "🏠", title: "Pet Adoption", arrow: "→" }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-center text-white py-3 md:py-4 hover:bg-white/10 transition-colors rounded-lg">
                  <span className="text-lg md:text-xl mr-2">{service.icon}</span>
                  <span className="font-medium text-xs md:text-sm text-center">{service.title}</span>
                  <span className="ml-1 md:ml-2 text-sm md:text-lg opacity-70">{service.arrow}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Cards */}
        <section className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 max-w-7xl mx-auto px-4 py-12">
          {/* Enhanced Sidebar Filters */}
          <aside className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit">
            {/* Filter Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#1d1d48]">Filters</h2>
              <button 
                onClick={resetFilters}
                className="text-[#747134] text-sm font-medium hover:text-[#6B7355] transition-colors"
              >
                Reset Filters
              </button>
            </div>

            {/* Pet Type Selection */}
            <div className="mb-8">
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setSelectedType(selectedType === "cat" ? "" : "cat")}
                  className={`w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedType === "cat" 
                      ? "border-[#747134] bg-[#747134]/10" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">🐱</div>
                  <span className={`text-xs font-medium ${selectedType === "cat" ? "text-[#747134]" : "text-gray-600"}`}>
                    Cat
                  </span>
                </button>
                
                <button
                  onClick={() => setSelectedType(selectedType === "dog" ? "" : "dog")}
                  className={`w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                    selectedType === "dog" 
                      ? "border-[#747134] bg-[#747134]/10" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-2xl mb-1">🐶</div>
                  <span className={`text-xs font-medium ${selectedType === "dog" ? "text-[#747134]" : "text-gray-600"}`}>
                    Dog
                  </span>
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-[#1d1d48] mb-3">Location</label>
              <input
                type="text"
                placeholder="City or Zip"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-[#747134] focus:outline-none transition-colors"
              />
              <div className="text-sm text-gray-500 mt-2">Dilibazar, Kathmandu</div>
            </div>

            {/* Distance Slider */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-[#747134] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🐾</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                  <div className="absolute left-0 top-0 h-2 w-0 bg-[#747134] rounded-full"></div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-700">0 Miles</div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <div className="flex gap-3 justify-between">
                {[
                  { size: "small", label: "Small", icon: "S" },
                  { size: "medium", label: "Medium", icon: "M" },
                  { size: "large", label: "Large", icon: "L" }
                ].map(({ size, label, icon }) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                    className={`flex-1 flex flex-col items-center py-3 rounded-xl border-2 transition-all duration-200 ${
                      selectedSize === size
                        ? "border-[#747134] bg-[#747134]/10"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${
                      selectedSize === size 
                        ? "border-[#747134] text-[#747134]" 
                        : "border-gray-300 text-gray-500"
                    }`}>
                      <span className="text-sm font-bold">{icon}</span>
                    </div>
                    <span className={`text-xs font-medium ${
                      selectedSize === size ? "text-[#747134]" : "text-gray-600"
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dropdown Filters */}
            <div className="space-y-4 mb-8">
              <div>
                <select 
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-[#747134] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Breed</option>
                  <option value="labrador">Labrador</option>
                  <option value="shiba">Shiba Inu</option>
                  <option value="persian">Persian</option>
                  <option value="siamese">Siamese</option>
                  <option value="golden retriever">Golden Retriever</option>
                  <option value="bulldog">Bulldog</option>
                  <option value="husky">Husky</option>
                </select>
              </div>

              <div>
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-[#747134] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Color</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="brown">Brown</option>
                  <option value="golden">Golden</option>
                  <option value="gray">Gray</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>

              <div>
                <select 
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-[#747134] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <select 
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg text-sm focus:border-[#747134] focus:outline-none transition-colors bg-white"
                >
                  <option value="">Age</option>
                  <option value="young">Young (0-2 years)</option>
                  <option value="adult">Adult (3-7 years)</option>
                  <option value="senior">Senior (8+ years)</option>
                </select>
              </div>
            </div>

            {/* Apply Filter Button */}
            <button 
              onClick={applyFilters}
              className="w-full bg-gradient-to-r from-[#747134] to-[#6B7355] text-white py-3 px-4 rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-[#6B7355] hover:to-[#747134] transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Apply your Filter
            </button>
          </aside>

          {/* Pet Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-[#747134] border-t-transparent rounded-full"></div>
              </div>
            ) : filteredPets.length > 0 ? (
              filteredPets.map((pet) => <PetCard key={pet._id} pet={pet} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🐾</div>
                <p className="text-gray-600 text-lg">No pets found matching your filters.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 text-[#747134] hover:text-[#6B7355] font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PetAdoption;