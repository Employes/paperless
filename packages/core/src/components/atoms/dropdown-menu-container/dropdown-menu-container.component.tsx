import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-dropdown-menu-container',
	styleUrl: 'dropdown-menu-container.component.scss',
	// shadow: true,
})
export class DropdownMenuContainer {
	/**
	 * Wether the container applies it's max width
	 */
	@Prop() maxWidth: boolean = true;

	/**
	 * Wether the container should all available space
	 */
	@Prop() fullWidth: boolean = true;

	/**
	 * Wether to allow overflow
	 */
	@Prop() allowOverflow: boolean = false;

	/**
	 * Wether the container should be scrollable when the threshold is met.
	 */
	@Prop() scrollable: boolean | 'default' | 'large' | 'xlarge' = false;

	render() {
		return (
			<Host
				class={`p-dropdown-menu-container ${
					this.maxWidth && 'max-width'
				} ${this.fullWidth && 'full-width'} ${!this.allowOverflow && 'no-overflow'} ${
					!!this.scrollable && 'scrollable'
				} ${this.scrollable === 'large' ? 'scrollable-large' : ''} ${this.scrollable === 'xlarge' ? 'scrollable-xlarge' : ''}`}
			>
				<div class="content">
					<slot />
				</div>
			</Host>
		);
	}
}
