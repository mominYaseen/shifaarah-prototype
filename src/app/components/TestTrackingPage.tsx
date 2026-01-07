import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Clock, FileText, TestTube, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockTestOrders, mockLabTests, type TestOrder } from "../data/labMockData";

export function TestTrackingPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  const order = mockTestOrders.find(o => o.id === orderId);
  
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl text-gray-900 mb-4">Order Not Found</h2>
          <Button onClick={() => navigate("/patient/dashboard")}>Back to Dashboard</Button>
        </Card>
      </div>
    );
  }

  const tests = order.tests.map(testId => 
    mockLabTests.find(t => t.id === testId)
  ).filter(Boolean);

  const statusSteps: Array<{
    status: TestOrder["status"];
    label: string;
    icon: typeof Check;
    description: string;
  }> = [
    {
      status: "scheduled",
      label: "Test Scheduled",
      icon: Clock,
      description: "Your appointment is confirmed"
    },
    {
      status: "sample_collected",
      label: "Sample Collected",
      icon: TestTube,
      description: "Sample has been collected for testing"
    },
    {
      status: "processing",
      label: "Processing",
      icon: Clock,
      description: "Tests are being processed"
    },
    {
      status: "report_uploaded",
      label: "Report Ready",
      icon: Upload,
      description: "Report has been uploaded"
    },
    {
      status: "completed",
      label: "Completed",
      icon: Check,
      description: "All done!"
    }
  ];

  const currentStatusIndex = statusSteps.findIndex(step => step.status === order.status);

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
          <h1 className="text-2xl text-gray-900">Track Your Test</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Order Information */}
        <Card className="p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl text-gray-900 mb-1">{order.labName}</h2>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            </div>
            <Badge className="bg-blue-600">
              {order.status.split("_").map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(" ")}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Scheduled Date</p>
              <p className="text-gray-900">
                {new Date(order.scheduledDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Scheduled Time</p>
              <p className="text-gray-900">{order.scheduledTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Collection Type</p>
              <p className="text-gray-900">
                {order.homeCollection ? "Home Collection" : "Lab Visit"}
              </p>
            </div>
          </div>

          {order.homeCollection && order.address && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 mb-1">Collection Address</p>
              <p className="text-gray-900">{order.address}</p>
            </div>
          )}
        </Card>

        {/* Status Timeline */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-6">Test Status</h3>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
            
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;
              
              return (
                <div key={step.status} className="relative flex gap-4 mb-8 last:mb-0">
                  {/* Icon */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted 
                      ? "bg-green-600" 
                      : "bg-gray-200"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      isCompleted ? "text-white" : "text-gray-500"
                    }`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-lg ${
                        isCompleted ? "text-gray-900" : "text-gray-500"
                      }`}>
                        {step.label}
                      </h4>
                      {isCurrent && (
                        <Badge className="bg-blue-600">Current</Badge>
                      )}
                      {isCompleted && !isCurrent && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                    </div>
                    <p className={`text-sm ${
                      isCompleted ? "text-gray-600" : "text-gray-400"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tests Ordered */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <TestTube className="h-5 w-5 text-blue-600" />
            Tests Ordered ({tests.length})
          </h3>
          
          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test?.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-gray-900">{test?.name}</h4>
                  <Badge variant="outline">{test?.category}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{test?.description}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Report Time: {test?.reportTime}</span>
                  <span>•</span>
                  <span>₹{test?.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-xl text-gray-900">₹{order.totalAmount}</span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {order.reportId && (
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="lg"
              onClick={() => navigate(`/patient/report/${order.reportId}`)}
            >
              <FileText className="h-5 w-5 mr-2" />
              View Report
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1"
            size="lg"
            onClick={() => navigate("/patient/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Help Section */}
        <Card className="p-6 mt-6 bg-blue-50 border-blue-200">
          <h3 className="text-gray-900 mb-3">Need Help?</h3>
          <p className="text-sm text-gray-700 mb-3">
            If you have any questions about your test or need to reschedule, please contact the lab directly.
          </p>
          <Button variant="outline" size="sm">
            Contact Lab
          </Button>
        </Card>
      </div>
    </div>
  );
}
