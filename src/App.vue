<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import {useAuthStore} from './stores/auth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const store = useMessageStore()
const authStore = useAuthStore()
const router = useRouter()
const { message } = storeToRefs(store)
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


if(token && user){
  authStore.reload(token, JSON.parse(user))
}else{
  authStore.logout();
}
import {mdiAccount} from '@mdi/js'
import {mdiLogin} from '@mdi/js'

function logout(){
  authStore.logout()
  router.push({name: 'login'})
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <nav class="flex">
            
            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              <li class="nav-item px-2">
                <router-link to="/register" class="nav-link">
                  <div class="flex items-center">
                    <SvgIcon type="mdi" :path="mdiAccount"/><span class="ml-3">Sign Up</span>
                  </div>
                </router-link>
              </li>
              <li class="nav-item px-2">
                <router-link to="/login" class="nav-link">
                  <div class="flex items-center">
                    <SgvIcon type="mdi" :path="mdiLogin"/><span class="ml-3">Login</span>
                  </div>
                </router-link>
              </li>
            </ul>
            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto">
            <li class="nav-item px-2">
              <router-link to="/profile" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiAccount"/>
                  <span class="ml-3">{{ authStore.currentUserName }}</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link hover:cursor-pointer" @click="logout">
              <div class="flex items-center">
                <SvgIcon type="mdi" :path="mdiLogin"/>
                <span class="ml-3">Logout</span>
              </div>
              </a>
            </li>
            </ul>
          </nav>
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }"
            >Event</RouterLink
          >
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{ name: 'about' }"
            >About</RouterLink
          >
          <!-- <span v-if="authStore.isAdmin"></span> -->
          |
          <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{name: 'add-event'}">New Event</RouterLink>
            |
            <RouterLink
            class="font-bold text-gray-700"
            exact-active-class="text-green-500"
            :to="{name: 'add-organizer'}">New Organizer</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
