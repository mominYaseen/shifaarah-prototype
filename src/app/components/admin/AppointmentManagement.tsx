import { useState } from "react";
import { Check, X, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockAppointments, type Appointment } from "../../data/adminMockData";
import { toast } from "sonner";

export function AppointmentManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleApprove = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "confirmed" as const } : apt
      )
    );
    toast.success("Appointment confirmed");
  };

  const handleCancel = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" as const } : apt
      )
    );
    toast.success("Appointment cancelled");
  };

  const filteredAppointments = appointments.filter((apt) =>
    statusFilter === "all" ? true : apt.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Appointments</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Appointments ({filteredAppointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Patient</th>
                  <th className="pb-3 pr-4">Doctor</th>
                  <th className="pb-3 pr-4">Specialization</th>
                  <th className="pb-3 pr-4">Date & Time</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-600">
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b">
                      <td className="py-4 pr-4 text-sm text-gray-900">
                        {appointment.id}
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.patientName}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.doctorName}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.specialization}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()} {appointment.time}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge
                          variant="secondary"
                          className={
                            appointment.type === "hospital"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }
                        >
                          {appointment.type}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <Badge
                          variant="secondary"
                          className={
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : appointment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50"
                                onClick={() => handleApprove(appointment.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50"
                                onClick={() => handleCancel(appointment.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {appointment.status === "confirmed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-50"
                              onClick={() => handleCancel(appointment.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
