import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Award } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockDoctors } from "../data/mockData";

export function DoctorListingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const specialization = searchParams.get("specialization");
  const location = searchParams.get("location");

  const filteredDoctors = mockDoctors
    .filter((doctor) => {
      if (specialization && doctor.specialization !== specialization) return false;
      if (location && doctor.location !== location) return false;
      return true;
    })
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl">
                {specialization ? `${specialization}s` : "Doctors"}{" "}
                {location && `in ${location}`}
              </h1>
              <p className="text-sm text-gray-600">
                {filteredDoctors.length} doctors found
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Doctor List */}
      <div className="container mx-auto px-4 py-8">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No doctors found matching your criteria
            </p>
            <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
              Try Different Search
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Doctor Image */}
                    <div className="shrink-0">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-32 h-32 rounded-xl object-cover"
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h2 className="text-2xl text-gray-900">{doctor.name}</h2>
                            <p className="text-blue-600">{doctor.specialization}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700 shrink-0">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            <span>{doctor.experience} years exp.</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{doctor.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-900">{doctor.rating}</span>
                        </div>
                        <span className="text-gray-600 text-sm">
                          ({doctor.reviewCount} reviews)
                        </span>
                      </div>

                      <p className="text-sm text-gray-600">{doctor.clinic}</p>

                      <div className="pt-2">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          View Profile & Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
