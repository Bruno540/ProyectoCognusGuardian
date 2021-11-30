import { Component, OnInit } from '@angular/core';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private loginService: LoginService,private handleError: HandleErrorsService) { }

  email: string = "";

  ngOnInit(): void {
  }

  forgotPassword(){
    this.loginService.forgotPassword(this.email).subscribe(data=>{
      this.handleError.showSuccessAlert(data.message)
    },err=>{
      this.handleError.showErrors(err);
    });
  }

}
