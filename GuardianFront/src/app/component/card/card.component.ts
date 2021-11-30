import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
@Component({
  templateUrl: 'card.component.html'
})
export class CardsComponent {

  tipo: any;

  constructor(private tokenStorage: TokenStorageService){
    this.tipo=this.tokenStorage.getRoleName();
  }

}
