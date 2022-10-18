import { newSpecPage } from '@stencil/core/testing';
import { TableBody } from '../table-body.component';

describe('p-table-body', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [TableBody],
            html: '<p-table-body></p-table-body>',
        });
        expect(root).toEqualHtml(`
      <p-table-body class="p-table-body">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-table-body>
    `);
    });
});
