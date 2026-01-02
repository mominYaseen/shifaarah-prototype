import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { specializations, locations } from "../data/mockData";

interface DoctorSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DoctorSearchDialog({ open, onOpenChange }: DoctorSearchDialogProps) {
  const navigate = useNavigate();
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (specialization && location) {
      onOpenChange(false);
      navigate(`/doctors?specialization=${encodeURIComponent(specialization)}&location=${encodeURIComponent(location)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Find Your Doctor</DialogTitle>
          <DialogDescription>
            Search for verified healthcare professionals by specialization and location
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Doctor Specialization</Label>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger id="specialization">
                <SelectValue placeholder="Select a specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {loc}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={handleSearch}
            disabled={!specialization || !location}
          >
            <Search className="mr-2 h-5 w-5" />
            Search Doctors
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
