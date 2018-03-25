import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { MyHomePageComponent } from './my-home-page/my-home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { DataScientistRoutingModule } from './data-scientist-routing.module';
import { DataScientistComponent } from './data-scientist.component';

import { DashboardComponent, DashboardLogDialog } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent, ProfileUploadProfileDialog, ProfileUploadHeaderDialog } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

import { MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule, } from '@angular/material';
import { AuthenticationGuard } from '../authentication.guard';

@NgModule({
  imports: [
    CommonModule,
    DataScientistRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  ],
  declarations: [
    DataScientistComponent,
    MyHomePageComponent,
    DashboardComponent,
    HistoryComponent,
    DashboardLogDialog,
    ProfileComponent,
    ProfileUploadProfileDialog,
    ProfileUploadHeaderDialog,
    MessagesComponent
  ],
  providers: [AuthenticationGuard],
  entryComponents: [DashboardLogDialog, ProfileUploadProfileDialog, ProfileUploadHeaderDialog],
})
export class DataScientistModule { }
