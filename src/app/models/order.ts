export interface Order {
  id: number;
  username: string;
  bookname: string;
  issuedDate: string; // ISO date format from the backend
  returnDate: string; // ISO date format from the backend
  bookStatus: boolean; // true = returned, false = not returned
  count: number;
  notified: boolean; // true = overdue notification sent
}
