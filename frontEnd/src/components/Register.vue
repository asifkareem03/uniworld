<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {authStore} from '@/stores/auth';
export default defineComponent({
    setup() {

        const authStr = authStore()
        const email = ref('')
        const name = ref('')
        const password = ref('')

        const router = useRouter()

        function redirectToLogin() {
            router.push('/login')
        }
        return {
            authStr,
            email,
            password,
            name,
            router,
            redirectToLogin
        }
    }
})
</script>

<template>
    <div class="auth-page">
        <div class="auth-container">
           <p class="heading">Login</p>
           <form class="form-login" @submit.prevent>
                <input v-model="email" placeholder="E-mail" class="input">
                <input v-model="name" placeholder="name" class="input">
                <input type="password" v-model="password" placeholder="password" class="input">
                <div class="new-user-div">
                    <p class="new-user" @click="redirectToLogin()">Already have an account?</p>
                </div>
                <button 
                    class="login-btn"
                    :class="{'disabled': email.trim() === '' || password.trim() === '' || name.trim() === ''}"
                    @click="authStr.performRegister(name, email, password)"
                    :disabled="email.trim() === '' || password.trim() === '' || name.trim === ''"
                >Register</button>
        </form>
        </div>
    </div>
</template>
