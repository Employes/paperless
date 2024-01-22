import { newSpecPage } from '@stencil/core/testing';
import { PageSizeSelect } from '../page-size-select.component';

describe('p-page-size-select', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [PageSizeSelect],
			html: '<p-page-size-select></p-page-size-select>',
		});
		expect(root).toEqualHtml(`
      <p-page-size-select class="p-page-size-select">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-page-size-select>
    `);
	});
});
