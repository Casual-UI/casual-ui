<script setup>
import {
  matArrowBack,
  matArrowUpward,
  matArrowForward,
  matArrowDownward,
  matFullscreenExit,
} from '@quasar/extras/material-icons'
import { useNotifications } from 'casual-ui-vue'

const { open } = useNotifications()

const openWithPosition = (alignX, alignY) => {
  open({
    title: '标题',
    message: '内容',
    alignX,
    alignY,
  })
}
</script>
<template>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button
        icon
        style="transform: rotate(-45deg);"
        @click="openWithPosition('start', 'start')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'start')">
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        style="transform: rotate(45deg);"
        @click="openWithPosition('end', 'start')"
      >
        <c-icon :content="matArrowUpward" />
      </c-button>
    </div>
  </div>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button icon @click="openWithPosition('start', 'center')">
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'center')">
        <c-icon :content="matFullscreenExit" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('end', 'center')">
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
  </div>
  <div class="c-row c-gutter-sm">
    <div>
      <c-button
        icon
        style="transform: rotate(-45deg);"
        @click="openWithPosition('start', 'end')"
      >
        <c-icon :content="matArrowBack" />
      </c-button>
    </div>
    <div>
      <c-button icon @click="openWithPosition('center', 'end')">
        <c-icon :content="matArrowDownward" />
      </c-button>
    </div>
    <div>
      <c-button
        icon
        style="transform: rotate(45deg);"
        @click="openWithPosition('end', 'end')"
      >
        <c-icon :content="matArrowForward" />
      </c-button>
    </div>
  </div>
</template>

