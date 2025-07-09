import { Component } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { swalert } from '@functions/System'

interface UploadEvent {
  files: File[];
}

@Component({
  selector: 'app-component-btnupload',
  standalone: true,
  templateUrl: './btnupload.component.html',
  styleUrl: './btnupload.component.scss', 
  imports: [
    FileUpload
  ],
  providers: []
})
export class BtnuploadComponent {
  constructor() { }

  jsonData: any; 

  cargueJson(event: UploadEvent) {
    const file = event.files[0]

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          this.jsonData = JSON.parse(fileContent); 
          swalert('Archivo', 'cargado con exito', 'success')
          console.log('JSON cargado:', this.jsonData);
        } catch (error) {
          swalert('Error', 'No se pudo parsear el archivo. Asegúrate de que sea un JSON válido', 'error')
          console.error('Error al parsear JSON:', error);
        }
      };
      
      reader.readAsText(file); 
    }else{
      swalert('Alerta', 'No se a seleccionado ningun archivo', 'warning')
    }
  }
}