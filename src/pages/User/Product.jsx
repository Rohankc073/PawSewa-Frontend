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

  return (
    <>
      <Navbar />

      <main className="mt-24 text-[#1d1d48]">
        {/* Banner */}
        <section className="w-full overflow-hidden mb-8">
          <img
            src={banners[bannerIndex]}
            alt={`Banner ${bannerIndex + 1}`}
            className="w-full h-[375px] object-cover"
          />
        </section>

        {/* Layout */}
        <section className="px-6 md:px-20 pb-20 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Dynamic Categories */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label key={cat._id} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134]">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat._id)}
                      onChange={() => handleCheckboxChange("categories", cat._id)}
                      className="w-4 h-4 accent-[#747134]"
                    />
                    <span>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Static Brands */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Brands</h3>
              <div className="space-y-3">
                {allBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134]">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleCheckboxChange("brands", brand)}
                      className="w-4 h-4 accent-[#747134]"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">Price Range</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    name="minPrice"
                    type="number"
                    value={filters.minPrice}
                    onChange={handlePriceChange}
                    placeholder="Min"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                  <input
                    name="maxPrice"
                    type="number"
                    value={filters.maxPrice}
                    onChange={handlePriceChange}
                    placeholder="Max"
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <button
                  onClick={applyFilters}
                  className="w-full bg-[#747134] text-white py-2 rounded-md text-sm hover:bg-[#5a5528]"
                >
                  Apply
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setFilters({ categories: [], brands: [], minPrice: "", maxPrice: "" });
                setSortBy("");
              }}
              className="w-full bg-gray-100 text-[#1d1d48] py-2 rounded-md text-sm hover:bg-gray-200 border"
            >
              Clear All Filters
            </button>
          </aside>

          {/* Products Area */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[#1d1d48]">{products.length}</span> results
              </p>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="border rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#747134]"
              >
                <option value="">Sort by latest</option>
                <option value="price-asc">Sort by price: Low to High</option>
                <option value="price-desc">Sort by price: High to Low</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;
