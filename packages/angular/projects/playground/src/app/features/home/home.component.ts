import {
    AfterViewInit,
    Component,
    ContentChild,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    templateUrl: 'home.component.html',
})
export class HomeComponent implements AfterViewInit {
    public show = true;
    public text = 'content';

    @ViewChild('modal', { read: ViewContainerRef, static: true })
    public viewContainerRef!: ViewContainerRef;

    @ContentChild('testTemplate', {
        read: TemplateRef,
        static: true,
    })
    public testTemplateRef!: TemplateRef<any>;

    ngAfterViewInit() {
        setTimeout(() => (this.text = 'content but changed'), 2000);

        this.viewContainerRef.createEmbeddedView(this.testTemplateRef);
    }
}
