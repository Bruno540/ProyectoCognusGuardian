import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  tipo: any;


  constructor(
    private tokenStorage: TokenStorageService
  ) {}


  ngOnInit() {
    this.tipo=this.tokenStorage.getRoleName();
    const script = document.createElement('script');
    script.src=`https://www.paypal.com/sdk/js?client-id=${environment.PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
    const head = document.getElementsByTagName('head')[0];
    if (head !== null && head !== undefined) {
      document.head.appendChild(script);
    }
  }
}
