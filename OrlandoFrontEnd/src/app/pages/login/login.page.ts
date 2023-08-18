import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController, IonSlides, ModalController, NavController } from '@ionic/angular';
import { CrearCuentaComponent } from 'src/app/crear-cuenta/crear-cuenta.component';
import { Cuenta } from 'src/app/modelo/modelo';
import { UsuarioServiceService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoggedIn: boolean = false;
  token = false
  tokenEncriptado : any;
  
  tokenCuentas:Cuenta = {
    Cuenta : '',
    PCuenta : '',
  };

  constructor(private usuarioService:UsuarioServiceService,
    private modalCtrl : ModalController,
    public formBuilder: FormBuilder,
    private navCtrl : NavController,
    private alertCtrl : AlertController,
    private storage: Storage) { }

  ngOnInit() {
    this.init();
    this.storage.clear();
  }


  async onSubmit(form: NgForm){
    this.usuarioService.PutLogeoUsuario(this.tokenCuentas).subscribe(data =>{
      
      if (data ==true){
      
        this.usuarioService.PostObtenerToken(this.tokenCuentas).subscribe(datos =>{
            if(datos != ''){
              this.tokenEncriptado = datos;
              this.usuarioService.PutLogeoUsuario(this.tokenCuentas).subscribe(data =>{
              
              if (data == true){
                this.navCtrl.navigateRoot('main/tabs/tab1');
                
                this.token = true
                this.storage.set('tokenEncriptado',this.tokenEncriptado);
                
              }
            }); 
            } 
          });
      }   else{
        console.log("La credencial no es valida");
            // this.tokenEncriptado = null;
            this.storage.clear();
            this.presentAlert();
      }
    });  

    
  }
  //Alerta para usuario incorrecto
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Usuario o contraseña no validas',
      cssClass: 'custom-alert',
      
    });
    await alert.present();
  }
  //Inicializar LocalStorage
   init() {
    const storage = this.storage.create();
  }

  //Guardar Token Autentificado
  async guardarToken(){
    await this.storage.set('tokenEncriptado',this.tokenEncriptado);
  }
  

  // Metodo para llamar al componente que crea Usuarios
  async ClickRegistrar(){
    const modal = await this.modalCtrl.create({
      component: CrearCuentaComponent
    });
    modal.present();
    return await modal.onDidDismiss().then(()=>{
    });
  }

  
}
