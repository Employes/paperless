import { Component } from '@angular/core';

@Component({
    template: `
        <div slot="content">Content</div>
        <div slot="footer" class="flex justify-between w-full gap-4">
            <p-button class="w-full desktop-xs:w-auto ml-auto">
                Confirm
            </p-button>
        </div>
    `,
})
export class TestModalComponent {}
