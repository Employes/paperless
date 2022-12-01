import { ComponentRef, Injectable } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { BaseModalComponent } from '../features/modal/base-modal.component';
import { OverlayService } from './overlay.service';

/**
 * Modal service handles instantiating and destroying modal instances.
 * Uses PlaceholderService to track open instances, and for it's placeholder view reference.
 */
@Injectable()
export class ModalService {
    protected static modalList: Array<ComponentRef<any>> = [];

    constructor(private _overlayService: OverlayService) {}

    create<T>(data: {
        component: any;
        inputs?: any;
    }): ComponentRef<any> | undefined {
        let defaults = { inputs: {} };
        data = Object.assign({}, defaults, data);

        let focusedElement = document.activeElement as HTMLElement;

        let component = this._overlayService.createComponent(
            BaseModalComponent
        ) as any;
        component.instance.component = data.component;

        component['previouslyFocusedElement'] = focusedElement; // used to return focus to previously focused element

        component.onDestroy(() => {
            focusedElement.focus();
        });

        const index = ModalService.modalList.push(component) - 1;

        const subscription = component.instance.close$
            .pipe(
                // trigger the close animation
                tap(() => (component.instance.hide = false)),
                // delay closing by an arbitrary amount to allow the animation to finish
                delay(150)
            )
            .subscribe(() => {
                this.destroy(index);
                subscription.unsubscribe();
            });

        return component;
    }

    destroy(index = -1) {
        if (
            index >= ModalService.modalList.length ||
            ModalService.modalList.length === 0
        ) {
            return;
        }

        if (index < 0) {
            index = ModalService.modalList.length - 1;
        }

        this._overlayService.destroyComponent(ModalService.modalList[index]);
        ModalService.modalList.splice(index, 1);
    }
}
