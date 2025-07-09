import { FormcontactoComponent } from './inicio/component/formcontacto/formcontacto.component';

export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
    {
      name: 'FormcontactoComponent',
      componente: FormcontactoComponent
    },
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
