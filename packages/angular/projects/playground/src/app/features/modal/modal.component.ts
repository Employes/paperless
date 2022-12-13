import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { OverlayRef, OverlayService } from 'projects/paperless/src/public-api';
import { TestModalComponent } from './test-modal.component';

@Component({
    templateUrl: 'modal.component.html',
})
export class ModalComponent {
    private _templateModalRef!: OverlayRef<CdkPortal>;

    constructor(private _overlay: OverlayService) {}

    showModal() {
        this._overlay.open<TestModalComponent>(TestModalComponent);
    }

    showTemplateModal(template: TemplatePortal) {
        this._templateModalRef = this._overlay.open(template);
    }

    closeTemplateModal() {
        if (!this._templateModalRef) {
            return;
        }

        this._templateModalRef.close();
    }
}
