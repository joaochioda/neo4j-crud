<script>
export default {
  name: "Person",
  props: {
    person: {
      type: Object,
      required: true,
    },
    deletePerson: {
      type: Function,
      required: true,
    },
  },
};


</script>

<template>
  <v-btn
    icon
    color="pink"
    height="28"
    width="28"
    @click="deletePerson(person._id)"
  >
    <v-icon size="small">mdi-delete</v-icon>
  </v-btn>
  <span class="name">{{ person.name }}</span>
  <span class="age">{{person.age.low}} years</span>
  <v-btn
    icon
    color="yellow"
    height="28"
    width="28"
  >
    <v-icon size="small">mdi-reload</v-icon>
  </v-btn>
 
</template>

<style scoped>

</style>
