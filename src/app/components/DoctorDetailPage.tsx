import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Award, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { mockDoctors } from "../data/mockData";
import { PaymentDialog } from "./PaymentDialog";

export function DoctorDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const doctor = mockDoctors.find((d) => d.id === id);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Doctor not found</p>
          <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const availableDates = doctor.availableDates.map((date) => new Date(date));

  const handleBookAppointment = () => {
    if (selectedDate && selectedTimeSlot) {
      setPaymentDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-40 h-40 rounded-xl object-cover"
                  />
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h1 className="text-3xl text-gray-900">{doctor.name}</h1>
                          <p className="text-xl text-blue-600">{doctor.specialization}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Verified
                        </Badge>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{doctor.experience} years experience</span>
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
                        <span className="text-xl text-gray-900">{doctor.rating}</span>
                      </div>
                      <span className="text-gray-600">
                        ({doctor.reviewCount} patient reviews)
                      </span>
                    </div>

                    <p className="text-gray-600">{doctor.clinic}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Qualifications */}
            <Card>
              <CardHeader>
                <CardTitle>Qualifications</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {doctor.qualifications.map((qual, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{qual}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
              </CardContent>
            </Card>
          </div>

          {/* Appointment Booking Section */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Consultation Fee */}
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Consultation Fee</p>
                  <p className="text-2xl text-blue-600">${doctor.consultationFee}</p>
                </div>

                {/* Date Selection */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-900">Select Date</span>
                  </div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date < new Date() ||
                      !availableDates.some(
                        (availableDate) =>
                          availableDate.toDateString() === date.toDateString()
                      )
                    }
                    className="rounded-md border"
                  />
                </div>

                {/* Time Slot Selection */}
                {selectedDate && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-gray-900">Select Time</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {doctor.timeSlots.map((slot) => (
                        <Button
                          key={slot}
                          variant={selectedTimeSlot === slot ? "default" : "outline"}
                          className={
                            selectedTimeSlot === slot
                              ? "bg-blue-600 hover:bg-blue-700"
                              : ""
                          }
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        doctor={doctor}
        date={selectedDate}
        timeSlot={selectedTimeSlot}
      />
    </div>
  );
}
