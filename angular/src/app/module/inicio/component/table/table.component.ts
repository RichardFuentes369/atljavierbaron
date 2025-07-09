import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

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
  imports: [TableModule, CommonModule],
  providers: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  contactos!: Contactos[];

  // constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProductsMini().then((data) => {
    // this.products = data;
    // });
  }
}
