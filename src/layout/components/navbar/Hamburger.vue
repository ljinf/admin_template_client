<template>
  <svg-icon
    :class="{ 'is-active': isActive }"
    class-name="icon-hamburger"
    name="hamburger"
    @click="toggleClick" />
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    },
  },
}
</script>

<style lang="scss" scoped>
.icon-hamburger {
  color: #fff;
  font-size: 24px;
  transform: rotate(180deg);
  &.is-active {
    transform: rotate(0);
  }
}
</style>
