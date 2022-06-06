<script setup>
import {
  matBuild,
  matCoPresent,
  matDeviceHub,
} from '@quasar/extras/material-icons'
</script>
<template>
  <c-button icon>
    <c-icon :content="matBuild" />
  </c-button>
  <c-button icon theme="secondary">
    <c-icon :content="matBuild" />
  </c-button>
  <c-button icon style="font-size: 24px" theme="warning">
    <c-icon :content="matCoPresent" />
  </c-button>
  <c-button
    outlined
    icon
    style="font-size: 32px"
    theme="negative">
    <c-icon :content="matDeviceHub" />
  </c-button>
</template>
