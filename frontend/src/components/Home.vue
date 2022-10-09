<script>
import { defineComponent, onMounted, ref } from "vue";
import api from "../services/api";
import Person from "./Person.vue";

export default defineComponent({
  name: "Home",
  setup() {
    const person = ref([]);
    const addField = ref(false);
    const name = ref("");
    const age = ref("");

    const fetchPeople = async () => {
      const response = await api.get("/person");
      person.value = response.data;
    };

    onMounted(fetchPeople);
    return { person, addField, name, age };
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
    editPerson(id, name, age) {
      api.put(`/person/${id}`, { name, age }).then((response) => {
        const newPerson = response.data;
        const person = this.person.map((person) => person._id === id ? newPerson : person);
        this.person = person;
      });
    },

    handleClickAddButton() {
      this.addField = this.addField ? false : true;
    },
    async handleClickAddPerson() {
     const response = await api
        .post("/person", {
          name: this.name,
          age: this.age,
        })

      this.person.push(response.data);
      this.addField = false;
      this.name = "";
      this.age = "";
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
    @click="handleClickAddButton"
    >
    <v-icon size="small">mdi-plus</v-icon>
  </v-btn>
  </div>

  <div v-if="addField === true" class="form-new-user">
    <label>Name:</label>
    <input type="text" v-model="name" />
    <label>Age:</label>
    <input type="number" v-model="age" />

    <v-btn
    icon
    color="blue"
    height="28"
    width="28"
    @click="handleClickAddPerson"
    >
      <v-icon size="small">mdi-check</v-icon>
    </v-btn>
  </div>

  <ul>
    <li v-for="person in person" :key="person.id">
      <Person :person="person" :deletePerson="deletePerson" :editPerson="editPerson" />
    </li>
  </ul>
</template>

<style scoped>
.form-new-user {
  display: flex;
  gap: .625rem;
}
input {
  border: 2px slateblue solid;
  border-radius: 5px;
}
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

</style>
