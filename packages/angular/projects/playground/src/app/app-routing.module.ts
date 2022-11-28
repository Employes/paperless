import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawerComponent } from './features/drawer/modal.component';
import { HomeComponent } from './features/home/home.component';
import { ModalComponent } from './features/modal/modal.component';
import { TableComponent } from './features/table/table.component';
import { ToastComponent } from './features/toast/toast.component';

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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
