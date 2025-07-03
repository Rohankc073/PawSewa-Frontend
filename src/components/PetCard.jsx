// components/PetCard.jsx
import { Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <img
        src={`http://localhost:5005/${pet.image?.replace(/\\/g, "/")}`}
        alt={pet.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-[#1d1d48]">{pet.name}</h3>
        <Heart size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-1 mb-2">
        <MapPin size={14} />
        {pet.location}
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-3">
        <span><strong>Gender:</strong> {pet.gender}</span>
        <span><strong>Breed:</strong> {pet.breed}</span>
        <span><strong>Age:</strong> {pet.age} {pet.age === 1 ? "year" : "years"}</span>
        <span><strong>Size:</strong> {pet.size}</span>
      </div>
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {pet.description}
      </p>
      <Link to={`/adoption/${pet._id}`}>
        <button className="w-full py-2 border border-[#747134] rounded-md text-[#747134] hover:bg-[#747134] hover:text-white transition">
          More Info
        </button>
      </Link>
    </div>
  );
};

export default PetCard;
