import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Stethoscope, Heart, User, Activity, Baby, Brain, Smile, Eye, Ear, Scissors } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { specializations, mockHospitals, mockDoctors } from "../data/mockData";

const specializationIcons: Record<string, React.ReactNode> = {
  "General Physician": <User className="h-6 w-6" />,
  "Cardiologist": <Heart className="h-6 w-6" />,
  "Dermatologist": <Activity className="h-6 w-6" />,
  "Orthopedic Surgeon": <Scissors className="h-6 w-6" />,
  "Pediatrician": <Baby className="h-6 w-6" />,
  "Neurologist": <Brain className="h-6 w-6" />,
  "Psychiatrist": <Brain className="h-6 w-6" />,
  "Gynecologist": <Activity className="h-6 w-6" />,
  "Dentist": <Smile className="h-6 w-6" />,
  "Ophthalmologist": <Eye className="h-6 w-6" />,
  "ENT Specialist": <Ear className="h-6 w-6" />,
  "Gastroenterologist": <Activity className="h-6 w-6" />,
};

export function SpecializationSelectionPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as "hospital" | "clinic" | null;
  const hospitalId = searchParams.get("hospitalId");
  const [searchQuery, setSearchQuery] = useState("");

  // Get hospital info if hospitalId is present
  const selectedHospital = hospitalId
    ? mockHospitals.find((h) => h.id === hospitalId)
    : null;

  // Filter specializations by hospital if applicable
  const availableSpecializations = selectedHospital
    ? selectedHospital.specializations
    : specializations;

  const filteredSpecializations = availableSpecializations.filter((spec) =>
    spec.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecializationSelect = (specialization: string) => {
    // Navigate to doctors list with all context
    const params = new URLSearchParams({
      specialization,
      type: type || "",
    });
    if (hospitalId) {
      params.append("hospitalId", hospitalId);
    }
    navigate(`/doctors?${params.toString()}`);
  };

  const handleBackClick = () => {
    if (hospitalId) {
      // If coming from hospital selection, go back to hospitals page
      navigate("/hospitals");
    } else {
      // Otherwise go to care type selection
      navigate("/care-type");
    }
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
              onClick={handleBackClick}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl text-gray-900">
                Select Specialization
              </h1>
              <p className="text-sm text-gray-600">
                {type === "hospital" ? "Hospital" : "Private Clinic"} Services
              </p>
            </div>
            {type && (
              <Badge
                variant="secondary"
                className={
                  type === "hospital"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }
              >
                {type === "hospital" ? "Hospital" : "Clinic"}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hospital Info Banner (if hospital is selected) */}
        {selectedHospital && (
          <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <img
                src={selectedHospital.image}
                alt={selectedHospital.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg text-gray-900">{selectedHospital.name}</h2>
                <p className="text-sm text-gray-600">{selectedHospital.location}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedHospital.doctorCount} Doctors
              </Badge>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search specializations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Specializations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpecializations.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No specializations found</p>
            </div>
          ) : (
            filteredSpecializations.map((specialization) => (
              <button
                key={specialization}
                onClick={() => handleSpecializationSelect(specialization)}
                className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-blue-500 hover:shadow-lg"
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    {specializationIcons[specialization] || <Stethoscope className="h-6 w-6" />}
                  </div>
                  <h3 className="text-gray-900">{specialization}</h3>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}