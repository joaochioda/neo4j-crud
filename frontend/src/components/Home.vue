<script>
import { defineComponent, onMounted, ref } from "vue";
import api from "../services/api";
import Person from "./Person.vue";

export default defineComponent({
  name: "Home",
  setup() {
    const person = ref([]);
    const fetchPeople = async () => {
      const response = await api.get("/person");
      person.value = response.data;
    };
    onMounted(fetchPeople);
    return { person };
  },
  components: {
    Person,
  },
  methods: {
    deletePerson(id) {
      api.delete(`/person/${id}`).then(() => {
        const person = this.person.filter((person) => person._id !== id);
        this.person = person;
      });
    },
  },
});
</script>

<template>
  <div class="header">
    <h1>User registration</h1>   
    <v-btn
    icon
    color="green"
    height="28"
    width="28"
    >
    <v-icon size="small">mdi-plus</v-icon>
  </v-btn>
  </div>

  <ul>
    <li v-for="person in person" :key="person.id">
      <Person :person="person" :deletePerson="deletePerson" />
    </li>
  </ul>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: .625rem;
}

ul {
  padding: 0;
  padding-top: 1rem;
  list-style: none;
}
li {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: .625rem;
  padding-top: 0.625rem;
}
.name {
  color: red;
}
.age {
  color: blue;
}
</style>
