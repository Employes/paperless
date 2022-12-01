import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class OverlayService {
    protected viewContainerRef!: ViewContainerRef;

    registerViewContainerRef(vcRef: ViewContainerRef): void {
        this.viewContainerRef = vcRef;
    }

    createComponent(
        component: any,
        children?: any[]
    ): ComponentRef<any> | undefined {
        return this.viewContainerRef.createComponent(component, {
            projectableNodes: children,
        });
    }

    destroyComponent(component: ComponentRef<any>) {
        component.destroy();
    }

    hasComponentRef(component: ComponentRef<any>) {
        return !(this.viewContainerRef.indexOf(component.hostView) < 0);
    }

    hasPlaceholderRef() {
        return !!this.viewContainerRef;
    }

    appendElement(element: HTMLElement): HTMLElement {
        return this.viewContainerRef.element.nativeElement.appendChild(element);
    }

    removeElement(element: HTMLElement): HTMLElement {
        return this.viewContainerRef.element.nativeElement.removeChild(element);
    }

    hasElement(element: HTMLElement): boolean {
        return this.viewContainerRef.element.nativeElement.contains(element);
    }
}
