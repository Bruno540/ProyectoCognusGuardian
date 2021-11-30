import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccionesMedicoService } from 'src/app/services/acciones-medico.service';
import { HandleErrorsService } from 'src/app/services/handle.errors.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  @Input() userComponent: any;

  token: string = "";
  user = false;

  constructor(private loginService: LoginService, private route: ActivatedRoute, private accionesMedico: AccionesMedicoService, private handleError: HandleErrorsService, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.token=params.token;
      this.user = params.user;
    });
   
  }

  newPassword: string = "";

  newPasswordVerification: string = "";

  ngOnInit(): void {
    if(!this.token && !this.userComponent && !this.user){
      this.router.navigate(['/component/error']);
    }
  }

  passwordReset(){
    if(this.userComponent || this.user){
      this.accionesMedico.resetPassword(this.newPassword,this.newPasswordVerification).subscribe(data=>{
        this.handleError.showSuccessAlert(data.message);
      },err=>{
        this.handleError.showErrors(err);
      });
    }
    else{
      this.loginService.changePassword(this.newPassword, this.newPasswordVerification,this.token).subscribe(data =>{
        this.handleError.showSuccessAlert(data.message);
      },err=>{
        this.handleError.showErrors(err);
      });
    }
  }

}
