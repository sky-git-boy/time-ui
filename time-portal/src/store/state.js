/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
==========================================================================================*/

import navbarSearchAndPinList from '@/layouts/components/navbarSearchAndPinList'
import themeConfig from '@/../themeConfig.js'
import colors from '@/../themeConfig.js'
import img from '../assets/images/profile/pages/page-01.jpg';
import bigsurfurl from '../assets/msc/bigsurf.mp3';
import birdsurl from '../assets/msc/birds.mp3';
import coffeeurl from '../assets/msc/coffee.mp3';
import rainbesturl from '../assets/msc/rainbest.mp3';
import snowurl from '../assets/msc/snow.mp3';
import thunderurl from '../assets/msc/thunder.mp3';

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || 'light',
  navbarSearchAndPinList: navbarSearchAndPinList,
  img: img,
  AppActiveUser: {
    id: 0,
    name: 'John Doe',
    about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    img: 'avatar-s-11.png',
    status: 'online',
  },

  themePrimaryColor: colors.primary,

  starredPages: navbarSearchAndPinList.data.filter((page) => page.highlightAction),
  userRole: null,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar component
  windowWidth: null,

  // 这里为非长期保存参数，只在整个番茄钟周期中使用到
  time: {
    min: 0, // 当前番茄时间
    sec: 0,
    // initMin: 25, // 初始化工作番茄时间，已经转移至state.sidebar
    initSec: 0,
    // restMin: 0, // 休息番茄时间，已经转移至state.sidebar
    restSec: 0,
    isTimeOver: false, // 整个番茄时钟结束
    // isAutoRest: true, // 是否自动进入休息番茄，已经转移至state.sidebar
    tomatoStatus: 1, // （番茄状态） 1 工作状态、2 休息状态
    status: 1, // （按钮状态） 1 番茄未开始、2 番茄已经开始、3 番茄暂停、4 休息番茄-只有跳过按钮
  },

  colors: {
    color1: '#ff4e88',
    color2: '#ff6700',
    color3: '#ffe300',
    color4: '#02e079',
    color5: '#325bf0',
    color6: '#a04cf7',
  },

  song: {
    audio: null,

    currSong: {
      index: 0,
      currentTime: 0,
      duration: 0,
      readyState: false,
      isPlay: false,
    },
    list: [{
      name: '',
      url: '',
      picurl: img,
      artistsname: '',
    }, ],
  },

  noise: {
    audio: new Audio(),
    content: {
      name: '',
      tit: '',
      url: '',
      picurl: img,
      artistsname: '',
    },
  },

  sidebar: {
    isShowSidebar: false,
    setting: {
      isPlayAudio: {
        name: 'isPlayAudio',
        tit: '播放TODO页音效',
        state: true,
      },
      isAutoRest: {
        name: 'isAutoRest',
        tit: '自动开始休息番茄',
        state: true,
      },
      workTomato: {
        name: 'workTomato',
        tit: '工作番茄时长(分)',
        time: 25,
      },
      restTomato: {
        name: 'restTomato',
        tit: '休息番茄时长(分)',
        time: 5,
      },
      whiteNoise: {
        name: 'whiteNoise',
        tit: '选择喜欢的白噪声',
        defaultSelect: 'birds',
        items: [{
            name: 'bigsurf',
            tit: '大海',
            url: bigsurfurl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/bigsurf.jpg',
            artistsname: '澎湃的大海声',
          },
          {
            name: 'birds',
            tit: '山野',
            url: birdsurl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/birds.jpg',
            artistsname: '山野间的虫鸣鸟叫',
          },
          {
            name: 'coffee',
            tit: '咖啡',
            url: coffeeurl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/coffee.jpg',
            artistsname: '繁忙的咖啡馆',
          },
          {
            name: 'rainbest',
            tit: '暴雨',
            url: rainbesturl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/rainbest.jpg',
            artistsname: '急切的暴雨',
          },
          {
            name: 'snow',
            tit: '雪',
            url: snowurl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/snow.png',
            artistsname: '宁静的雪花',
          },
          {
            name: 'thunder',
            tit: '雷雨',
            url: thunderurl,
            picurl: 'https://gitee.com/kevin_zhao_2233/one-day-static/raw/master/img/thunder.jpg',
            artistsname: '盛夏的雷雨天',
          },
        ],
      },
    },
  }
}

export default state
