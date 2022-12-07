import { Component } from '@angular/core';
import { OverlayRef } from 'projects/paperless/src/public-api';

@Component({
    template: `
        <p-drawer header="Drawer header" [show]="true" (closed)="close()">
            <div slot="content">
                <span>Content</span>
                <div class="h-[300vh]"></div>
                <span>The end!</span>
            </div>
        </p-drawer>
    `,
})
export class TestDrawerComponent {
    constructor(public _overlayRef: OverlayRef) {}

    close() {
        this._overlayRef.close();
    }
}
