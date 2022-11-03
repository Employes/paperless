import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
} from '@angular/core';
import { Components } from '@paperless/core';
import {
    ProxyCmp,
    proxyOutputs,
} from '../../../../stencil/angular-component-lib/utils';

export declare interface PToast extends Components.PToast {
    /**
     * Button click event
     */
    action: EventEmitter<CustomEvent<MouseEvent>>;
}

@ProxyCmp({
    defineCustomElementFn: undefined,
    inputs: [
        'actionIcon',
        'actionIconFlip',
        'actionIconRotate',
        'content',
        'enableAction',
        'header',
        'variant',
    ],
})
@Component({
    selector: 'p-toast',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '<ng-content></ng-content>',
    inputs: [
        'actionIcon',
        'actionIconFlip',
        'actionIconRotate',
        'content',
        'enableAction',
        'header',
        'variant',
    ],
})
export class Toast implements OnInit {
    @Input() delay: number | 'infinite' = 5000;
    @Input() index: number = 0;
    @Input() dismissOnAction: boolean = true;

    @Output() dismiss: EventEmitter<number> = new EventEmitter();

    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['action']);
    }

    ngOnInit(): void {
        if (this.dismissOnAction) {
            this.el.addEventListener('action', () => this.doDismiss());
        }

        if (this.delay === 'infinite' || this.delay === 0) {
            return;
        }

        setTimeout(() => this.doDismiss(), this.delay);
    }

    doDismiss() {
        this.dismiss.next(this.index);
    }
}
