import { newE2EPage } from '@stencil/core/testing';

describe('p-pagination-item', () => {
	it('renders', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-pagination-item>#</p-pagination-item>');
		const element = await page.find('p-pagination-item');
		expect(element).toHaveClass('hydrated');
	});

	it('renders changes to the content', async () => {
		const page = await newE2EPage();

		await page.setContent('<p-pagination-item>1</p-pagination-item>');
		// const component = await page.find('p-button');
		const element = await page.find('p-pagination-item');
		expect(element.textContent).toEqual(`1`);

		// component.setProperty('name', 'World');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, World!`);

		// component.setProperty('name', 'Bob');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Bob!`);

		// component.setProperty('name', 'Earl');
		// await page.waitForChanges();
		// expect(element.textContent).toEqual(`Hello, Earl!`);
	});
});
