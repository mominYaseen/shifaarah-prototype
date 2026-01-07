import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  FileText, 
  TestTube, 
  User, 
  LogOut, 
  Bell,
  Stethoscope,
  Upload,
  PlusCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface DoctorVisit {
  id: string;
  date: string;
  doctorName: string;
  clinicName: string;
  diagnosis: string;
  notes?: string;
}

interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  clinicName: string;
  notes: string;
  uploadedFile?: string;
  isManuallyAdded: boolean;
  autoPopulated?: boolean;
}

interface LabReport {
  id: string;
  date: string;
  testName: string;
  labName: string;
  reportUrl: string;
  doctorName?: string;
}

export function MedicalHistoryPage() {
  const navigate = useNavigate();
  const [isAddPrescriptionOpen, setIsAddPrescriptionOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    visits: true,
    reports: true,
    prescriptions: true,
  });

  // Form states
  const [prescriptionForm, setPrescriptionForm] = useState({
    doctorName: "",
    clinicName: "",
    date: "",
    notes: "",
    file: null as File | null,
  });

  // Mock data for medical history
  const [doctorVisits] = useState<DoctorVisit[]>([
    {
      id: "visit1",
      date: "2026-01-05",
      doctorName: "Dr. Irshad Ahmad Khan",
      clinicName: "Sher-i-Kashmir Institute of Medical Sciences",
      diagnosis: "Type 2 Diabetes Follow-up",
      notes: "Blood sugar levels improving. Continue current medication.",
    },
    {
      id: "visit2",
      date: "2025-12-20",
      doctorName: "Dr. Sarah Ahmed",
      clinicName: "City Medical Center",
      diagnosis: "Annual Health Checkup",
      notes: "Overall health good. Recommended lipid profile test.",
    },
  ]);

  const [labReports] = useState<LabReport[]>([
    {
      id: "report1",
      date: "2026-01-06",
      testName: "Complete Blood Count (CBC), Lipid Profile, Liver Function Test",
      labName: "MediScan Lab & Diagnostics",
      reportUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      doctorName: "Dr. Irshad Ahmad Khan",
    },
  ]);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: "presc1",
      date: "2026-01-05",
      doctorName: "Dr. Irshad Ahmad Khan",
      clinicName: "Sher-i-Kashmir Institute of Medical Sciences",
      notes: "Metformin 500mg - Take twice daily after meals. Continue for 3 months.",
      autoPopulated: true,
      isManuallyAdded: false,
    },
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddPrescription = () => {
    if (!prescriptionForm.doctorName || !prescriptionForm.clinicName || !prescriptionForm.date) {
      toast.error("Please fill all required fields");
      return;
    }

    const newPrescription: Prescription = {
      id: `manual-presc-${Date.now()}`,
      date: prescriptionForm.date,
      doctorName: prescriptionForm.doctorName,
      clinicName: prescriptionForm.clinicName,
      notes: prescriptionForm.notes,
      uploadedFile: prescriptionForm.file?.name,
      isManuallyAdded: true,
      autoPopulated: false,
    };

    setPrescriptions([newPrescription, ...prescriptions]);
    
    // Reset form
    setPrescriptionForm({
      doctorName: "",
      clinicName: "",
      date: "",
      notes: "",
      file: null,
    });
    
    setIsAddPrescriptionOpen(false);
    toast.success("Prescription added successfully");
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600">
              <span className="text-white text-xl">S</span>
            </div>
            <span className="text-xl text-gray-900">Shifarah</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-blue-100 text-blue-700 border-blue-300">
              Logged in as Patient
            </Badge>
            <Button variant="ghost" size="icon" disabled title="Coming Soon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" disabled title="Coming Soon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/patient/dashboard")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Medical History</h1>
            <p className="text-gray-600">
              Track your doctor visits, lab reports, and prescriptions in one place
            </p>
          </div>
          <Button onClick={() => navigate("/patient/dashboard")} variant="outline">
            ← Back to Dashboard
          </Button>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="visits">Doctor Visits</TabsTrigger>
            <TabsTrigger value="reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          </TabsList>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-6">
            {/* Doctor Visits Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                    <CardTitle>Doctor Visits ({doctorVisits.length})</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("visits")}
                  >
                    {expandedSections.visits ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.visits && (
                <CardContent>
                  <div className="space-y-4">
                    {doctorVisits.map((visit) => (
                      <div
                        key={visit.id}
                        className="border-l-4 border-blue-500 pl-4 pb-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-gray-900">{visit.diagnosis}</p>
                            <p className="text-sm text-gray-600">
                              {visit.doctorName} • {visit.clinicName}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatDate(visit.date)}
                          </Badge>
                        </div>
                        {visit.notes && (
                          <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Lab Reports Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-purple-600" />
                    <CardTitle>Lab Reports ({labReports.length})</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSection("reports")}
                  >
                    {expandedSections.reports ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {expandedSections.reports && (
                <CardContent>
                  <div className="space-y-4">
                    {labReports.map((report) => (
                      <div
                        key={report.id}
                        className="border-l-4 border-purple-500 pl-4 pb-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900">{report.testName}</p>
                            <p className="text-sm text-gray-600">
                              {report.labName}
                              {report.doctorName && ` • Prescribed by ${report.doctorName}`}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatDate(report.date)}
                          </Badge>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => window.open(report.reportUrl, "_blank")}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Prescriptions Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <CardTitle>Prescriptions ({prescriptions.length})</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      open={isAddPrescriptionOpen}
                      onOpenChange={setIsAddPrescriptionOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Prescription
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Prescription</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <Label htmlFor="doctorName">Doctor Name *</Label>
                            <Input
                              id="doctorName"
                              value={prescriptionForm.doctorName}
                              onChange={(e) =>
                                setPrescriptionForm({
                                  ...prescriptionForm,
                                  doctorName: e.target.value,
                                })
                              }
                              placeholder="Enter doctor's name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="clinicName">Hospital / Clinic Name *</Label>
                            <Input
                              id="clinicName"
                              value={prescriptionForm.clinicName}
                              onChange={(e) =>
                                setPrescriptionForm({
                                  ...prescriptionForm,
                                  clinicName: e.target.value,
                                })
                              }
                              placeholder="Enter hospital or clinic name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="date">Date *</Label>
                            <Input
                              id="date"
                              type="date"
                              value={prescriptionForm.date}
                              onChange={(e) =>
                                setPrescriptionForm({
                                  ...prescriptionForm,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">Prescription Notes</Label>
                            <Textarea
                              id="notes"
                              value={prescriptionForm.notes}
                              onChange={(e) =>
                                setPrescriptionForm({
                                  ...prescriptionForm,
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Enter prescription details or notes"
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="file">Upload Prescription (Image / PDF)</Label>
                            <Input
                              id="file"
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) =>
                                setPrescriptionForm({
                                  ...prescriptionForm,
                                  file: e.target.files?.[0] || null,
                                })
                              }
                            />
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-xs text-blue-700">
                              📝 For personal tracking only
                            </p>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => setIsAddPrescriptionOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={handleAddPrescription}
                            >
                              Save to Medical History
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSection("prescriptions")}
                    >
                      {expandedSections.prescriptions ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              {expandedSections.prescriptions && (
                <CardContent>
                  <div className="space-y-4">
                    {prescriptions.map((prescription) => (
                      <div
                        key={prescription.id}
                        className="border-l-4 border-green-500 pl-4 pb-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-gray-900">{prescription.doctorName}</p>
                              {prescription.isManuallyAdded && (
                                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300">
                                  Patient Added
                                </Badge>
                              )}
                              {prescription.autoPopulated && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                                  Auto-populated
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {prescription.clinicName}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {formatDate(prescription.date)}
                          </Badge>
                        </div>
                        {prescription.notes && (
                          <p className="text-sm text-gray-600 mt-2">{prescription.notes}</p>
                        )}
                        {prescription.uploadedFile && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <Upload className="h-4 w-4" />
                            <span>{prescription.uploadedFile}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </TabsContent>

          {/* Individual Tab Views */}
          <TabsContent value="visits">
            <Card>
              <CardHeader>
                <CardTitle>All Doctor Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctorVisits.map((visit) => (
                    <div
                      key={visit.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-gray-900">{visit.diagnosis}</p>
                          <p className="text-sm text-gray-600">
                            {visit.doctorName} • {visit.clinicName}
                          </p>
                        </div>
                        <Badge variant="outline">{formatDate(visit.date)}</Badge>
                      </div>
                      {visit.notes && (
                        <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>All Lab Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {labReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-gray-900">{report.testName}</p>
                          <p className="text-sm text-gray-600">
                            {report.labName}
                            {report.doctorName && ` • Prescribed by ${report.doctorName}`}
                          </p>
                        </div>
                        <Badge variant="outline">{formatDate(report.date)}</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => window.open(report.reportUrl, "_blank")}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Prescriptions</CardTitle>
                  <Dialog
                    open={isAddPrescriptionOpen}
                    onOpenChange={setIsAddPrescriptionOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Prescription
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add Prescription</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label htmlFor="doctorName2">Doctor Name *</Label>
                          <Input
                            id="doctorName2"
                            value={prescriptionForm.doctorName}
                            onChange={(e) =>
                              setPrescriptionForm({
                                ...prescriptionForm,
                                doctorName: e.target.value,
                              })
                            }
                            placeholder="Enter doctor's name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="clinicName2">Hospital / Clinic Name *</Label>
                          <Input
                            id="clinicName2"
                            value={prescriptionForm.clinicName}
                            onChange={(e) =>
                              setPrescriptionForm({
                                ...prescriptionForm,
                                clinicName: e.target.value,
                              })
                            }
                            placeholder="Enter hospital or clinic name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="date2">Date *</Label>
                          <Input
                            id="date2"
                            type="date"
                            value={prescriptionForm.date}
                            onChange={(e) =>
                              setPrescriptionForm({
                                ...prescriptionForm,
                                date: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="notes2">Prescription Notes</Label>
                          <Textarea
                            id="notes2"
                            value={prescriptionForm.notes}
                            onChange={(e) =>
                              setPrescriptionForm({
                                ...prescriptionForm,
                                notes: e.target.value,
                              })
                            }
                            placeholder="Enter prescription details or notes"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="file2">Upload Prescription (Image / PDF)</Label>
                          <Input
                            id="file2"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) =>
                              setPrescriptionForm({
                                ...prescriptionForm,
                                file: e.target.files?.[0] || null,
                              })
                            }
                          />
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-xs text-blue-700">
                            📝 For personal tracking only
                          </p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsAddPrescriptionOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={handleAddPrescription}
                          >
                            Save to Medical History
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-gray-900">{prescription.doctorName}</p>
                            {prescription.isManuallyAdded && (
                              <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-300">
                                Patient Added
                              </Badge>
                            )}
                            {prescription.autoPopulated && (
                              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                                Auto-populated
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {prescription.clinicName}
                          </p>
                        </div>
                        <Badge variant="outline">{formatDate(prescription.date)}</Badge>
                      </div>
                      {prescription.notes && (
                        <p className="text-sm text-gray-600 mt-2">{prescription.notes}</p>
                      )}
                      {prescription.uploadedFile && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <Upload className="h-4 w-4" />
                          <span>{prescription.uploadedFile}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
