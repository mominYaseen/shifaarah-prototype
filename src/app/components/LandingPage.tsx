import { useState } from "react";
import { Shield, Star, CreditCard, Search } from "lucide-react";
import { Button } from "./ui/button";
import { DoctorSearchDialog } from "./DoctorSearchDialog";

export function LandingPage() {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
              <span className="text-white text-xl">S</span>
            </div>
            <span className="text-2xl">Shifaarah</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Find Doctors
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              For Doctors
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Help
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl mb-6 text-gray-900">
            Find the Right Doctor,
            <br />
            <span className="text-blue-600">Book Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified healthcare professionals in your area. Quality care is just a few clicks away.
          </p>

          {/* Primary CTA */}
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 mb-12"
            onClick={() => setSearchDialogOpen(true)}
          >
            <Search className="mr-2 h-5 w-5" />
            Book a Doctor
          </Button>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Verified Doctors</h3>
              <p className="text-sm text-gray-600 text-center">
                All healthcare professionals are thoroughly verified and licensed
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Patient Reviews</h3>
              <p className="text-sm text-gray-600 text-center">
                Read genuine reviews from verified patients to make informed decisions
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-600 text-center">
                Your payment information is protected with bank-level security
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 md:py-24 border-t">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="mb-2 text-gray-900">Search</h3>
              <p className="text-sm text-gray-600">
                Find doctors by specialization and location
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="mb-2 text-gray-900">Choose</h3>
              <p className="text-sm text-gray-600">
                Browse profiles and select your preferred doctor
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="mb-2 text-gray-900">Book</h3>
              <p className="text-sm text-gray-600">
                Select date and time that works for you
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-4">
                4
              </div>
              <h3 className="mb-2 text-gray-900">Confirm</h3>
              <p className="text-sm text-gray-600">
                Complete payment and receive confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
                  <span className="text-white text-lg">S</span>
                </div>
                <span className="text-xl">Shifaarah</span>
              </div>
              <p className="text-sm text-gray-600">
                Your trusted healthcare partner for finding and booking appointments with verified doctors.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">For Patients</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Find Doctors</a></li>
                <li><a href="#" className="hover:text-blue-600">Book Appointment</a></li>
                <li><a href="#" className="hover:text-blue-600">Health Library</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">For Doctors</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Join Network</a></li>
                <li><a href="#" className="hover:text-blue-600">Doctor Login</a></li>
                <li><a href="#" className="hover:text-blue-600">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Shifaarah. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <DoctorSearchDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />
    </div>
  );
}
