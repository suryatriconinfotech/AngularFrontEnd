import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getBooks(): Observable<any> {
    return this.http.get(`${API_URL}/books`);
  }

  getMyOrders(username: string, token: string): Observable<any> {
    return this.http.get(`${API_URL}/student/myorders/${username}`, {
      headers: this.createHeaders(token),
    });
  }

  getPendingUsers(token: string): Observable<any> {
    return this.http.get(`${API_URL}/librarian/pending-users`, {
      headers: this.createHeaders(token),
    });
  }

  approveUser(username: string, token: string): Observable<any> {
    return this.http.post(`${API_URL}/librarian/approve/${username}`, {}, {
      headers: this.createHeaders(token)
    });
  }

  getBookManagement(token: string): Observable<any> {
    return this.http.get(`${API_URL}/librarian/bookmanager`, {
      headers: this.createHeaders(token),
      
    });
  }

  addBook(bookData: any, token: string): Observable<any> {
    return this.http.post(`${API_URL}/librarian/addbook`, bookData, {
      headers: this.createHeaders(token),
    });
  }

  orderBook(orderData: any, token: string): Observable<any> {
    return this.http.post(`${API_URL}/student/order`, orderData, {
      headers: this.createHeaders(token) // Handle plain text response from the backend
    });
  }

  returnBook(returnData: any, token: string): Observable<any> {
    return this.http.post(`${API_URL}/student/return`, returnData, {
      headers: this.createHeaders(token) // Handle plain text response from the backend
    });
  }

  deleteBook(id: number, token: string): Observable<any> {
    return this.http.delete(`${API_URL}/librarian/deletebook/${id}`, {
      headers: this.createHeaders(token) // Handle plain text response from the backend
    });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, credentials);
  }

  signup(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/auth/register`, userData);
  }

  notifyUser(username: string,bookname: string, token: string): Observable<any> {
    const orderData={
      username: username,
      bookname: bookname
    }
    return this.http.post(`${API_URL}/librarian/notify`, orderData, {
      headers: this.createHeaders(token)// Handle plain text response
    });
  }

  clearHistory(token: string): Observable<any> {
    return this.http.delete(`${API_URL}/librarian/clear-history`, {
      headers: this.createHeaders(token) // Handle plain text response
    });
  }
}
