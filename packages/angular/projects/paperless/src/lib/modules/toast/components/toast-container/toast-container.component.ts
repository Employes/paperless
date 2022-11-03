import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    NgZone,
} from '@angular/core';
import { Components } from '@paperless/core';
import { map } from 'rxjs';
import { SLIDE_IN_TOP_OUT_BOTTOM } from '../../../../animations';
import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';
import { ToastService } from '../../services/toast.service';

export declare interface PToastContainer extends Components.PToastContainer {
    placement: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
}

/* top-0 bottom-0 left-0 right-0 */
@ProxyCmp({
    defineCustomElementFn: undefined,
    inputs: ['placement'],
})
@Component({
    selector: 'p-toast-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './toast-container.component.html',
    inputs: ['placement'],
    animations: [SLIDE_IN_TOP_OUT_BOTTOM],
})
export class ToastContainer {
    public toasts$ = this._toastService.toasts$.pipe(
        map((arr) => arr.reverse())
    );

    protected el: HTMLElement;
    constructor(
        r: ElementRef,
        protected z: NgZone,
        private _toastService: ToastService
    ) {
        this.el = r.nativeElement;
    }

    dismiss(index: number) {
        this._toastService.hide(index);
    }
}
