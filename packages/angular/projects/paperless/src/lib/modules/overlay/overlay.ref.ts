import { OverlayRef as CDKOverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class OverlayRef<T> {
    public instance!: T;
    public closed$ = new Subject();

    constructor(private _overlay: CDKOverlayRef) {}

    close(): void {
        this._overlay.dispose();
        this.closed$.next(null);
    }
}
