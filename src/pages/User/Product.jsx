import { ChevronDown, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import banner3 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner5.png";
import banner1 from "../../assets/op.png";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    minPrice: "",
    maxPrice: "",
  });
  const [sortBy, setSortBy] = useState("");

  const banners = [banner1, banner2, banner3];
  const allBrands = ["Natural Food", "Pet Care", "Dogs Friend", "Pet Food", "Favorite Pet", "Green Line"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5005/category/get");
        const data = await res.json();
        setCategories(data); // expects [{ _id, name }]
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const applyFilters = async () => {
    try {
      const query = new URLSearchParams();
      if (filters.categories.length) query.append("category", filters.categories.join(","));
      if (filters.brands.length) query.append("brand", filters.brands.join(","));
      if (filters.minPrice) query.append("min", filters.minPrice);
      if (filters.maxPrice) query.append("max", filters.maxPrice);
      if (sortBy) query.append("sort", sortBy);

      const response = await fetch(`http://localhost:5005/product/get?${query}`);
      const data = await response.json();

      const adapted = data.map((item) => ({
        ...item,
        id: item._id,
        imageUrl: item.image,
        originalPrice: item.price + 150,
      }));

      setProducts(adapted);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, sortBy]);

  const getActiveFiltersCount = () => {
    return filters.categories.length + filters.brands.length + 
           (filters.minPrice ? 1 : 0) + (filters.maxPrice ? 1 : 0);
  };

  return (
    <>
      <Navbar />

      <main className="mt-24 text-[#1d1d48] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Enhanced Banner with Overlay */}
        <section className="relative w-full overflow-hidden mb-8">
          <div className="relative h-[375px] bg-gradient-to-r from-black/20 to-transparent">
            <img
              src={banners[bannerIndex]}
              alt={`Banner ${bannerIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
            
            {/* Banner Content Overlay */}
            

            {/* Banner Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setBannerIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === bannerIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Search and Filter Bar */}
        {/* <section className="px-6 md:px-20 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              Search Bar
               */}


              {/* View Mode Toggle */}
              {/* <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "grid" 
                      ? 'bg-[#747134] text-white shadow-sm' 
                      : 'text-gray-600 hover:text-[#747134]'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-200 ${
                    viewMode === "list" 
                      ? 'bg-[#747134] text-white shadow-sm' 
                      : 'text-gray-600 hover:text-[#747134]'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div> */}
            {/* </div>
          </div>
        </section> */}

        {/* Layout */}
        <section className="px-6 md:px-20 pb-20 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Enhanced Sidebar */}
          <aside className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            {/* Active Filters Badge */}
            {getActiveFiltersCount() > 0 && (
              <div className="bg-[#747134] text-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Active Filters</span>
                  <span className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">
                    {getActiveFiltersCount()}
                  </span>
                </div>
              </div>
            )}

            {/* Dynamic Categories */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-[#1d1d48] flex items-center gap-2">
                <div className="w-2 h-2 bg-[#747134] rounded-full"></div>
                Categories
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat._id)}
                      onChange={() => handleCheckboxChange("categories", cat._id)}
                      className="w-4 h-4 accent-[#747134] rounded focus:ring-2 focus:ring-[#747134]"
                    />
                    <span className="flex-1">{cat.name}</span>
                    {filters.categories.includes(cat._id) && (
                      <div className="w-2 h-2 bg-[#747134] rounded-full"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Static Brands */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-[#1d1d48] flex items-center gap-2">
                <div className="w-2 h-2 bg-[#747134] rounded-full"></div>
                Brands
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134] transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleCheckboxChange("brands", brand)}
                      className="w-4 h-4 accent-[#747134] rounded focus:ring-2 focus:ring-[#747134]"
                    />
                    <span className="flex-1">{brand}</span>
                    {filters.brands.includes(brand) && (
                      <div className="w-2 h-2 bg-[#747134] rounded-full"></div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Enhanced Price Filter */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-lg mb-4 border-b pb-2 text-[#1d1d48] flex items-center gap-2">
                <div className="w-2 h-2 bg-[#747134] rounded-full"></div>
                Price Range
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      name="minPrice"
                      type="number"
                      value={filters.minPrice}
                      onChange={handlePriceChange}
                      placeholder="Min"
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">$</span>
                  </div>
                  <div className="relative">
                    <input
                      name="maxPrice"
                      type="number"
                      value={filters.maxPrice}
                      onChange={handlePriceChange}
                      placeholder="Max"
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">$</span>
                  </div>
                </div>
                <button
                  onClick={applyFilters}
                  className="w-full bg-gradient-to-r from-[#747134] to-[#5a5528] text-white py-3 rounded-lg text-sm hover:from-[#5a5528] hover:to-[#474020] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Apply Price Filter
                </button>
              </div>
            </div>

            {/* Enhanced Clear Filters Button */}
            <button
              onClick={() => {
                setFilters({ categories: [], brands: [], minPrice: "", maxPrice: "" });
                setSortBy("");
              }}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-[#1d1d48] py-3 rounded-xl text-sm hover:from-gray-200 hover:to-gray-300 border border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Enhanced Products Area */}
          <div className="space-y-6">
            {/* Enhanced Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-bold text-[#1d1d48] text-lg">{products.length}</span> results
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <div className="flex items-center gap-2 text-sm text-[#747134]">
                      <Filter className="w-4 h-4" />
                      <span>{getActiveFiltersCount()} filters active</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="appearance-none border border-gray-200 rounded-lg px-4 py-3 pr-10 text-sm bg-gray-50 hover:bg-white focus:ring-2 focus:ring-[#747134] focus:border-transparent transition-all duration-200 cursor-pointer"
                  >
                    <option value="">Sort by latest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Enhanced Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <div key={product.id} className="group transform transition-all duration-300 hover:-translate-y-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {products.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;