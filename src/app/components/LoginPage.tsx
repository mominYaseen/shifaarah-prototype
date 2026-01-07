import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

// Demo credentials
const DEMO_CREDENTIALS = {
  patient: {
    email: "patient@shifarah.app",
    password: "Patient@123",
    role: "patient",
    redirect: "/patient/dashboard"
  },
  clinic: {
    email: "clinic@shifarah.app",
    password: "Clinic@123",
    role: "clinic",
    redirect: "/admin/clinic"
  },
  hospital: {
    email: "hospital@shifarah.app",
    password: "Hospital@123",
    role: "hospital",
    redirect: "/admin/hospital"
  },
  doctor: {
    email: "doctor@shifarah.app",
    password: "Doctor@123",
    role: "doctor",
    redirect: "/doctor/dashboard"
  },
  lab: {
    email: "lab@shifarah.app",
    password: "Lab@123",
    role: "lab",
    redirect: "/lab/dashboard"
  }
};

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Check credentials
      const credential = Object.values(DEMO_CREDENTIALS).find(
        cred => cred.email === email && cred.password === password
      );

      if (credential) {
        // Store user session
        localStorage.setItem('shifarah_user', JSON.stringify({
          email: credential.email,
          role: credential.role
        }));
        
        toast.success(`Welcome! Logging in as ${credential.role}...`);
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
          navigate(credential.redirect);
        }, 500);
      } else {
        toast.error("Invalid credentials. Please use demo account credentials.");
        setLoading(false);
      }
    }, 800);
  };

  const handleDemoLogin = (role: keyof typeof DEMO_CREDENTIALS) => {
    const credential = DEMO_CREDENTIALS[role];
    setEmail(credential.email);
    setPassword(credential.password);
    
    // Auto-submit after filling
    setTimeout(() => {
      // Store user session
      localStorage.setItem('shifarah_user', JSON.stringify({
        email: credential.email,
        role: credential.role
      }));
      
      toast.success(`Logging in as ${credential.role}...`);
      navigate(credential.redirect);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
              <span className="text-white text-xl">S</span>
            </div>
            <span className="text-2xl">Shifarah</span>
          </div>
          <p className="text-gray-600">Unified Healthcare Platform</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-lg">
          <div className="mb-6">
            <h2 className="text-2xl text-gray-900 mb-2">Sign In</h2>
            <p className="text-sm text-gray-600">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Demo Accounts Toggle */}
          <div className="mt-6">
            <Button
              variant="ghost"
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              {showDemoAccounts ? "Hide" : "Show"} Demo Account Credentials
            </Button>
          </div>

          {/* Demo Accounts List */}
          {showDemoAccounts && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-sm text-gray-900 mb-3">Demo Accounts:</h3>
              <div className="space-y-3">
                {/* Patient Demo */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-900">Patient</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin('patient')}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> patient@shifarah.app
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Password:</strong> Patient@123
                  </p>
                </div>

                {/* Clinic Demo */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-600" />
                      <span className="text-sm text-gray-900">Private Clinic</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin('clinic')}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> clinic@shifarah.app
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Password:</strong> Clinic@123
                  </p>
                </div>

                {/* Hospital Demo */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-900">Hospital</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin('hospital')}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> hospital@shifarah.app
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Password:</strong> Hospital@123
                  </p>
                </div>

                {/* Doctor Demo */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-teal-600" />
                      <span className="text-sm text-gray-900">Doctor</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin('doctor')}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> doctor@shifarah.app
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Password:</strong> Doctor@123
                  </p>
                </div>

                {/* Lab Demo */}
                <div className="p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-gray-900">Diagnostic Lab</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDemoLogin('lab')}
                    >
                      Use
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> lab@shifarah.app
                  </p>
                  <p className="text-xs text-gray-600">
                    <strong>Password:</strong> Lab@123
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <a href="#" className="text-sm text-blue-600 hover:underline block">
              Forgot Password?
            </a>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
