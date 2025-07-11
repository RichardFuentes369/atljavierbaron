import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
 
  constructor() {}

  async leerContacto(index: number){
    if(localStorage.getItem('data')){
      const data = localStorage.getItem('data')
      
      if(data!=null){ 
        let dataTratar = JSON.parse(data)[index]
        return dataTratar
      }
    }
  }

  async cargueJson(newJson: any){
    let response: { title?: string, message?: string, code?: string } = {};
    response.title = "Archivo"
    try {
      let dataStorage = localStorage.getItem('data')
      if(dataStorage){
        let newDada = []
        for (const dexist of JSON.parse(dataStorage)) {
          newDada.push(dexist)
        }
        for (const dnew of newJson) {
          newDada.push(dnew)
        }
        localStorage.removeItem('data')
        localStorage.setItem('data', JSON.stringify(newDada))
      }else{
        localStorage.setItem('data', JSON.stringify(newJson));
      }
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

  async listarStorage(){
    let response: { title?: string, message?: string, code?: string , data?: any} = {};

    if(localStorage.getItem('data')){
      response.data = localStorage.getItem('data')
      response.code = "200"
    }else{
      response.title = "Error en el listado"
      response.message = "No se encontro data a listar"
      response.code = "404"
    }
    
    return response
  }

  async crearContacto(model: any){
    let response: { title?: string, message?: string, code?: string , data?: any} = {};
    try {
      let dataStorage = localStorage.getItem('data')
      let nuevoObjeto = {
        'nombres': model.name,
        'apellidos': model.lastname,
        'correo': model.email,
        'nacimiento': model.birthdate,
        'sexo': model.sexo.value,
        'telefonos': model.phone
      }
      if(dataStorage){
        const dataReal = JSON.parse(dataStorage)
        dataReal.push(nuevoObjeto)
        localStorage.removeItem('data')
        localStorage.setItem('data', JSON.stringify(dataReal))
      }else{
        let array = []
        const arrayNuevo = array.push(nuevoObjeto)
        localStorage.setItem('data', JSON.stringify(arrayNuevo))
      }
      response.title = "Contacto"
      response.message = "Creado exitosamente"
      response.code = "200"
    } catch (e) {
      response.message = "Error al eliminar el contacto del localStorage"
      response.code = "404"
    }
    return response
  }

  async editarContacto(model: any, index:number){
    let response: { title?: string, message?: string, code?: string , data?: any} = {};
    try {
      let dataStorage = localStorage.getItem('data')
      let nuevoObjeto = {
        'nombres': model.name,
        'apellidos': model.lastname,
        'correo': model.email,
        'nacimiento': model.birthdate,
        'sexo': model.sexo.value,
        'telefonos': model.phone
      }
      if(dataStorage){
        const updatedObject = { ...JSON.parse(dataStorage)[index], ...nuevoObjeto }

        const updatedArray = [
          ...JSON.parse(dataStorage).slice(0, index), 
          updatedObject,                      
          ...JSON.parse(dataStorage).slice(index + 1)
        ];

        localStorage.removeItem('data')
        localStorage.setItem('data', JSON.stringify(updatedArray))
      }else{
        let array = []
        const arrayNuevo = array.push(nuevoObjeto)
        localStorage.setItem('data', JSON.stringify(arrayNuevo))
      }
      response.title = "Contacto"
      response.message = "Actualizado exitosamente"
      response.code = "200"
    } catch (e) {
      response.message = "Error al actualizar el contacto del localStorage"
      response.code = "404"
    }
    return response
  }

  async eliminarContacto(index: number){
    let response: { title?: string, message?: string, code?: string } = {};
    try {
      let dataStorage = localStorage.getItem('data')
      if(dataStorage){
        const dataReal = JSON.parse(dataStorage)
        dataReal.splice(index, 1)
        localStorage.removeItem('data')
        localStorage.setItem('data', JSON.stringify(dataReal))
        response.title = "Contacto"
        response.message = "Eliminado exitosamente"
        response.code = "200"
      }
    } catch (e) {
      response.message = "Error al eliminar el contacto del localStorage"
      response.code = "404"
    }
    return response
  }
  
}
