import { OverlayRef as CDKOverlayRef } from '@angular/cdk/overlay';

export class OverlayRef {
    constructor(private _overlay: CDKOverlayRef) {}

    close(): void {
        this._overlay.dispose();
    }
}
