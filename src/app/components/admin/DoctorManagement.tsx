import { useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { mockDoctors } from "../../data/mockData";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { specializations } from "../../data/mockData";

export function DoctorManagement() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
    toast.success("Doctor removed successfully");
  };

  const handleEdit = (id: string) => {
    setEditingDoctor(id);
    setDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingDoctor(null);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Doctor Management</h2>
          <p className="text-sm text-gray-600">Manage your healthcare professionals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add Doctor
        </Button>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90"
                    onClick={() => handleEdit(doctor.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 bg-white/90"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-blue-600">{doctor.specialization}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-900">{doctor.rating}</span>
                  <span className="text-sm text-gray-600">({doctor.reviewCount})</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>{doctor.experience} years experience</p>
                  <p>{doctor.clinic}</p>
                  <p>{doctor.location}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">Consultation Fee</span>
                  <span className="text-lg text-blue-600">${doctor.consultationFee}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
            </DialogTitle>
            <DialogDescription>
              {editingDoctor
                ? "Update doctor information"
                : "Add a new doctor to your facility"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Dr. John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select>
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Select specialization" />
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee">Consultation Fee ($)</Label>
                <Input id="fee" type="number" placeholder="150" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input id="qualifications" placeholder="MBBS, MD - Cardiology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinic">Clinic/Hospital</Label>
              <Input id="clinic" placeholder="City Medical Center" />
            </div>
            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  toast.success(editingDoctor ? "Doctor updated" : "Doctor added");
                  setDialogOpen(false);
                }}
              >
                {editingDoctor ? "Update" : "Add"} Doctor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
