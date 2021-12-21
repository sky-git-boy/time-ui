<template>
  <div id="simple-calendar-app">
    <div class="vx-card app-fixed-height">
      <calendar-view
        ref="calendar"
        :display-period-uom="calendarView"
        :show-date="showDate"
        :events="simpleCalendarEvents"
        :event-top="windowWidth <= 400 ? '2rem' : '3rem'"
        enable-drag-drop
        event-border-height="0px"
        event-content-height="1.65rem"
        class="theme-default"
        @click-date="openAddNewEvent"
        @click-event="openEditEvent"
      >
        <div slot="header" class="mb-4">
          <div class="vx-row no-gutter">
            <!-- Month Name -->
            <div class="vx-col w-1/3 items-center sm:flex hidden">
              <!-- Add new event button -->
              <vs-button
                icon-pack="feather"
                icon="icon-plus"
                @click="promptAddNewEvent(new Date())"
              >Add</vs-button
              >
            </div>

            <!-- Current Month -->
            <div
              class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex justify-center order-last"
            >
              <div class="flex items-center">
                <feather-icon
                  icon="ChevronLeftIcon"
                  class="cursor-pointer bg-primary text-white rounded-full"
                  @click="updateMonth(-1)"
                />
                <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{
                  showDate | month
                }}</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  class="cursor-pointer bg-primary text-white rounded-full"
                  @click="updateMonth(1)"
                />
              </div>
            </div>

            <div class="vx-col sm:w-1/3 w-full flex justify-center">
              <vs-button
                class="rounded-r-none p-3 md:px-8 md:py-3"
                @click="calendarView = 'month'"
              >Month</vs-button
              >
              <vs-button
                class="rounded-r-none rounded-l-none p-3 md:px-8 md:py-3"
                @click="calendarView = 'week'"
              >Week</vs-button
              >
              <vs-button
                class="rounded-l-none p-3 md:px-8 md:py-3"
                @click="calendarView = 'year'"
              >Year</vs-button
              >
            </div>
          </div>

          <div class="vx-row sm:flex hidden mt-4">
            <div class="vx-col w-full flex justify-end">
              <!-- Labels -->
              <div class="flex flex-wrap sm:justify-start justify-center">
                <div
                  v-for="(label, index) in calendarLabels"
                  :key="index"
                  class="flex items-center mr-4 mb-2"
                >
                  <div
                    :class="'bg-' + label.color"
                    class="h-3 w-3 inline-block rounded-full mr-2"
                  />
                  <span>{{ label.text }}</span>
                </div>
                <div class="flex items-center mr-4 mb-2">
                  <div
                    class="h-3 w-3 inline-block rounded-full mr-2 bg-primary"
                  />
                  <span>None</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </calendar-view>
    </div>

    <!-- ADD EVENT -->
    <vs-prompt
      :active.sync="activePromptAddEvent"
      :model="form"
      class="calendar-event-dialog"
      title="Add Event"
      accept-text="Add Event"
      @accept="addEvent"
    >
      <div class="calendar__label-container flex">
        <vs-chip
          :class="'bg-' + labelColor(form.tags)"
          class="text-white"
        >{{ labelText(form.tags) }}</vs-chip
        >

        <vs-dropdown
          custom-content
          trigger-click
          class="ml-auto my-2 cursor-pointer"
        >
          <feather-icon
            icon="TagIcon"
            svg-classes="h-5 w-5"
            class="cursor-pointer"
            @click.prevent
          />

          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item
              v-for="(label, index) in calendarLabels"
              :key="index"
              @click="form.tags = label.value"
            >
              <div
                :class="'bg-' + label.color"
                class="h-3 w-3 inline-block rounded-full mr-2"
              />
              <span>{{ label.text }}</span>
            </vs-dropdown-item>

            <vs-dropdown-item @click="form.tags = '0'">
              <div
                class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"
              />
              <span>None</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <vs-input
        v-model="form.title"
        name="event-name"
        class="w-full"
        label-placeholder="Event Title"
      />
      <div class="my-4">
        <small class="date-label">Start Date</small>
        <datepicker
          v-model="form.startDate"
          :disabled="disabledFrom"
          name="start-date"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div class="my-4">
        <small class="date-label">End Date</small>
        <datepicker
          :disabled-dates="disabledDatesTo"
          v-model="form.endDate"
          name="end-date"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
    </vs-prompt>

    <!-- EDIT EVENT -->
    <vs-prompt
      :active.sync="activePromptEditEvent"
      :model="form"
      class="calendar-event-dialog"
      title="Edit Event"
      accept-text="Submit"
      cancel-text="Delete"
      button-cancel="border"
      @cancel="removeEvent"
      @accept="editEvent"
    >
      <div class="calendar__label-container flex">
        <vs-chip
          v-if="form.tags != '0'"
          :class="'bg-' + labelColor(form.tags)"
          class="text-white"
        >{{ labelText(form.tags) }}</vs-chip
        >

        <vs-dropdown vs-custom-content class="ml-auto my-2 cursor-pointer">
          <feather-icon
            icon="TagIcon"
            svg-classes="h-5 w-5"
            @click.prevent
          />

          <vs-dropdown-menu style="z-index: 200001">
            <vs-dropdown-item
              v-for="(label, index) in calendarLabels"
              :key="index"
              @click="form.tags = label.value"
            >
              <div
                :class="'bg-' + label.color"
                class="h-3 w-3 inline-block rounded-full mr-2"
              />
              <span>{{ label.text }}</span>
            </vs-dropdown-item>

            <vs-dropdown-item @click="form.tags = '0'">
              <div
                class="h-3 w-3 mr-1 inline-block rounded-full mr-2 bg-primary"
              />
              <span>None</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <vs-input
        v-model="form.title"
        name="event-name"
        class="w-full"
        label-placeholder="Event Title"
      />
      <div class="my-4">
        <small class="date-label">Start Date</small>
        <datepicker
          :disabled-dates="disabledDatesFrom"
          v-model="form.startDate"
          name="start-date"
        />
      </div>
      <div class="my-4">
        <small class="date-label">End Date</small>
        <datepicker
          :disabled-dates="disabledDatesTo"
          v-model="form.endDate"
          name="end-date"
        />
      </div>
    </vs-prompt>
  </div>
</template>

<script>
import { CalendarView, CalendarViewHeader } from 'vue-simple-calendar'
require('vue-simple-calendar/static/css/default.css')

import Datepicker from 'vuejs-datepicker'

import { listEvent, getEventById, addEvent, deleteEvent, updateEvent } from '@/api/calendar'

export default {
  components: {
    CalendarView,
    CalendarViewHeader,
    Datepicker
  },
  data() {
    return {
      showDate: new Date(),
      disabledFrom: false,

      calendarView: 'month',

      activePromptAddEvent: false,
      activePromptEditEvent: false,
      simpleCalendarEvents: [],
      form: {}
    }
  },
  computed: {
    disabledDatesTo() {
      return { to: new Date(this.startDate) }
    },
    disabledDatesFrom() {
      return { from: new Date(this.endDate) }
    },
    calendarLabels() {
      return this.$store.state.calendar.calendarLabels
    },
    labelColor() {
      return label => {
        if (label == '2') return 'success'
        else if (label == '1') return 'warning'
        if (label == '3') return 'danger'
        if (label == '0') return 'primary'
      }
    },
    labelText() {
      return label => {
        if (label == '2') return 'business'
        else if (label == '1') return 'work'
        if (label == '3') return 'personal'
        if (label == '0') return 'none'
      }
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  created() {
    this.getListEvent()
  },
  methods: {
    getListEvent() {
      listEvent().then(res => {
        this.simpleCalendarEvents = res.data
      })
    },
    addEvent() {
      this.$vs.loading()
      this.form.startDate = this.convertUTCTimeToLocalTime(this.form.startDate)
      this.form.endDate = this.convertUTCTimeToLocalTime(this.form.endDate)
      this.form.classes = 'event-' + this.labelColor(this.form.tags)
      addEvent(this.form).then(res => {
        this.getListEvent()
        this.$vs.notify({
          title: 'Success',
          text: '添加成功',
          color: 'success'
        })
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: '添加失败',
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    updateMonth(val) {
      this.showDate = this.$refs.calendar.getIncrementedPeriod(val)
      console.log(this.showDate)
    },
    clearFields() {
      this.form = {
        title: undefined,
        startDate: undefined,
        endDate: undefined,
        tags: '0',
        classes: 'event-primary'
      }
    },
    promptAddNewEvent(date) {
      this.disabledFrom = false
      this.addNewEventDialog(date)
    },
    addNewEventDialog(date) {
      this.clearFields()
      this.form.startDate = date
      this.form.endDate = date
      this.activePromptAddEvent = true
    },
    openAddNewEvent(date) {
      this.disabledFrom = true
      this.addNewEventDialog(date)
    },
    openEditEvent(event) {
      getEventById(event.id).then(res => {
        this.form = res.data
      })
      this.activePromptEditEvent = true
    },
    editEvent() {
      this.$vs.loading()
      this.form.startDate = this.convertUTCTimeToLocalTime(this.form.startDate)
      this.form.endDate = this.convertUTCTimeToLocalTime(this.form.endDate)
      this.form.classes = 'event-' + this.labelColor(this.form.tags)
      updateEvent(this.form).then(res => {
        this.getListEvent()
        this.$vs.notify({
          title: 'Success',
          text: '修改成功',
          color: 'success'
        })
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: '修改失败',
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    removeEvent() {
      this.$vs.loading()
      deleteEvent(this.form.id).then(res => {
        this.getListEvent()
        this.$vs.notify({
          title: 'Success',
          text: '删除成功',
          color: 'success'
        })
        this.$vs.loading.close()
      }).catch(e => {
        this.$vs.notify({
          title: 'Fail',
          text: '删除失败',
          color: 'danger'
        })
        this.$vs.loading.close()
      })
    },
    eventDragged(event, date) {
      console.log(event)
      console.log(date)
      this.$store.dispatch('calendar/simpleCalendarEventDragged', {
        event: event,
        date: date
      })
    },
    convertUTCTimeToLocalTime: function(UTCDateString) {
      if (!UTCDateString) {
        return '-'
      }
      function formatFunc(str) { // 格式化显示
        return str > 9 ? str : '0' + str
      }
      var date2 = new Date(UTCDateString) // 这步是关键
      var year = date2.getFullYear()
      var mon = formatFunc(date2.getMonth() + 1)
      var day = formatFunc(date2.getDate())
      var hour = date2.getHours()
      hour = hour >= 12 ? hour - 12 : hour
      hour = formatFunc(hour)
      var min = formatFunc(date2.getMinutes())
      var sec = formatFunc(date2.getSeconds())
      var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ':' + sec
      return dateStr
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/simple-calendar.scss";
</style>
