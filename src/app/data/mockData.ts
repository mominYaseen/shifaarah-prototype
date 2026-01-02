import imtiyazImg from "../assets/doctors/drImtiyaz.png";

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  clinic: string;
  location: string;
  qualifications: string[];
  bio: string;
  consultationFee: number;
  image: string;
  availableDates: string[];
  timeSlots: string[];
}

export const specializations = [
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Orthopedic",
  "Pediatrician",
  "Neurologist",
  "Psychiatrist",
  "Gynecologist",
  "Dentist"
];

export const locations = [
  "Srinagar",
  "Anantnag",
  "Budgam",
  "Ganderbal",
  "Baramullah",
  "Kupwara",
  "Pulwama",
  "Awantipora",
];

export const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Irshad Ahmad",
    specialization: "Gynecologist",
    experience: 15,
    rating: 4.9,
    reviewCount: 234,
    clinic: "Heart Care Medical Center",
    location: "Srinagar",
    qualifications: ["MD - Cardiology", "MBBS", "Fellowship in Interventional Cardiology"],
    bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in preventive cardiology and interventional procedures. Her patient-centered approach and expertise have helped thousands of patients manage their heart health effectively.",
    consultationFee: 150,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    availableDates: ["2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09"],
    timeSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialization: "General Physician",
    experience: 12,
    rating: 4.8,
    reviewCount: 189,
    clinic: "City Health Clinic",
    location: "Los Angeles, CA",
    qualifications: ["MBBS", "MD - Internal Medicine"],
    bio: "Dr. Michael Chen is dedicated to providing comprehensive primary care services. With 12 years of experience, he focuses on preventive medicine and managing chronic conditions with a holistic approach to patient wellness.",
    consultationFee: 100,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    availableDates: ["2026-01-05", "2026-01-06", "2026-01-08", "2026-01-09", "2026-01-10"],
    timeSlots: ["08:30 AM", "09:30 AM", "10:30 AM", "01:30 PM", "02:30 PM", "03:30 PM"],
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    specialization: "Pediatrician",
    experience: 10,
    rating: 4.9,
    reviewCount: 312,
    clinic: "Children's Wellness Center",
    location: "Chicago, IL",
    qualifications: ["MBBS", "MD - Pediatrics", "Board Certified Pediatrician"],
    bio: "Dr. Emily Rodriguez is passionate about child healthcare and development. She provides compassionate care for children from infancy through adolescence, specializing in developmental pediatrics and childhood illnesses.",
    consultationFee: 120,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    availableDates: ["2026-01-05", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10"],
    timeSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "03:00 PM", "04:00 PM", "05:00 PM"],
  },
  {
    id: "4",
    name: "Dr. James Williams",
    specialization: "Orthopedic",
    experience: 18,
    rating: 4.7,
    reviewCount: 156,
    clinic: "Bone & Joint Institute",
    location: "Houston, TX",
    qualifications: ["MBBS", "MS - Orthopedics", "Fellowship in Sports Medicine"],
    bio: "Dr. James Williams specializes in orthopedic surgery and sports medicine. With 18 years of experience, he has successfully treated numerous musculoskeletal conditions and helped athletes return to their peak performance.",
    consultationFee: 180,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    availableDates: ["2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09", "2026-01-10"],
    timeSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "01:00 PM", "02:00 PM", "03:00 PM"],
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialization: "Dermatologist",
    experience: 14,
    rating: 4.8,
    reviewCount: 278,
    clinic: "Skin & Aesthetic Clinic",
    location: "Phoenix, AZ",
    qualifications: ["MBBS", "MD - Dermatology", "Board Certified Dermatologist"],
    bio: "Dr. Lisa Anderson offers comprehensive dermatological care, including medical, surgical, and cosmetic dermatology. Her expertise covers a wide range of skin conditions and aesthetic procedures.",
    consultationFee: 140,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    availableDates: ["2026-01-05", "2026-01-06", "2026-01-07", "2026-01-09", "2026-01-10"],
    timeSlots: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "6",
    name: "Dr. Robert Taylor",
    specialization: "Neurologist",
    experience: 20,
    rating: 4.9,
    reviewCount: 201,
    clinic: "Neuro Care Hospital",
    location: "Philadelphia, PA",
    qualifications: ["MBBS", "MD - Neurology", "DM - Neurology"],
    bio: "Dr. Robert Taylor is a renowned neurologist with two decades of experience in treating neurological disorders. He specializes in stroke management, epilepsy, and movement disorders with evidence-based approaches.",
    consultationFee: 200,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    availableDates: ["2026-01-05", "2026-01-06", "2026-01-08", "2026-01-09", "2026-01-10"],
    timeSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  },
  {
    id: "7",
    name: "Dr. Imtiyaz Ahmad Magray",
    specialization: "Dentist",
    experience: 11,
    rating: 4.9,
    reviewCount: 201,
    clinic: "DR. MAGRAY'S FAMILY DENTAL CLINIC",
    location: "Srinagar",
    qualifications: ["MDS - Prosthodontics/Prosthodontology"],
    bio: "Assistant Professor at Govt. Dental College, Srinagar",
    consultationFee: 200,
    image:imtiyazImg,
    availableDates: ["2026-01-05", "2026-01-06", "2026-01-08", "2026-01-09", "2026-01-10"],
    timeSlots: ["08:00 AM", "09:00 AM", "10:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"],
  }
];
