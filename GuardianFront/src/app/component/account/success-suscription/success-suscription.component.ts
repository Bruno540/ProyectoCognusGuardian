import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-success-suscription',
  templateUrl: './success-suscription.component.html',
  styleUrls: ['./success-suscription.component.scss']
})
export class SuccessSuscriptionComponent implements OnInit {

  constructor(private pagosService: PagosService,  public router: Router) { }

  suscription?: any;

  ngOnInit(): void {
    this.suscription = this.pagosService.getRegisteredSuscription();
    if(!this.suscription){
      this.router.navigate(['/component/error']);
    }
  }

}
