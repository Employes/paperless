import { Directive, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    selector: 'p-toast',
    host: {
        '(action)': 'onAction()',
    },
})
export class ToastDirective {
    @Input() delay: number | 'infinite' = 5000;
    @Input() index: number = 0;
    @Input() dismissOnAction: boolean = true;

    @Output() dismiss: EventEmitter<number> = new EventEmitter();

    ngOnInit(): void {
        if (this.delay === 'infinite' || this.delay === 0) {
            return;
        }

        setTimeout(() => this.doDismiss(), this.delay);
    }

    onAction() {
        if (this.dismissOnAction) {
            this.doDismiss();
        }
    }

    doDismiss() {
        this.dismiss.next(this.index);
    }
}
