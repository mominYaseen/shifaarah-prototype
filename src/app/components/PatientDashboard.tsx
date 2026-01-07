import { useNavigate } from "react-router-dom";
import { Calendar, FileText, TestTube, Activity, Bell, User, LogOut, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { mockTestPrescriptions, mockTestOrders, mockLabReports, type TestPrescription, type TestOrder, type LabReport } from "../data/labMockData";
import { mockLabTests } from "../data/labMockData";

export function PatientDashboard() {
  const navigate = useNavigate();
  
  // Get current patient's data (for demo, using patient1)
  const currentPatientId = "patient1";
  
  const patientPrescriptions = mockTestPrescriptions.filter(
    p => p.patientId === currentPatientId
  );
  
  const patientOrders = mockTestOrders.filter(
    o => o.patientId === currentPatientId
  );
  
  const patientReports = mockLabReports.filter(
    r => r.patientId === currentPatientId
  );

  const getStatusColor = (status: TestOrder["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "sample_collected":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-purple-100 text-purple-700";
      case "report_uploaded":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: TestOrder["status"]) => {
    return status.split("_").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl text-blue-600">🏥</div>
            <span className="text-xl text-gray-900">Shifaarah</span>
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Welcome back, Ahmad</h1>
          <p className="text-gray-600">Manage your appointments, lab tests, and health records</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/care-type")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Book Appointment</h3>
                <p className="text-sm text-gray-600">Find doctors</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/patient/labs")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TestTube className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Book Lab Test</h3>
                <p className="text-sm text-gray-600">Find labs</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/patient/medical-history")}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Medical History</h3>
                <p className="text-sm text-gray-600">View records</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 transition-shadow opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-gray-900">Emergency</h3>
                <p className="text-sm text-gray-600">Quick access</p>
                <p className="text-xs text-gray-400 mt-1">Coming Soon</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Test Orders */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-gray-900">Active Test Orders</h2>
            {patientPrescriptions.filter(p => p.status === "pending").length > 0 && (
              <Badge variant="outline" className="text-orange-600 border-orange-300">
                {patientPrescriptions.filter(p => p.status === "pending").length} Pending Prescriptions
              </Badge>
            )}
          </div>

          {/* Pending Prescriptions */}
          {patientPrescriptions.filter(p => p.status === "pending").length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-gray-700 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Tests Prescribed - Book Lab Appointment
              </h3>
              <div className="space-y-3">
                {patientPrescriptions.filter(p => p.status === "pending").map((prescription) => (
                  <Card key={prescription.id} className="p-4 bg-orange-50 border-orange-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-orange-600">Lab Test Prescribed</Badge>
                          <span className="text-sm text-gray-600">
                            by {prescription.doctorName}
                          </span>
                        </div>
                        <h4 className="text-gray-900 mb-2">{prescription.clinicName}</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {prescription.tests.map(testId => {
                            const test = mockLabTests.find(t => t.id === testId);
                            return test ? (
                              <Badge key={testId} variant="outline" className="bg-white">
                                {test.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                        {prescription.notes && (
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Note:</strong> {prescription.notes}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()} • 
                          Valid until: {new Date(prescription.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => navigate(`/patient/test-prescription/${prescription.id}`)}
                      >
                        Book Lab Appointment
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Active Orders */}
          {patientOrders.length > 0 ? (
            <div className="space-y-4">
              {patientOrders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg text-gray-900 mb-1">{order.labName}</h3>
                      <p className="text-sm text-gray-600">{order.tests.length} test(s) ordered</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Scheduled Date & Time</p>
                      <p className="text-gray-900">
                        {new Date(order.scheduledDate).toLocaleDateString()} at {order.scheduledTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Collection Type</p>
                      <p className="text-gray-900">
                        {order.homeCollection ? "Home Collection" : "Lab Visit"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.tests.map(testId => {
                      const test = mockLabTests.find(t => t.id === testId);
                      return test ? (
                        <Badge key={testId} variant="outline">
                          {test.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl text-gray-900">₹{order.totalAmount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        onClick={() => navigate(`/patient/test-tracking/${order.id}`)}
                      >
                        Track Status
                      </Button>
                      {order.reportId && (
                        <Button 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => navigate(`/patient/report/${order.reportId}`)}
                        >
                          View Report
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : patientPrescriptions.filter(p => p.status === "pending").length === 0 && (
            <Card className="p-8 text-center">
              <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">No Active Test Orders</h3>
              <p className="text-gray-600 mb-4">You don't have any lab tests scheduled at the moment</p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/patient/labs")}
              >
                Explore Labs
              </Button>
            </Card>
          )}
        </div>

        {/* Recent Reports */}
        {patientReports.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-gray-900">Recent Lab Reports</h2>
              <Button 
                variant="outline"
                onClick={() => navigate("/patient/reports")}
              >
                View All Reports
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patientReports.slice(0, 4).map((report) => (
                <Card 
                  key={report.id} 
                  className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/patient/report/${report.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <h3 className="text-gray-900">{report.labName}</h3>
                    </div>
                    {report.abnormalValues && (
                      <Badge variant="outline" className="text-orange-600 border-orange-300">
                        Abnormal Values
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{report.testIds.length} test(s)</p>
                  <p className="text-xs text-gray-500">
                    Uploaded: {new Date(report.uploadDate).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}