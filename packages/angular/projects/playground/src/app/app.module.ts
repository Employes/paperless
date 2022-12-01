import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaperlessModule } from 'projects/paperless/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerComponent } from './features/drawer/drawer.component';
import { HomeComponent } from './features/home/home.component';
import { BaseModalComponent } from './features/modal/base-modal.component';
import { ModalComponent } from './features/modal/modal.component';
import { TestModalComponent } from './features/modal/test-modal.component';
import { OverlayComponent } from './features/overlay.component';
import { TableComponent } from './features/table/table.component';
import { ToastComponent } from './features/toast/toast.component';
import { ModalService } from './services/modal.sevice';
import { OverlayService } from './services/overlay.service';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        OverlayComponent,
        AppComponent,
        HomeComponent,
        BaseModalComponent,
        TestModalComponent,
        ModalComponent,
        DrawerComponent,
        ToastComponent,
        TableComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PaperlessModule.forRoot(),
    ],
    providers: [OverlayService, ModalService],
    bootstrap: [AppComponent],
})
export class AppModule {}
