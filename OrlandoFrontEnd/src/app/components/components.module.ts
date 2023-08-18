import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component';




@NgModule({
  declarations: [EditarUsuarioComponent, CrearUsuarioComponent,CrearCuentaComponent],
  exports:[EditarUsuarioComponent,CrearUsuarioComponent,CrearCuentaComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
