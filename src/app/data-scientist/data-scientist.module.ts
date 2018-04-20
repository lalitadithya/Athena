import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { MyHomePageComponent } from './my-home-page/my-home-page.component';
import { Routes, RouterModule } from '@angular/router';
import { DataScientistRoutingModule } from './data-scientist-routing.module';
import { DataScientistComponent } from './data-scientist.component';

import { DashboardComponent, DashboardLogDialog, DashboardAddPipelineDialog, DashboardViewDialog } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { ProfileComponent, ProfileUploadProfileDialog, ProfileUploadHeaderDialog } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';

import {
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
} from '@angular/material';
import { AuthenticationGuard } from '../authentication.guard';
import { DataSetComponent, DataSetUploadDialog } from './data-set/data-set.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteDataSetComponent, CompleteDataSetUploadDialog } from './complete-data-set/complete-data-set.component';
import { ParamaterComponent } from './dashboard/paramater/paramater.component';

@NgModule({
  imports: [
    CommonModule,
    DataScientistRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
    DataSetUploadDialog,
    ProfileComponent,
    ProfileUploadProfileDialog,
    ProfileUploadHeaderDialog,
    MessagesComponent,
    DataSetComponent,
    CompleteDataSetComponent,
    CompleteDataSetUploadDialog,
    DashboardAddPipelineDialog,
    ParamaterComponent,
    DashboardViewDialog
  ],
  providers: [AuthenticationGuard],
  entryComponents: [
    DashboardLogDialog,
    ProfileUploadProfileDialog,
    ProfileUploadHeaderDialog,
    DataSetUploadDialog,
    CompleteDataSetUploadDialog,
    DashboardAddPipelineDialog,
    DashboardViewDialog
  ],
})
export class DataScientistModule { }
