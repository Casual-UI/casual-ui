---
title: Carousel
componentPath: carousel/CCarousel
additionalComponentPaths:
  - name: CCarouselSlider
    path: carousel/CCarouselSlider
---

### Basic Usage

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel v-model="current">
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Infinity

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel
    v-model="current"
    infinity
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Arrow Timing

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel
    v-model="current"
    arrowTiming="hover"
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Themes

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
const theme = ref('primary')
const themeOptions = [
  { label: 'primary', value: 'primary' },
  { label: 'secondary', value: 'secondary' },
  { label: 'warning', value: 'warning' },
  { label: 'negative', value: 'negative' },
]
</script>
<template>
  <c-radio-group
    v-model="theme"
    :options="themeOptions"
  />
  <c-carousel
    v-model="current"
    :theme="theme"
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Customize Arrow Control

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel v-model="current">
    <template #control-prev>
      <c-button
        icon
        flat
        style="font-size:48px;"
      >
        <div i-mdi-page-previous-outline />
      </c-button>
    </template>
    <template #control-next>
      <c-button
        icon
        flat
        style="font-size:48px;"
      >
        <div i-mdi-page-next-outline />
      </c-button>
    </template>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Auto Play

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel
    v-model="current"
    :interval="5000"
    infinity
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Vertical

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
</script>
<template>
  <c-carousel
    v-model="current"
    vertical
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```

### Indicator Positions

```vue live
<script setup>
import { ref } from 'vue'

const current = ref(0)
const indicatorsPositionHorizontal = ref('center')
const indicatorsPositionVertical = ref('end')
const indicatorsAlignDirection = ref('row')

const positionOptions = [
  { label: 'start', value: 'start' },
  { label: 'center', value: 'center' },
  { label: 'end', value: 'end' },
]

const alignOptions = [
  { label: 'row', value: 'row' },
  { label: 'row-reverse', value: 'row-reverse' },
  { label: 'column', value: 'column' },
  { label: 'column-reverse', value: 'column-reverse' },
]
</script>
<template>
  <div>
    <b>Indicators position horizontal</b>
    <c-radio-group
      v-model="indicatorsPositionHorizontal"
      :options="positionOptions"
    />
  </div>
  <div>
    <b>Indicators position vertical</b>
    <c-radio-group
      v-model="indicatorsPositionVertical"
      :options="positionOptions"
    />
  </div>
  <div>
    <b>Indicators align direction</b>
    <c-radio-group
      v-model="indicatorsAlignDirection"
      :options="alignOptions"
    />
  </div>
  <hr />
  <c-carousel
    v-model="current"
    v-bind="{
      indicatorsPositionHorizontal,
      indicatorsPositionVertical,
      indicatorsAlignDirection,
    }"
  >
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-red-apple
          class="icon"
        ></div>
        Would you like some apples?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        Would you like some bananas?
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        Would you like some grapes?
      </div>
    </c-carousel-slider>
  </c-carousel>
</template>
<style scoped>
.item {
  font-size: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.item .icon {
  font-size: 100px;
}
</style>
```
