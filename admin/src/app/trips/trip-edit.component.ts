import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  tripForm: FormGroup;
  tripCode: string = '';
  loading = false;
  loadingTrip = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tripDataService: TripDataService,
    private router: Router
  ) {
    this.tripForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      length: ['', [Validators.required, Validators.min(1)]],
      start: ['', [Validators.required]],
      resort: ['', [Validators.required]],
      perPerson: ['', [Validators.required, Validators.min(0)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('code') || '';
    if (this.tripCode) {
      this.loadTrip();
    }
  }

  loadTrip(): void {
    this.loadingTrip = true;
    this.error = null;
    this.tripDataService.getTripByCode(this.tripCode).subscribe({
      next: (trip) => {
        // Format date for input field (YYYY-MM-DD)
        const startDate = trip.start instanceof Date 
          ? trip.start 
          : new Date(trip.start);
        const formattedDate = startDate.toISOString().split('T')[0];

        this.tripForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: formattedDate,
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description
        });
        this.loadingTrip = false;
      },
      error: (err) => {
        console.error('Error loading trip:', err);
        this.error = 'Failed to load trip. Please try again.';
        this.loadingTrip = false;
      }
    });
  }

  onSubmit(): void {
    if (this.tripForm.valid) {
      this.loading = true;
      this.error = null;

      const trip: Trip = {
        code: this.tripForm.value.code,
        name: this.tripForm.value.name,
        length: Number(this.tripForm.value.length),
        start: new Date(this.tripForm.value.start),
        resort: this.tripForm.value.resort,
        perPerson: Number(this.tripForm.value.perPerson),
        image: this.tripForm.value.image,
        description: this.tripForm.value.description
      };

      this.tripDataService.updateTrip(this.tripCode, trip).subscribe({
        next: () => {
          this.router.navigate(['/trips']);
        },
        error: (err) => {
          console.error('Error updating trip:', err);
          this.error = err.error?.message || 'Failed to update trip. Please try again.';
          this.loading = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.tripForm.controls).forEach(key => {
        this.tripForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/trips']);
  }

  getFieldError(fieldName: string): string {
    const field = this.tripForm.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      return `${fieldName} is required`;
    }
    if (field?.hasError('min') && field?.touched) {
      return `${fieldName} must be greater than ${field.errors?.['min'].min}`;
    }
    return '';
  }
}

