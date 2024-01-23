
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService, ToastVariants } from 'projects/paperless/src/public-api';

@Component({
    templateUrl: 'select.component.html',
})
export class SelectComponent {
    public form = new FormGroup({
        single: new FormControl(null),
        multi: new FormControl([])
    })
}
