import { Component, Host, Prop, h } from '@stencil/core';

@Component({
	tag: 'p-floating-menu-container',
	styleUrl: 'floating-menu-container.component.scss',
	shadow: true,
})
export class FloatingMenuContainer {
	/**
	 * Weather the container is used in the table
	 */
	@Prop() usedInTable: boolean = false;

	render() {
		return (
			<Host class="p-floating-menu-container">
				{this.usedInTable ? (
					<slot name="floating-menu-item" />
				) : (
					<slot />
				)}
			</Host>
		);
	}
}
