import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	NgZone,
	Output,
} from '@angular/core';
import { Components, RowClickEvent } from '@paperless/core';
import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';

export interface TableRowActionClickEvent {
	item?: any;
	items?: any[];
	multi: boolean;
	ctrlDown: boolean;
}
export declare interface TableRowAction
	extends Omit<Components.PTableRowAction, 'action'> {
	action: EventEmitter<TableRowActionClickEvent>;
}

@ProxyCmp({
	inputs: [
		'disabled',
		'icon',
		'iconFlip',
		'iconOnly',
		'iconRotate',
		'label',
		'type',
	],
})
@Component({
	selector: 'p-table-row-action',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
	// eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
	inputs: [
		'disabled',
		'icon',
		'iconFlip',
		'iconOnly',
		'iconRotate',
		'label',
		'type',
	],
})
export class TableRowAction {
	protected el: HTMLElement;

	/**
	 * Event whenever a row is clicked
	 */
	@Output() action: EventEmitter<TableRowActionClickEvent> =
		new EventEmitter();

	constructor(
		c: ChangeDetectorRef,
		r: ElementRef,
		protected z: NgZone
	) {
		c.detach();
		this.el = r.nativeElement;
	}
}
