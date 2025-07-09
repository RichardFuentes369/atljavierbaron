import { Component, Output, EventEmitter } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { swalert } from '@functions/System'

import { UploadService } from '@module/inicio/service/upload.service';

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
  constructor(
    private uploadService :UploadService,
  ){ }

  @Output() alertaJson = new EventEmitter<void>();

  jsonData: any; 

  cargueJson(event: UploadEvent) {
    const file = event.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          const fileContent = e.target.result;
          this.jsonData = JSON.parse(fileContent); 
          const {message, title} = await this.uploadService.cargueJson(this.jsonData)
          this.alertaJson.emit();
          swalert((!title)? 'Sin titulo': title, (!message)? 'Sin mensaje': message , 'success')
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