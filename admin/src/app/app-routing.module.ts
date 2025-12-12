import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list.component';
import { TripAddComponent } from './trips/trip-add.component';
import { TripEditComponent } from './trips/trip-edit.component';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListComponent, canActivate: [AuthGuard] },
  { path: 'trips/add', component: TripAddComponent, canActivate: [AuthGuard] },
  { path: 'trips/:code/edit', component: TripEditComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/trips' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

