import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5005/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5005/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id,
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Error adding to cart.");
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#747134] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 mt-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mt-10">
            <span className="hover:text-[#747134] cursor-pointer">Home</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="hover:text-[#747134] cursor-pointer">Products</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[#747134] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <main className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

              {/* Image Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 flex items-center justify-center">
                <div className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full max-w-md max-h-[400px] object-contain"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3">
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      product.quantity > 10 
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : product.quantity > 0
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    {product.manufacturer && (
                      <p className="text-lg text-gray-600 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#747134]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        by <span className="font-semibold text-[#747134]">{product.manufacturer}</span>
                      </p>
                    )}
                  </div>

                  <div className="bg-[#747134]/10 p-6 rounded-2xl border border-[#747134]/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Price</p>
                        <p className="text-3xl font-bold text-[#747134]">
                          Rs. {product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Availability</p>
                        <p className={`font-semibold ${
                          product.quantity > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {product.category?.name && (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">Category</h4>
                          <p className="text-gray-600">{product.category.name}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-2">Product Description</h4>
                        <p className="text-gray-700 leading-relaxed">
                          {product.description || "This is a high-quality product designed to meet your pet's needs."}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={handleAddToCart}
                        className="flex-1 bg-[#747134] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#5f5e2a] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        disabled={product.quantity === 0}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Add to Cart
                      </button>
                      <button 
                        className="flex-1 border-2 border-[#747134] text-[#747134] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#747134] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                        disabled={product.quantity === 0}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        Buy Now
                      </button>
                    </div>
                    {product.quantity === 0 && (
                      <p className="text-center text-red-600 font-medium">
                        This product is currently out of stock
                      </p>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
