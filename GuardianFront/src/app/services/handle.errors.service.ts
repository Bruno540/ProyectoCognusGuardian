import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HandleErrorsService {

  constructor() { }

  showErrors(errores: any): void{
    let messages: string[] = [];
    const ckErrorArray = errores.error.errors;
    if(Array.isArray(ckErrorArray)){
      ckErrorArray.forEach((err: { msg: any, param: any; })=>{
        messages.push('<br>' + err.msg);
      });
    }
    else{
      messages.push(errores.error.message);
    }
    this.showErrorAlert(messages);
  }

  showSuccessAlert(message: string) {
    Swal.fire('OK', message ?? "Ok", 'success');
  }

  showErrorAlert(messages: string[]) {
    Swal.fire('Error!', messages.toString() ?? "Algo salio mal", 'error');
  }

  async showConfirmDelete(msg?:string){
    return await Swal.fire({
      title: 'Esta seguro?',
      text: msg ?? "Una vez eliminado no podra restaurarse",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, entendido!'
    }).then((result) => {
        return result
    })
  }
}
