import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    template: `
        <p-modal
            header="Modal header"
            [show]="true"
            (close)="close$.next($event)"
        >
            <ng-container #modal></ng-container>
        </p-modal>
    `,
})
export class BaseModalComponent implements OnInit {
    protected close$ = new Subject();

    @ViewChild('modal', { read: ViewContainerRef, static: true })
    public viewContainerRef!: ViewContainerRef;

    public component: any;

    constructor() {}

    ngOnInit() {
        console.log(this.component);
        this.viewContainerRef.createComponent(this.component);
    }
}
