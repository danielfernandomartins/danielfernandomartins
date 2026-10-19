import { useMemo, useState } from 'react';
import { calculateCartTotal, filterProducts, products } from './catalog';

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const categories = ['Todos', 'Setup', 'Áudio', 'Acessórios'];

export function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [cart, setCart] = useState<Record<number, number>>({});

  const visibleProducts = useMemo(() => filterProducts(products, query, category), [query, category]);
  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  const total = calculateCartTotal(products, cart);

  function addToCart(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <p className="eyebrow">React + TypeScript + Vitest</p>
          <h1>Commerce Storefront</h1>
          <p>Catálogo responsivo com filtros combinados, carrinho e regras de negócio testadas.</p>
        </div>
        <aside aria-live="polite" className="cart-summary">
          <strong>{cartCount} itens</strong>
          <span>{money.format(total)}</span>
        </aside>
      </header>

      <section className="toolbar" aria-label="Filtros do catálogo">
        <label>
          Buscar produto
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex.: headset" />
        </label>
        <label>
          Categoria
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </section>

      <section aria-live="polite">
        <p className="results">{visibleProducts.length} produtos encontrados</p>
        <div className="grid">
          {visibleProducts.map((product) => (
            <article className="card" key={product.id}>
              <span className="category">{product.category}</span>
              <h2>{product.name}</h2>
              <p aria-label={`Avaliação ${product.rating} de 5`}>★ {product.rating}</p>
              <strong>{money.format(product.price)}</strong>
              <button type="button" onClick={() => addToCart(product.id)}>Adicionar ao carrinho</button>
            </article>
          ))}
        </div>
        {visibleProducts.length === 0 && <p role="status">Nenhum produto corresponde aos filtros.</p>}
      </section>
    </main>
  );
}
