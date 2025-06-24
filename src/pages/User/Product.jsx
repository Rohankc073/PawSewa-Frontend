// src/pages/Products.js

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/ProductCard";

// ✅ Import banners from your assets folder
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";
import banner1 from "../../assets/test.png";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  // ✅ Array of imported banners
  const banners = [banner1, banner2, banner3];

  // ✅ Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // ✅ Dummy products
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

      <main className="mt-12 text-[#1d1d48]">
        {/* ✅ Hero Banner Slider */}
        {/* ✅ Hero Banner Slider - Perfect Fit INSIDE */}
<section className="relative w-full overflow-hidden bg-[#F9F9F4]">  {/* match your banner background! */}
  <div className="relative w-full h-[300px] md:h-[450px] flex items-center justify-center">
    {banners.map((banner, idx) => (
      <img
        key={idx}
        src={banner}
        alt={`Banner ${idx + 1}`}
        className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-700 ${
          idx === bannerIndex ? "opacity-100" : "opacity-0"
        }`}
      />
    ))}
  </div>
</section>



        {/* Shop Content */}
        <section className="px-6 md:px-20 pb-20 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10">
          {/* Sidebar Filters */}
          <aside>
            <h3 className="font-semibold mb-4">Filter by Categories</h3>
            <div className="flex flex-col space-y-2 mb-6">
              {["Furniture", "Bowls", "Clothing", "Food", "Toys", "Sale"].map((cat) => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-[#747134]" /> {cat}
                </label>
              ))}
            </div>

            <h3 className="font-semibold mb-4">Filter by Brands</h3>
            <div className="flex flex-col space-y-2">
              {["Natural food", "Pet care", "Dogs friend", "Pet food", "Favorite pet", "Green line"].map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-[#747134]" /> {brand}
                </label>
              ))}
            </div>
          </aside>

          {/* Products + Sort */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm">Showing {products.length} results</p>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Sort by latest</option>
                <option>Sort by price</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Simple Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">1</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Next &gt;</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Products;
