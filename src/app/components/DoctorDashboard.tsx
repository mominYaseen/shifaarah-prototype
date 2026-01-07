import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, FileText, Users, Bell, User, LogOut, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { mockLabReports, mockTestPrescriptions, type LabReport } from "../data/labMockData";

export function DoctorDashboard() {
  const navigate = useNavigate();
  
  // Get current doctor's data (for demo, using doctor ID "1")
  const currentDoctorId = "1";
  const currentDoctorName = "Dr. Irshad Ahmad Khan";
  
  // Get data for current doctor
  const doctorPrescriptions = mockTestPrescriptions.filter(
    p => p.doctorId === currentDoctorId
  );
  
  const newReports = mockLabReports.filter(
    r => r.sharedWith.includes(currentDoctorId)
  );
  
  // Mock today's appointments
  const todaysAppointments = [
    {
      id: "apt001",
      patientName: "Ahmad Sheikh",
      time: "09:00 AM",
      type: "Follow-up",
      status: "confirmed"
    },
    {
      id: "apt002",
      patientName: "Sana Malik",
      time: "10:30 AM",
      type: "Consultation",
      status: "confirmed"
    },
    {
      id: "apt003",
      patientName: "Farooq Ahmad",
      time: "02:00 PM",
      type: "Check-up",
      status: "pending"
    },
  ];

  // Get user session
  const userSession = localStorage.getItem('shifarah_user');
  const user = userSession ? JSON.parse(userSession) : null;

  const handleLogout = () => {
    localStorage.removeItem('shifarah_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-2xl text-teal-600">🏥</div>
              <div>
                <span className="text-xl text-gray-900">Shifaarah</span>
                <p className="text-sm text-gray-600">Doctor Dashboard</p>
              </div>
            </div>
            
            {/* Session Badge */}
            <div className="flex items-center gap-4">
              {user && (
                <Badge className="bg-teal-100 text-teal-700 border-teal-300">
                  Logged in as Doctor
                </Badge>
              )}
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                {newReports.length > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Welcome, {currentDoctorName}</h1>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                <p className="text-3xl text-gray-900">{todaysAppointments.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tests Prescribed</p>
                <p className="text-3xl text-gray-900">{doctorPrescriptions.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Lab Reports</p>
                <p className="text-3xl text-gray-900">{newReports.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-3xl text-gray-900">48</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="reports">
              Lab Reports
              {newReports.length > 0 && (
                <Badge className="ml-2 bg-red-500 text-white">{newReports.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Today's Appointments */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-gray-900">Today's Appointments</h2>
            </div>
            
            {todaysAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">{appointment.patientName}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <span>•</span>
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      appointment.status === "confirmed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }>
                      {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                    <Button variant="outline">View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Prescribed Tests */}
          <TabsContent value="prescriptions" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-gray-900">Prescribed Lab Tests</h2>
            </div>
            
            {doctorPrescriptions.map((prescription) => (
              <Card key={prescription.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">{prescription.patientName}</h3>
                    <p className="text-sm text-gray-600 mb-2">{prescription.clinicName}</p>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        prescription.status === "pending" 
                          ? "bg-orange-100 text-orange-700" 
                          : prescription.status === "booked"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }>
                        {prescription.status === "pending" && "Pending Lab Booking"}
                        {prescription.status === "booked" && "Lab Booked"}
                        {prescription.status === "completed" && "Completed"}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Tests: {prescription.tests.length}</p>
                  {prescription.notes && (
                    <p className="text-sm text-gray-700 italic">"{prescription.notes}"</p>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    View Patient History
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Lab Reports */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-gray-900">New Lab Reports</h2>
              {newReports.length > 0 && (
                <Badge className="bg-green-100 text-green-700">
                  {newReports.length} New Report{newReports.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </div>

            {/* Access Control Notice */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <strong>Access Control:</strong> You can only view lab reports for patients who have booked appointments with you. 
                  All reports are automatically shared based on appointment history.
                </div>
              </div>
            </Card>
            
            {newReports.length > 0 ? (
              newReports.map((report) => (
                <Card key={report.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-gray-900">{report.patientName}</h3>
                        <Badge className="bg-green-600 text-white">New</Badge>
                        {report.abnormalValues && (
                          <Badge variant="outline" className="text-orange-600 border-orange-300">
                            Abnormal Values
                          </Badge>
                        )}
                        {report.criticalFlag && (
                          <Badge className="bg-red-600 text-white">Critical</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{report.labName}</p>
                      <p className="text-sm text-gray-600">{report.testIds.length} test(s) completed</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Uploaded: {new Date(report.uploadDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="bg-teal-600 hover:bg-teal-700">
                      <FileText className="h-4 w-4 mr-2" />
                      View Report
                    </Button>
                    <Button variant="outline">
                      View Patient Profile
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No New Lab Reports</h3>
                <p className="text-gray-600">
                  Lab reports will appear here when patients complete their prescribed tests
                </p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
