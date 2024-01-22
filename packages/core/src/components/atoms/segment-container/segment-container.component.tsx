import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-segment-container',
	styleUrl: 'segment-container.component.scss',
})
export class SegmentContainer {
	render() {
		return (
			<Host class="p-segment-container">
				<slot />
			</Host>
		);
	}
}
