import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioServiceService } from '../../services/usuario-service.service';
import { Usuario, Estados, VistaCompleta } from '../../modelo/modelo';
import { AlertController, IonInfiniteScroll, ModalController, NavController, NavParams } from '@ionic/angular';
import { EditarUsuarioComponent } from '../../components/editar-usuario/editar-usuario.component';
import { CrearUsuarioComponent } from '../../components/crear-usuario/crear-usuario.component';
import { Data } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
[x: string]: any;

  page: number = 0;
  // resultsCount= 5;
  totalPages: number = 3;

  // sortDirection = 0;
  // sortKey = null;

  TodoslosUsuarios: Usuario[] = [];
  MostrarUsuarios: VistaCompleta [] = [];
    
  public data?: Data;
  public columns: any;
  sort: any = 'multi';

  idusuario! : number;
  nombre!: string;
  direccion! : string;
  telefono! : string;
  codpostal! : string;
  tipousuario! : string;
  estado! : string;
  localidad! : string;
  roll! : string;
  municipio! : string;
  

  constructor(private usuarioService:UsuarioServiceService, 
              private modalCtrl : ModalController,
              private alertCtrl : AlertController,
              private navCtrl : NavController,
               ) 
               {
                this.Getusuarios();
                this.GetVistaSeleccionada();
              }

    // nextPage(){
    //   this.page++;
    //   this.GetVistaSeleccionada();
    // }

    // prevPage(){
    //   this.page--;
    //   this.GetVistaSeleccionada();
    // }

    // goFirst(){
    //   this.page = 0;
    //   this.GetVistaSeleccionada();
    // }

    // goLast(){
    //   this.page = this.totalPages - 1;
    //   this.GetVistaSeleccionada();
    // }

    // sortBy(key: any){
    //   this.sortKey = key;
    //   this.sortDirection ++;
    //   this.sort();
    //   console.log(this.sort)
    // }

    // sort(){
    //   if (this.sortDirection == 1){
    //     this.data = this.data?.['sort']((a: any,b: any) =>{
    //       console.log('a:',a);

    //       const valA = a[this.sortKey];
    //       const valB = b[this.sortKey];
    //       return valA.localeCompare(valB);
    //     })
    //   } else if (this.sortDirection == 2){

    //   }else {
    //     this.sortDirection = 0;
        
    //   }
    // }
  
        Getusuarios(){
          this.usuarioService.getUsuarios().subscribe (
            (resp:Usuario[]) =>{
              
              this.TodoslosUsuarios = resp;
            });
          }

          GetVistaSeleccionada(){
            this.usuarioService.getVistaCompleta().subscribe (
              (resp:VistaCompleta[]) =>{
                console.log(resp)
                this.columns = [
                  { name: 'idusuario' },
                  { name: 'Nombre' },
                  { name: 'Direccion' },
                  { name: 'Telefono' },
                  { name: 'codpostal' },
                  { name: 'tipousuario' },
                  { name: 'Roll' },
                  { prop: 'entidad_federativa' },
                  { name: 'Municipio' },
                  { prop: 'noM_LOC'}
                ]
                this.data = resp;
                this.MostrarUsuarios = resp;
              });
            }

        
                
        ngOnInit() {}

        // Metodo para llamar al componente que edita usuarios
    async ClickEditar(idusuario: number){
      const modal = await this.modalCtrl.create({
        component: EditarUsuarioComponent,
        componentProps : {
          "idusuario" : idusuario,
       }
      });
      await modal.present();
      return await modal.onDidDismiss().then(()=>{
        this.GetVistaSeleccionada();
      });
    }
    // Metodo para llamar al componente que crea Usuarios
    async ClickCrear(){
      const modal = await this.modalCtrl.create({
        component: CrearUsuarioComponent,
        componentProps : {

       }
      });
      modal.present();
      return await modal.onDidDismiss().then(()=>{
        this.GetVistaSeleccionada();
      });
    }
    // confirmacion del Logout 
    async Alert() {
      const alert = await this.alertCtrl.create({
        header: 'Are you sure?',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Yes',
            cssClass: 'alert-button-confirm',
            handler: () => {
              this.navCtrl.navigateRoot('login')
            }
            
          },
        ],
      });
      await alert.present();
    }
    // Llamado al metodo para eliminar usuario en base el id

    ClickEliminar(idusuario: number){
      this.usuarioService.getEliminarUsuario(idusuario)
    .subscribe((resp: Usuario[])=>{
  }),((err:any)=>{
    console.log(err)
  });
    }

    // Alert para confirmar la eliminacion
    async presentAlert(idusuario: number) {
      const alert = await this.alertCtrl.create({
        header: 'Estas seguro que quieres eliminar este usuario?',
        cssClass: 'custom-alert',
        buttons: [
          {
            text: 'No',
            cssClass: 'alert-button-cancel',
          },
          {
            text: 'Si',
            cssClass: 'alert-button-confirm',
            handler: async () => {
              this.ClickEliminar(idusuario)
              await this.GetVistaSeleccionada();
            },
          },
        ],
      });
  
      await alert.present();
    }

    
}
