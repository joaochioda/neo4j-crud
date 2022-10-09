<script>
import { ref } from 'vue';

export default {
  name: "Person",
  setup(props) {
    const editMode = ref(false);
    const name = ref(props.person.name);
    const age = ref(props.person.age.low);
    return { editMode, name, age };
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
    deletePerson: {
      type: Function,
      required: true,
    },
    editPerson: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClickEditButton() {
      this.editMode = this.editMode ? false : true;
    },
    handleClickSaveButton() {
      this.editPerson(this.person._id, this.name, this.age);
      this.editMode = false;
    },
  },
};


</script>

<template>
  <div v-if="editMode === false" class="person">
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
      @click="handleClickEditButton"
    >
      <v-icon size="small">mdi-pen</v-icon>
    </v-btn>
  </div>
  <div v-if="editMode === true" class="form">
    <v-btn
      icon
      color="red"
      height="28"
      width="28"
      @click="handleClickEditButton"
    >
      <v-icon size="small">mdi-cancel</v-icon>
    </v-btn>
    <label>Name</label>
    <input type="text" v-model="name" />
    <label>Age</label>
    <input type="number" v-model="age" />
    <v-btn
      icon
      color="blue"
      height="28"
      width="28"
      @click="handleClickSaveButton()"
    >
      <v-icon size="small">mdi-check</v-icon>
    </v-btn>
  </div>
 
</template>

<style scoped>
.form {
  display: flex;
  gap: 10px;
}
input {
  border: 2px slateblue solid;
  border-radius: 5px;
}
.person {
  display: flex;
  gap: .625rem;
}
</style>
