import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/ProductCard";

// Import banners
import banner3 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner5.png";
import banner1 from "../../assets/op.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const banners = [banner1, banner2, banner3];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const dummyProducts = [
      { id: 1, name: "Pet Carrier", price: 29.99, imageUrl: "https://via.placeholder.com/200" },
      { id: 2, name: "Cat Bowl", price: 20.99, imageUrl: "https://via.placeholder.com/200" },
      { id: 3, name: "Dog Bed", price: 49.99, imageUrl: "https://via.placeholder.com/200" },
      { id: 4, name: "Premium Cat Food", price: 20.99, imageUrl: "https://via.placeholder.com/200" },
      { id: 5, name: "Dog Leash", price: 9.99, imageUrl: "https://via.placeholder.com/200" },
    ];
    setProducts(dummyProducts);
  }, []);

  return (
    <>
      <Navbar />

      <main className="mt-24 text-[#1d1d48]">
        {/* Hero Banner */}
        <section className="w-full overflow-hidden mb-8">
          <img
            src={banners[bannerIndex]}
            alt={`Banner ${bannerIndex + 1}`}
            className="w-full h-[375px] object-cover block"
            style={{ objectFit: "fill" }}
          />
        </section>

        {/* Product Section */}
        <section className="px-6 md:px-20 pb-20 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Enhanced Sidebar Filters */}
          <aside className="space-y-6">
            {/* Categories Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[#1d1d48] mb-4 border-b border-gray-100 pb-2">
                Categories
              </h3>
              <div className="space-y-3">
                {["Furniture", "Bowls", "Clothing", "Food", "Toys", "Sale"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134] transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-[#747134] rounded border-gray-300 focus:ring-[#747134] focus:ring-2" 
                    />
                    <span className="select-none">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[#1d1d48] mb-4 border-b border-gray-100 pb-2">
                Brands
              </h3>
              <div className="space-y-3">
                {["Natural Food", "Pet Care", "Dogs Friend", "Pet Food", "Favorite Pet", "Green Line"].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 text-sm cursor-pointer hover:text-[#747134] transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-[#747134] rounded border-gray-300 focus:ring-[#747134] focus:ring-2" 
                    />
                    <span className="select-none">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[#1d1d48] mb-4 border-b border-gray-100 pb-2">
                Price Range
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#747134] focus:border-[#747134]"
                  />
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[#747134] focus:border-[#747134]"
                  />
                </div>
                <button className="w-full bg-[#747134] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#5a5528] transition-colors">
                  Apply
                </button>
              </div>
            </div>

            {/* Clear Filters */}
            <button className="w-full bg-gray-100 text-[#1d1d48] py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-300">
              Clear All Filters
            </button>
          </aside>

          {/* Product List */}
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-[#1d1d48]">{products.length}</span> results
              </p>
              <select className="border border-gray-300 rounded-md px-4 py-2 text-sm bg-white focus:ring-2 focus:ring-[#747134] focus:border-[#747134]">
                <option>Sort by latest</option>
                <option>Sort by price: Low to High</option>
                <option>Sort by price: High to Low</option>
                <option>Sort by popularity</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-[#747134] text-white rounded-md text-sm font-medium">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;