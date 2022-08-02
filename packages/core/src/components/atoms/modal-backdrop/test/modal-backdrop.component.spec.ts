import { newSpecPage } from '@stencil/core/testing';
import { ModalBackdrop } from '../modal-backdrop.component';

describe('p-modal-backdrop', () => {
    it('renders', async () => {
        const { root } = await newSpecPage({
            components: [ModalBackdrop],
            html: '<p-modal-backdrop></p-modal-backdrop>',
        });
        expect(root).toEqualHtml(`
      <p-modal-backdrop class="p-modal-backdrop">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-modal-backdrop>
    `);
    });
});
