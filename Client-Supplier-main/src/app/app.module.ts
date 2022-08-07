import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from 'src/Components/register/register.component';
import { LoginComponent } from 'src/Components/login/login.component';
import { AddProductComponent } from 'src/Components/add-Product/add-Product.component';
import { HomeComponent } from 'src/Components/home/home.component';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/Components/header/header.component';
import { FooterComponent } from 'src/Components/Footer/Footer.component';
import { ProductComponent } from 'src/Components/product/product.component';
import { AddVariationComponent } from 'src/Components/add-variation/add-variation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MainLayoutComponent } from 'src/Components/MainLayout/MainLayout.component';
import { DeleteConfirmationDialogComponent } from 'src/Components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from 'src/Components/Search/Search.component';
import { DashboardComponent } from 'src/Components/Dashboard/Dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductDialogComponent } from 'src/Components/Product-dialog/Product-dialog.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    AddProductComponent,
    HeaderComponent,
    ProductComponent,
    MainLayoutComponent,
    AddVariationComponent,
    DeleteConfirmationDialogComponent,
    SearchComponent,
    DashboardComponent,
    ProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
  ],
  providers: [  
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
