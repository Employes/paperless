import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-floating-menu-item',
	styleUrl: 'floating-menu-item.component.scss',
	shadow: true,
})
export class FloatingMenuItem {
	/**
	 * Wether it should have a hover effect
	 */
	@Prop({ reflect: true }) hover: boolean = true;

	render() {
		return (
			<Host class="p-floating-menu-item">
				<slot />
			</Host>
		);
	}
}
