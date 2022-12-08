import { OverlayRef as CDKOverlayRef } from '@angular/cdk/overlay';

export class OverlayRef<T> {
    public instance!: T;

    constructor(private _overlay: CDKOverlayRef) {}

    close(): void {
        this._overlay.dispose();
    }
}
