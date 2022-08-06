import { Component, DoCheck, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  isLogged:boolean
  constructor(private authService: AuthService, private router:Router) { 
    this.isLogged = false;
  }
  
  ngDoCheck(): void {
    this.isLogged = this.authService.isLogged()
  }
 
 

  ngOnInit() {
    
  }

  Logout(){
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['/Login'])
  }

}
