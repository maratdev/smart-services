import {useEffect, useState} from 'react';
import {useForm} from '@mantine/form';
import '@mantine/core/styles.css';
import './App.css';
import {Button, Container, Group, MantineProvider, Paper, Table, Text, TextInput, Title} from '@mantine/core';
import {addProduct, deleteProduct, fetchProducts, updateProduct} from './api/products';

interface Product {
	id: number;
	name: string;
	article: string;
	price: number;
	quantity: number;
}

function App() {

	const [products, setProducts] = useState<Product[]>([]);
	const [editId, setEditId] = useState<number | null>(null);
	const [page, setPage] = useState(1);
	const [error, setError] = useState<string | null>(null);
	const pageSize = 5;
	const [total, setTotal] = useState(0);
	const totalPages = Math.ceil(total / pageSize);

	const loadProducts = async () => {
		try {
			const data = await fetchProducts(page, pageSize);
			setProducts(data.products);
			setTotal(data.total);
		} catch (e: any) {
			setError(e.message);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			await loadProducts();
		};
		fetchData();
	}, [page]);

	const handleDelete = async (id: number) => {
		try {
			await deleteProduct(id);
			await loadProducts();
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleEdit = (product: Product) => {
		form.setValues({
			name: product.name,
			article: product.article,
			price: product.price.toString(),
			quantity: product.quantity.toString(),
		});
		setEditId(product.id);
	};

	const handleSubmit = async (values: typeof form.values) => {
		try {
			const payload = {
				name: values.name,
				article: values.article,
				price: Number(values.price),
				quantity: Number(values.quantity),
			};

			if (editId === null) {
				await addProduct(payload);
			} else {
				await updateProduct(editId, payload); //
				setEditId(null);
			}

			form.reset();
			await loadProducts();
		} catch (error: any) {
			setError(error.message);
		}
	};


	const form = useForm({
		initialValues: {
			name: '',
			article: '',
			price: '',
			quantity: '',
		},

		validate: {
			name: (value) => (value.trim().length === 0 ? 'Введите название' : null),
			article: (value) => {
				const isDuplicate = products.some(
					(p) => p.article === value && p.id !== editId
				);
				return isDuplicate ? 'Артикул уже существует' : null;
			},
			price: (value) =>
				isNaN(Number(value)) || Number(value) < 0
					? 'Цена должна быть неотрицательным числом'
					: null,
			quantity: (value) =>
				!Number.isInteger(Number(value)) || Number(value) < 0
					? 'Количество должно быть неотрицательным целым числом'
					: null,
		},
	});

	const demoProps = {
		bg: 'var(--mantine-color-blue-light)',
		h: 50,
		mt: 'md',
	};
	const displayedProducts = products ?? [];
	const rows = displayedProducts.map((element) => (
		<Table.Tr key={element.id}>
			<Table.Td>{element.id}</Table.Td>
			<Table.Td>{element.name}</Table.Td>
			<Table.Td>{element.article}</Table.Td>
			<Table.Td>{element.price}</Table.Td>
			<Table.Td>{element.quantity}</Table.Td>
			<Table.Td>
				<Group grow wrap="nowrap">
					<Button
						variant="outline"
						color="blue"
						size="xs"
						onClick={() => handleEdit(element)}
					>
						✏
					</Button>
					<Button
						variant="outline"
						color="red"
						size="xs"
						onClick={() => handleDelete(element.id)}
					>🗑</Button>
				</Group>
			</Table.Td>
		</Table.Tr>
	));

	return <MantineProvider>
		<Container {...demoProps}>
			<Title className="text-center" order={2}>Товары</Title>
			{error && <Text color="red">{error}</Text>}
			<Table verticalSpacing="sm" striped>
				<Table.Thead>
					<Table.Tr>
						<Table.Th>ID</Table.Th>
						<Table.Th>Название</Table.Th>
						<Table.Th>Артикул</Table.Th>
						<Table.Th>Цена</Table.Th>
						<Table.Th>Количество</Table.Th>
						<Table.Th>Действия</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>{rows}</Table.Tbody>
			</Table>
			<Paper>
				<Group mt="md">
					<Button
						disabled={page === 1}
						onClick={() => setPage((p) => p - 1)}
						variant="default"
						size="xs"
					>
						Назад
					</Button>

					<span>{page} / {totalPages}</span>

					<Button
						disabled={page === totalPages}
						onClick={() => setPage((p) => p + 1)}
						variant="default"
						size="xs"
					>
						Вперед
					</Button>
				</Group>
			</Paper>
			<Paper className="mt-16" shadow="xs" p="md" withBorder>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<TextInput
						label="Название"
						placeholder="Введите название"
						{...form.getInputProps('name')}
						mb="sm"
					/>
					<TextInput
						label="Артикул"
						placeholder="Введите артикул"
						{...form.getInputProps('article')}
						mb="sm"
					/>
					<TextInput
						label="Цена"
						placeholder="Введите цену"
						{...form.getInputProps('price')}
						mb="sm"
					/>
					<TextInput
						label="Количество"
						placeholder="Введите количество"
						{...form.getInputProps('quantity')}
						mb="sm"
					/>
					<Button type="submit" fullWidth mt="md">
						{editId === null ? 'Добавить товар' : 'Сохранить изменения'}
					</Button>
					{editId !== null && (
						<Button
							variant="light"
							color="red"
							fullWidth
							mt="xs"
							onClick={() => {
								form.reset();
								setEditId(null);
							}}
						>
							Отмена редактирования
						</Button>
					)}
				</form>
			</Paper>
		</Container>
	</MantineProvider>;
}

export default App
