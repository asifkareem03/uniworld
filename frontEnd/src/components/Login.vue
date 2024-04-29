<script>
import { defineComponent, onMounted, ref } from 'vue';
import { authStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
export default defineComponent({
    setup() {

        const authStr = authStore()
        const email = ref('')
        const password = ref('')

        const router = useRouter()

        onMounted(() => {
            localStorage.clear()
        })

        function redirectToRegister() {
            router.push('/register')

        }
        return {
            router,
            authStr,
            email,
            password,
            redirectToRegister
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
                <input type="password" v-model="password" placeholder="password" class="input">
                <div class="new-user-div">
                    <p class="new-user" @click="redirectToRegister()">New User?</p>
                    <p class="fgt-pswd">Forgot Password?</p>
                </div>
                <button
                    class="login-btn"
                    :class="{'disabled': email.trim() === '' || password.trim() === ''}"
                    @click="authStr.performLogin(email,password)" :disabled="email.trim() === '' || password.trim() === ''"
                >Login</button>
        </form>
        </div>
    </div>
</template>