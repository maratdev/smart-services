import { AppDataSource } from '../../utils/data-source';
import { Product } from '../../entity/Product';

async function seedProducts() {
	const dataSource = await AppDataSource.initialize();

	const productRepo = dataSource.getRepository(Product);

	const products = [
		{ name: 'Проводные наушники Logitech', article: 'GP-405', price: 5656, quantity: 20 },
		{ name: 'Беспроводная мышь Logitech M185', article: 'LG-M185', price: 1299, quantity: 35 },
		{ name: 'Механическая клавиатура Redragon', article: 'RD-K552', price: 3790, quantity: 15 },
		{ name: 'Игровой коврик A4Tech X7', article: 'A4-X7', price: 790, quantity: 50 },
		{ name: 'Веб-камера Logitech C920', article: 'LG-C920', price: 8590, quantity: 10 },
		{ name: 'USB-хаб Orico 4 порта', article: 'OR-4USB', price: 990, quantity: 25 },
		{ name: 'Колонки Edifier R980T', article: 'ED-R980T', price: 5890, quantity: 8 },
		{ name: 'Внешний SSD Samsung T7 500GB', article: 'SM-T7500', price: 6990, quantity: 12 },
		{ name: 'Беспроводные наушники JBL Tune 510BT', article: 'JBL-510BT', price: 3799, quantity: 18 },
		{ name: 'Монитор Philips 24" Full HD', article: 'PH-24FHD', price: 11200, quantity: 7 },
	];

	for (const product of products) {
		const exists = await productRepo.findOne({ where: { article: product.article } });

		if (!exists) {
			await productRepo.save(product);
		}
	}

	await dataSource.destroy();
}

seedProducts().catch(err => {
	process.exit(1);
});
