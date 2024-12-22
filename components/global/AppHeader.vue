<script setup lang="ts">
import type { Collapse } from 'bootstrap'
import { Icon } from '@iconify/vue'
import { useUserApi } from '~/api/services/user'
import { CookieEnum } from '~/enums/cookie'

const transparentBgRoute = ['home', 'rooms']

const token = useCookie(CookieEnum.Auth)
const { user } = storeToRefs(useUserStore())
const { setUser } = useUserStore()
const { getUser } = useUserApi()
await useAsyncData(async () => {
  if (user.value) {
    return Promise.resolve(true)
  }
  if (!token.value) {
    return Promise.resolve(true)
  }
  const response = await getUser()
  setUser(response?.result ?? null)
  return Promise.resolve(true)
})

const route = useRoute()
const router = useRouter()
const navbarRef = useTemplateRef('navbar')

const { close, toggle, collapsed } = useCollapse(navbarRef)

const isScrolled = ref(false)

const isTransparentRoute = computed(() => transparentBgRoute.includes(route.name as string))

function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

function logout() {
  token.value = null
  setUser(null)
  router.push('/account/login')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="{
      'scrolled': isScrolled,
      'bg-transparent': isTransparentRoute,
      'bg-neutral-120': !isTransparentRoute,
    }" class="position-fixed top-0 z-3 w-100"
  >
    <nav class="navbar navbar-expand-md p-0 px-3 py-4 px-md-20 py-md-6">
      <div class="container-fluid justify-content-between p-0">
        <NuxtLink class="navbar-brand p-0" to="/">
          <img src="/images/logo-white.svg" alt="logo" class="logo img-fluid">
        </NuxtLink>
        <button
          :class="{ collapsed }"
          class="navbar-toggler p-2 text-white border-0 shadow-none" type="button"
          aria-controls="navbar" aria-expanded="false"
          aria-label="Toggle navigation" @click="toggle"
        >
          <Icon class="fs-1" icon="mdi:close" />
          <Icon class="fs-5" icon="mdi:menu" />
        </button>
        <Collapse ref="navbar" class="navbar-collapse">
          <ul class="navbar-nav gap-4 ms-auto fw-bold">
            <li class="nav-item">
              <NuxtLink
                :to="{
                  name: 'rooms',
                }" class="nav-link p-4 text-neutral-0"
                @click="close"
              >
                客房旅宿
              </NuxtLink>
            </li>
            <ClientOnly>
              <li v-if="user" class="d-none d-md-block nav-item">
                <div class="btn-group">
                  <button
                    type="button" class="nav-link d-flex gap-2 p-4 text-neutral-0"
                    data-bs-toggle="dropdown"
                  >
                    <Icon class="fs-5" icon="mdi:account-circle-outline" />
                    {{ user.name }}
                  </button>
                  <ul
                    class="dropdown-menu py-3 overflow-hidden"
                    style="right: 0; left: auto; border-radius: 20px;"
                  >
                    <li>
                      <NuxtLink class="dropdown-item px-6 py-4" to="/user/profile">
                        我的帳戶
                      </NuxtLink>
                    </li>
                    <li>
                      <button class="dropdown-item px-6 py-4" @click="logout">
                        登出
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li v-else class="d-none d-md-block nav-item">
                <NuxtLink to="/account/login" class="nav-link p-4 text-neutral-0">
                  會員登入
                </NuxtLink>
              </li>
            </ClientOnly>
            <li class="d-md-none nav-item">
              <NuxtLink to="/account/login" class="nav-link p-4 text-neutral-0" @click="close">
                會員登入
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink
                :to="{
                  name: 'rooms',
                }" class="btn btn-primary-100 px-8 py-4 text-white fw-bold border-0 rounded-3"
                @click="close"
              >
                立即訂房
              </NuxtLink>
            </li>
          </ul>
        </Collapse>
      </div>
    </nav>
  </header>
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

header {
  transition: background-color 0.3s;
}

header.scrolled {
  background-color: #000 !important;
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

.dropdown-menu {
  --bs-dropdown-min-width: 16rem;
  --bs-dropdown-link-hover-color: #bf9d7d;
  --bs-dropdown-link-hover-bg: #f7f2ee;
  --bs-dropdown-link-active-color: #fff;
  --bs-dropdown-link-active-bg: #bf9d7d;
}
</style>
