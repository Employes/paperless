import { Placement, Strategy } from '@floating-ui/dom';
import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-helper',
	styleUrl: 'helper.component.scss',
	shadow: true,
})
export class Helper {
	/**
	 * The strategy of the popover placement
	 */
	@Prop() strategy: Strategy = 'absolute';

	/**
	 * The placement of the helper popover
	 */
	@Prop() placement: Placement = 'top';

	render() {
		return (
			<Host class='p-helper'>
				<p-tooltip
					placement={this.placement}
					strategy={this.strategy}
				>
					<div slot='content'>
						<slot />
					</div>

					<div
						slot='trigger'
						class='helper'
					></div>
				</p-tooltip>
			</Host>
		);
	}
}
