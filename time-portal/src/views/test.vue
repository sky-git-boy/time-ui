<template lang="html">
  <div class="">
    <select>
      <option>Here is the first option</option>
      <option>The second option</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select4: 5,
      options4: [
        { text: 'Square', value: 1 },
        { text: 'Rectangle', value: 2 },
        { text: 'Rombo', value: 3 },
        { text: 'Romboid', value: 4 },
        { text: 'Trapeze', value: 5 },
        { text: 'Triangle', value: 6 },
        { text: 'Polygon', value: 7 }
      ]
    }
  },
  methods: {
    prueba() {
      console.log('prueba de focsu')
    }
  }
}
</script>

<style>
  select {
    background: transparent;
    outline: none;
    border: none;
  }
</style>
