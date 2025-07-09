import { Component, Input, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { UploadService } from '@module/inicio/service/upload.service';

interface Sexo {
  name: string;
  value: string;
}

@Component({
  selector: 'app-formcontacto',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FormsModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule, 
    FormsModule,
    FluidModule
  ],
  templateUrl: './formcontacto.component.html',
  styleUrl: './formcontacto.component.scss'
})
export class FormcontactoComponent implements OnInit {

  constructor(
    private uploadService :UploadService,
  ){ }

  @Input() idPrecargado: number | null = null;

  sexo: Sexo[] = [
    { name: 'Masculino', value: 'Masculino' },
    { name: 'Femenino', value: 'Femenino' },
  ]

  model: {
    name: string
    lastname: string
    email: string
    sexo: Sexo | null;
    birthdate: Date | string | undefined;
    phone: string[]
  } = {
    name: '',
    lastname: '',
    email: '',
    sexo: null, 
    birthdate: undefined, 
    phone: [],
  };

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

  crearContacto() {
    console.log('creando '+this.idPrecargado)
    console.log('creando contacto')
  }
}
