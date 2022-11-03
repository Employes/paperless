import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    ToastData,
    ToastOptions,
    ToastVariants,
} from '../components/toast-container/types';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private _toasts: ToastData[] = [];
    public toasts$ = new BehaviorSubject(this._toasts);

    public defaultOptions: ToastOptions = {
        delay: 5000,
        dismissOnAction: true,

        enableAction: true,

        icon: {
            variant: 'negative',
        },
    };

    show(
        header: string,
        content: string,
        variant: ToastVariants = ToastVariants.Success,
        options: ToastOptions = {}
    ) {
        options = {
            ...options,
            ...this.defaultOptions,
            icon: options?.icon
                ? { ...options.icon, ...this.defaultOptions.icon }
                : this.defaultOptions.icon,
        };

        this._toasts.push({
            header,
            content,
            variant,
            options,
        });
        this.toasts$.next(this._toasts);
    }

    hide(index: number) {
        this._toasts.splice(index, 1);
        this.toasts$.next(this._toasts);
    }
}
