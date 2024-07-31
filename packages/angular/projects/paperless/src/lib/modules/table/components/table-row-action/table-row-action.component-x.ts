import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	ElementRef,
	Input,
	NgZone,
	TemplateRef,
} from '@angular/core';
import { Components, RotateOptions } from '@paperless/core';
import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';
import {
	IconFlipOptions,
	IconVariant,
	TableRowActionFunc,
} from '@paperless/core/loader';

export declare interface PTableRowAction extends Components.PTableRowAction {}

@ProxyCmp({
	defineCustomElementFn: undefined,
	inputs: [
		'type',
		'icon',
		'iconOnly',
		'iconFlip',
		'iconRotate',
		'action',
		'disabled',
	],
})
@Component({
	selector: 'p-table-row-action',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content></ng-content>',
})
export class TableRowAction {
	protected el: HTMLElement;

	/**
	 * The type of action
	 * mutli = Only multi select action
	 * single = Only an action on the row
	 * both = Action on both locations
	 */
	@Input() type: 'both' | 'single' | 'multi' = 'both';

	/**
	 * Icon to show on the button
	 */
	@Input() icon!: IconVariant;

	/**
	 * Wether the button is icon only
	 */
	@Input() iconOnly: boolean = false;

	/**
	 * Icon flip
	 */
	@Input() iconFlip?: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Input() iconRotate?: RotateOptions;

	/**
	 * Label of the action
	 */
	@Input() label?: string;

	/**
	 * The action to trigger when used
	 */
	@Input() action?: TableRowActionFunc;

	/**
	 * Wether the action is disabled
	 */
	@Input() disabled: boolean = false;

	@ContentChild(TemplateRef, {
		read: TemplateRef,
		static: true,
	})
	public template: TemplateRef<any> | undefined;

	constructor(
		c: ChangeDetectorRef,
		r: ElementRef,
		protected z: NgZone
	) {
		c.detach();
		console.log('???');
		this.el = r.nativeElement;
	}
}
