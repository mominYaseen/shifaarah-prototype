import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Star, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { mockHospitals } from "../data/mockData";

export function HospitalSelectionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredHospitals = mockHospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter
      ? hospital.location.toLowerCase().includes(locationFilter.toLowerCase())
      : true;
    return matchesSearch && matchesLocation;
  });

  const handleHospitalSelect = (hospitalId: string) => {
    navigate(`/specializations?type=hospital&hospitalId=${hospitalId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/care-type")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl text-gray-900">Select Hospital</h1>
              <p className="text-sm text-gray-600">Choose a hospital to continue</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search hospitals by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No hospitals found</p>
            </div>
          ) : (
            filteredHospitals.map((hospital) => (
              <button
                key={hospital.id}
                onClick={() => handleHospitalSelect(hospital.id)}
                className="group overflow-hidden rounded-xl border-2 border-gray-200 bg-white text-left transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-900">{hospital.rating}</span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">{hospital.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{hospital.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{hospital.doctorCount} Doctors Available</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {hospital.specializations.slice(0, 2).map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                      >
                        {spec}
                      </span>
                    ))}
                    {hospital.specializations.length > 2 && (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                        +{hospital.specializations.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}