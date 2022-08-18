<template>
  <div class="form px-4 pt-12 pb-24 bg-sllightbg font-poppins">
    <form>
    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-4 lg:col-span-3 product-table">

        <div class="customerSelection rounded-lg p-4 mb-8 text-sm">
          <Select2 class="outline-none shippingaddress px-2 py-1 bg-black" v-model="selectedCustomer" :options="loadedCustomers" :settings="{ width: '100%', placeholder: 'Search a customer/address'}" @select="customerSelect($event)"/>
          <!--<input type="text" required v-model="selectedCustomer" class="outline-none rounded-lg px-3 py-2 mr-8" placeholder="Search customer">-->
          <!--<input type="text" required v-model="shippingAddress" class="outline-none shippingaddress px-2 py-1 bg-black" placeholder="Select shipping address...">-->
        </div>

        <div class="productsTable bg-slwhite myshadow rounded-lg mb-12">
          <table class="w-full">
            <thead class="bg-slgrey">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 rounded-tl-lg">PRODUCT</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">AVAILABLE</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">QTY</th>
                <th scope="col" class="py-3.5 pl-3 pr-4 rounded-tr-lg">
                  
                </th>
              </tr>
            </thead>
            <tbody class="">
              <tr>
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 rounded-bl-lg">
                  <!-- <select v-model="productSearch" class="outline-none shippingaddress px-2 py-1 bg-black" placeholder="Search product...">
                    <option v-for="(product, index) in products" :key="index">{{product.code}}</option>
                  </select> -->
                  <!--Select 2-->
                  <Select2 class="outline-none shippingaddress px-2 py-1 bg-black" v-model="productSearch" :options="products" :settings="{ width: '100%', placeholder: 'Search a product...'}" @select="mySelectEvent($event)"/>
                  <!--end select 2-->
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{selectedStock}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><input type="number" v-model="productQTY" class="outline-none shippingaddress px-2 py-1 bg-black" placeholder="1"></td>
                <td class="whitespace-nowrap px-3 py-4 text-right text-sm font-medium rounded-br-lg">
                  <button @click="addProduct" href="#" class="text-slwhite bg-sldarkblue hover:text-indigo-900 rounded-md px-3 py-2">Add</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="optionals grid grid-cols-6 gap-6 ">
          <div class="myshadow bg-slwhite rounded-lg p-4 lg:col-span-2 col-span-3">
            <p class="mb-2">Delivery date:</p>
            <input type="date" required v-model="deliveryDate" class="outline-none rounded-lg px-3 py-2 mr-8 bg-sllightbg w-full border-1 border-slgrey">
          </div>

          <div class="myshadow bg-slwhite rounded-lg p-4 lg:col-span-2 col-span-3">
            <p class="mb-2">Reference:</p>
            <input type="text" required v-model="orderReference" class="outline-none rounded-lg px-3 py-2 mr-8 bg-sllightbg w-full border-1 border-slgrey" placeholder="Order reference">
          </div>
        </div>

        <!-- <div class="temporary mt-12 text-xs">
          <p>Selected customer: {{selectedCustomer}}</p>
          <p>Shipping address: {{shippingAddress}}</p>
          <p>Product search: {{productSearch}}</p>
          <p>Delivery date: {{deliveryDate}}</p>
          <p>Order reference: {{orderReference}}</p>      
        </div> -->


        </div>
        
      <div class="shopping-cart col-span-3 lg:col-span-1">
        <p class="mb-3">Selected products</p>
          <div class="productsTable bg-slwhite myshadow rounded-lg p-4">
            <div class="productList-head flex justify-between gap-1 mb-4 font-semibold">
              <p class="grow">SELECTION</p>
              <button @click="emptyProductList" class="bg-sldarkblue rounded-sm px-2 grow-0"><img v-bind:src="require('@/assets/refresh-productlist.svg')" alt="" class="w-4 text-slwhite"></button>
            </div>
          <ul role="list" class="divide-y divide-slborder">
            <li v-for="(selectedProduct, index) in selectedProducts" :key="index" class="flex justify-between gap-0.5 py-2">
              <div>
                <p>{{selectedProduct.productCode}}</p>
                <span class="text-xs">QTY: {{selectedProduct.QTY}}</span>
              </div>
              <button @click="removeProduct(index)" class="bg-slborder self-center px-1 rounded-sm font-semibold">X</button>
            </li>

        </ul>
        <button @click="createOrder" class="mt-6 bg-sldarkblue w-full rounded-lg py-2 text-slwhite font-medium">Create order</button>
        </div>
      </div>

    </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Select2 from 'vue3-select2-component'
import customers from "../data/customers.json"
import json from "../data/products.json"
export default {
  name: 'NewOrder',
  components: {Select2},
  data(){
    return {
      loadedCustomers: customers,
      selectedCustomer: '',
      shippingAddress: '',
      deliveryDate: new Date().toISOString().substr(0, 10),
      productSearch: '',
      productQTY: 1,
      selectedStock: '',
      selectedProducts: [],
      orderReference: null,
      products: json
    }
  },
  methods: {
    createOrder(){
      console.log("testing create order button")
    },
    addProduct() {
      if(this.productSearch !== '' && this.productQTY !== '') {
        this.selectedProducts.push({productCode: this.productSearch, QTY: this.productQTY})
      }
      //console.log(this.selectedProducts)
    },
    emptyProductList(){
      this.selectedProducts.length = 0
    },
    removeProduct(index){
      this.selectedProducts.splice(index, 1)
    },
    mySelectEvent({id, text}){
      let selectedProduct = json.find(obj => obj.id === id)
      this.selectedStock = selectedProduct.stock
    },
      customerSelect({id, text}){
      //console.log("selected a customer")
    }
  },
  mounted(){
    //customers.forEach(customer => console.log(customer))
  },
}
</script>

<style>
.customerSelection {
  background: rgb(57,78,106);
  background: linear-gradient(180deg, rgba(57,78,106,1) 0%, rgba(43,58,79,1) 100%);
}
input.shippingaddress{
  background: transparent;
}
.myshadow {
  box-shadow: 0px 5px 6px -3px rgba(0,0,0,0.1);
}
</style>
