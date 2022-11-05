## Creating an Nx Workspace

```bash
npx create-nx-workspace@latest
```

### choose below configuration 

```bash
✔ Choose your style                     · integrated
✔ What to create in the new workspace   · react
✔ Repository name                       · myorg
✔ Application name                      · store
✔ Default stylesheet format             · css
✔ Enable distributed caching to make your CI faster · No
```

#### notice two projects were added to the workspace:

- A React application located in apps/store.
- A Project for Cypress e2e tests for our store application in apps/store-e2e.

## create your app

### Run this command to create your admin app:
#### inside the Your Workspace myorg
```bash
npx nx g @nrwl/react:app admin
```

![App Screenshot](https://nx.dev/documentation/shared/react-tutorial/generator-syntax.svg)


## generating library
#### To create the common-ui and products libraries, use the @nrwl/react:lib and @nrwl/js:lib generators respectively:


```bash
npx nx g @nrwl/js:lib common-ui
npx nx g @nrwl/js:lib products
```

#### You should now be able to see all four projects of our design:

- store in apps/store
- admin in apps/admin
- products in libs/products
- common-ui in libs/common-ui

## Project Graph

```bash
npx nx graph
```
![App Screenshot](https://nx.dev/documentation/shared/react-tutorial/initial-project-graph.png)


### generatecomponent in common-ui
```bash
npx nx g @nrwl/react:component banner --project=common-ui --export
```
#### Then create a simple Banner component in the generated file:
##### libs/common-ui/src/lib/banner/banner.tsx
```ts
export interface BannerProps {
  text: string;
}

export function Banner(props: BannerProps) {
  return <header>{props.text}</header>;
}

export default Banner;
```

#### Add the Banner component to the admin app:
##### apps/admin/src/app/main.tsx

```ts
import { Banner } from '@myorg/common-ui';

export function Main() {
  return (
    <>
      <Banner text="Welcome to our admin app." />
      <div />
    </>
  );
}

export default Main;
```

#### Export a Product TS interface and some example products:
##### libs/products/src/lib/products.ts 
```ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export const exampleProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
  },
];
```

#### Use both the Banner component from your common-ui lib, and the exampleProducts from your products lib:

##### apps/store/src/app/app.tsx
```ts
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { exampleProducts } from '@myorg/products';
import { Banner } from '@myorg/common-ui';

export function App() {
  return (
    <>
      <NxWelcome title="store" />
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
```


#### Now run ```bash npx nx graph``` again:

![App Screenshot](https://nx.dev/documentation/shared/react-tutorial/matching-graph.png)

## Task-Running

### Defining Targets

#### Here's the ```project.json``` file for your ```common-ui``` project:

```json
{
  "name": "common-ui",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/common-ui/src",
  "projectType": "library",
  "tags": [],
  "targets": {
    "lint": {
      "executor": "@nrwl/linter:eslint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["libs/common-ui/**/*.{ts,tsx,js,jsx}"]
      }
    },
    "test": {
      "executor": "@nrwl/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/common-ui/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}

```


```bash
> nx run common-ui:test

 PASS   common-ui  libs/common-ui/src/lib/banner/banner.spec.tsx
 PASS   common-ui  libs/common-ui/src/lib/common-ui.spec.tsx

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.587 s
Ran all test suites.

 ——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

 >  NX   Successfully ran target test for project common-ui (5s)
```

## Testing Affected Projects
#### affected is a mechanism that relies on your git metadata to determine the projects in your workspace that were affected by a given commit.

#### Run the command:
```bash
git add . && git commit -m "commiting to test affected"
```

#### to check affected code
```bash
npx nx affected:graph
```

![App Screenshot](https://nx.dev/documentation/shared/react-tutorial/project-graph-with-affected.png)

#### To run the test targets only for affected projects, run the command:

```bash
npx nx affected --target=test
```

## run projects

### generate build
```bash
npx nx build store 
```

### serve build 
```bash
npx nx serve store 
```

