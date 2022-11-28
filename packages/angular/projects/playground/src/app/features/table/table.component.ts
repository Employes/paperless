import { Component } from '@angular/core';

@Component({
    templateUrl: 'table.component.html',
})
export class TableComponent {
    public items = JSON.parse(
        '[{"date":"01/01/2022","hours":8,"status":"Ingediend", "canSelect": true},{"date":"02/01/2022","hours":6.5,"status":"Ingediend", "canSelect": true},{"date":"03/01/2022","hours":8,"status":"Goedgekeurd", "canSelect": true},{"date":"08/01/2022","hours":8,"status":"Goedgekeurd", "canSelect": true},{"date":"09/01/2022","hours":8,"status":"Afgekeurd", "canSelect": true},{"date":"10/01/2022","hours":8,"status":"Afgekeurd", "canSelect": true}]'
    );
}
