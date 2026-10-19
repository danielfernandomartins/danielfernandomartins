export type Product = {
  id: number;
  name: string;
  category: 'Acessórios' | 'Áudio' | 'Setup';
  price: number;
  rating: number;
};

export const products: Product[] = [
  { id: 1, name: 'Teclado mecânico 75%', category: 'Setup', price: 349.9, rating: 4.8 },
  { id: 2, name: 'Headset sem fio', category: 'Áudio', price: 429.9, rating: 4.7 },
  { id: 3, name: 'Mouse ergonômico', category: 'Acessórios', price: 219.9, rating: 4.6 },
  { id: 4, name: 'Suporte para notebook', category: 'Setup', price: 159.9, rating: 4.5 },
  { id: 5, name: 'Fone intra-auricular', category: 'Áudio', price: 189.9, rating: 4.4 },
  { id: 6, name: 'Hub USB-C', category: 'Acessórios', price: 249.9, rating: 4.3 },
];

export function filterProducts(items: Product[], query: string, category: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  return items.filter((product) => {
    const matchesQuery = !normalizedQuery || product.name.toLocaleLowerCase('pt-BR').includes(normalizedQuery);
    const matchesCategory = category === 'Todos' || product.category === category;
    return matchesQuery && matchesCategory;
  });
}

export function calculateCartTotal(items: Product[], quantities: Record<number, number>) {
  return items.reduce((total, product) => total + product.price * (quantities[product.id] ?? 0), 0);
}
