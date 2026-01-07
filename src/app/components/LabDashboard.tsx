import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestTube, Upload, Clock, CheckCircle, FileText, User, Bell, LogOut, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs } from "./ui/tabs";
import { mockTestOrders, mockLabTests, type TestOrder } from "../data/labMockData";

export function LabDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TestOrder["status"] | "all">("all");
  
  // Get orders for current lab (for demo, using lab1)
  const currentLabId = "lab1";
  const labOrders = mockTestOrders.filter(o => o.labId === currentLabId);
  
  // Filter orders
  const filteredOrders = labOrders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const stats = {
    scheduled: labOrders.filter(o => o.status === "scheduled").length,
    sampleCollected: labOrders.filter(o => o.status === "sample_collected").length,
    processing: labOrders.filter(o => o.status === "processing").length,
    reportsUploaded: labOrders.filter(o => o.status === "report_uploaded").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TestTube className="h-8 w-8 text-purple-600" />
            <div>
              <span className="text-xl text-gray-900">LifeCare Diagnostics</span>
              <p className="text-sm text-gray-600">Lab Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-100 text-purple-700 border-purple-300">
              Logged in as Lab
            </Badge>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                <p className="text-3xl text-gray-900">{stats.scheduled}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sample Collected</p>
                <p className="text-3xl text-gray-900">{stats.sampleCollected}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <TestTube className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Processing</p>
                <p className="text-3xl text-gray-900">{stats.processing}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reports Uploaded</p>
                <p className="text-3xl text-gray-900">{stats.reportsUploaded}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by patient name or order ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as TestOrder["status"] | "all")}
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="sample_collected">Sample Collected</option>
              <option value="processing">Processing</option>
              <option value="report_uploaded">Report Uploaded</option>
            </select>
          </div>
        </div>

        {/* Test Orders List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-gray-900">Test Orders</h2>
            <Badge variant="outline">
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const tests = order.tests.map(testId => 
                mockLabTests.find(t => t.id === testId)
              ).filter(Boolean);

              return (
                <Card key={order.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg text-gray-900">{order.patientName}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Scheduled</p>
                      <p className="text-gray-900">
                        {new Date(order.scheduledDate).toLocaleDateString()}
                      </p>
                      <p className="text-gray-900">{order.scheduledTime}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Tests Ordered ({tests.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {tests.map(test => (
                          <Badge key={test?.id} variant="outline">
                            {test?.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Collection Type</p>
                      <p className="text-gray-900">
                        {order.homeCollection ? `Home Collection - ${order.address}` : "Lab Visit"}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">Amount: ₹{order.totalAmount}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    {order.status === "scheduled" && (
                      <Button className="bg-yellow-600 hover:bg-yellow-700">
                        <TestTube className="h-4 w-4 mr-2" />
                        Mark Sample Collected
                      </Button>
                    )}
                    {order.status === "sample_collected" && (
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        <Clock className="h-4 w-4 mr-2" />
                        Mark Processing
                      </Button>
                    )}
                    {(order.status === "processing" || order.status === "sample_collected") && (
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => navigate(`/lab/upload-report/${order.id}`)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Report
                      </Button>
                    )}
                    {order.status === "report_uploaded" && (
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                    )}
                    <Button variant="outline">
                      View Details
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <Card className="p-12 text-center">
              <TestTube className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600">
                {searchQuery || statusFilter !== "all" 
                  ? "Try adjusting your search or filters"
                  : "No test orders available at the moment"}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}