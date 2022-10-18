import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';

@Component({
    template: ``,
})
export abstract class BaseUploadComponent {
    @Input() fileId?: string;
    @Input() uploaded = false;
    @Input()
    set loading(value: boolean) {
        this._loading = value;
    }
    get loading() {
        return this._loading;
    }

    @Output() fileChange = new EventEmitter<any>();

    @ViewChild('uploaderInput') uploaderInput?: ElementRef;
    public file?: File;

    private _loading = false;

    onChange($event: Event) {
        const target = $event.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            this._loading = true;

            const reader = new FileReader();
            reader.onload = (e: any) =>
                this.onLoad(file, e?.currentTarget?.result);
            reader.readAsDataURL(file);
        }
    }

    onLoad(file: File, result: string) {
        this.fileChange.next({
            fileId: this.fileId,
            result,
            file,
        });

        if (this.uploaderInput?.nativeElement) {
            this.uploaderInput.nativeElement.value = '';
        }

        this.file = file;
        this._loading = false;
    }
}
