import { useMemo, useState } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
};

export const products: Product[] = [
  { id: 1, name: 'Keyboard', price: 220 },
  { id: 2, name: 'Mouse', price: 120 },
  { id: 3, name: 'Headset', price: 310 },
];

const money = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function Cart() {
  const [cart, setCart] = useState<number[]>([]);

  const total = useMemo(
    () => cart.reduce((sum, productId) => sum + (products.find((product) => product.id === productId)?.price ?? 0), 0),
    [cart],
  );

  function addProduct(productId: number) {
    setCart((current) => [...current, productId]);
  }

  return (
    <main>
      <header>
        <p>React + TypeScript + testes automatizados</p>
        <h1>Tested Cart</h1>
      </header>

      <section className="products" aria-labelledby="products-title">
        <h2 id="products-title" className="visually-hidden">Produtos</h2>
        {products.map((product) => (
          <article key={product.id}>
            <div className="thumb" aria-hidden="true">{product.name[0]}</div>
            <h3>{product.name}</h3>
            <p>{money.format(product.price)}</p>
            <button type="button" onClick={() => addProduct(product.id)}>
              Adicionar {product.name}
            </button>
          </article>
        ))}
      </section>

      <aside aria-label="Resumo do carrinho" aria-live="polite">
        <span>Itens: <strong>{cart.length}</strong></span>
        <span>Total: <strong>{money.format(total)}</strong></span>
      </aside>
    </main>
  );
}
