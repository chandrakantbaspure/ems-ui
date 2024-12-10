<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center mb-4">
            <i class="bi bi-building-lock display-1 text-primary"></i>
            <h2 class="mt-3">Welcome Back</h2>
            <p class="text-muted">Please login to your account</p>
          </div>

          <form @submit.prevent="handleLogin" class="auth-form">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-envelope"></i>
                </span>
                <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    required
                    placeholder="Enter your email"
                >
              </div>
            </div>

            <div class="mb-4">
              <div class="input-group">
                <span class="input-group-text">
                  <i class="bi bi-lock"></i>
                </span>
                <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    required
                    placeholder="Enter your password"
                >
                <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="showPassword = !showPassword"
                >
                  <i class="bi" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                </button>
              </div>
            </div>

            <div class="d-grid gap-2">
              <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="loading"
              >
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                Login
              </button>
            </div>
          </form>

          <div class="text-center mt-4">
            <p class="mb-0">Don't have an account?
              <router-link to="/signup" class="text-primary text-decoration-none">
                <i class="bi bi-person-plus me-1"></i>Sign up
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '../stores/authStores.js';
import {useToast} from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const form = ref({
  email: '',
  password: ''
});

const loading = ref(false);
const showPassword = ref(false);

async function handleLogin() {
  try {
    loading.value = true;
    await authStore.login(form.value);
    router.push('/');
    toast.success('Successfully logged in!');
  } catch (error) {
    toast.error(error.message || 'Failed to login');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.auth-form .input-group-text {
  background-color: transparent;
  border-right: none;
  padding: 0.5rem 1rem;
  min-width: 46px;
  display: flex;
  justify-content: center;
}

.auth-form .form-control {
  border-left: none;
  padding-left: 0.5rem;
}

.auth-form .input-group:focus-within {
  box-shadow: 0 0 0 0.2rem rgba(var(--primary-rgb), 0.25);
  border-radius: 0.375rem;
}

.auth-form .input-group:focus-within .input-group-text,
.auth-form .input-group:focus-within .form-control {
  border-color: var(--primary-color);
}

.btn-primary {
  padding: 0.8rem 1.5rem;
  font-weight: 500;
}

.display-1 {
  font-size: 3.5rem;
}

.auth-form .bi {
  font-size: 1.2rem;
}
</style>