<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter justify-center items-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-2/5 m-3">
      <vx-card>

        <div class="vx-card__title mb-6">
          <h2 class="text-center">时间轮 Plus 会员</h2>
        </div>

        <img src="@/assets/images/pages/rocket.png" alt="coming-soon" class="mx-auto mb-2" width="150">

        <vs-divider position="center">订单详情</vs-divider>

        <vs-select
          v-model="select1"
          class="mx-auto mb-2"
          label="选择套餐"
        >
          <vs-select-item v-for="(item,index) in options1" :key="index" :value="item.value" :text="item.text" />
        </vs-select>

        <template slot="footer">
          <vs-button icon-pack="feather" icon="icon-plus" color="warning" class="mx-auto mb-2" @click="openPay">开通 Plus 会员</vs-button>
        </template>
      </vx-card>
    </div>
    <vs-popup :active.sync="popupActivo" title="请使用支付宝支付" style="text-align:center">
      <p class="mb-3">套餐：<code>{{ options1[select1].text }} 超级会员</code></p>
      <p class="mb-3">总费用：<code>{{ options1[select1].money }}元</code></p>
      <div>
        <!-- <vue-qr :text="testUrl" :size="200" /> -->
        <vue-qr :text="payUrl" :size="200" />
      </div>
    </vs-popup>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
import { createOrder, getOrder } from '@/api/order'
import { removeToken } from '@/utils/auth'

export default {
  components: {
    vueQr
  },
  data() {
    return {
      select1: 0,
      popupActivo: false,
      testUrl: 'https://www.baidu.com',
      payUrl: '',
      options1: [
        { text: '一个月', money: 30, value: 0 },
        { text: '半年', money: 60, value: 1 },
        { text: '一年', money: 180, value: 2 },
        { text: '永久', money: 230, value: 3 }
      ]
    }
  },
  methods: {
    openPay() {
      const option = this.options1[this.select1]
      // 构建订单对象
      const order = {
        orderAmount: option.money,
        orderItem: option.value
      }
      this.$vs.loading()
      createOrder(order).then(res => {
        this.$vs.loading.close()
        const order = {
          orderId: res.data.orderId
        }
        this.payUrl = res.data.payUrl
        const tx = this
        this.popupActivo = !this.popupActivo

        // 定时轮询
        tx.intervalObj = setInterval(function() {
          // 根据ID查询订单信息
          getOrder(order).then(res => {
            if (res.data.orderStatus == '1') { // 说明订单状态为支付成功
              // 清空定时器
              tx.popupActivo = !tx.popupActivo
              tx.$vs.notify({
                title: '操作成功',
                text: '升级成超级会员成功',
                color: 'warning',
                position: 'top-center'
              })
              clearInterval(tx.intervalObj)
              removeToken()
              localStorage.removeItem('userInfo')
              tx.$router.push('/pages/login').catch(() => {})
            }
          }).catch(() => {
            // 清空定时器
            clearInterval(tx.intervalObj)
          })
        }, 2000)
      })
    }
  }
}

</script>

<style>
.test {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
