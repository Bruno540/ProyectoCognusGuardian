import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  usuario: any;
  userName: any;

  constructor(private tokenStorage: TokenStorageService, private router: Router,) {
    this.usuario=this.tokenStorage.getRoleName();
    this.userName=this.tokenStorage.getUserName();
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/component/home').then(()=>{
      window.location.reload();
    });
  }

}
