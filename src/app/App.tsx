import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { CareTypeSelectionPage } from "./components/CareTypeSelectionPage";
import { HospitalSelectionPage } from "./components/HospitalSelectionPage";
import { SpecializationSelectionPage } from "./components/SpecializationSelectionPage";
import { DoctorListingPage } from "./components/DoctorListingPage";
import { DoctorDetailPage } from "./components/DoctorDetailPage";
import { AdminTypeSelection } from "./components/admin/AdminTypeSelection";
import { HospitalAdminDashboard } from "./components/admin/HospitalAdminDashboard";
import { ClinicAdminDashboard } from "./components/admin/ClinicAdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/care-type" element={<CareTypeSelectionPage />} />
        <Route path="/hospitals" element={<HospitalSelectionPage />} />
        <Route path="/specializations" element={<SpecializationSelectionPage />} />
        <Route path="/doctors" element={<DoctorListingPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        <Route path="/admin" element={<AdminTypeSelection />} />
        <Route path="/admin/hospital" element={<HospitalAdminDashboard />} />
        <Route path="/admin/clinic" element={<ClinicAdminDashboard />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}