import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [TabsComponent, AppComponent, CreateEventComponent], 
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],

})
export class AppModule {}
