import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-success-suscription',
  templateUrl: './success-suscription.component.html',
  styleUrls: ['./success-suscription.component.scss']
})
export class SuccessSuscriptionComponent implements OnInit {

  constructor(private pagosService: PagosService) { }

  suscription?: any;

  ngOnInit(): void {
    this.suscription = this.pagosService.getRegisteredSuscription();
  }

}
