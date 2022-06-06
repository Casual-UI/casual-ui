<template>
  <div class="c-row c-wrap c-gutter-md">
    <div v-for="n in 8" :key="n" class="motion-item"></div>
  </div>
  <div class="c-row c-wrap c-gutter-md">
    <div v-for="n in 8" :key="n" class="motion-item-eio"></div>
  </div>
  <div class="c-row c-wrap c-gutter-md">
    <div v-for="n in 8" :key="n" class="motion-item-ei"></div>
  </div>
</template>
<style scoped lang="scss">
@keyframes circle {
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
}
.motion-item,
.motion-item-eio,
.motion-item-ei {
  width: 72px;
  height: 72px;
  background-color: var(--casual-primary);
  border-radius: 50%;
  background-clip: content-box;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-name: circle;
}
.motion-item {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-out-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-out-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-out-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-out-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-out-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-out-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-out-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-out-sin);
  }
}
.motion-item-eio {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-in-out-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-in-out-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-in-out-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-in-out-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-in-out-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-in-out-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-in-out-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-in-out-sin);
  }
}
.motion-item-ei {
  &:nth-child(1) {
    animation-timing-function: var(--casual-ease-in-circle);
  }
  &:nth-child(2) {
    animation-timing-function: var(--casual-ease-in-overshoots);
  }
  &:nth-child(3) {
    animation-timing-function: var(--casual-ease-in-quadratic);
  }
  &:nth-child(4) {
    animation-timing-function: var(--casual-ease-in-cubic);
  }
  &:nth-child(5) {
    animation-timing-function: var(--casual-ease-in-quartic);
  }
  &:nth-child(6) {
    animation-timing-function: var(--casual-ease-in-quintic);
  }
  &:nth-child(7) {
    animation-timing-function: var(--casual-ease-in-exponential);
  }
  &:nth-child(8) {
    animation-timing-function: var(--casual-ease-in-sin);
  }
}
</style>
