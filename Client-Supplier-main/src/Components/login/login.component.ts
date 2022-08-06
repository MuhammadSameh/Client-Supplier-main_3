import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth.service';
import { ILogin } from 'src/Models/ILogin';
import { IToken } from 'src/Models/IToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo:ILogin;
  constructor(private authService: AuthService, private router:Router) { 
    this.loginInfo = {} as ILogin;
  }

  ngOnInit() {
  }

  login(){
    const myObserver = {
      next: (token: IToken) => {
        console.log("Logged in Successfully");
        localStorage.setItem("Auth", token.token);
        localStorage.setItem("SupplierInfoId",  String(token.supplierInfoId))
        this.router.navigate(['/Home',`${token.supplierInfoId}`])
    },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: () => console.log('Observer got a complete notification'),
    };
    this.authService.login(this.loginInfo).subscribe(myObserver
    )
    this.router.navigate(['/Home'])
  }
}
