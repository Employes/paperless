import { Component, h, Host, Prop } from '@stencil/core';
import { IconVariant } from '../../atoms/icon/icon.component';

@Component({
	tag: 'p-navigation-item',
	styleUrl: 'navigation-item.component.scss',
	shadow: true,
})
export class NavigationItem {
	/**
	 * Wether the navigation item is active
	 */
	@Prop() active: boolean = false;

	/**
	 * Loading
	 */
	@Prop() loading: boolean = false;

	/**
	 * Icon of the navigation item
	 */
	@Prop() icon: IconVariant;

	/**
	 * The icon position
	 */
	@Prop() iconPosition: 'start' | 'end' = 'start';

	/**
	 * Icon of the navigation item
	 */
	@Prop() counter: number | string;

	/**
	 * The href of the navigation item
	 */
	@Prop() href: string;

	/**
	 * The target of the navigation item
	 */
	@Prop() target: string;

	render() {
		return (
			<Host class={`p-navigation-item ${this.active && 'active'}`}>
				<a
					href={this.href}
					target={this.target}
				>
					{this.icon && this.iconPosition == 'start' && (
						<p-icon variant={this.icon} />
					)}

					<span class={this.counter && 'has-counter'}>
						<slot />
					</span>

					{!!this.counter && this.counter !== '0' && !this.loading && (
						<p-counter variant='negative'>{this.counter}</p-counter>
					)}

					{this.icon && this.iconPosition == 'end' && !this.loading && (
						<p-icon variant={this.icon} />
					)}

					{this.loading && <p-loader />}
				</a>
			</Host>
		);
	}
}
