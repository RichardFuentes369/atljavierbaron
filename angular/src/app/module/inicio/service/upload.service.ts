import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
 
  constructor() {}

  async leerContacto(){
  }

  async cargueJson(newJson: any){
    let response: { title?: string, message?: string, code?: string } = {};
    response.title = "Archivo"
    try {
      localStorage.setItem('data', JSON.stringify(newJson));
      response.message = "Se cargó el archivo json de forma correcta"
      response.code = "200"
    } catch (e) {
      response.message = "Error al guardar en localStorage"
      response.code = "404"
    }
    return response
  }

  async limpiartStorage(){
    let response: { title?: string, message?: string, code?: string } = {};
    try {
      if(localStorage.getItem('data')){
        localStorage.removeItem('data')
        response.title = "Limpieza exitosa"
        response.message = "Se limpio la data del storage correctamente"
        response.code = "200"
      }else{
        response.title = "Error en limpieza"
        response.message = "No se encontro data a limpiar"
        response.code = "404"
      }
    } catch (e) {
      response.message = "Error al limpiar el localStorage"
      response.code = "404"
    }
    return response
  }

  async crearContacto(){
  }

  async editarContacto(){
  }

  async eliminarContacto(){
  }
  
}
