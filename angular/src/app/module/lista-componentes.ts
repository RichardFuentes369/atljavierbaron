export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
   

  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
