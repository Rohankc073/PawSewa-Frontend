// src/components/ProductCard.js
import { Heart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300 relative bg-white">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-[#747134]">
        <Heart size={20} />
      </button>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="font-semibold text-[#1d1d48] mb-1">{product.name}</h3>
      <p className="text-[#1d1d48] font-bold mb-3">Rs. {product.price.toFixed(2)}</p>
      <button className="bg-[#747134] text-white w-full py-2 rounded-md font-medium hover:bg-[#5f5e2a] transition">
        Add to Cart
      </button>
    </div>
  );
}
