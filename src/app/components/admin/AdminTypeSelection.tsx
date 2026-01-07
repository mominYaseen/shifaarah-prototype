import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Stethoscope } from "lucide-react";
import { Button } from "../ui/button";

export function AdminTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
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
              <h1 className="text-xl text-gray-900">Admin Portal</h1>
              <p className="text-sm text-gray-600">Select your dashboard type</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-gray-900 mb-3">Select Admin Dashboard</h2>
          <p className="text-lg text-gray-600">
            Choose the type of facility you manage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hospital Admin */}
          <div
            onClick={() => navigate("/admin/hospital")}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 cursor-pointer transition-all hover:border-blue-500 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-blue-100 opacity-50 transition-transform group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <Building2 className="h-8 w-8" />
              </div>
              
              <h3 className="mb-3 text-2xl text-gray-900">Hospital Dashboard</h3>
              
              <p className="mb-6 text-gray-600">
                Manage hospital operations, multiple doctors, appointments, and schedules.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>Doctor management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>Schedule management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span>Appointment tracking</span>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-white transition-colors group-hover:bg-blue-700">
                  Hospital Admin
                </div>
              </div>
            </div>
          </div>

          {/* Private Clinic Admin */}
          <div
            onClick={() => navigate("/admin/clinic")}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 cursor-pointer transition-all hover:border-green-500 hover:shadow-2xl"
          >
            <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-green-100 opacity-50 transition-transform group-hover:scale-150" />
            
            <div className="relative z-10">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <Stethoscope className="h-8 w-8" />
              </div>
              
              <h3 className="mb-3 text-2xl text-gray-900">Clinic Dashboard</h3>
              
              <p className="mb-6 text-gray-600">
                Manage clinic availability, appointments, and patient bookings.
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Availability management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Appointment tracking</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  <span>Booking management</span>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="w-full rounded-lg bg-green-600 px-4 py-3 text-center text-white transition-colors group-hover:bg-green-700">
                  Clinic Admin
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}