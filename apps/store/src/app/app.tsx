import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { exampleProducts } from '@myorg/products';
import { Banner } from '@myorg/common-ui';

export function App() {
  return (
    <>
      {/* <NxWelcome title="store" /> */}
      <Banner text="Welcome to our admin app." />

      <ul>
        {exampleProducts.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> Price: {product.price}
          </li>
        ))}
      </ul>
      <div />
    </>
  );
}

export default App;
