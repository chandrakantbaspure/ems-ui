<template>
  <div class="d-flex align-items-center">
    <ThemeToggle/>
    <div class="dropdown profile-icon">
      <button class="btn btn-outline-secondary dropdown-toggle profile-dropdown" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown">
        <span class="me-1">{{ firstChar }}</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end ">
        <li>
          <router-link class="dropdown-item" to="/profile">Profile</router-link>
        </li>
        <li>
          <router-link class="dropdown-item" to="/change-password">Change Password</router-link>
        </li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Logout</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {useAuthStore} from '../stores/authStores.js';
import ThemeToggle from '../components/ThemeToggle.vue';
import axios from 'axios';

const authStore = useAuthStore();
const BASE_URL = "http://localhost:8082/api";
const firstChar = ref('');
onMounted(() => {
  let userInitial = ''
  const decodedString = atob(localStorage.getItem("auth")).replace(/%20/g, ' ').replace(/\+/g, '');
  const [email, password] = decodedString.split(':');
  axios.get(BASE_URL + "/auth/user/" + email)
      .then(response => {
        userInitial = response.data.name;
        const username = userInitial.charAt(0).toUpperCase();
        firstChar.value = username;
        console.log(username);
      }).catch(error => {
    console.error('Error fetching user name:', error);
  })
});

async function handleLogout() {
  try {
    await authStore.logout();
    router.push({name: 'Login'});
  } catch (error) {
    console.error('Logout failed:', error);
  }
}

</script>

<style>
.profile-dropdown {
  position: relative;
  display: inline-block;
  margin-left: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  z-index: 1000;
  color: #343a40;
  background-color: transparent;

}

</style>