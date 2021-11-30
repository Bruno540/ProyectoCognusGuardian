import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

declare var paypal: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;
  paypal: any;

  addScript = false;

  constructor(private pagosService: PagosService, private spinner: NgxSpinnerService, public router: Router) {

   }

  form: any = {
    email: null,
    nombre: null,
    apellido: null,
    telefono: null,
    institucion: null
  };

  ngOnInit() {
      var subID ="";
      paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'horizontal',
            label: 'paypal',
            tagline: 'false'
        },
        onClick: async (data:any,actions: any, datos: any = this.form) =>{
          const { email, nombre, apellido, telefono, institucion } = datos;
          var error = false;
          var errores={
            errors:[]
          };
          const response =  await fetch(`${environment.BACKEND_URL}/api/payment/verifysuscription` , {
              method: 'post',
              mode: 'cors',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({email: email, nombre: nombre,apellido: apellido,telefono: telefono,institucion: institucion})
            }).then(async (res) => {
              errores = await res.json();
              if(res.ok){
                error=false;
                return actions.resolve();
              }
              else{
                error=true;
                return actions.reject();
              }
          });
          if(error){
            this.showErrors(errores.errors);
          }
          return response;
        },
        createSubscription: async (data: any, actions: any, datos: any = this.form) => {
          const res = await actions.subscription.create({
            /* Creates the subscription */
            plan_id: environment.PAYPAL_PLAN_ID,
          });
          subID = res;
          const { email, nombre, apellido, telefono, institucion } = datos;
          const serverResponse = await this.pagosService.crearSuscripcion(subID, email, nombre, apellido, telefono, institucion).toPromise();
          if (serverResponse.ok) {
            return res;
          }
        },
        onApprove: (data: any, actions: any) => {
          this.pagosService.saveRegisteredSuscription(this.form);
          this.router.navigateByUrl('/component/success'); // You can add optional success message for the subscriber here
        },
        onCancel: (data:any)=>{
          this.pagosService.deleteSuscription(subID).subscribe();
        },
        onError: (data: any) => {
          this.pagosService.deleteSuscription(subID).subscribe();
        }
    }).render(this.paypalElement.nativeElement); 
    
  }

  showErrors(errores: any): void{
    const messages: string[] = [];
    errores.forEach((err: { msg: any, param: any; })=>{
      messages.push('<br>' + err.msg );
    });
    this.showErrorAlert(messages);
  }

  showErrorAlert(messages: string[]) {
    Swal.fire('Error!', messages.toString(), 'error');
  }

}
