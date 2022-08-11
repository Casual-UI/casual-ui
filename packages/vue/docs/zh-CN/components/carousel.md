---
title: 轮播
componentPath: carousel/CCarousel
additionalComponentPaths:
  - name: CCarouselSlider
    path: carousel/CCarouselSlider
---

### 基础使用

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 无限循环

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 箭头展示时机

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 主题

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 自定义箭头控制器

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 自动播放

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 纵向

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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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

### 指示器位置

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
    <b>横向位置：</b>
    <c-radio-group
      v-model="indicatorsPositionHorizontal"
      :options="positionOptions"
    />
  </div>
  <div>
    <b>纵向位置：</b>
    <c-radio-group
      v-model="indicatorsPositionVertical"
      :options="positionOptions"
    />
  </div>
  <div>
    <b>排列方向：</b>
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
        要来一些苹果吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          i-openmoji-banana
          class="icon"
        ></div>
        要来一些香蕉吗？
      </div>
    </c-carousel-slider>
    <c-carousel-slider>
      <div class="item">
        <div
          class="icon"
          i-openmoji-grapes
        ></div>
        要来一些葡萄吗？
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
