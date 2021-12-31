<template lang="html">
  <div>
    <vs-popup
      :active.sync="popupActivo"
      class="holamundo"
      title=""
    >
      <vx-card class="text-center bg-primary-gradient greet-user" style="height: 272px;">
        <img src="@/assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
        <img src="@/assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
        <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svg-classes="h-8 w-8"/>
        <h1 class="mb-6 text-white">{{ user_displayName }}</h1>
        <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">您已经完成您指定的奖励规则。</p>
        <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">奖励内容：{{ content }}</p>
      </vx-card>
    </vs-popup>
  </div>
</template>

<script>

export default {
  data: () => ({
    socket: null,
    content: '',
    popupActivo: false
  }),
  computed: {
    userId() {
      return JSON.parse(localStorage.getItem('userInfo')).userId
    },
    user_displayName() {
      // return 'SKY'
      return JSON.parse(localStorage.getItem('userInfo')).displayName
    }
  },
  created() {
    this.openSocket()
  },
  methods: {
    openPop() {
      this.popupActivo = !this.popupActivo
    },
    openSocket() {
      if (typeof WebSocket == 'undefined') {
        console.log('您的浏览器不支持WebSocket')
      } else {
        var vr = this
        // 实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
        // 等同于socket = new WebSocket("ws://localhost:8888/xxxx/im/25");
        // var socketUrl="${request.contextPath}/im/"+$("#userId").val();
        var socketUrl = 'http://localhost/member/imserver/' + vr.userId
        socketUrl = socketUrl.replace('https', 'ws').replace('http', 'ws')
        if (vr.socket != null) {
          vr.socket.close()
          vr.socket = null
        }
        vr.socket = new WebSocket(socketUrl)
        // 打开事件
        vr.socket = new WebSocket(socketUrl)
        // 打开事件
        vr.socket.onopen = function() {
          console.log('websocket已打开')
          // socket.send("这是来自客户端的消息" + location.href + new Date());
        }
        // 获得消息事件
        vr.socket.onmessage = function(msg) {
          vr.openPop()
          vr.content = msg.data
        }
        // 关闭事件
        vr.socket.onclose = function() {
          console.log('websocket已关闭')
        }
        // 发生了错误事件
        vr.socket.onerror = function() {
          console.log('websocket发生了错误')
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .greet-user{
    position: relative;
    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
</style>

