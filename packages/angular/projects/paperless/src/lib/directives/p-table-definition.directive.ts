import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    NgZone,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Components, TableDefinitionTemplateFuncData } from '@paperless/core';
import { ProxyCmp, proxyOutputs } from '../stencil/angular-component-lib/utils';

export declare interface PTableDefinition extends Components.PTableDefinition {
    /**
     * Event to let the table know it has to re render
     */
    tableDefinitionChanged: EventEmitter<CustomEvent<boolean>>;
}

@ProxyCmp({
    defineCustomElementFn: undefined,
    inputs: ['align', 'name', 'path', 'sizes', 'type', 'template'],
})
@Component({
    selector: 'p-table-definition',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: '',
    inputs: ['align', 'name', 'path', 'sizes', 'type'],
})
export class PTableDefinition implements OnInit {
    protected el: HTMLElement;

    @ContentChild(TemplateRef, { static: false })
    templateRef?: TemplateRef<any>;

    constructor(
        c: ChangeDetectorRef,
        r: ElementRef,
        protected z: NgZone,
        private _vc: ViewContainerRef
    ) {
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['tableDefinitionChanged']);
    }

    ngOnInit() {
        console.log('Ng On Init');
        console.log(this.templateRef);
        console.log(
            this.templateRef
                ? this._vc.createEmbeddedView(this.templateRef, {
                      value: 'test',
                      item: { value: 'test' },
                      index: 123,
                  })
                : null
        );
    }

    template(data: TableDefinitionTemplateFuncData) {
        if (!this.templateRef) {
            return;
        }

        return this._vc.createEmbeddedView(this.templateRef, data);
    }
}
