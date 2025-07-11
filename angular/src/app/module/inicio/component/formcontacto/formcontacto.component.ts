import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { UploadService } from '@module/inicio/service/upload.service';
import { swalert, swalertInput } from '@functions/System'
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

interface Sexo {
  name: string;
  value: string;
}

interface ContactModel { // Define una interfaz para tu modelo para mejor tipado
  name: string;
  lastname: string;
  email: string;
  sexo: Sexo | null;
  birthdate: Date | string | undefined;
  phone: string[];
}

@Component({
  selector: 'app-formcontacto',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule, 
    FormsModule,
    FluidModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './formcontacto.component.html',
  styleUrl: './formcontacto.component.scss'
})
export class FormcontactoComponent implements OnInit {

  constructor(
    private uploadService :UploadService,
  ){ }

  @Input() idPrecargado: number | null = null
  @Input() buttonSave: boolean = true

  sexo: Sexo[] = [
    { name: 'Masculino', value: 'Masculino' },
    { name: 'Femenino', value: 'Femenino' },
  ]

  model: ContactModel = { 
    name: '',
    lastname: '',
    email: '',
    sexo: null,
    birthdate: undefined,
    phone: [],
  }

  async ngOnInit() {
    if(this.idPrecargado != null){
      const contacto = await this.uploadService.leerContacto(this.idPrecargado)
      this.model.name = contacto.nombres
      this.model.lastname = contacto.apellidos
      this.model.email = contacto.correo
      const sexoEncontrado = this.sexo.find(s => s.name === contacto.sexo || s.value === contacto.sexo)
      this.model.sexo = sexoEncontrado || null
      this.model.birthdate = contacto.nacimiento
      this.model.phone = contacto.telefonos
    }
  }

  async guardarData(index: number | null) {
    if(index == null){
      const {message, title, code} = await this.uploadService.crearContacto(this.model)
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
    }else{
      const {message, title, code} = await this.uploadService.editarContacto(this.model, index)
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
    }
  }

  async agregarPhone(){
    const result = await swalertInput('Ingresa un telefono nuevo','','Guardar')
    if(result.value){
      this.model.phone.push(result.value)
    }
  }

  async removerPhone(index: number){
    this.model.phone.splice(index, 1)
  }

}
