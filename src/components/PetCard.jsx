import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 border border-gray-100 hover:border-[#747134]/20 group">
      <div className="relative overflow-hidden rounded-xl mb-3">
        <img
          src={`http://localhost:5005/${pet.image?.replace(/\\/g, "/")}`}
          alt={pet.name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-md">
          <Heart size={16} className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-200 cursor-pointer" />
        </div>
      </div>
      
      <div className="space-y-2.5">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[#1d1d48] leading-tight">{pet.name}</h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500">
          <MapPin size={14} className="text-[#747134]" />
          <span className="text-xs font-medium">{pet.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-1.5 text-sm">
          <div className="bg-gray-50 rounded-lg p-1.5">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Gender</span>
            <p className="font-semibold text-[#1d1d48] text-xs">{pet.gender}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-1.5">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Breed</span>
            <p className="font-semibold text-[#1d1d48] text-xs">{pet.breed}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-1.5">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Age</span>
            <p className="font-semibold text-[#1d1d48] text-xs">{pet.age} {pet.age === 1 ? "year" : "years"}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-1.5">
            <span className="text-gray-500 text-xs uppercase tracking-wide">Size</span>
            <p className="font-semibold text-[#1d1d48] text-xs">{pet.size}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 min-h-[2.25rem]">
          {pet.description}
        </p>
        
        <Link to={`/adoption/${pet._id}`} className="block">
          <button className="w-full py-2.5 px-4 bg-gradient-to-r from-[#747134] to-[#5a5628] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-[#5a5628] hover:to-[#747134] transition-all duration-200 transform hover:-translate-y-0.5 text-sm">
            Learn More About Me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;