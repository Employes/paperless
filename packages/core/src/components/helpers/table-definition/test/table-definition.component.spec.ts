import { newSpecPage } from '@stencil/core/testing';
import { TableDefinition } from '../table-definition.component';

describe('p-table-definition', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [TableDefinition],
            html: '<p-table-definition>#</p-table-definition>',
        });
        expect(root).toEqualHtml(`
      <p-table-definition class="p-table-definition">
        <mock:shadow-root>
          #
        </mock:shadow-root>
      </p-table-definition>
    `);
    });
});
