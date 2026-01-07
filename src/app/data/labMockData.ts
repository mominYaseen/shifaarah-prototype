// Lab Testing and Report Management Data

export interface DiagnosticLab {
  id: string;
  name: string;
  location: string;
  address: string;
  rating: number;
  reviewCount: number;
  image: string;
  homeCollection: boolean;
  partnerLab: boolean;
  distance: number; // in km
  openTime: string;
  closeTime: string;
  availableTests: string[];
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  preparationRequired: boolean;
  reportTime: string; // e.g., "24 hours", "3 days"
  sampleType: string; // e.g., "Blood", "Urine"
}

export interface TestPrescription {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  appointmentId: string;
  clinicName: string;
  tests: string[]; // Array of test IDs
  prescribedDate: string;
  validUntil: string;
  notes?: string;
  status: "pending" | "booked" | "completed";
}

export interface TestOrder {
  id: string;
  prescriptionId: string;
  patientId: string;
  patientName: string;
  labId: string;
  labName: string;
  tests: string[]; // Array of test IDs
  scheduledDate: string;
  scheduledTime: string;
  homeCollection: boolean;
  address?: string;
  status: "scheduled" | "sample_collected" | "processing" | "report_uploaded" | "completed";
  totalAmount: number;
  bookingDate: string;
  reportId?: string;
}

export interface LabReport {
  id: string;
  orderId: string;
  patientId: string;
  patientName: string;
  testIds: string[];
  labId: string;
  labName: string;
  uploadDate: string;
  reportUrl: string; // Mock PDF URL
  sharedWith: string[]; // Array of doctor IDs who can view
  abnormalValues: boolean;
  criticalFlag: boolean;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  medicalHistory: string[];
}

// Mock Lab Tests
export const mockLabTests: LabTest[] = [
  {
    id: "test1",
    name: "Complete Blood Count (CBC)",
    category: "Blood Test",
    description: "Measures different components of blood including RBC, WBC, platelets, hemoglobin",
    price: 400,
    preparationRequired: false,
    reportTime: "24 hours",
    sampleType: "Blood",
  },
  {
    id: "test2",
    name: "Lipid Profile",
    category: "Blood Test",
    description: "Measures cholesterol levels including HDL, LDL, triglycerides",
    price: 600,
    preparationRequired: true,
    reportTime: "24 hours",
    sampleType: "Blood",
  },
  {
    id: "test3",
    name: "Blood Sugar (Fasting)",
    category: "Diabetes",
    description: "Measures blood glucose level after fasting",
    price: 250,
    preparationRequired: true,
    reportTime: "12 hours",
    sampleType: "Blood",
  },
  {
    id: "test4",
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    description: "Shows average blood sugar levels over past 3 months",
    price: 500,
    preparationRequired: false,
    reportTime: "24 hours",
    sampleType: "Blood",
  },
  {
    id: "test5",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Thyroid",
    description: "Comprehensive thyroid function test",
    price: 700,
    preparationRequired: false,
    reportTime: "48 hours",
    sampleType: "Blood",
  },
  {
    id: "test6",
    name: "Liver Function Test (LFT)",
    category: "Blood Test",
    description: "Measures enzymes, proteins, and substances produced by the liver",
    price: 800,
    preparationRequired: true,
    reportTime: "24 hours",
    sampleType: "Blood",
  },
  {
    id: "test7",
    name: "Kidney Function Test (KFT)",
    category: "Blood Test",
    description: "Measures creatinine, urea, and other kidney parameters",
    price: 650,
    preparationRequired: false,
    reportTime: "24 hours",
    sampleType: "Blood",
  },
  {
    id: "test8",
    name: "Urine Routine & Microscopy",
    category: "Urine Test",
    description: "Complete urine analysis for infections and kidney issues",
    price: 300,
    preparationRequired: false,
    reportTime: "12 hours",
    sampleType: "Urine",
  },
  {
    id: "test9",
    name: "Vitamin D Test",
    category: "Vitamin Test",
    description: "Measures vitamin D levels in blood",
    price: 1200,
    preparationRequired: false,
    reportTime: "48 hours",
    sampleType: "Blood",
  },
  {
    id: "test10",
    name: "Vitamin B12 Test",
    category: "Vitamin Test",
    description: "Measures vitamin B12 levels",
    price: 900,
    preparationRequired: false,
    reportTime: "48 hours",
    sampleType: "Blood",
  },
  {
    id: "test11",
    name: "ECG (Electrocardiogram)",
    category: "Cardiac",
    description: "Records electrical activity of the heart",
    price: 400,
    preparationRequired: false,
    reportTime: "Immediate",
    sampleType: "Cardiac Test",
  },
  {
    id: "test12",
    name: "Chest X-Ray",
    category: "Radiology",
    description: "Imaging test for lungs and chest area",
    price: 500,
    preparationRequired: false,
    reportTime: "2 hours",
    sampleType: "Radiology",
  },
];

// Mock Diagnostic Labs
export const mockDiagnosticLabs: DiagnosticLab[] = [
  {
    id: "lab1",
    name: "LifeCare Diagnostics",
    location: "Srinagar",
    address: "Residency Road, Srinagar, J&K 190001",
    rating: 4.8,
    reviewCount: 456,
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 2.3,
    openTime: "07:00 AM",
    closeTime: "09:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"],
  },
  {
    id: "lab2",
    name: "MediScan Lab & Diagnostics",
    location: "Srinagar",
    address: "Lal Chowk, Srinagar, J&K 190001",
    rating: 4.7,
    reviewCount: 389,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 1.8,
    openTime: "06:00 AM",
    closeTime: "08:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test11", "test12"],
  },
  {
    id: "lab3",
    name: "HealthFirst Pathology",
    location: "Srinagar",
    address: "Jawahar Nagar, Srinagar, J&K 190008",
    rating: 4.9,
    reviewCount: 521,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: false,
    distance: 3.5,
    openTime: "07:30 AM",
    closeTime: "07:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"],
  },
  {
    id: "lab4",
    name: "Precision Diagnostics Center",
    location: "Srinagar",
    address: "Hyderpora, Srinagar, J&K 190014",
    rating: 4.6,
    reviewCount: 267,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    homeCollection: false,
    partnerLab: true,
    distance: 4.2,
    openTime: "08:00 AM",
    closeTime: "06:00 PM",
    availableTests: ["test1", "test2", "test3", "test5", "test6", "test7", "test11", "test12"],
  },
  {
    id: "lab5",
    name: "CityLab Diagnostics",
    location: "Anantnag",
    address: "Main Market, Anantnag, J&K 192101",
    rating: 4.5,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 1.5,
    openTime: "07:00 AM",
    closeTime: "08:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"],
  },
  {
    id: "lab6",
    name: "Advanced Medical Imaging",
    location: "Srinagar",
    address: "Soura, Srinagar, J&K 190011",
    rating: 4.8,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop",
    homeCollection: false,
    partnerLab: false,
    distance: 5.1,
    openTime: "08:00 AM",
    closeTime: "05:00 PM",
    availableTests: ["test11", "test12"],
  },
  {
    id: "lab7",
    name: "QuickTest Laboratories",
    location: "Srinagar",
    address: "Rajbagh, Srinagar, J&K 190008",
    rating: 4.7,
    reviewCount: 334,
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 2.1,
    openTime: "06:30 AM",
    closeTime: "09:30 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"],
  },
  {
    id: "lab8",
    name: "WellCare Diagnostic Centre",
    location: "Srinagar",
    address: "Bemina, Srinagar, J&K 190018",
    rating: 4.6,
    reviewCount: 289,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: false,
    distance: 3.8,
    openTime: "07:00 AM",
    closeTime: "07:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"],
  },
  {
    id: "lab9",
    name: "Shifarah Diagnostics",
    location: "Srinagar",
    address: "Hazratbal, Srinagar, J&K 190006",
    rating: 4.9,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 2.7,
    openTime: "06:00 AM",
    closeTime: "10:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10", "test11", "test12"],
  },
  {
    id: "lab10",
    name: "Elite Path Labs",
    location: "Srinagar",
    address: "Nowgam, Srinagar, J&K 190015",
    rating: 4.5,
    reviewCount: 223,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    homeCollection: false,
    partnerLab: true,
    distance: 4.5,
    openTime: "08:00 AM",
    closeTime: "06:00 PM",
    availableTests: ["test1", "test2", "test3", "test5", "test6", "test7"],
  },
  {
    id: "lab11",
    name: "TruHealth Diagnostics",
    location: "Budgam",
    address: "Central Budgam, J&K 191111",
    rating: 4.4,
    reviewCount: 167,
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: false,
    distance: 6.2,
    openTime: "07:00 AM",
    closeTime: "08:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8"],
  },
  {
    id: "lab12",
    name: "MedPlus Laboratory",
    location: "Srinagar",
    address: "Karan Nagar, Srinagar, J&K 190010",
    rating: 4.7,
    reviewCount: 401,
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 1.9,
    openTime: "06:30 AM",
    closeTime: "09:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9"],
  },
  {
    id: "lab13",
    name: "CityCare Labs",
    location: "Srinagar",
    address: "Gogji Bagh, Srinagar, J&K 190002",
    rating: 4.8,
    reviewCount: 478,
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 2.4,
    openTime: "07:00 AM",
    closeTime: "08:30 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"],
  },
  {
    id: "lab14",
    name: "HealthPlus Diagnostics",
    location: "Ganderbal",
    address: "Main Town, Ganderbal, J&K 191201",
    rating: 4.3,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=600&fit=crop",
    homeCollection: false,
    partnerLab: false,
    distance: 7.8,
    openTime: "08:00 AM",
    closeTime: "06:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5"],
  },
  {
    id: "lab15",
    name: "AccuPath Laboratory Services",
    location: "Srinagar",
    address: "Batmaloo, Srinagar, J&K 190009",
    rating: 4.6,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
    homeCollection: true,
    partnerLab: true,
    distance: 3.1,
    openTime: "06:00 AM",
    closeTime: "08:00 PM",
    availableTests: ["test1", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"],
  },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "patient1",
    name: "Ahmad Sheikh",
    email: "ahmad.sheikh@email.com",
    phone: "+91 94191 23456",
    dateOfBirth: "1985-04-15",
    gender: "Male",
    address: "Rajbagh, Srinagar, J&K 190008",
    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
  },
  {
    id: "patient2",
    name: "Sana Malik",
    email: "sana.malik@email.com",
    phone: "+91 94192 34567",
    dateOfBirth: "1992-08-22",
    gender: "Female",
    address: "Nowgam, Srinagar, J&K 190015",
    medicalHistory: ["Thyroid Disorder"],
  },
  {
    id: "patient3",
    name: "Farooq Ahmad",
    email: "farooq.ahmad@email.com",
    phone: "+91 94193 45678",
    dateOfBirth: "1978-12-10",
    gender: "Male",
    address: "Lal Chowk, Srinagar, J&K 190001",
    medicalHistory: ["Heart Disease", "High Cholesterol"],
  },
];

// Mock Test Prescriptions
export const mockTestPrescriptions: TestPrescription[] = [
  {
    id: "presc1",
    patientId: "patient1",
    patientName: "Ahmad Sheikh",
    doctorId: "1",
    doctorName: "Dr. Irshad Ahmad Khan",
    appointmentId: "apt001",
    clinicName: "Sher-i-Kashmir Institute of Medical Sciences",
    tests: ["test2", "test3", "test4"],
    prescribedDate: "2026-01-05",
    validUntil: "2026-02-05",
    notes: "Fasting required for blood sugar and lipid profile. Please fast for 10-12 hours before test.",
    status: "pending",
  },
  {
    id: "presc2",
    patientId: "patient2",
    patientName: "Sana Malik",
    doctorId: "5",
    doctorName: "Dr. Shabir Ahmad Dhar",
    appointmentId: "apt002",
    clinicName: "Government Medical College Hospital",
    tests: ["test5"],
    prescribedDate: "2026-01-06",
    validUntil: "2026-02-06",
    notes: "Thyroid function follow-up",
    status: "booked",
  },
  {
    id: "presc3",
    patientId: "patient3",
    patientName: "Farooq Ahmad",
    doctorId: "1",
    doctorName: "Dr. Irshad Ahmad Khan",
    appointmentId: "apt003",
    clinicName: "Sher-i-Kashmir Institute of Medical Sciences",
    tests: ["test1", "test2", "test6", "test11"],
    prescribedDate: "2026-01-04",
    validUntil: "2026-02-04",
    notes: "Cardiac and liver function assessment",
    status: "completed",
  },
];

// Mock Test Orders
export const mockTestOrders: TestOrder[] = [
  {
    id: "order1",
    prescriptionId: "presc2",
    patientId: "patient2",
    patientName: "Sana Malik",
    labId: "lab1",
    labName: "LifeCare Diagnostics",
    tests: ["test5"],
    scheduledDate: "2026-01-08",
    scheduledTime: "08:00 AM",
    homeCollection: true,
    address: "Nowgam, Srinagar, J&K 190015",
    status: "scheduled",
    totalAmount: 700,
    bookingDate: "2026-01-06",
  },
  {
    id: "order2",
    prescriptionId: "presc3",
    patientId: "patient3",
    patientName: "Farooq Ahmad",
    labId: "lab2",
    labName: "MediScan Lab & Diagnostics",
    tests: ["test1", "test2", "test6", "test11"],
    scheduledDate: "2026-01-05",
    scheduledTime: "07:00 AM",
    homeCollection: false,
    status: "report_uploaded",
    totalAmount: 2200,
    bookingDate: "2026-01-04",
    reportId: "report1",
  },
  {
    id: "order3",
    prescriptionId: "presc1",
    patientId: "patient1",
    patientName: "Ahmad Sheikh",
    labId: "lab1",
    labName: "LifeCare Diagnostics",
    tests: ["test2", "test3", "test4"],
    scheduledDate: "2026-01-07",
    scheduledTime: "07:30 AM",
    homeCollection: false,
    status: "sample_collected",
    totalAmount: 1350,
    bookingDate: "2026-01-05",
  },
];

// Mock Lab Reports
export const mockLabReports: LabReport[] = [
  {
    id: "report1",
    orderId: "order2",
    patientId: "patient3",
    patientName: "Farooq Ahmad",
    testIds: ["test1", "test2", "test6", "test11"],
    labId: "lab2",
    labName: "MediScan Lab & Diagnostics",
    uploadDate: "2026-01-06",
    reportUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    sharedWith: ["1"], // Shared with Dr. Irshad Ahmad Khan
    abnormalValues: true,
    criticalFlag: false,
  },
];