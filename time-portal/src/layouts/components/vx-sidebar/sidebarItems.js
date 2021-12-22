/* =========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
==========================================================================================*/

export default [{
  url: '/todo-list',
  name: 'Todo看板',
  slug: 'todo-list',
  icon: 'BarChart2Icon',
  i18n: 'TodoList'
},
{
  url: '/todo',
  name: 'Todo',
  slug: 'todo',
  icon: 'CheckCircleIcon',
  i18n: 'Todo'
},
{
  url: '/diary',
  name: '每日自省',
  slug: 'diary',
  icon: 'Edit2Icon',
  i18n: 'diary'
},
{
  url: '/stats',
  name: '数据统计',
  slug: 'stats',
  icon: 'PieChartIcon',
  i18n: 'stats'
},
{
  url: '/vue-fullcalendar',
  name: '日历看板',
  slug: 'calendarFullCalendar',
  icon: 'CalendarIcon',
  i18n: 'FullCalendar'
},
{
  url: '/goal',
  name: '目标脑图',
  slug: 'goal',
  icon: 'SendIcon',
  i18n: 'goal'
},
{
  url: '/music',
  name: '白噪音',
  slug: 'music',
  icon: 'MusicIcon',
  i18n: 'music'
},
{
  url: '/tomato',
  name: '番茄钟',
  slug: 'tomato',
  icon: 'ClockIcon',
  i18n: 'tomato'
}
]
