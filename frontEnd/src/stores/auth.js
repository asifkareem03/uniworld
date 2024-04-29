import { defineStore } from "pinia";
import router from "@/router/index";
import axios from "axios";

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        
    }),

    actions: {
        async performLogin(email, password) {
            console.log(email, password)
            axios.post('/login',{ email, password })
            .then((resp) => {
                console.log(resp.data)
                localStorage.setItem('user', JSON.stringify(resp.data.user));
                router.push('/home')
            }).catch(error => {
                alert("Invalid Username or Password")
                console.error(error)
            })
        },

        async performRegister(name, email, password) {
            axios.post('/register', {name, email, password})
            .then((resp) => {
                alert("account Created")
                router.push('/login')
            }).catch(error => {
                if (error.response.status === 402) {
                    alert("User Already Exists")
                } else {
                    alert('server error')
                }
                console.error(error)
            })
        }
    }
})