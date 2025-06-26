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

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="mt-24 px-6 md:px-20 text-[#1d1d48] py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[450px] object-contain bg-gray-50 p-6 rounded-xl shadow-md"
          />

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {product.manufacturer && (
              <p className="text-gray-600">
                <strong>Brand:</strong> {product.manufacturer}
              </p>
            )}

            {product.category?.name && (
              <p className="text-gray-600">
                <strong>Category:</strong> {product.category.name}
              </p>
            )}

            <p className="text-gray-600">
              <strong>Stock:</strong> {product.quantity}
            </p>

            <p className="text-xl text-[#747134] font-semibold">
              Rs. {product.price.toFixed(2)}
            </p>

            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Description:</strong>{" "}
              {product.description || "No description provided."}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="bg-[#747134] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5f5e2a] transition">
                Add to Cart
              </button>
              <button className="border border-[#747134] text-[#747134] px-6 py-3 rounded-lg font-medium hover:bg-[#747134] hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetail;
