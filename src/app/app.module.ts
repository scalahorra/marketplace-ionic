import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { HomePage } from './pages/home/home.page';
import { UnregisteredUserModalComponent } from './components/unregistered-user-modal/unregistered-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    UserButtonComponent,
    UnregisteredUserModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      // mode: 'ios'
    }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
