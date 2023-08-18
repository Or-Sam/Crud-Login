import { Component, OnInit } from '@angular/core';
import { Cuenta } from '../modelo/modelo';
import { UsuarioServiceService } from '../services/usuario-service.service';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss'],
})

export class CrearCuentaComponent  implements OnInit {
  cuenta! : Cuenta;

  tokenCuenta:Cuenta = {
    Cuenta : '',
    PCuenta : '',
  };
  constructor(private usuarioService : UsuarioServiceService,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder) { }

  ngOnInit() { }

  public alertButtons = ['OK'];

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit(form: NgForm){
    this.usuarioService.CreateCuenta(this.tokenCuenta )
    .subscribe(
      res => console.log(res)); 
    this.dismiss();
  }
  dismiss() {
    this.modalCtrl.dismiss({
      'dismiss' : true
    });
  }

}
