<script>
import { defineComponent } from 'vue';
import { cartStore } from '@/stores/cart';

export default defineComponent({
  name: "Card",
  props: {
    item: Object
  },
  setup(props) {

    const cartStr = cartStore()

    function addToCart(cartItem) {
        const index = cartStr.items.findIndex(item => item.id === cartItem.id)
        if (index !== -1) {
            cartStr.items[index]['quantity'] += 1
            cartStr.items[index]['total_amount'] = cartStr.items[index]['quantity'] * cartStr.items[index]['price']
            cartStr.items[index]['stock'] -= 1
        } else {
            let obj = {... cartItem}
            obj['quantity'] = 1
            obj['total_amount'] = obj['price']
            cartStr.items.push(obj)
        }
        cartStr.catogorizedItems[cartItem.category].forEach(element => {
            if (element.id === cartItem.id) {
                element.stock -= 1
            }
        });
        alert("Added to the Cart")
    }

    return {
        cartStr,
        addToCart
    }
  }

})
</script>

<template>
    <div class="card">
        <div class="card-div" :class="{'ouf-of-stock': item.stock === 0}">
            <div class="card-image">
                <img :src="item.image" alt="">
            </div>
            <div class="card-description">
                <div class="name_and_price">
                    <p class="name">{{item.name}}</p>
                    <p class="price">Rs: {{item.price}}</p>
                </div>
                <div class="catogory">
                    <p class="item-catogory">{{ item.category }}</p>
                    <p class="stocks" v-if="item.stock <=4 && item.stock !== 0">*only {{item.stock}} stocks</p>
                </div>
            </div>
            <div class="btn-div">
                <button class="out-of-stock-btn" disabled v-if="item.stock === 0">Out of Stock</button>
                <button class="add-to-card-btn" @click="addToCart(item)" v-else>Add to Cart</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    .card-div {
        width: 300px;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 1px 2px 2px 3px #ccc;

        &.ouf-of-stock {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .card-image {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                transition: all 0.3s ease-in;
                width: 300px;
                height: 250px;
                border-radius: 5px;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .card-description {
            margin-top: 20px;
            .name_and_price {
                display: flex;
                justify-content: space-between;

                p {
                    font-size: 18px;
                    font-weight: 600;
                    color: black;
                }
            }

            .catogory {
                margin-top: 5px;
                display: flex;
                justify-content: space-between;

                .item-catogory {
                    font-size: 16px;
                    font-weight: 500;
                }

                .stocks {
                    font-size: 14px;
                    font-weight: 400;
                }
            }
        }

        .btn-div {
            margin-top: 20px;
            .out-of-stock-btn {
                width: 100%;
                cursor: not-allowed;
                background-color: red;
                color: #fff;
                height: 40px;
                border-radius: 10px;
                border: none;
            }
            .add-to-card-btn {
                width: 100%;
                cursor: pointer;
                background-color: green;
                color: #fff;
                height: 40px;
                border-radius: 10px;
                border: none;

                &:hover {
                    background-color: rgb(53, 153, 53);
                }
            }
        }
    }
}
</style>