import { newSpecPage } from '@stencil/core/testing';
import { TableColumn } from '../table-column.component';

describe('p-table-column', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [TableColumn],
            html: '<p-table-column></p-table-column>',
        });
        expect(root).toEqualHtml(`
      <p-table-column class="p-table-column">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-column>
    `);
    });
});
