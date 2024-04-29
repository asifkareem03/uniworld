<script>
import { defineComponent, reactive, onMounted , ref} from 'vue';
import { cartStore } from '@/stores/cart';
import Cards from './Card.vue'
import axios from 'axios';
import router from '@/router';

export default defineComponent({
    name: "Home",
    components: {
        Cards
    },
    setup() {

        const activeButton = ref('All')
        
        const cartStr = cartStore()

        const radioButtons = reactive([{
            value: 'All', checked: true
        },{
            value: 'Chair', checked: false
        },{
            value: 'Table', checked: false,
        },{
            value: 'Top', checked: false
        }])

        onMounted(() => {
            if (localStorage.getItem('user') !== null) {
                cartStr.catogorizedItems = { 'Chair': [],'Table': [],'Top': [] }
                axios.get('/getProducts')
                .then((resp) => {
                    let items = resp.data.products
                    items.forEach(item => {
                        cartStr.catogorizedItems[item.category].push(item)
                    });
                    console.log(cartStr.catogorizedItems)
                }).catch(error => {
                    console.error(error)
                })
            } else {
               alert('Please Login Again')
               router.push('/login')
            }
        })

        function change(index) {
            radioButtons.forEach((buttons) => {
                buttons.checked = false
            })
            radioButtons[index].checked = true
        }

        return {
            activeButton,
            radioButtons,
            cartStr,
            change
        }
    }

})
</script>

<template>
    <div class="home-page">
        <div class="radio-buttons">
            <label v-for="(button,index) in radioButtons" :key="index" class="radio" @change="change(index)" :class="{'labelChecked': button.checked}">
                <input type="radio" :value="button.value" v-model="activeButton" />
                <span>{{ button.value}}</span>
            </label>
        </div>
        <div class="card-items">
            <div class="card-items1" v-if="activeButton==='All'">
                <div v-for="(itemValue, itemKey) in cartStr.catogorizedItems" :key="itemKey" class="all-catogory">
                    <h1>{{itemKey}}</h1>
                    <div class="card-div">
                        <div v-for="(item, index) in itemValue" :key="index">
                            <Cards :item="item" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="card-items2">
                <div v-for="(item, index) in cartStr.catogorizedItems[activeButton]" :key="index">
                    <Cards :item="item" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home-page {
    padding: 30px;
    background-color: #fafafa;
    .radio-buttons {
        text-align: center;

        .radio {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            width: 100px;
            height: 40px;
            border-radius: 10px;
            cursor: pointer;
            background-color: #f0f0f0;

            input {
                display: none;
            }

            &.labelChecked {
                background-color: rgb(86, 189, 60);;
                color: white;
            }
        }
    }

    .card-items {
        margin-top: 20px;

        .card-items1 {
            .all-catogory {
                display: flex;
                flex-direction: column;
                margin-bottom: 50px;

                h1 {
                    margin-bottom: 10px;
                }

                .card-div {
                    display: flex;
                    gap: 40px;
                    flex-wrap: wrap;
                }
            }
        }

        .card-items2 {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
        }
    }
}
</style>