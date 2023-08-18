import { Component } from '@angular/core';
import { Usuario } from '../../modelo/modelo';
import { UsuarioServiceService } from '../../services/usuario-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private usuarioService:UsuarioServiceService) {}

  textoBuscar = '';
  Busqueda: Usuario[] = [];
  
  buscar(event: any){
    const valor = event.detail.value;
    this.usuarioService.getUnUsuarios(valor)
        .subscribe (resp =>{
          console.log(resp);
          this.Busqueda = resp ;
        });
  }

}
