import { Component } from '@angular/core';
import { BtnuploadComponent as BtnUpload} from './component/btnupload/btnupload.component';
import { TableComponent as Table} from './component/table/table.component';
import { BoostrapComponent as ModalBoostrap} from '@component/globales/modal/boostrap/boostrap.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    BtnUpload,
    Table,
    ModalBoostrap
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}
