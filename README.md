# @holyfata/unlazy

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/@holyfata/unlazy?color=yellow)](https://npmjs.com/package/@holyfata/unlazy)
[![npm downloads](https://img.shields.io/npm/dm/@holyfata/unlazy?color=yellow)](https://npm.chart.dev/@holyfata/unlazy)

<!-- /automd -->

A package to monitor the element's position.

## Usage

### Base version

Install the base package:

```sh
npm install @holyfata/unlazy

# The usage can be seen at packages/***-component-bundle
```

### Vue version

Install the vue wrapper [recommend]:

```sh
npm install @holyfata/unlazy-vue
```

```vue
<template>
  <div style="width: 100vw; height: 100vh"></div>

  <VisibilityWrapper
    selector="#watchedElement"
    @handleVisibility="handleVisibility"
  >
    <template #default="{ isVisible }">
      <div id="watchedElement">
        <p v-if="isVisible">Element is in view</p>
        <p v-else>Element is not in view</p>
      </div>
    </template>
  </VisibilityWrapper>
</template>

<script setup>
import { VisibilityWrapper } from "@holyfata/unlazy-vue";

const handleVisibility = (isVisible) => {
  console.log("Visible :", isVisible);
};
</script>
```

### React version

Install the react wrapper [recommend]:

```sh
npm install @holyfata/unlazy-react
```

```tsx
import VisibilityWrapper from "@holyfata/unlazy-react";

function App() {
  return (
    <div>
      <div className="app"></div>
      <VisibilityWrapper
        selector="#target-element"
        onVisibilityChange={(isVisible) =>
          console.log("Visibility changed:", isVisible)
        }
      >
        {({ isVisible }) => (
          <div id="target-element">
            {isVisible ? "Element is visible" : "Element is not visible"}
          </div>
        )}
      </VisibilityWrapper>
    </div>
  );
}

export default App;
```

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/holyfata/unlazy/blob/main/LICENSE) license.
Made by [community](https://github.com/holyfata/unlazy/graphs/contributors) 💛
<br><br>
<a href="https://github.com/holyfata/unlazy/graphs/contributors">
<img src="https://contrib.rocks/image?repo=holyfata/unlazy" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
