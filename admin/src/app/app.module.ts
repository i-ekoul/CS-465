import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trips/trip-list.component';
import { TripCardComponent } from './trips/trip-card.component';
import { TripAddComponent } from './trips/trip-add.component';
import { TripEditComponent } from './trips/trip-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripCardComponent,
    TripAddComponent,
    TripEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

