import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.sevice';
import { TestModalComponent } from './test-modal.component';

@Component({
    templateUrl: 'modal.component.html',
})
export class ModalComponent {
    constructor(private _modal: ModalService) {}

    showModal() {
        this._modal.create({
            component: TestModalComponent,
        });
    }
}
