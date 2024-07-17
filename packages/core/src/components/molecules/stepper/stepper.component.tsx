import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
	tag: 'p-stepper',
	styleUrl: 'stepper.component.scss',
	shadow: true,
})
export class Stepper {
	/**
	 * The currently active step
	 */
	@Prop() activeStep: number = 1;

	/**
	 * The direction of the stepper
	 */
	@Prop({ reflect: true }) direction: 'horizontal' | 'vertical' =
		'horizontal';

	/**
	 * The position of the content in case of vertical direction
	 */
	@Prop({ reflect: true }) contentPosition: 'start' | 'end' = 'end';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _rendering = false;

	private _loaded = false;

	// private _steps: Array<HTMLPStepperItemElement>;

	private _onSlotChange = (_e: Event) => this._generateSteps();

	private _generateSteps = async (firstLoad = false) => {
		if (!firstLoad && (!this._el || this._rendering || !this._loaded)) {
			return;
		}

		console.log('Start rendering');

		this._rendering = true;

		let activeStep = this.activeStep - 1 || 0;
		const items = this._el.querySelectorAll('p-stepper-item');

		if (!this.activeStep || activeStep < 0) {
			for (let i = 0; i < items?.length; i++) {
				const item = items.item(i) as any;

				if (item.active) {
					activeStep = i;
				}

				if (activeStep < 0 && item.finished) {
					activeStep = i + 1;
				}
			}
		}

		for (let i = 0; i < items?.length; i++) {
			let directionChanged = false;
			const item = items.item(i) as any;

			item.active = i === activeStep;
			item.finished = i < activeStep;

			if (item.direction !== this.direction) {
				directionChanged = true;
			}

			item.direction = this.direction;
			item.align =
				i === 0 ? 'start' : i === items?.length - 1 ? 'end' : 'center';
			item.contentPosition = this.contentPosition;

			if (i < items.length - 1) {
				const nextItem = item.nextElementSibling;

				if (
					nextItem &&
					nextItem.tagName.toLowerCase() === 'p-stepper-item'
				) {
					// super hacky, but we want to wait for the css of the `item.direction` change to be applied before querying for the item.clientHeight
					// otherwise we always get the initial "16"
					if (directionChanged) {
						await new Promise((resolve) => setTimeout(resolve, 10));
					}

					const heightDiff =
						(item.clientHeight > 16
							? item.clientHeight - 16
							: item.clientHeight) / 2;

					const stepperLine =
						document.createElement('p-stepper-line');

					stepperLine.direction = this.direction;
					stepperLine.active = i <= activeStep;

					if (heightDiff > 0 && this.direction === 'vertical') {
						stepperLine.style.marginTop = `-${heightDiff / 16}rem`;
						stepperLine.style.marginBottom = `-${
							heightDiff / 16
						}rem`;
						stepperLine.style.minHeight = `calc(1rem + ${
							(heightDiff * 2) / 16
						}rem)`;
					}

					this._el.insertBefore(stepperLine, nextItem);

					const previous = stepperLine.previousElementSibling;
					if (
						previous &&
						previous.tagName.toLowerCase() === 'p-stepper-line'
					) {
						previous.remove();
					}

					continue;
				}
			}

			if (i > 0) {
				const previousItem = item.previousElementSibling;
				if (previousItem.tagName.toLowerCase() === 'p-stepper-line') {
					previousItem.direction = this.direction;
					previousItem.active = item.active || item.finished;
				}
			}
		}

		const lines = this._el.querySelectorAll(
			'p-stepper-line + p-stepper-line, p-stepper-line:not(:has(+ p-stepper-item))'
		);
		for (let j = lines.length - 1; j >= 0; j--) {
			const line = lines.item(j);
			line.remove();
		}

		console.log('Done rendering');
		setTimeout(() => (this._rendering = false), 100);
	};

	componentDidLoad() {
		this._loaded = true;
		this._generateSteps(true);
	}

	render() {
		return (
			<Host class="p-stepper">
				<slot onSlotchange={this._onSlotChange} />
			</Host>
		);
	}

	@Watch('activeStep')
	protected _onActiveStepChange() {
		this._generateSteps();
	}
}
