<template>
    <div class="navbar">
        <div class="heading">
            E-Commerce
        </div>
        <div class="right-side" v-if="route.path !== '/login'">
            <div class="cart-icon">
                <i class="fa-solid fa-cart-shopping" title="cart" @click="viewCart()"></i>
                <span class="badge" v-if="cartStr.items.length > 0">{{ numberOfItems }}</span>
            </div>
            <div class="logout-icon">
                <i class="fa-solid fa-arrow-right-from-bracket" title="logout" @click="logout()"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { cartStore } from '@/stores/cart';

export default defineComponent({
    name: "NavBar",
    setup() {

        const cartStr = cartStore()

        const router = useRouter()

        const route = useRoute()

        const numberOfItems = computed(() => {
            return cartStr.items.reduce((total, item) => total + item.quantity, 0)
        })

        function logout() {
            router.push('/login')
        }


        function viewCart() {
            localStorage.clear()
            router.push('/cart')
        }

        return {
            router,
            route,
            cartStr,
            numberOfItems,
            viewCart,
            logout
        }
    }

})
</script>

<style scoped lang="scss">
.navbar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    background-color: black;

    .heading {
        margin-left: 30px;
        font-size: 20px;
        color: white;
    }

    .right-side {
        margin-right: 20px;
        display: flex;
        align-items: center;
        gap: 25px;

        .cart-icon {
            position: relative;
            cursor: pointer;

            i {
                color: white;
                font-size: 1.5rem;
            }

            .badge {
                position: absolute;
                top: -10px;
                right: -10px;
                background-color: red;
                color: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 5;
            }
        }

        .logout-icon {
            
            i {
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }
    }
}
</style>