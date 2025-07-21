const baseURL = import.meta.env.VITE_API_URL;
export interface Product {
	id: number;
	name: string;
	article: string;
	price: number;
	quantity: number;
}

export async function fetchProducts(page: number, limit: number): Promise<{ products: Product[], total: number }> {

	const res = await fetch(`${baseURL}/products?page=${page}&limit=${limit}`);

	if (!res.ok) throw new Error('Failed to fetch products');
	const json = await res.json();
	return {
		products: Array.isArray(json.products) ? json.products : [],
		total: typeof json.total === 'number' ? json.total : 0
	};
}

export async function addProduct(product: Omit<Product, 'id'>) {
	const res = await fetch(`${baseURL}/products`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product),
	});
	if (!res.ok) throw new Error('Failed to add product');
	return res.json();
}

export async function updateProduct(id: number, product: Omit<Product, 'id'>): Promise<void> {
	const res = await fetch(`${baseURL}/products/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product),
	});

	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message || 'Ошибка при обновлении товара');
	}
}


export async function deleteProduct(id: number) {
	const res = await fetch(`${baseURL}/products/${id}`, { method: 'DELETE' });
	if (!res.ok) throw new Error('Failed to delete product');
}
