import { defineStore } from "pinia";
import axios from "axios";

export const cartStore = defineStore({
    id: 'cart',
    state: () => ({
        items: [],
        catogorizedItems : { 'Chair': [],'Table': [],'Top': [] },
    }),

    actions: {
        async placeOrder() {
            const storedUserId = JSON.parse(localStorage.getItem('user')).id;
            console.log(this.items)
            axios.post('/checkout', {userId:storedUserId, items: this.items})
            .then((resp) => {
                console.log(resp.data)
                alert("Order Placed")
                this.items = []
            }).catch((err) => {
                console.error(err)
            })
        }
    }
})