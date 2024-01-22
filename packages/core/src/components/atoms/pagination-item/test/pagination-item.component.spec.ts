import { newSpecPage } from '@stencil/core/testing';
import { PaginationItem } from '../pagination-item.component';

describe('p-counter', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [PaginationItem],
			html: '<p-pagination-item>#</p-pagination-item>',
		});
		expect(root).toEqualHtml(`
      <p-counter class="p-pagination-item">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-pagination-item>
    `);
	});
});
