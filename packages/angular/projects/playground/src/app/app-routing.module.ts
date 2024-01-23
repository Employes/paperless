import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CropperComponent } from './features/cropper/cropper.component';
import { DatepickerComponent } from './features/datepicker/datepicker.component';
import { DrawerComponent } from './features/drawer/drawer.component';
import { HomeComponent } from './features/home/home.component';
import { ModalComponent } from './features/modal/modal.component';
import { TableComponent } from './features/table/table.component';
import { ToastComponent } from './features/toast/toast.component';
import { SelectComponent } from './features/select/select.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'modal',
        component: ModalComponent,
    },
    {
        path: 'drawer',
        component: DrawerComponent,
    },
    {
        path: 'toast',
        component: ToastComponent,
    },
    {
        path: 'table',
        component: TableComponent,
    },
    {
        path: 'datepicker',
        component: DatepickerComponent,
    },
    {
        path: 'cropper',
        component: CropperComponent,
    },
    {
        path: 'select',
        component: SelectComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
