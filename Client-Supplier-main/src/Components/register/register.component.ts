import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth.service';
import { ILogin } from 'src/Models/ILogin';
import { IRegister } from 'src/Models/IRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData: IRegister;
  constructor(private authService: AuthService, private router:Router) {
    this.registerData = {} as IRegister;
   }

  ngOnInit() {
  }

  register(){
    const myObserver = {
      next: (x: number) => {
        console.log('Supplier Added Successfully with info Id: ' + x);
        this.router.navigate(['/Login']);
    },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: () => console.log('Observer got a complete notification'),
    };
    this.authService.register(this.registerData).subscribe( myObserver);
  }

}
