import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { CareTypeSelectionPage } from "./components/CareTypeSelectionPage";
import { HospitalSelectionPage } from "./components/HospitalSelectionPage";
import { SpecializationSelectionPage } from "./components/SpecializationSelectionPage";
import { DoctorListingPage } from "./components/DoctorListingPage";
import { DoctorDetailPage } from "./components/DoctorDetailPage";
import { AdminTypeSelection } from "./components/admin/AdminTypeSelection";
import { HospitalAdminDashboard } from "./components/admin/HospitalAdminDashboard";
import { ClinicAdminDashboard } from "./components/admin/ClinicAdminDashboard";
import { PatientDashboard } from "./components/PatientDashboard";
import { TestPrescriptionDetails } from "./components/TestPrescriptionDetails";
import { LabDiscoveryPage } from "./components/LabDiscoveryPage";
import { LabBookingPage } from "./components/LabBookingPage";
import { TestTrackingPage } from "./components/TestTrackingPage";
import { LabDashboard } from "./components/LabDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { MedicalHistoryPage } from "./components/MedicalHistoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/care-type" element={<CareTypeSelectionPage />} />
        <Route path="/hospitals" element={<HospitalSelectionPage />} />
        <Route path="/specializations" element={<SpecializationSelectionPage />} />
        <Route path="/doctors" element={<DoctorListingPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminTypeSelection />} />
        <Route path="/admin/hospital" element={<HospitalAdminDashboard />} />
        <Route path="/admin/clinic" element={<ClinicAdminDashboard />} />
        
        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/test-prescription/:id" element={<TestPrescriptionDetails />} />
        <Route path="/patient/labs" element={<LabDiscoveryPage />} />
        <Route path="/patient/lab-booking/:labId" element={<LabBookingPage />} />
        <Route path="/patient/test-tracking/:orderId" element={<TestTrackingPage />} />
        <Route path="/patient/test-confirmation/:orderId" element={<TestTrackingPage />} />
        
        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        
        {/* Lab Routes */}
        <Route path="/lab/dashboard" element={<LabDashboard />} />
        
        {/* Medical History Route */}
        <Route path="/patient/medical-history" element={<MedicalHistoryPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}