import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxPaginationModule
    
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
