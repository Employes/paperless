import { Component } from '@angular/core';
import { OverlayRef } from 'projects/paperless/src/public-api';

@Component({
    template: `
        <p-modal [show]="true" header="Hello world" (closed)="close()">
            <div slot="content">Content</div>
            <div slot="footer" class="flex justify-between w-full gap-4">
                <p-button class="w-full desktop-xs:w-auto ml-auto">
                    Confirm
                </p-button>
            </div>
        </p-modal>
    `,
})
export class TestModalComponent {
    constructor(public _overlayRef: OverlayRef<TestModalComponent>) {}

    close() {
        this._overlayRef.close();
    }
}
