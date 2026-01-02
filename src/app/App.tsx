import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { DoctorListingPage } from "./components/DoctorListingPage";
import { DoctorDetailPage } from "./components/DoctorDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/doctors" element={<DoctorListingPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
