import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Trip } from '../models/trip';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = `${environment.apiBaseUrl}/trips`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders();
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiBaseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getTripByCode(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiBaseUrl}/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiBaseUrl, trip, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  updateTrip(code: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiBaseUrl}/${code}`, trip, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteTrip(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${code}`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('TripDataService error:', error);
    return throwError(() => error);
  }
}

