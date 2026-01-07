import { useState } from "react";
import { Plus, Clock, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockDoctors } from "../../data/mockData";

interface Schedule {
  id: string;
  doctorId: string;
  doctorName: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
];

export function ScheduleManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      doctorId: "1",
      doctorName: "Dr. Irshad Ahmad",
      dayOfWeek: "Monday",
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      slotDuration: 30,
    },
    {
      id: "2",
      doctorId: "2",
      doctorName: "Dr. Michael Chen",
      dayOfWeek: "Tuesday",
      startTime: "08:30 AM",
      endTime: "04:30 PM",
      slotDuration: 30,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddSchedule = () => {
    if (selectedDoctor && selectedDay && startTime && endTime) {
      const doctor = mockDoctors.find((d) => d.id === selectedDoctor);
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        doctorId: selectedDoctor,
        doctorName: doctor?.name || "",
        dayOfWeek: selectedDay,
        startTime,
        endTime,
        slotDuration: 30,
      };
      setSchedules((prev) => [...prev, newSchedule]);
      toast.success("Schedule added successfully");
      setDialogOpen(false);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
    toast.success("Schedule deleted");
  };

  const resetForm = () => {
    setSelectedDoctor("");
    setSelectedDay("");
    setStartTime("");
    setEndTime("");
  };

  // Group schedules by doctor
  const schedulesByDoctor = schedules.reduce((acc, schedule) => {
    if (!acc[schedule.doctorName]) {
      acc[schedule.doctorName] = [];
    }
    acc[schedule.doctorName].push(schedule);
    return acc;
  }, {} as Record<string, Schedule[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Schedule Management</h2>
          <p className="text-sm text-gray-600">
            Set working hours and consultation slots
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Schedule
        </Button>
      </div>

      {/* Schedules by Doctor */}
      <div className="space-y-6">
        {Object.entries(schedulesByDoctor).map(([doctorName, doctorSchedules]) => (
          <Card key={doctorName}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                {doctorName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {doctorSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-start justify-between rounded-lg border p-4"
                  >
                    <div className="flex-1">
                      <div className="mb-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                          {schedule.dayOfWeek}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-900">
                        {schedule.startTime} - {schedule.endTime}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {schedule.slotDuration} min slots
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => handleDelete(schedule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {Object.keys(schedulesByDoctor).length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-600">
              No schedules configured. Click "Add Schedule" to get started.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Schedule Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Schedule</DialogTitle>
            <DialogDescription>
              Configure working hours and availability for a doctor
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doctor">Select Doctor</Label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Choose a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {mockDoctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="day">Day of Week</Label>
              <Select value={selectedDay} onValueChange={setSelectedDay}>
                <SelectTrigger id="day">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select value={startTime} onValueChange={setStartTime}>
                  <SelectTrigger id="startTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select value={endTime} onValueChange={setEndTime}>
                  <SelectTrigger id="endTime">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleAddSchedule}
                disabled={!selectedDoctor || !selectedDay || !startTime || !endTime}
              >
                Add Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
