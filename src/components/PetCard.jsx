import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100 hover:border-[#747134]/30 group hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img
          src={`http://localhost:5005/${pet.image?.replace(/\\/g, "/")}`}
          alt={pet.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md rounded-full p-2 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
          <Heart size={18} className="text-gray-400 hover:text-red-500 hover:fill-red-500 transition-all duration-200 cursor-pointer" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-[#1d1d48] leading-tight tracking-tight">{pet.name}</h3>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 rounded-full px-3 py-1.5 w-fit">
          <MapPin size={16} className="text-[#747134]" />
          <span className="text-sm font-medium">{pet.location}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
            <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Gender</span>
            <p className="font-bold text-[#1d1d48] text-sm mt-1">{pet.gender}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
            <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Breed</span>
            <p className="font-bold text-[#1d1d48] text-sm mt-1">{pet.breed}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
            <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Age</span>
            <p className="font-bold text-[#1d1d48] text-sm mt-1">{pet.age} {pet.age === 1 ? "year" : "years"}</p>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200/50">
            <span className="text-gray-500 text-xs uppercase tracking-wide font-medium">Size</span>
            <p className="font-bold text-[#1d1d48] text-sm mt-1">{pet.size}</p>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[3.5rem] bg-gray-50/50 rounded-lg p-3 border border-gray-200/30">
          {pet.description}
        </p>
        
        <Link to={`/adoption/${pet._id}`} className="block">
          <button className="w-full py-3.5 px-6 bg-gradient-to-r from-[#747134] via-[#6b6530] to-[#5a5628] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:from-[#5a5628] hover:via-[#6b6530] hover:to-[#747134] transition-all duration-300 transform hover:-translate-y-1 text-sm tracking-wide uppercase border border-[#747134]/20 hover:border-[#747134]/40">
            Learn More About Me
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;