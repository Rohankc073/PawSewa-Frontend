import { Award, Calendar, MapPin, Phone, Star, Stethoscope } from 'lucide-react';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    experience: 8,
    rating: 5,
    specialty: "Small Animals",
    location: "Downtown Clinic",
    nextAvailable: "Today 2:00 PM",
    consultationFee: "$85",
    verified: true
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    experience: 12,
    rating: 5,
    specialty: "Exotic Animals",
    location: "Pet Care Center",
    nextAvailable: "Tomorrow 10:00 AM",
    consultationFee: "$95",
    verified: true
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    imageUrl: "https://images.unsplash.com/photo-1594824947041-7c95c8b0b89d?w=200&h=200&fit=crop&crop=face",
    experience: 6,
    rating: 4,
    specialty: "Surgery",
    location: "Animal Hospital",
    nextAvailable: "Friday 9:00 AM",
    consultationFee: "$120",
    verified: true
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&crop=face",
    experience: 15,
    rating: 5,
    specialty: "Large Animals",
    location: "Rural Veterinary",
    nextAvailable: "Monday 11:00 AM",
    consultationFee: "$100",
    verified: true
  },
  {
    id: 5,
    name: "Dr. Lisa Thompson",
    imageUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&crop=face",
    experience: 10,
    rating: 5,
    specialty: "Dermatology",
    location: "Skin & Coat Clinic",
    nextAvailable: "Wednesday 3:00 PM",
    consultationFee: "$90",
    verified: true
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    imageUrl: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop&crop=face",
    experience: 7,
    rating: 4,
    specialty: "Emergency Care",
    location: "24/7 Pet Emergency",
    nextAvailable: "Available Now",
    consultationFee: "$110",
    verified: true
  }
];

export default function EnhancedDoctorCards() {
  return (
    <section className="px-6 md:px-20 pt-28 pb-20 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200"
          >
            {/* Verified Badge */}
            {doc.verified && (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 z-10">
                <Award size={12} />
                Verified
              </div>
            )}

            <div className="p-6">
              {/* Image */}
              <div className="mb-6 text-center">
                <div className="w-24 h-24 mx-auto relative">
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white" />
                </div>
              </div>

              {/* Info */}
              <div className="text-center mb-4">
                <h3 className="font-semibold text-lg text-[#1d1d48] mb-1">{doc.name}</h3>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-700 mb-1">
                  <Stethoscope size={14} />
                  {doc.specialty}
                </div>
                <p className="text-sm text-gray-600">{doc.experience} Years Experience</p>
              </div>

              {/* Rating */}
              <div className="flex justify-center items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < doc.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({doc.rating}.0)</span>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#747134]" />
                  <span>{doc.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#747134]" />
                  <span>Next: {doc.nextAvailable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#747134]">💰</span>
                  <span>From {doc.consultationFee}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-[#747134] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#5f5e2a] transition">
                  Book Now
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:border-[#747134] hover:bg-[#f8f8f1] transition">
                  <Phone size={16} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-16">
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-[#747134] text-white rounded-md hover:bg-[#5f5e2a] text-sm font-medium">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium">
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
