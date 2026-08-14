"use client";

import { create } from "zustand";
import type { Bus, Seat, PaymentMethod, BusCapacity, TripType } from "@/data/mockData";
import { generateTicketId } from "@/lib/utils";

interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  mode: "exam" | "rental";
}

interface PassengerInfo {
  name: string;
  mobile: string;
  gender: "male" | "female" | "";
  universityRoll: string;
}

interface RentalRequest {
  tripType: TripType;
  destination: string;
  estimatedDays: number;
  busCapacity: BusCapacity;
  specialNotes: string;
  contactName: string;
  contactMobile: string;
  organizationName: string;
}

interface BookingState {
  // Search
  searchParams: SearchParams;
  setSearchParams: (params: Partial<SearchParams>) => void;

  // Bus Selection
  selectedBus: Bus | null;
  selectBus: (bus: Bus) => void;

  // Seats
  seats: Seat[];
  selectedSeats: Seat[];
  setSeats: (seats: Seat[]) => void;
  toggleSeat: (seatId: string) => void;

  // Passenger Info
  passengerInfo: PassengerInfo;
  setPassengerInfo: (info: Partial<PassengerInfo>) => void;

  // Payment
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;

  // Booking
  bookingConfirmed: boolean;
  ticketId: string;
  confirmBooking: () => void;

  // Rental
  rentalRequest: RentalRequest;
  setRentalRequest: (request: Partial<RentalRequest>) => void;
  rentalSubmitted: boolean;
  submitRental: () => void;

  // Reset
  resetBooking: () => void;
  resetRental: () => void;
}

const initialSearchParams: SearchParams = {
  from: "Kushtia",
  to: "",
  date: "",
  passengers: 1,
  mode: "exam",
};

const initialPassengerInfo: PassengerInfo = {
  name: "",
  mobile: "",
  gender: "",
  universityRoll: "",
};

const initialRentalRequest: RentalRequest = {
  tripType: "one-way",
  destination: "",
  estimatedDays: 1,
  busCapacity: "40-seater",
  specialNotes: "",
  contactName: "",
  contactMobile: "",
  organizationName: "",
};

export const useBookingStore = create<BookingState>((set, get) => ({
  // Search
  searchParams: { ...initialSearchParams },
  setSearchParams: (params) =>
    set((state) => ({ searchParams: { ...state.searchParams, ...params } })),

  // Bus Selection
  selectedBus: null,
  selectBus: (bus) => set({ selectedBus: bus }),

  // Seats
  seats: [],
  selectedSeats: [],
  setSeats: (seats) => set({ seats, selectedSeats: [] }),
  toggleSeat: (seatId) =>
    set((state) => {
      const seat = state.seats.find((s) => s.id === seatId);
      if (!seat || seat.status === "booked") return state;

      const isSelected = state.selectedSeats.some((s) => s.id === seatId);

      if (isSelected) {
        return {
          selectedSeats: state.selectedSeats.filter((s) => s.id !== seatId),
          seats: state.seats.map((s) =>
            s.id === seatId ? { ...s, status: "available" as const } : s
          ),
        };
      }

      // Max seats check
      if (state.selectedSeats.length >= state.searchParams.passengers) {
        return state;
      }

      return {
        selectedSeats: [...state.selectedSeats, { ...seat, status: "selected" as const }],
        seats: state.seats.map((s) =>
          s.id === seatId ? { ...s, status: "selected" as const } : s
        ),
      };
    }),

  // Passenger
  passengerInfo: { ...initialPassengerInfo },
  setPassengerInfo: (info) =>
    set((state) => ({ passengerInfo: { ...state.passengerInfo, ...info } })),

  // Payment
  paymentMethod: "bkash",
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  // Booking
  bookingConfirmed: false,
  ticketId: "",
  confirmBooking: () =>
    set({
      bookingConfirmed: true,
      ticketId: generateTicketId(),
    }),

  // Rental
  rentalRequest: { ...initialRentalRequest },
  setRentalRequest: (request) =>
    set((state) => ({ rentalRequest: { ...state.rentalRequest, ...request } })),
  rentalSubmitted: false,
  submitRental: () => set({ rentalSubmitted: true }),

  // Reset
  resetBooking: () =>
    set({
      selectedBus: null,
      seats: [],
      selectedSeats: [],
      passengerInfo: { ...initialPassengerInfo },
      paymentMethod: "bkash",
      bookingConfirmed: false,
      ticketId: "",
    }),
  resetRental: () =>
    set({
      rentalRequest: { ...initialRentalRequest },
      rentalSubmitted: false,
    }),
}));
