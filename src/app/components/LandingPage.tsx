import {
  Shield,
  Star,
  CreditCard,
  Search,
  TrendingUp,
  TestTube,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

// Disease trend data (2015-2025)
const diseaseData = {
  Diabetes: [
    { year: 2015, rate: 8200 },
    { year: 2016, rate: 8500 },
    { year: 2017, rate: 8900 },
    { year: 2018, rate: 9300 },
    { year: 2019, rate: 9800 },
    { year: 2020, rate: 10200 },
    { year: 2021, rate: 10800 },
    { year: 2022, rate: 11300 },
    { year: 2023, rate: 11900 },
    { year: 2024, rate: 12400 },
    { year: 2025, rate: 13000 },
  ],
  Hypertension: [
    { year: 2015, rate: 12500 },
    { year: 2016, rate: 13100 },
    { year: 2017, rate: 13700 },
    { year: 2018, rate: 14300 },
    { year: 2019, rate: 15000 },
    { year: 2020, rate: 15600 },
    { year: 2021, rate: 16300 },
    { year: 2022, rate: 17000 },
    { year: 2023, rate: 17700 },
    { year: 2024, rate: 18400 },
    { year: 2025, rate: 19100 },
  ],
  "Heart Disease": [
    { year: 2015, rate: 6200 },
    { year: 2016, rate: 6350 },
    { year: 2017, rate: 6500 },
    { year: 2018, rate: 6680 },
    { year: 2019, rate: 6800 },
    { year: 2020, rate: 7100 },
    { year: 2021, rate: 7250 },
    { year: 2022, rate: 7400 },
    { year: 2023, rate: 7580 },
    { year: 2024, rate: 7750 },
    { year: 2025, rate: 7920 },
  ],
  Asthma: [
    { year: 2015, rate: 4800 },
    { year: 2016, rate: 4900 },
    { year: 2017, rate: 5050 },
    { year: 2018, rate: 5150 },
    { year: 2019, rate: 5200 },
    { year: 2020, rate: 5500 },
    { year: 2021, rate: 5650 },
    { year: 2022, rate: 5450 },
    { year: 2023, rate: 5350 },
    { year: 2024, rate: 5300 },
    { year: 2025, rate: 5250 },
  ],
  Tuberculosis: [
    { year: 2015, rate: 8500 },
    { year: 2016, rate: 8100 },
    { year: 2017, rate: 7700 },
    { year: 2018, rate: 7300 },
    { year: 2019, rate: 6900 },
    { year: 2020, rate: 6600 },
    { year: 2021, rate: 6200 },
    { year: 2022, rate: 5900 },
    { year: 2023, rate: 5600 },
    { year: 2024, rate: 5300 },
    { year: 2025, rate: 5000 },
  ],
  Cancer: [
    { year: 2015, rate: 3200 },
    { year: 2016, rate: 3280 },
    { year: 2017, rate: 3370 },
    { year: 2018, rate: 3460 },
    { year: 2019, rate: 3560 },
    { year: 2020, rate: 3650 },
    { year: 2021, rate: 3750 },
    { year: 2022, rate: 3850 },
    { year: 2023, rate: 3960 },
    { year: 2024, rate: 4070 },
    { year: 2025, rate: 4180 },
  ],
  "Thyroid Disorders": [
    { year: 2015, rate: 2800 },
    { year: 2016, rate: 2950 },
    { year: 2017, rate: 3150 },
    { year: 2018, rate: 3350 },
    { year: 2019, rate: 3600 },
    { year: 2020, rate: 3850 },
    { year: 2021, rate: 4100 },
    { year: 2022, rate: 4350 },
    { year: 2023, rate: 4600 },
    { year: 2024, rate: 4850 },
    { year: 2025, rate: 5100 },
  ],
  "Chronic Kidney Disease": [
    { year: 2015, rate: 1500 },
    { year: 2016, rate: 1580 },
    { year: 2017, rate: 1670 },
    { year: 2018, rate: 1760 },
    { year: 2019, rate: 1860 },
    { year: 2020, rate: 1950 },
    { year: 2021, rate: 2050 },
    { year: 2022, rate: 2160 },
    { year: 2023, rate: 2270 },
    { year: 2024, rate: 2390 },
    { year: 2025, rate: 2510 },
  ],
};

export function LandingPage() {
  const navigate = useNavigate();
  const [selectedDisease, setSelectedDisease] =
    useState<keyof typeof diseaseData>("Diabetes");

  const scrollToAnalytics = () => {
    const analyticsSection = document.getElementById(
      "analytics-section",
    );
    if (analyticsSection) {
      analyticsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
              <span className="text-white text-xl">S</span>
            </div>
            <span className="text-2xl">Shifarah</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Find Doctors
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              For Doctors
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Help
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl mb-6 text-gray-900">
            Book Trusted Doctors.
            <br />
            <span className="text-blue-600">
              Understand Health Trends.
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with verified healthcare professionals and
            stay informed about public health trends. Make
            data-driven decisions for your wellbeing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-xl px-12 py-8 w-full max-w-md"
              onClick={() => navigate("/care-type")}
            >
              <Search className="mr-2 h-6 w-6" />
              Book a Doctor
            </Button>
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-xl px-12 py-8 w-full max-w-md"
              onClick={() => navigate("/patient/labs")}
            >
              <TestTube className="mr-2 h-6 w-6" />
              Explore Labs
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-lg px-8 py-6 text-blue-600 hover:text-blue-700 hover:bg-blue-50 w-full max-w-md"
              onClick={scrollToAnalytics}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Explore Health Trends
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 text-gray-900">
                Verified Doctors
              </h3>
              <p className="text-sm text-gray-600 text-center">
                All healthcare professionals are thoroughly
                verified and licensed
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-gray-900">
                Patient Reviews
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Read genuine reviews from verified patients to
                make informed decisions
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 text-gray-900">
                Secure Payments
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Your payment information is protected with
                bank-level security
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

      {/* Disease Analytics Section */}
      <section
        className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24 border-t"
        id="analytics-section"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl text-center mb-4 text-gray-900">
              Disease Prevalence Trends Over Time
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore how common diseases have evolved over the
              years to promote awareness and early action.
            </p>

            {/* Analytics Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Disease Selector */}
              <div className="mb-8">
                <label
                  htmlFor="disease-select"
                  className="block mb-3 text-gray-700"
                >
                  Select Disease
                </label>
                <select
                  id="disease-select"
                  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  value={selectedDisease}
                  onChange={(e) =>
                    setSelectedDisease(
                      e.target
                        .value as keyof typeof diseaseData,
                    )
                  }
                >
                  {Object.keys(diseaseData).map((disease) => (
                    <option key={disease} value={disease}>
                      {disease}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chart */}
              <div className="w-full h-[400px] md:h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={diseaseData[selectedDisease]}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                    />
                    <XAxis
                      dataKey="year"
                      stroke="#6b7280"
                      style={{ fontSize: "14px" }}
                      label={{
                        value: "Year",
                        position: "insideBottom",
                        offset: -10,
                        style: { fill: "#6b7280" },
                      }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: "14px" }}
                      label={{
                        value: "Prevalence Rate (per 100,000)",
                        angle: -90,
                        position: "insideLeft",
                        style: { fill: "#6b7280" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        boxShadow:
                          "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Rate",
                      ]}
                      labelFormatter={(label) =>
                        `Year: ${label}`
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: "#2563eb", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Data shown is for demonstration and awareness
                  purposes only.
                </p>
              </div>
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
                Your trusted healthcare partner for finding and
                booking appointments with verified doctors.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">
                For Patients
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Find Doctors
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Health Library
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">
                For Doctors
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Join Network
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Doctor Login
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 Shifaarah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}