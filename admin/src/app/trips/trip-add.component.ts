import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-add',
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent implements OnInit {
  tripForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
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

      this.tripDataService.addTrip(trip).subscribe({
        next: () => {
          this.router.navigate(['/trips']);
        },
        error: (err) => {
          console.error('Error adding trip:', err);
          this.error = err.error?.message || 'Failed to add trip. Please try again.';
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

