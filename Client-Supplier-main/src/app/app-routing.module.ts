import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from 'src/Components/add-Product/add-Product.component';
import { AddVariationComponent } from 'src/Components/add-variation/add-variation.component';
import { FAQComponent } from 'src/Components/FAQ/FAQ.component';
import { HomeComponent } from 'src/Components/home/home.component';
import { HeaderComponent } from 'src/Components/header/header.component';
import { LoginComponent } from 'src/Components/login/login.component';
import { MainLayoutComponent } from 'src/Components/MainLayout/MainLayout.component';
import { NotFoundComponent } from 'src/Components/NotFound/NotFound.component';
import { RegisterComponent } from 'src/Components/register/register.component';
import { SectionSellComponent } from 'src/Components/SectionSell/SectionSell.component';
import { DashboardComponent } from 'src/Components/Dashboard/Dashboard.component';

const routes: Routes = [
  {path:'', component: MainLayoutComponent, children:[
    {path:'', component:SectionSellComponent },
    {path:'Home', component:SectionSellComponent },
    {path:'FAQ', component:FAQComponent}
    ]},
  {path:'Register', component:RegisterComponent},
  {path:'Login', component:LoginComponent},
  {path:'Add', component:AddProductComponent},
  {path:'Dashboard', component:DashboardComponent},
  {path:'Home/:sid', component:HomeComponent},
  {path:'Variation/:pid', component:AddVariationComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }