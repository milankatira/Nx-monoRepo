// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { createProductsDataClient } from '@myorg/products-data-client';
import Main from './main';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react';
const productsDataClient = createProductsDataClient();

export function App() {
  const [myProduct, setmyProduct] = useState([]);
  productsDataClient.getProducts().then((res: any) => setmyProduct(res));
  console.log(myProduct, 'myProduct');
  return (
    <>
      {myProduct &&
        myProduct.map((data: any) => (
          <>
            <h1>{data.name}</h1>
          </>
        ))}
      {/* <NxWelcome title="admin" /> */}
      <div />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">
              <Main />
            </Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      {/* END: routes */}
    </>
  );
}

export default App;
