import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { swalert } from '@functions/System'

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UploadService } from '@module/inicio/service/upload.service';

interface Contactos {
  nombre: string,
  apellido: string,
  correo: string,
  sexo: string,
  nacimiento: number,
  telefono: []
}

@Component({
  selector: 'app-component-table',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule],
  providers: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {

  constructor(
    private uploadService :UploadService,
  ){ }

  @Output() abrirModal = new EventEmitter<any>();
  
  contactos!: Contactos[];

  ngOnInit() {
    this.cargarTabla()
  }

  async cargarTabla(){
    const {data, title, message, code} = await this.uploadService.listarStorage()

    if(code == '200'){
      this.contactos = JSON.parse(data)
    }
  }

  async limpiarStorage(){
    const {title, message, code} = await this.uploadService.limpiartStorage()

    if(code == '200'){
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
      this.contactos = []
    }

    if(code == '404'){
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'error')
    }
  }

  async refreshTable(){
    const {data, title, message, code} = await this.uploadService.listarStorage()

    if(code == '200'){
      this.contactos = JSON.parse(data)
    }
  }

  async eliminarContacto(index: number){
    const {title, message, code} = await this.uploadService.eliminarContacto(index)
    if(code == '200'){
      this.refreshTable()
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
    }
  }

  async editarContacto(index: number){
    let infoModal = {
      title: "Editar contacto",
      componentePrecargado: "FormcontactoComponent",
      dataPrecargada: index,
      buttonSave: true
    }
    this.abrirModal.emit(infoModal)
  }
  
  async verContacto(index: number){
    let infoModal = {
      title: "Ver contacto",
      componentePrecargado: "FormcontactoComponent",
      dataPrecargada: index,
      buttonSave: false
    }
    this.abrirModal.emit(infoModal)
  }
}
