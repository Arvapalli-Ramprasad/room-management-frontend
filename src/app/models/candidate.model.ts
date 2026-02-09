export interface User {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string; // ISO format string
  address?: string;
  emergencyContact?: string;
  guardianName?: string;
  guardianContact?: string;
  photoUrl?: string;
  roomId?: string;
  moveInDate?: string;
  moveOutDate?: string;
  monthlyPayment?: number;
  totalPaid?: number;
  pendingAmount?: number;
  active?: boolean;
  expenseIds?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  addedUser?: string;
}
