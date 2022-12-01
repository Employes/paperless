import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OverlayService } from '../services/overlay.service';

/**
 * Using a modal, dialog (Tooltip, OverflowMenu), or any other component that draws out of the normal page flow
 * in your application *requires* this component (`ibm-placeholder`).
 * It would generally be placed near the end of your root app component template
 * (app.component.ts or app.component.html) as:
 *
 * ```
 * <ibm-placeholder></ibm-placeholder>
 * ```
 */
@Component({
    selector: 'p-overlay-container-ngx',
    template: ``,
})
export class OverlayComponent implements OnInit {
    /**
     * Creates an instance of `Placeholder`.
     */
    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _placeholder: OverlayService
    ) {}

    /**
     * Registers the components view with `PlaceholderService`
     */
    ngOnInit() {
        // TODO use `id` to register with the placeholderService
        this._placeholder.registerViewContainerRef(this._viewContainerRef);
    }
}
