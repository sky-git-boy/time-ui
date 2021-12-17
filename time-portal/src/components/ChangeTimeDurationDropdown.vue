<template>
  <vs-dropdown vs-trigger-click class="cursor-pointer">
    <small class="flex cursor-pointer">Last 7 days <feather-icon icon="ChevronDownIcon" svg-classes="h-4 w-4" class="ml-1"/></small>
    <vs-dropdown-menu class="w-32">
      <vs-dropdown-item @click="$emit('timeDurationChanged', 'last-28-days')">Last 28 days</vs-dropdown-item>
      <vs-dropdown-item @click="$emit('timeDurationChanged', 'last-month')">Last Month</vs-dropdown-item>
      <vs-dropdown-item @click="$emit('timeDurationChanged', 'last-year')">Last Year</vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>
