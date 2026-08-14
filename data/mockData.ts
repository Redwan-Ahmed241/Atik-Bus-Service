// ─── Types ───────────────────────────────────────────────────

export interface UpcomingExam {
  id: string;
  university: string;
  shortName: string;
  examDate: string;
  bookingOpen: boolean;
  destination: string;
  examCenter: string;
  status: "open" | "closing_soon" | "sold_out" | "upcoming";
}

export interface Route {
  id: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  examId?: string;
}

export interface Bus {
  id: string;
  name: string;
  type: "AC" | "Non-AC";
  model: string;
  routeId: string;
  departureTime: string;
  arrivalTime: string;
  totalSeats: number;
  fare: number;
  examCenter: string;
  amenities: string[];
}

export interface Seat {
  id: string;
  row: number;
  col: "A" | "B" | "C" | "D";
  status: "available" | "booked" | "selected";
  price: number;
}

export type BusCapacity = "29-seater" | "40-seater" | "52-seater";
export type TripType = "one-way" | "round-trip";
export type PaymentMethod = "bkash" | "nagad" | "rocket" | "card";

// ─── Upcoming University Exams ───────────────────────────────

export const upcomingExams: UpcomingExam[] = [
  {
    id: "ju-2026",
    university: "Jahangirnagar University",
    shortName: "JU",
    examDate: "2026-09-15",
    bookingOpen: true,
    destination: "Savar, Dhaka",
    examCenter: "JU Main Campus",
    status: "open",
  },
  {
    id: "du-2026",
    university: "Dhaka University",
    shortName: "DU",
    examDate: "2026-09-22",
    bookingOpen: true,
    destination: "Dhaka",
    examCenter: "DU Curzon Hall",
    status: "open",
  },
  {
    id: "ru-2026",
    university: "Rajshahi University",
    shortName: "RU",
    examDate: "2026-10-05",
    bookingOpen: true,
    destination: "Rajshahi",
    examCenter: "RU Shaheed Shamsuzzoha Hall",
    status: "closing_soon",
  },
  {
    id: "cu-2026",
    university: "Chittagong University",
    shortName: "CU",
    examDate: "2026-10-12",
    bookingOpen: false,
    destination: "Chittagong",
    examCenter: "CU Main Auditorium",
    status: "upcoming",
  },
  {
    id: "kuet-2026",
    university: "Khulna University of Eng. & Tech.",
    shortName: "KUET",
    examDate: "2026-10-18",
    bookingOpen: false,
    destination: "Khulna",
    examCenter: "KUET Campus",
    status: "upcoming",
  },
  {
    id: "buet-2026",
    university: "Bangladesh Uni. of Eng. & Tech.",
    shortName: "BUET",
    examDate: "2026-11-01",
    bookingOpen: false,
    destination: "Dhaka",
    examCenter: "BUET Old Academic Building",
    status: "upcoming",
  },
  {
    id: "iu-2026",
    university: "Islamic University",
    shortName: "IU",
    examDate: "2026-09-28",
    bookingOpen: true,
    destination: "Kushtia",
    examCenter: "IU Campus",
    status: "open",
  },
  {
    id: "jnu-2026",
    university: "Jagannath University",
    shortName: "JnU",
    examDate: "2026-10-25",
    bookingOpen: false,
    destination: "Dhaka",
    examCenter: "JnU Campus, Old Dhaka",
    status: "upcoming",
  },
];

// ─── Routes ──────────────────────────────────────────────────

export const routes: Route[] = [
  { id: "r1", from: "Kushtia", to: "Savar, Dhaka", distance: "190 km", duration: "5h 30m", examId: "ju-2026" },
  { id: "r2", from: "Kushtia", to: "Dhaka", distance: "230 km", duration: "6h", examId: "du-2026" },
  { id: "r3", from: "Kushtia", to: "Rajshahi", distance: "120 km", duration: "3h", examId: "ru-2026" },
  { id: "r4", from: "Kushtia", to: "Chittagong", distance: "450 km", duration: "10h", examId: "cu-2026" },
  { id: "r5", from: "Kushtia", to: "Khulna", distance: "70 km", duration: "2h", examId: "kuet-2026" },
  { id: "r6", from: "Kushtia", to: "Dhaka (BUET)", distance: "230 km", duration: "6h", examId: "buet-2026" },
  { id: "r7", from: "Kushtia", to: "Kushtia (IU)", distance: "15 km", duration: "30m", examId: "iu-2026" },
  { id: "r8", from: "Kushtia", to: "Dhaka (JnU)", distance: "230 km", duration: "6h 15m", examId: "jnu-2026" },
];

// ─── Buses ───────────────────────────────────────────────────

export const buses: Bus[] = [
  // JU Buses
  {
    id: "bus-1",
    name: "Attik Express - JU 01",
    type: "AC",
    model: "Hino AK1J",
    routeId: "r1",
    departureTime: "22:00",
    arrivalTime: "03:30",
    totalSeats: 40,
    fare: 850,
    examCenter: "JU Main Campus",
    amenities: ["AC", "Charging Port", "Water Bottle", "Blanket"],
  },
  {
    id: "bus-2",
    name: "Attik Express - JU 02",
    type: "Non-AC",
    model: "Hino AK1J",
    routeId: "r1",
    departureTime: "21:00",
    arrivalTime: "02:30",
    totalSeats: 52,
    fare: 550,
    examCenter: "JU Main Campus",
    amenities: ["Charging Port", "Water Bottle"],
  },
  {
    id: "bus-3",
    name: "Attik Premium - JU 03",
    type: "AC",
    model: "Scania K310",
    routeId: "r1",
    departureTime: "23:00",
    arrivalTime: "04:00",
    totalSeats: 40,
    fare: 1200,
    examCenter: "JU Main Campus",
    amenities: ["AC", "WiFi", "Charging Port", "Snacks", "Blanket", "Neck Pillow"],
  },
  // DU Buses
  {
    id: "bus-4",
    name: "Attik Express - DU 01",
    type: "AC",
    model: "Hino AK1J",
    routeId: "r2",
    departureTime: "21:30",
    arrivalTime: "03:30",
    totalSeats: 40,
    fare: 900,
    examCenter: "DU Curzon Hall",
    amenities: ["AC", "Charging Port", "Water Bottle"],
  },
  {
    id: "bus-5",
    name: "Attik Express - DU 02",
    type: "Non-AC",
    model: "Hino RK1J",
    routeId: "r2",
    departureTime: "20:00",
    arrivalTime: "02:00",
    totalSeats: 52,
    fare: 600,
    examCenter: "DU Curzon Hall",
    amenities: ["Charging Port", "Water Bottle"],
  },
  // RU Buses
  {
    id: "bus-6",
    name: "Attik Express - RU 01",
    type: "AC",
    model: "Hino AK1J",
    routeId: "r3",
    departureTime: "06:00",
    arrivalTime: "09:00",
    totalSeats: 40,
    fare: 500,
    examCenter: "RU Shaheed Shamsuzzoha Hall",
    amenities: ["AC", "Charging Port", "Water Bottle"],
  },
  {
    id: "bus-7",
    name: "Attik Express - RU 02",
    type: "Non-AC",
    model: "Ashok Leyland",
    routeId: "r3",
    departureTime: "05:30",
    arrivalTime: "08:30",
    totalSeats: 52,
    fare: 350,
    examCenter: "RU Shaheed Shamsuzzoha Hall",
    amenities: ["Water Bottle"],
  },
  // CU Bus
  {
    id: "bus-8",
    name: "Attik Long-Haul - CU 01",
    type: "AC",
    model: "Scania K310",
    routeId: "r4",
    departureTime: "19:00",
    arrivalTime: "05:00",
    totalSeats: 40,
    fare: 1800,
    examCenter: "CU Main Auditorium",
    amenities: ["AC", "WiFi", "Charging Port", "Dinner", "Blanket", "Neck Pillow"],
  },
  // KUET Bus
  {
    id: "bus-9",
    name: "Attik Express - KUET 01",
    type: "Non-AC",
    model: "Hino AK1J",
    routeId: "r5",
    departureTime: "06:30",
    arrivalTime: "08:30",
    totalSeats: 52,
    fare: 300,
    examCenter: "KUET Campus",
    amenities: ["Water Bottle"],
  },
  // IU Bus
  {
    id: "bus-10",
    name: "Attik Shuttle - IU 01",
    type: "Non-AC",
    model: "Ashok Leyland",
    routeId: "r7",
    departureTime: "07:00",
    arrivalTime: "07:30",
    totalSeats: 52,
    fare: 100,
    examCenter: "IU Campus",
    amenities: ["Water Bottle"],
  },
];

// ─── Seat Generator ──────────────────────────────────────────

export function generateSeats(totalSeats: number, fare: number): Seat[] {
  const seats: Seat[] = [];
  const cols: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
  const rows = Math.ceil(totalSeats / 4);

  for (let row = 1; row <= rows; row++) {
    for (let colIdx = 0; colIdx < 4; colIdx++) {
      const seatNumber = (row - 1) * 4 + colIdx + 1;
      if (seatNumber > totalSeats) break;

      // Randomly book some seats (30% chance)
      const isBooked = Math.random() < 0.3;

      seats.push({
        id: `${row}${cols[colIdx]}`,
        row,
        col: cols[colIdx],
        status: isBooked ? "booked" : "available",
        price: fare,
      });
    }
  }

  return seats;
}

// ─── Destinations for Dropdown ───────────────────────────────

export const destinations = upcomingExams
  .filter((exam) => exam.bookingOpen)
  .map((exam) => ({
    value: exam.destination,
    label: `${exam.destination} — ${exam.shortName} Admission`,
    examId: exam.id,
  }));

// ─── Bus Capacity Options ────────────────────────────────────

export const busCapacityOptions: { value: BusCapacity; label: string; price: string }[] = [
  { value: "29-seater", label: "29 Seater Mini Coach", price: "From ৳15,000/day" },
  { value: "40-seater", label: "40 Seater AC Coach", price: "From ৳25,000/day" },
  { value: "52-seater", label: "52 Seater Standard Coach", price: "From ৳20,000/day" },
];
