import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.error = null;
    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading trips:', err);
        this.error = 'Failed to load trips. Please try again.';
        this.loading = false;
      }
    });
  }

  onDelete(code: string): void {
    if (confirm(`Are you sure you want to delete trip ${code}?`)) {
      this.tripDataService.deleteTrip(code).subscribe({
        next: () => {
          // Remove the deleted trip from the array
          this.trips = this.trips.filter(trip => trip.code !== code);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
          alert('Failed to delete trip. Please try again.');
        }
      });
    }
  }

  onAddTrip(): void {
    this.router.navigate(['/trips/add']);
  }
}

