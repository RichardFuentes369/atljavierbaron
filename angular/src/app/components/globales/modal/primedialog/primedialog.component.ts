import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListaComponentes } from '@module/lista-componentes';
import { FormcontactoComponent } from '@module/inicio/component/formcontacto/formcontacto.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-global-primedialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule, CommonModule],
  templateUrl: './primedialog.component.html',
  styleUrl: './primedialog.component.scss'
})
export class PrimedialogComponent {

  @ViewChild('contenedor', { read: ViewContainerRef, static: true }) contenedor!: ViewContainerRef;
  private loadedFormComponentRef: ComponentRef<FormcontactoComponent> | null = null;
  @Output() alertaJson = new EventEmitter<void>();

  constructor(private resolver: ComponentFactoryResolver) {}

  listaDeComponentes = new ListaComponentes()

  async showDialog(infoModal: any) {
    const metodoClickeado = infoModal.componentePrecargado;
    
    if (metodoClickeado) {
      let componenteInfo = await this.listaDeComponentes.obtenerComponentePorNombre(infoModal.componentePrecargado);
      
      if (componenteInfo && componenteInfo.componente) {
        const numerRow: number | null = (infoModal.dataPrecargada !== undefined && infoModal.dataPrecargada !== null) ? infoModal.dataPrecargada : null
        this.contenedor.clear();
        const factory = await this.resolver.resolveComponentFactory(componenteInfo.componente);
        this.loadedFormComponentRef = this.contenedor.createComponent(factory) as ComponentRef<FormcontactoComponent>;
        if (this.loadedFormComponentRef.instance instanceof FormcontactoComponent) {
          this.loadedFormComponentRef.instance.idPrecargado = numerRow
          this.loadedFormComponentRef.instance.buttonSave = infoModal.buttonSave
        } else {
          console.warn(`PrimedialogComponent: El componente cargado "${metodoClickeado}" no es una instancia de FormcontactoComponent. No se pudo pasar idPrecargado.`);
        }
      } 
    } 
    
    this.title = infoModal.title;
    this.buttonSave = infoModal.buttonSave;
    this.componentePrecargado = infoModal.componentePrecargado;
    this.dataPrecargada = (infoModal.dataPrecargada !== undefined && infoModal.dataPrecargada !== null) ? infoModal.dataPrecargada : null;
    this.visible = true;
  }

  async accionGuardar(index: number | null){
    if (this.loadedFormComponentRef && this.loadedFormComponentRef.instance instanceof FormcontactoComponent) {
      const indexParaGuardar = this.loadedFormComponentRef.instance.idPrecargado
      this.loadedFormComponentRef.instance.guardarData(indexParaGuardar)
      this.alertaJson.emit()
    } 
  }

  closeDialog() {
    this.visible = false;
    if (this.contenedor) {
      this.contenedor.clear();
    }
    this.loadedFormComponentRef = null
  }

  buttonSave: boolean = false
  visible: boolean = false
  title: string = ''
  dataPrecargada: number | null = null
  componentePrecargado: string = ''
}