import { Component } from '@angular/core';
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
  }
}
