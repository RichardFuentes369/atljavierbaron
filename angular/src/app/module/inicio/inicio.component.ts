import { Component, ViewChild } from '@angular/core';
import { BtnuploadComponent as BtnUpload} from './component/btnupload/btnupload.component';
import { TableComponent as Table, TableComponent} from './component/table/table.component';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimedialogComponent } from '@component/globales/modal/primedialog/primedialog.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    BtnUpload,
    ButtonModule,
    Table,
    PrimedialogComponent
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }

  @ViewChild(TableComponent) tableComponent!: TableComponent;

  alertaJson(){
    this.tableComponent.refreshTable()
  }
}
