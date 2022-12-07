import {
    Overlay,
    OverlayConfig,
    OverlayRef as CDKOverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
    ComponentRef,
    Injectable,
    Injector,
    StaticProvider,
} from '@angular/core';
import { OverlayRef } from '../overlay.ref';

interface ModalOptions {
    providers?: StaticProvider[];
}

@Injectable()
export class OverlayService {
    public overlayRef!: OverlayRef;
    constructor(private injector: Injector, private overlay: Overlay) {}

    open<T>(
        component: ComponentType<T> | CdkPortal,
        options: ModalOptions = {}
    ) {
        const overlay = this.createOverlay();
        const overlayRef = new OverlayRef(overlay);

        this.attachModalContainer<T>(
            overlay,
            overlayRef,
            component,
            options.providers ?? []
        );

        this.overlayRef = overlayRef;
        return overlayRef;
    }

    // tslint:disable-next-line:max-line-length
    private attachModalContainer<T>(
        overlay: CDKOverlayRef,
        overlayRef: OverlayRef,
        component: ComponentType<T> | CdkPortal,
        providers: StaticProvider[]
    ) {
        const injector = this.createInjector(overlayRef, providers);

        const containerPortal =
            component instanceof CdkPortal
                ? component
                : new ComponentPortal(component, null, injector);
        const containerRef: ComponentRef<T> = overlay.attach(containerPortal);
        return containerRef.instance;
    }

    private createInjector(
        overlayRef: OverlayRef,
        providers: StaticProvider[]
    ): Injector {
        return Injector.create({
            providers: [
                {
                    provide: OverlayRef,
                    useValue: overlayRef,
                },
                ...providers,
            ],
            parent: this.injector,
        });
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy,
        });

        return overlayConfig;
    }

    private createOverlay() {
        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig();

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }
}
