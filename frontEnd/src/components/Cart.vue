<script>
import { cartStore } from '@/stores/cart';
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Cart",
  setup() {

    const cartStr = cartStore()

    const router = useRouter()

    function increaseStock(index, cartItem) {
        cartStr.items[index].quantity += 1
        cartStr.items[index]['total_amount'] = cartStr.items[index]['quantity'] * cartStr.items[index]['price']
        cartStr.catogorizedItems[cartItem.category].forEach(element => {
            if (element.id === cartItem.id) {
                element.stock -= 1
            }
        });
    }

    function decreaseStock(index, cartItem) {
        cartStr.items[index].quantity -= 1
        cartStr.items[index]['total_amount'] = cartStr.items[index]['quantity'] * cartStr.items[index]['price']
        if (cartStr.items[index].quantity === 0) {
            cartStr.items.splice(index, 1)
        }

        cartStr.catogorizedItems[cartItem.category].forEach(element => {
            if (element.id === cartItem.id) {
                element.stock += 1
            }
        });
    }

    const totalAmount = computed(()=> {
        return cartStr.items.reduce((total, item) => total + (item.quantity * item.price), 0)
    })

    const getCategoryStock = computed(() => {
            return (item) => {
                const categoryItems = cartStr.catogorizedItems[item.category];
                const selectedItem = categoryItems.find(categoryItem => categoryItem.id === item.id);
                return selectedItem.stock
            };
    });



    return {
        router,
        cartStr,
        totalAmount,
        increaseStock,
        decreaseStock,
        getCategoryStock
    }
  }

})
</script>

<template>
    <div class="cart">
        <div class="cart-wrap">
            <div class="cart-title">
                <p class="title">Your Cart</p>
                <button class="back-btn" @click="router.push('/home')">Back To Shopping</button>
            </div>
            <div class="emptycart" v-if="cartStr.items.length === 0">
                <p>Cart is Empty</p>
            </div>
            <div class="cart-body" v-else>
                <div class="header-section">
                    <p class="image-header"></p>
                    <p class="product">Product</p>
                    <p class="price">Price</p>
                    <p class="quantity">Quantity</p>
                    <p class="total">Total</p>
                </div>
                <hr>
                <div class="cart-items-section">
                    <div v-for="(item, index) in cartStr.items" :key="index">
                        <p class="item-product-wrap">
                            <img :src="item.image" alt="">
                            <p>{{item.name}}</p>
                            <p class="out-of-stock-item" v-if="getCategoryStock(item) === 0">(Out Of Stock)</p>
                        </p>
                        <p class="item-price">₹ {{item.price}}</p>
                        <p class="item-quantity">
                            <span class="round-icon" @click="decreaseStock(index, item)"><i class="fa-solid fa-minus"></i></span>
                            <span class="quantity">{{item.quantity}}</span>
                            <span
                                class="round-icon" 
                                @click="increaseStock(index, item)"
                                :class="{'out-of-stock': getCategoryStock(item) === 0}"
                            ><i class="fa-solid fa-plus"></i></span>
                        </p>
                        <p class="item-total">₹ {{ item.total_amount}} </p>
                    </div>
                </div>
                <div class="total-amount-section">
                    <p class="total-amount">Total Amount: ₹ {{totalAmount}}</p>
                </div>
            </div>
            <div class="checkout-section" v-if="cartStr.items.length !== 0">
                <button class="checkout-btn" @click="cartStr.placeOrder()">Checkout</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart {
    background-color: #fafafa;
    display: flex;
    justify-content: center;
    height: calc(100vh - 60px);
    .cart-wrap {
        margin-top: 30px;
        width: 70%;

        .cart-title {
            display: flex;
            justify-content: space-between;

            .title {
                font-size: 30px;
                font-weight: 600;
            }

            .back-btn {
                cursor: pointer;
                color: black;
                height: 40px;
                border-radius: 5px;
                padding: 10px;

                &:hover {
                    background-color: rgb(53, 153, 53);
                    color: white;
                }
            }
        }

        .emptycart {
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;

            p {
                font-size: 30px;
                font-weight: 700;
            }
        }

        .cart-body {
            margin-top: 20px;
            padding: 30px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 1px 1px 1px 1px #ccc;
            .header-section {
                display: flex;

                .image-header {
                    width: 140px;
                }

                .product {
                    width: calc(50% - 140px);
                }

                .price {
                    width: 10%;
                }

                .quantity {
                    width: 25%;
                    text-align: center;
                }

                .total {
                    width: 15%;
                }
            }

            .cart-items-section {
                margin-top: 20px;
                div {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30px;
                    .item-product-wrap {
                        display: flex;
                        align-items: center;
                        gap: 50px;
                        width: 50%;
                        img {
                            width: 90px;
                            height: 80px;
                        }

                        .out-of-stock-item {
                            color: red;
                            font-size: 12px;
                        }
                    }

                    .item-price {
                        width: 10%;
                    }

                    .item-quantity {
                        width: 25%;
                        display: flex;
                        gap: 15px;
                        align-items: center;
                        justify-content: center;

                        .round-icon {
                            padding: 7px;
                            border-radius: 50%;
                            border: 1px solid black;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            cursor: pointer;

                            &.out-of-stock {
                                cursor: not-allowed;
                                opacity: 0.5;
                            }
                        }

                        .quantity {
                            padding:5px 20px;
                            border: 1px solid black;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }

                    .item-total {
                        width: 15%;
                    }
                }
            }

            .total-amount-section {
                display: flex;
                justify-content: end;
                
                p {
                    padding: 10px;
                    border: 1px solid #ccc;
                }
            }
        }
        

        .checkout-section {
            margin-top: 20px;
            width: 100%;
            display: flex;
            justify-content: end;

            .checkout-btn {
                background-color: green;
                color: #fff;
                height: 40px;
                border-radius: 5px;
                border: none;
                padding: 10px;
                min-width: 120px;

                &:hover {
                    background-color: rgb(53, 153, 53);
                }
            }
        }
    }
}
</style>