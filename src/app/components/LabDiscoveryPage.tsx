import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, Home, Shield, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { mockDiagnosticLabs, mockTestPrescriptions, mockLabTests, type DiagnosticLab } from "../data/labMockData";

export function LabDiscoveryPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const prescriptionId = searchParams.get("prescription");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterHomeCollection, setFilterHomeCollection] = useState(false);
  const [filterPartner, setFilterPartner] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "distance">("rating");
  
  const prescription = prescriptionId 
    ? mockTestPrescriptions.find(p => p.id === prescriptionId)
    : null;

  // Filter and sort labs
  let filteredLabs = mockDiagnosticLabs.filter(lab => {
    if (searchQuery && !lab.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !lab.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filterHomeCollection && !lab.homeCollection) return false;
    if (filterPartner && !lab.partnerLab) return false;
    return true;
  });

  filteredLabs = [...filteredLabs].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return a.distance - b.distance;
  });

  const handleBookLab = (lab: DiagnosticLab) => {
    if (prescriptionId) {
      navigate(`/patient/lab-booking/${lab.id}?prescription=${prescriptionId}`);
    } else {
      navigate(`/patient/lab-booking/${lab.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl text-gray-900">Find Diagnostic Labs</h1>
          {prescription && (
            <p className="text-sm text-gray-600 mt-1">
              Booking for tests prescribed by {prescription.doctorName}
            </p>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search labs by name or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort */}
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rating" | "distance")}
            >
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
            </select>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters:
            </span>
            <Button
              variant={filterHomeCollection ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterHomeCollection(!filterHomeCollection)}
              className={filterHomeCollection ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Home className="h-4 w-4 mr-1" />
              Home Collection
            </Button>
            <Button
              variant={filterPartner ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPartner(!filterPartner)}
              className={filterPartner ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              <Shield className="h-4 w-4 mr-1" />
              Partner Labs
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-gray-600 mb-4">
          {filteredLabs.length} lab{filteredLabs.length !== 1 ? 's' : ''} found
        </p>

        {/* Lab Listings */}
        <div className="space-y-4">
          {filteredLabs.map((lab) => (
            <Card key={lab.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Lab Image */}
                <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={lab.image}
                    alt={lab.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Lab Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl text-gray-900">{lab.name}</h3>
                        {lab.partnerLab && (
                          <Badge className="bg-blue-600">
                            <Shield className="h-3 w-3 mr-1" />
                            Partner
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>{lab.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-gray-900">{lab.rating}</span>
                          <span className="text-gray-600">({lab.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>{lab.distance} km away</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {lab.homeCollection && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                        <Home className="h-3 w-3 mr-1" />
                        Home Collection Available
                      </Badge>
                    )}
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                      <Clock className="h-3 w-3 mr-1" />
                      {lab.openTime} - {lab.closeTime}
                    </Badge>
                  </div>

                  {/* Available Tests for Prescription */}
                  {prescription && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Available tests from your prescription:</p>
                      <div className="flex flex-wrap gap-2">
                        {prescription.tests.map(testId => {
                          const test = mockLabTests.find(t => t.id === testId);
                          const isAvailable = lab.availableTests.includes(testId);
                          return test ? (
                            <Badge
                              key={testId}
                              variant="outline"
                              className={isAvailable 
                                ? "bg-green-50 text-green-700 border-green-300" 
                                : "bg-gray-50 text-gray-500 border-gray-300"}
                            >
                              {test.name} {isAvailable ? "✓" : "✗"}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleBookLab(lab)}
                    >
                      Book Appointment
                    </Button>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">No Labs Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find diagnostic labs
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setFilterHomeCollection(false);
                setFilterPartner(false);
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
