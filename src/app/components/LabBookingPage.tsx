import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar as CalendarIcon, Home, MapPin, Clock, FileText, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { RadioGroup } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { mockDiagnosticLabs, mockTestPrescriptions, mockLabTests, mockTestOrders } from "../data/labMockData";
import { toast } from "sonner";

export function LabBookingPage() {
  const navigate = useNavigate();
  const { labId } = useParams();
  const [searchParams] = useSearchParams();
  const prescriptionId = searchParams.get("prescription");
  
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [collectionType, setCollectionType] = useState<"lab" | "home">("lab");
  const [address, setAddress] = useState("Rajbagh, Srinagar, J&K 190008");
  
  const lab = mockDiagnosticLabs.find(l => l.id === labId);
  const prescription = prescriptionId 
    ? mockTestPrescriptions.find(p => p.id === prescriptionId)
    : null;

  if (!lab) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl text-gray-900 mb-4">Lab Not Found</h2>
          <Button onClick={() => navigate("/patient/labs")}>Back to Labs</Button>
        </Card>
      </div>
    );
  }

  // Generate time slots
  const timeSlots = [
    "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  const prescribedTests = prescription 
    ? prescription.tests.map(testId => mockLabTests.find(t => t.id === testId)).filter(Boolean)
    : [];

  const totalAmount = prescribedTests.reduce((sum, test) => sum + (test?.price || 0), 0);

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast.error("Please select date and time for your appointment");
      return;
    }

    if (collectionType === "home" && !address.trim()) {
      toast.error("Please enter your address for home collection");
      return;
    }

    // Create mock order
    const newOrderId = `order${mockTestOrders.length + 1}`;
    toast.success("Lab test booking confirmed!");
    
    // Navigate to confirmation page
    navigate(`/patient/test-confirmation/${newOrderId}`);
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
          <h1 className="text-2xl text-gray-900">Book Lab Appointment</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lab Information */}
            <Card className="p-6">
              <div className="flex gap-4">
                <img
                  src={lab.image}
                  alt={lab.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl text-gray-900 mb-2">{lab.name}</h2>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{lab.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{lab.openTime} - {lab.closeTime}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Collection Type */}
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4">Select Collection Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  className={`p-4 border-2 rounded-lg transition-all ${
                    collectionType === "lab"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setCollectionType("lab")}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      collectionType === "lab" ? "bg-blue-600" : "bg-gray-200"
                    }`}>
                      <MapPin className={`h-6 w-6 ${
                        collectionType === "lab" ? "text-white" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Visit Lab</h4>
                      <p className="text-sm text-gray-600">Visit diagnostic center</p>
                    </div>
                  </div>
                </button>

                <button
                  className={`p-4 border-2 rounded-lg transition-all ${
                    collectionType === "home"
                      ? "border-blue-600 bg-blue-50"
                      : lab.homeCollection
                      ? "border-gray-200 hover:border-blue-300"
                      : "border-gray-200 opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => lab.homeCollection && setCollectionType("home")}
                  disabled={!lab.homeCollection}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      collectionType === "home" ? "bg-blue-600" : "bg-gray-200"
                    }`}>
                      <Home className={`h-6 w-6 ${
                        collectionType === "home" ? "text-white" : "text-gray-600"
                      }`} />
                    </div>
                    <div className="text-left">
                      <h4 className="text-gray-900">Home Collection</h4>
                      <p className="text-sm text-gray-600">
                        {lab.homeCollection ? "Sample from home" : "Not available"}
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {collectionType === "home" && lab.homeCollection && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-700 mb-2">
                    Home Address
                  </label>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Additional charges may apply for home collection
                  </p>
                </div>
              )}
            </Card>

            {/* Date Selection */}
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                Select Date
              </h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                  className="rounded-md border"
                />
              </div>
            </Card>

            {/* Time Slot Selection */}
            {selectedDate && (
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Select Time Slot
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      className={`p-3 border rounded-lg text-sm transition-all ${
                        selectedTimeSlot === slot
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-200 hover:border-blue-300 text-gray-700"
                      }`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h3 className="text-lg text-gray-900 mb-4">Booking Summary</h3>
              
              {prescription && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Prescribed By</p>
                  <p className="text-gray-900">{prescription.doctorName}</p>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <h4 className="text-sm text-gray-600 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Tests ({prescribedTests.length})
                </h4>
                {prescribedTests.map((test) => (
                  <div key={test?.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">{test?.name}</span>
                    <span className="text-gray-900">₹{test?.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{totalAmount}</span>
                </div>
                {collectionType === "home" && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Home Collection</span>
                    <span className="text-gray-900">₹100</span>
                  </div>
                )}
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">
                    ₹{totalAmount + (collectionType === "home" ? 100 : 0)}
                  </span>
                </div>
              </div>

              {selectedDate && selectedTimeSlot && (
                <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Appointment Scheduled</p>
                  <p className="text-gray-900">
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-900">{selectedTimeSlot}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {collectionType === "home" ? "Home Collection" : "Lab Visit"}
                  </p>
                </div>
              )}

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTimeSlot}
              >
                Confirm Booking
              </Button>

              <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Report will be automatically shared with your prescribing doctor
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
