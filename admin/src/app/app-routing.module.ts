import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list.component';
import { TripAddComponent } from './trips/trip-add.component';
import { TripEditComponent } from './trips/trip-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/add', component: TripAddComponent },
  { path: 'trips/:code/edit', component: TripEditComponent },
  { path: '**', redirectTo: '/trips' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

