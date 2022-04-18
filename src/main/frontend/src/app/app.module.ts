import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {NgIdleKeepaliveModule} from '@ng-idle/keepalive';
import localeFr from '@angular/common/locales/fr';
import {DatePipe, registerLocaleData} from '@angular/common';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ReactiveFormsModule} from '@angular/forms';

registerLocaleData(localeFr, 'fr-FR');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    AlertModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule
  ],
  // entryComponents: [ConfirmModalComponent, AjoutStructureComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
