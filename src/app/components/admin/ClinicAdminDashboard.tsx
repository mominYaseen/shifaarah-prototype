import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Clock,
  LogOut,
  Menu,
  X,
  Stethoscope,
  CalendarCheck,
  Users2,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type TabType = "overview" | "appointments" | "availability";

export function ClinicAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "overview" as TabType, label: "Overview", icon: LayoutDashboard },
    { id: "appointments" as TabType, label: "Appointments", icon: Calendar },
    { id: "availability" as TabType, label: "Availability", icon: Clock },
  ];

  // Mock data
  const stats = {
    totalAppointments: 42,
    todayAppointments: 8,
    pendingAppointments: 5,
    availableSlots: 12,
  };

  const todayAppointments = [
    { id: "1", patientName: "Ahmed Hassan", doctorName: "Dr. Sarah Khan", time: "09:00 AM", date: "2026-01-07" },
    { id: "2", patientName: "Sarah Khan", doctorName: "Dr. Ahmad Malik", time: "10:00 AM", date: "2026-01-07" },
    { id: "3", patientName: "Mohammad Ali", doctorName: "Dr. Sarah Khan", time: "11:00 AM", date: "2026-01-07" },
    { id: "4", patientName: "Fatima Noor", doctorName: "Dr. Irshad Ahmad Khan", time: "02:00 PM", date: "2026-01-07" },
    { id: "5", patientName: "Bilal Shah", doctorName: "Dr. Ahmad Malik", time: "03:00 PM", date: "2026-01-07" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg text-gray-900">Shifaarah</h1>
                <p className="text-xs text-gray-600">Clinic Admin</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-green-50 text-green-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => navigate("/")}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="border-b bg-white p-4 lg:hidden">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h2 className="text-lg text-gray-900">Clinic Dashboard</h2>
            <div className="w-10" />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1">Clinic Overview</h2>
                <p className="text-gray-600">Monitor your clinic performance and bookings</p>
              </div>

              {/* Stats Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-gray-600">Total Appointments</CardTitle>
                    <CalendarCheck className="h-5 w-5 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl text-gray-900">{stats.totalAppointments}</div>
                    <p className="text-xs text-gray-600 mt-1">This month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-gray-600">Today's Bookings</CardTitle>
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl text-gray-900">{stats.todayAppointments}</div>
                    <p className="text-xs text-green-600 mt-1">+2 from yesterday</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-gray-600">Pending Appointments</CardTitle>
                    <Users2 className="h-5 w-5 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl text-gray-900">{stats.pendingAppointments}</div>
                    <p className="text-xs text-gray-600 mt-1">Awaiting confirmation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm text-gray-600">Available Slots</CardTitle>
                    <Clock className="h-5 w-5 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl text-gray-900">{stats.availableSlots}</div>
                    <p className="text-xs text-gray-600 mt-1">This week</p>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                          {appointment.patientName[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{appointment.date}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1">Appointments</h2>
                <p className="text-gray-600">View all clinic appointments (read-only)</p>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center gap-4 rounded-lg border p-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                          {appointment.patientName[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{appointment.patientName}</p>
                          <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-900">{appointment.date}</p>
                          <p className="text-sm text-gray-600">{appointment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "availability" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl text-gray-900 mb-1">Manage Availability</h2>
                <p className="text-gray-600">Set your clinic hours and available time slots</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                      (day) => (
                        <div key={day} className="flex items-center justify-between rounded-lg border p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-24">
                              <p className="text-gray-900">{day}</p>
                            </div>
                            <p className="text-sm text-gray-600">09:00 AM - 05:00 PM</p>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      )
                    )}
                    <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <p className="text-gray-600">Sunday</p>
                        </div>
                        <p className="text-sm text-gray-600">Closed</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}