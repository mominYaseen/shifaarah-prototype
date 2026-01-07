export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  type: "hospital" | "clinic";
}

export interface DashboardStats {
  totalAppointments: number;
  todayAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  cancelledAppointments: number;
}

export const mockAppointments: Appointment[] = [
  {
    id: "APT001",
    patientName: "Sarah Williams",
    doctorName: "Dr. Imtiyaz Ahmad Magray",
    specialization: "Dentist",
    date: "2026-01-07",
    time: "09:00 AM",
    status: "confirmed",
    type: "clinic",
  },
  {
    id: "APT002",
    patientName: "John Smith",
    doctorName: "Dr. Irshad Ahmad",
    specialization: "Gynecologist",
    date: "2026-01-07",
    time: "10:00 AM",
    status: "confirmed",
    type: "hospital",
  },
  {
    id: "APT003",
    patientName: "Emily Johnson",
    doctorName: "Dr. Michael Chen",
    specialization: "General Physician",
    date: "2026-01-07",
    time: "11:00 AM",
    status: "confirmed",
    type: "clinic",
  },
  {
    id: "APT004",
    patientName: "Michael Brown",
    doctorName: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    date: "2026-01-07",
    time: "02:00 PM",
    status: "confirmed",
    type: "hospital",
  },
  {
    id: "APT005",
    patientName: "Lisa Davis",
    doctorName: "Dr. James Williams",
    specialization: "Orthopedic",
    date: "2026-01-06",
    time: "09:00 AM",
    status: "cancelled",
    type: "clinic",
  },
  {
    id: "APT006",
    patientName: "David Wilson",
    doctorName: "Dr. Lisa Anderson",
    specialization: "Dermatologist",
    date: "2026-01-06",
    time: "10:00 AM",
    status: "confirmed",
    type: "hospital",
  },
];

export const getDashboardStats = (appointments: Appointment[]): DashboardStats => {
  const today = new Date().toISOString().split("T")[0];
  
  return {
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter((apt) => apt.date === today).length,
    pendingAppointments: appointments.filter((apt) => apt.status === "pending").length,
    confirmedAppointments: appointments.filter((apt) => apt.status === "confirmed").length,
    cancelledAppointments: appointments.filter((apt) => apt.status === "cancelled").length,
  };
};