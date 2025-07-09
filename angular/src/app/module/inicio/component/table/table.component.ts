import { Component, OnInit } from '@angular/core';
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
  nacimiento: number
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
  
  contactos!: Contactos[];

  // constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProductsMini().then((data) => {
    // this.products = data;
    // });
  }

  async limpiarStorage(){
    const {title, message, code} = await this.uploadService.limpiartStorage()

    if(code == '200'){
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
    }

    if(code == '404'){
      swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'error')
    }
  }
}
