import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { mockAppointments, type Appointment } from "../../data/adminMockData";

export function AppointmentManagement() {
  const [appointments] = useState<Appointment[]>(mockAppointments);

  // Filter for today's appointments only
  const today = new Date().toDateString();
  const todayAppointments = appointments.filter(
    (apt) => new Date(apt.date).toDateString() === today
  );

  return (
    <div className="space-y-6">
      {/* Appointments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Appointments ({todayAppointments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 pr-4">Patient Name</th>
                  <th className="pb-3 pr-4">Doctor Name</th>
                  <th className="pb-3 pr-4">Department</th>
                  <th className="pb-3">Appointment Time</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-600">
                      No appointments scheduled for today
                    </td>
                  </tr>
                ) : (
                  todayAppointments.map((appointment) => (
                    <tr key={appointment.id} className="border-b">
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.patientName}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.doctorName}</p>
                      </td>
                      <td className="py-4 pr-4">
                        <p className="text-sm text-gray-900">{appointment.specialization}</p>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{appointment.time}</span>
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