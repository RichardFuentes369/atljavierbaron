import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListaComponentes } from '@module/lista-componentes';


@Component({
  selector: 'app-global-primedialog',
  standalone: true,
  imports: [Dialog, ButtonModule, InputTextModule],
  templateUrl: './primedialog.component.html',
  styleUrl: './primedialog.component.scss'
})
export class PrimedialogComponent {

  @ViewChild('contenedor', { read: ViewContainerRef, static: true }) contenedor!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  listaDeComponentes = new ListaComponentes();

  async showDialog(infoModal: any) {
    // const boton = document.getElementById('miBoton') as HTMLButtonElement
    const metodoClickeado = infoModal.componentePrecargado

    if(metodoClickeado){
      let componente = await this.listaDeComponentes.obtenerComponentePorNombre(infoModal.componentePrecargado)
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.contenedor.clear()
      this.contenedor.createComponent(factory);
    }else{
      console.log('componente no encontrado')
    }
    this.title = infoModal.title
    this.componentePrecargado = infoModal.componentePrecargado
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  visible: boolean = false;
  title: string = '';
  componentePrecargado: string = ''

}
