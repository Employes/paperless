import { Component } from '@angular/core';
import { ToastService, ToastVariants } from 'projects/paperless/src/public-api';

@Component({
    templateUrl: 'toast.component.html',
})
export class ToastComponent {
    public variants = {
        positive: ToastVariants.Positive,
        unbiased: ToastVariants.Unbiased,
        negative: ToastVariants.Negative,
    };

    constructor(private _toast: ToastService) {}

    showToast(variant: ToastVariants) {
        this._toast.show(variant, 'This is a toast message', variant);
    }
}
