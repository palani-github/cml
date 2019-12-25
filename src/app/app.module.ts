import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule, MatFormFieldModule, MatInputModule, 
MatPaginatorModule, MatDatepickerModule, MAT_DATE_LOCALE,
MatNativeDateModule } from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlbumsComponent } from './albums/albums.component';
import { EditorialsComponent } from './editorials/editorials.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AccessdeniedComponent } from './accessdenied/accessdenied.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlbumsComponent,
    EditorialsComponent,
    PagenotfoundComponent,
    AccessdeniedComponent,
    ErrorComponent,
    HomeComponent,    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-IN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
