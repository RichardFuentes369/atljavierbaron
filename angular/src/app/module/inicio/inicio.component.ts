import { Component, OnInit, ViewChild } from '@angular/core';
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
export class InicioComponent implements OnInit{

  constructor(
    private router: Router,
    private translate: TranslateService
  ) { }

  async ngOnInit() {
    let dataStorage = localStorage.getItem('data')
    if(dataStorage){
      const dataReal = JSON.parse(dataStorage)
      console.log(dataReal)
    }
  }

  @ViewChild(TableComponent) tableComponent!: TableComponent;
  @ViewChild(PrimedialogComponent) primedialogComponent!: PrimedialogComponent;

  alertaJson(){
    this.tableComponent.refreshTable()
  }

  abrirModal(infoModal: any){
    this.primedialogComponent.showDialog(infoModal)
  }
}
