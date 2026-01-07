import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, AlertCircle, FileText, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockTestPrescriptions, mockLabTests } from "../data/labMockData";

export function TestPrescriptionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const prescription = mockTestPrescriptions.find(p => p.id === id);
  
  if (!prescription) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl text-gray-900 mb-4">Prescription Not Found</h2>
          <Button onClick={() => navigate("/patient/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const tests = prescription.tests.map(testId => 
    mockLabTests.find(t => t.id === testId)
  ).filter(Boolean);

  const totalAmount = tests.reduce((sum, test) => sum + (test?.price || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/patient/dashboard")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl text-gray-900">Test Prescription Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status Alert */}
        <Card className="p-6 bg-orange-50 border-orange-200 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg text-gray-900 mb-2">Action Required: Book Lab Appointment</h3>
              <p className="text-gray-700">
                Your doctor has prescribed lab tests. Please book an appointment at a diagnostic lab to complete these tests.
              </p>
            </div>
          </div>
        </Card>

        {/* Prescription Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Prescription Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Prescribed By</p>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{prescription.doctorName}</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">{prescription.clinicName}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Prescription Date</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">
                  {new Date(prescription.prescribedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Valid until: {new Date(prescription.validUntil).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {prescription.notes && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Doctor's Notes</p>
              <p className="text-gray-900">{prescription.notes}</p>
            </div>
          )}
        </Card>

        {/* Prescribed Tests */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl text-gray-900 mb-4">Prescribed Tests</h2>
          
          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={test?.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg text-gray-900">{test?.name}</span>
                      <Badge variant="outline">{test?.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{test?.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-600">Sample Type</p>
                        <p className="text-gray-900">{test?.sampleType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Report Time</p>
                        <p className="text-gray-900">{test?.reportTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Preparation</p>
                        <p className="text-gray-900">
                          {test?.preparationRequired ? "Required" : "Not Required"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Price</p>
                        <p className="text-lg text-gray-900">₹{test?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {test?.preparationRequired && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Preparation Required:</strong> Please follow fasting guidelines before this test.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div>
              <p className="text-gray-600 mb-1">Estimated Total Amount</p>
              <p className="text-2xl text-gray-900">₹{totalAmount}</p>
              <p className="text-sm text-gray-500 mt-1">Actual prices may vary by lab</p>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-6"
            onClick={() => navigate(`/patient/labs?prescription=${id}`)}
          >
            Find & Book Diagnostic Lab
          </Button>
        </div>

        {/* Information Notice */}
        <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
          <h3 className="text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>You can book these tests at any registered diagnostic lab on Shifaarah.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Home sample collection is available at select labs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Reports will be automatically shared with your prescribing doctor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>This prescription is valid for 30 days from the date of prescription.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
