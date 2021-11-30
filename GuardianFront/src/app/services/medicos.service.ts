import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = '/api/medicos/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class MedicosService {

  constructor(private http: HttpClient) { }

  getMedicos(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  getMedicosPaginacion(size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'tools/paginacion?size='+size+'&page='+page, httpOptions);
  }

  // tslint:disable
  getMedicosBusqueda(filter: string, size: number, page: number): Observable<any>{
    return this.http.get(AUTH_API + 'tools/busqueda?filter='+ filter + '&size='+ size +'&page='+page, httpOptions);
  }

 crearMedico(direccion: string, fecha_nac: string, email: string, nombre: string, apellido: string, telefono: string, especialidades: number[], file: File, zona:string): Observable<any> {
  const formData: FormData = new FormData();
  if(file!=null){
    formData.append('file', file, file.name);
  }
  formData.append('direccion', direccion)
  formData.append('fecha_nac', fecha_nac)
  formData.append('email', email)
  formData.append('nombre', nombre)
  formData.append('apellido', apellido)
  formData.append('telefono', telefono)
  formData.append('idzona', zona)
  if(especialidades){
    especialidades.forEach((item)=> formData.append("especialidades[]",item.toString()))
  }
  
  const req = new HttpRequest('POST', AUTH_API, formData, {
    reportProgress: true,
    responseType: 'json'
  });

  return this.http.request(req);
}

  obtenerMedico(id: any): Observable<any>{
    return this.http.get(AUTH_API + id);
  }

  editarMedico(id: number, direccion: string, fecha_nac: string, nombre: string, apellido: string, telefono: string, file: File): Observable<any>{
    const formData: FormData = new FormData();
    if(file!=null){
      formData.append('file', file, file.name);
    }
    formData.append('direccion', direccion)
    formData.append('nombre', nombre)
    formData.append('telefono', telefono)
    formData.append('fecha_nac', fecha_nac)
    formData.append('apellido', apellido)
    const req = new HttpRequest('put', AUTH_API + id, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  agregarEspecialidadesMedico(id: number, especialidades: number[]): Observable<any>{
    return this.http.put(AUTH_API + '/agregarEspecialidades/' + id, {
      especialidades
    }, httpOptions);
  }

  quitarEspecialidadMedico(idmedico: number, especialidad: number): Observable<any>{
    return this.http.post(AUTH_API + 'quitarespecialidad',{
      idmedico,
      especialidad
    }, httpOptions);
  }
  
  deleteMedico(id: any): Observable<any>{
    return this.http.delete(AUTH_API + id, httpOptions);
  }
}
