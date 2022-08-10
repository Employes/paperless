import { newSpecPage } from '@stencil/core/testing';
import { Tag } from '../tag.component';

describe('p-tag', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [Tag],
            html: '<p-tag></p-tag>',
        });
        expect(root).toEqualHtml(`
      <p-tag class="p-tag">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-tag>
    `);
    });
});
