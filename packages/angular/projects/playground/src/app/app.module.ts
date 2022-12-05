import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaperlessModule } from 'projects/paperless/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerComponent } from './features/drawer/drawer.component';
import { TestDrawerComponent } from './features/drawer/test-drawer.component';
import { HomeComponent } from './features/home/home.component';
import { ModalComponent } from './features/modal/modal.component';
import { TestModalComponent } from './features/modal/test-modal.component';
import { TableComponent } from './features/table/table.component';
import { ToastComponent } from './features/toast/toast.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
        HomeComponent,
        TestModalComponent,
        ModalComponent,
        TestDrawerComponent,
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
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
