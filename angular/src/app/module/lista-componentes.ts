// import { CrearUsuariosComponent } from './users/components/crear-usuarios/crear-usuarios.component';

export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
    // {
    //   name: 'CrearUsuariosComponent',
    //   componente: CrearUsuariosComponent
    // },

  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
