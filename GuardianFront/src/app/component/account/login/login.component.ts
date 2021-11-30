import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  users = [];

  constructor(
    private authService: LoginService, private tokenStorage: TokenStorageService, public router: Router, private handleError: HandleErrorsService) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }


  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUserName(data.nombre);
        this.tokenStorage.saveEmail(data.email);
        this.tokenStorage.saveRoleName(data.role);
        this.isLoggedIn=true;
        this.router.navigateByUrl('/component/card').then(()=>{
          window.location.reload();
        });
      },
      err => {
        this.handleError.showErrors(err);
      }
    );
  }

}

