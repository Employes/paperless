import { newSpecPage } from '@stencil/core/testing';
import { Divider } from '../divider.component';

describe('p-status', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [Divider],
            html: '<p-status></p-status>',
        });
        expect(root).toEqualHtml(`
      <p-status class="p-status">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-status>
    `);
    });
});
