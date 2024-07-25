import { Component, h, Host, Prop } from '@stencil/core';
import {
	isTableColumnSizesKey,
	TableColumnSizes,
	TableColumnSizesKey,
	TableDefinitionData,
	TableDefinitionTemplateFunc,
} from '../../../types';
import { objectGetByPath } from '../../../utils';
import { TableColumn } from '../../helpers/table-column/table-column.component';

@Component({
	tag: 'p-table-cell',
	styleUrl: 'table-cell.component.scss',
})
export class TableCell {
	/**
	 * The variant of the column
	 */
	@Prop() variant: 'default' | 'loading' | 'header' | 'actions' = 'default';

	/**
	 * The index of the column
	 */
	@Prop() index: number;

	/**
	 * The index of the row
	 */
	@Prop() rowIndex: number;

	/**
	 * The definition of the table column
	 */
	@Prop() definition?: TableColumn;

	/**
	 * The item in question
	 */
	@Prop() item: any;

	/**
	 * The value of the column
	 */
	@Prop() value: any;

	/**
	 * Wether the table has actions
	 */
	@Prop() tableHasActions: boolean = false;

	/**
	 * The checkbox to show
	 */
	@Prop() checkbox: any;

	/**
	 * The template to show
	 */
	@Prop() template: TableDefinitionTemplateFunc = ({
		value,
	}: TableDefinitionData) => value;

	get data(): TableDefinitionData | { value: string } {
		if (this.variant === 'header') {
			return {
				value: this.value,
			};
		}

		return {
			value:
				this.value ?? objectGetByPath(this.item, this.definition.path),
			item: this.item,
			index: this.index,
			rowIndex: this.rowIndex,
		};
	}

	render() {
		return (
			<Host
				class={{
					'p-table-cell': true,
					[`variant-${this.variant}`]: true,
					...this._getColumnClasses(),
				}}
			>
				{this.checkbox}

				{this._getContent()}
			</Host>
		);
	}

	private _getContent() {
		if (this.variant === 'loading') {
			return (
				<p-loader variant="ghost" class="h-6 w-full flex-1 rounded" />
			);
		}

		if (this.variant === 'actions') {
			return <slot name="actions"></slot>;
		}

		return (
			<div
				class={{
					flex: true,
					'justify-start': this.definition.align === 'start',
					'justify-center': this.definition.align === 'center',
					'justify-end': this.definition.align === 'end',
				}}
			>
				{this.variant === 'header' ? (
					this.data.value
				) : this.definition.useSlot ? (
					<slot />
				) : (
					this.template(this.data as TableDefinitionData)
				)}
			</div>
		);
	}

	private _getColumnClasses() {
		const sizes = this.definition ? this._getSizes(this.definition) : {};
		return {
			'justify-start':
				!this.definition?.align || this.definition?.align === 'start',
			'justify-center': this.definition?.align === 'center',
			'justify-end': this.definition?.align === 'end',
			'font-semibold':
				this.variant !== 'header' && this.definition?.type === 'th',
			'text-storm-dark':
				this.variant !== 'header' && this.definition?.type === 'th',
			'pr-4': this.definition.isLast === false,
			'group-hover:hidden':
				this.definition.isLast &&
				this.tableHasActions &&
				this.variant !== 'actions',
			'group-hover:flex':
				this.variant === 'actions' && this.tableHasActions,
			hidden: this.variant === 'actions' && this.tableHasActions,
			flex: this.variant !== 'actions',
			...sizes,
		};
	}

	/*
     With this, we shall hack the system in ways no one would ever have thought.

     <div class="w-1/12 w-2/12 w-3/12 w-4/12 w-5/12 w-6/12 w-7/12 w-8/12 w-9/12 w-10/12 w-11/12 w-12/12"></div>
     <div class="tablet:w-1/12 tablet:w-2/12 tablet:w-3/12 tablet:w-4/12 tablet:w-5/12 tablet:w-6/12 tablet:w-7/12 tablet:w-8/12 tablet:w-9/12 tablet:w-10/12 tablet:w-11/12 tablet:w-12/12"></div>
     <div class="desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12"></div>
     <div class="desktop-xs:w-1/12 desktop-xs:w-2/12 desktop-xs:w-3/12 desktop-xs:w-4/12 desktop-xs:w-5/12 desktop-xs:w-6/12 desktop-xs:w-7/12 desktop-xs:w-8/12 desktop-xs:w-9/12 desktop-xs:w-10/12 desktop-xs:w-11/12 desktop-xs:w-12/12"></div>
     <div class="desktop-sm:w-1/12 desktop-sm:w-2/12 desktop-sm:w-3/12 desktop-sm:w-4/12 desktop-sm:w-5/12 desktop-sm:w-6/12 desktop-sm:w-7/12 desktop-sm:w-8/12 desktop-sm:w-9/12 desktop-sm:w-10/12 desktop-sm:w-11/12 desktop-sm:w-12/12"></div>
     <div class="desktop:w-1/12 desktop:w-2/12 desktop:w-3/12 desktop:w-4/12 desktop:w-5/12 desktop:w-6/12 desktop:w-7/12 desktop:w-8/12 desktop:w-9/12 desktop:w-10/12 desktop:w-11/12 desktop:w-12/12"></div>
     <div class="desktop-lg:w-1/12 desktop-lg:w-2/12 desktop-lg:w-3/12 desktop-lg:w-4/12 desktop-lg:w-5/12 desktop-lg:w-6/12 desktop-lg:w-7/12 desktop-lg:w-8/12 desktop-lg:w-9/12 desktop-lg:w-10/12 desktop-lg:w-11/12 desktop-lg:w-12/12"></div>
     <div class="desktop-xl:w-1/12 desktop-xl:w-2/12 desktop-xl:w-3/12 desktop-xl:w-4/12 desktop-xl:w-5/12 desktop-xl:w-6/12 desktop-xl:w-7/12 desktop-xl:w-8/12 desktop-xl:w-9/12 desktop-xl:w-10/12 desktop-xl:w-11/12 desktop-xl:w-12/12"></div>


        ⠀⠀⠀⠀⠀⣠⣴⣶⣿⣿⠿⣷⣶⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣶⣷⠿⣿⣿⣶⣦⣀⠀⠀⠀⠀⠀
        ⠀⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣶⣦⣬⡉⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠚⢉⣥⣴⣾⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
        ⠀⠀⠀⡾⠿⠛⠛⠛⠛⠿⢿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⣿⣿⣿⣿⣿⠿⠿⠛⠛⠛⠛⠿⢧⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⣠⣤⠶⠶⠶⠰⠦⣤⣀⠀⠙⣷⠀⠀⠀⠀⠀⠀⠀⢠⡿⠋⢀⣀⣤⢴⠆⠲⠶⠶⣤⣄⠀⠀⠀⠀⠀⠀⠀
        ⠀⠘⣆⠀⠀⢠⣾⣫⣶⣾⣿⣿⣿⣿⣷⣯⣿⣦⠈⠃⡇⠀⠀⠀⠀⢸⠘⢁⣶⣿⣵⣾⣿⣿⣿⣿⣷⣦⣝⣷⡄⠀⠀⡰⠂⠀
        ⠀⠀⣨⣷⣶⣿⣧⣛⣛⠿⠿⣿⢿⣿⣿⣛⣿⡿⠀⠀⡇⠀⠀⠀⠀⢸⠀⠈⢿⣟⣛⠿⢿⡿⢿⢿⢿⣛⣫⣼⡿⣶⣾⣅⡀⠀
        ⢀⡼⠋⠁⠀⠀⠈⠉⠛⠛⠻⠟⠸⠛⠋⠉⠁⠀⠀⢸⡇⠀⠀⠄⠀⢸⡄⠀⠀⠈⠉⠙⠛⠃⠻⠛⠛⠛⠉⠁⠀⠀⠈⠙⢧⡀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⡇⢠⠀⠀⠀⢸⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⡇⠀⠀⠀⠀⢸⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠟⠁⣿⠇⠀⠀⠀⠀⢸⡇⠙⢿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠰⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣾⠖⡾⠁⠀⠀⣿⠀⠀⠀⠀⠀⠘⣿⠀⠀⠙⡇⢸⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠄⠀
        ⠀⠀⢻⣷⡦⣤⣤⣤⡴⠶⠿⠛⠉⠁⠀⢳⠀⢠⡀⢿⣀⠀⠀⠀⠀⣠⡟⢀⣀⢠⠇⠀⠈⠙⠛⠷⠶⢦⣤⣤⣤⢴⣾⡏⠀⠀
        ⠀⠀⠈⣿⣧⠙⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⢊⣙⠛⠒⠒⢛⣋⡚⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⡿⠁⣾⡿⠀⠀⠀
        ⠀⠀⠀⠘⣿⣇⠈⢿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⡿⢿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⡟⠁⣼⡿⠁⠀⠀⠀
        ⠀⠀⠀⠀⠘⣿⣦⠀⠻⣿⣷⣦⣤⣤⣶⣶⣶⣿⣿⣿⣿⠏⠀⠀⠻⣿⣿⣿⣿⣶⣶⣶⣦⣤⣴⣿⣿⠏⢀⣼⡿⠁⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠘⢿⣷⣄⠙⠻⠿⠿⠿⠿⠿⢿⣿⣿⣿⣁⣀⣀⣀⣀⣙⣿⣿⣿⠿⠿⠿⠿⠿⠿⠟⠁⣠⣿⡿⠁⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠈⠻⣯⠙⢦⣀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⣠⠴⢋⣾⠟⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠙⢧⡀⠈⠉⠒⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠐⠒⠉⠁⢀⡾⠃⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⣠⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⡀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⢀⡴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    */
	private _getSizes({ sizes }: TableColumn) {
		if (sizes === 'auto' || !sizes) {
			return {
				'w-auto': true,
			};
		}

		if (sizes === 'hidden') {
			return {
				hidden: true,
			};
		}

		if (typeof sizes === 'object') {
			sizes = sizes as TableColumnSizes;
			const classes: any = {};
			let previousSize: TableColumnSizesKey | undefined;

			for (let size in sizes) {
				if (!isTableColumnSizesKey(sizes, size)) {
					continue;
				}

				if (size === 'default') {
					if (sizes.default === 'hidden') {
						classes['hidden'] = true;
						previousSize = size;
						continue;
					}

					classes[`w-${sizes.default}/12`] = true;
					previousSize = size;
					continue;
				}

				const currentValue = sizes[size];
				const previousValue = previousSize ? sizes[previousSize] : null;
				if (
					currentValue !== 'hidden' &&
					previousValue &&
					previousValue === 'hidden'
				) {
					classes[`${size}:flex`] = true;
				}

				if (currentValue === 'hidden') {
					classes[`${size}:hidden`] = true;
					previousSize = size;
					continue;
				}

				if (currentValue === 12 || currentValue === 'full') {
					classes[`${size}:w-full`] = true;
				}

				classes[`${size}:w-${currentValue}/12`] = true;
				previousSize = size;
			}

			return classes;
		}

		if (sizes === 12 || sizes === 'full') {
			return {
				'w-full': true,
			};
		}

		// is a number.
		return {
			[`w-${sizes}/12`]: true,
		};
	}
}
