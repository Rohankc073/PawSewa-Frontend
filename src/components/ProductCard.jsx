// src/components/ProductCard.js
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Generate random rating for demo (you can replace with actual product rating)
  const rating = product.rating || (Math.random() * 2 + 3); // 3-5 stars
  const reviews = product.reviews || Math.floor(Math.random() * 200 + 10);
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = isOnSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group border border-gray-100 rounded-xl p-4 hover:shadow-xl hover:border-[#747134]/20 transition-all duration-300 relative bg-white transform hover:-translate-y-1">
      {/* Sale Badge */}
      {isOnSale && (
        <div className="absolute top-3 left-3 bg-[#747134] text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
          -{discountPercent}%
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
          isFavorite
            ? "bg-red-500 text-white shadow-lg"
            : "bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white shadow-sm"
        }`}
      >
        <Heart
          size={16}
          fill={isFavorite ? "currentColor" : "none"}
          className="transition-all duration-300"
        />
      </button>

      {/* Product Image and Quick View Overlay */}
      <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-48 object-contain transition-all duration-500 group-hover:scale-105 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
        )}

        <Link
          to={`/product/${product.id}`}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <button className="bg-white text-[#1d1d48] px-4 py-2 rounded-lg font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
            <Eye size={16} />
            Quick View
          </button>
        </Link>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-[#1d1d48] group-hover:text-[#747134] transition-colors duration-300 line-clamp-2 min-h-[3rem] flex items-center">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(rating)
                    ? "text-[#747134] fill-[#747134]"
                    : i < rating
                    ? "text-[#747134] fill-[#747134] opacity-50"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#1d1d48] font-bold text-lg">
              Rs. {product.price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-gray-500 text-sm line-through">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {isOnSale && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
              Save Rs. {(product.originalPrice - product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="bg-[#747134] text-white w-full py-3 rounded-lg font-medium hover:bg-[#5f5e2a] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>

      {/* Bottom Border Hover Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#747134] to-[#1d1d48] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
    </div>
  );
}
