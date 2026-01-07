import { Calendar, CheckCircle, XCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { mockAppointments, getDashboardStats } from "../../data/adminMockData";

export function DashboardOverview() {
  const stats = getDashboardStats(mockAppointments);

  const statCards = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Pending",
      value: stats.pendingAppointments,
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Confirmed",
      value: stats.confirmedAppointments,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Cancelled",
      value: stats.cancelledAppointments,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const todayAppointments = mockAppointments.filter(
    (apt) => apt.date === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="mt-2 text-3xl text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No appointments scheduled for today</p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-gray-900">{appointment.patientName}</h4>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {appointment.doctorName} • {appointment.specialization}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{appointment.time}</p>
                    <p className="text-xs text-gray-600">{appointment.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="cursor-not-allowed transition-shadow opacity-60">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg text-gray-900">Manage Appointments</h3>
            <p className="text-sm text-gray-600">
              View, approve, or reschedule patient appointments
            </p>
            <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
          </CardContent>
        </Card>
        <Card className="cursor-not-allowed transition-shadow opacity-60">
          <CardContent className="p-6">
            <h3 className="mb-2 text-lg text-gray-900">Manage Doctors</h3>
            <p className="text-sm text-gray-600">
              Add, edit, or remove doctors from your facility
            </p>
            <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}