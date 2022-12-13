import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { OverlayRef, OverlayService } from 'projects/paperless/src/public-api';
import { TestDrawerComponent } from './test-drawer.component';

@Component({
    templateUrl: 'drawer.component.html',
})
export class DrawerComponent {
    private _templateDrawerRef!: OverlayRef<CdkPortal>;

    constructor(private _overlay: OverlayService) {}

    showDrawer() {
        this._overlay.open<TestDrawerComponent>(TestDrawerComponent);
    }

    showTemplateDrawer(template: TemplatePortal) {
        this._templateDrawerRef = this._overlay.open(template);
    }

    closeTemplateDrawer() {
        if (!this._templateDrawerRef) {
            return;
        }

        this._templateDrawerRef.close();
    }
}
