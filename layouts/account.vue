<script setup lang="ts">
import type { Collapse } from 'bootstrap'
import { Icon } from '@iconify/vue'

const { $collapse } = useNuxtApp()
const navbarRef = useTemplateRef('navbar')
const navbarInstance = ref<Collapse | null>(null)

function closeNavbar() {
  navbarInstance.value?.hide()
}

function toggleNavbar() {
  navbarInstance.value?.toggle()
}

onMounted(() => {
  if (navbarRef.value) {
    navbarInstance.value = new $collapse(navbarRef.value, {
      toggle: false,
    })
  }
})

onUnmounted(() => {
  navbarInstance.value?.dispose()
})
</script>

<template>
  <div class="min-vh-100 bg-neutral-120">
    <header class="position-fixed z-3 w-100 bg-neutral-120">
      <nav class="navbar navbar-expand-md p-0 mx-3 my-4 mx-md-20 my-md-6">
        <div class="container-fluid justify-content-between p-0">
          <NuxtLink class="navbar-brand p-0" to="/">
            <img src="/images/logo-white.svg" alt="logo" class="logo img-fluid">
          </NuxtLink>
          <button
            class="navbar-toggler collapsed p-2 text-white border-0 shadow-none" type="button"
            aria-controls="navbar" aria-expanded="false"
            aria-label="Toggle navigation" @click="toggleNavbar"
          >
            <Icon class="fs-1" icon="mdi:close" />
            <Icon class="fs-5" icon="mdi:menu" />
          </button>
          <div ref="navbar" class="collapse navbar-collapse">
            <ul class="d-md-none navbar-nav gap-4 ms-auto fw-bold">
              <li class="nav-item">
                <NuxtLink to="/" class="nav-link p-4 text-neutral-0" @click="closeNavbar">
                  客房旅宿
                </NuxtLink>
              </li>
              <li class="nav-item" @click="closeNavbar">
                <NuxtLink to="/" class="nav-link p-4 text-neutral-0">
                  會員登入
                </NuxtLink>
              </li>
              <li class="nav-item">
                <NuxtLink
                  to="/"
                  class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3"
                  @click="closeNavbar"
                >
                  立即訂房
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <div class="position-relative d-flex flex-column flex-md-row">
      <img
        class="d-none d-md-block position-relative z-1 min-vh-100 object-fit-cover"
        style="max-width: 50%;" src="/images/login-hero.png" alt="login-hero"
      >

      <div
        class="d-flex flex-column justify-content-center align-items-center flex-grow-1 pt-18 pt-md-0"
      >
        <picture class="w-100">
          <source
            srcset="/images/deco-line-group-horizontal.svg"
            media="(min-width: 576px)"
          >
          <img
            class="deco-line-group" src="/images/deco-line-group-horizontal-sm.svg"
            alt="deco-line-group"
          >
        </picture>

        <main class="position-relative w-100 w-md-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'bootstrap/scss/mixins/breakpoints';

$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px,
  xxxl: 1537px,
);

.logo {
  max-width: 27vw;
}

.w-md-auto {
  @include media-breakpoint-up(md) {
    width: auto !important;
  }
}

@include media-breakpoint-down(md) {
  header {
    max-height: 72px;
  }
}

@include media-breakpoint-down(md) {
  .navbar-toggler {
    z-index: 1;
    visibility: hidden;

    svg {
      transition: opacity 0.3s;
    }

    svg:nth-child(1) {
      position: absolute;
      top: 28px;
      right: 28px;
      visibility: visible;
      opacity: 1;
    }

    svg:nth-child(2) {
      visibility: hidden;
      opacity: 0;
    }
  }

  .navbar-toggler.collapsed {
    svg:nth-child(1) {
      visibility: hidden;
      opacity: 0;
    }

    svg:nth-child(2) {
      visibility: visible;
      opacity: 1;
    }
  }

  .navbar-collapse {
    position: fixed;
    inset: 0;
    min-height: 100vh;
    overflow: hidden;
    background-color: #140f0a;
    opacity: 0;
    transition: opacity 0.05s;
  }

  .navbar-collapse.show {
    opacity: 1;
  }

  .navbar-nav {
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;

    a {
      width: 90vw;
    }
  }
}

.deco-line-group {
  position: absolute;
  top: 192px;
  right: 0;

  @include media-breakpoint-down(md) {
    position: static;
    width: 100%;
  }
}
</style>
