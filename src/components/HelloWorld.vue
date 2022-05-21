<template>
  <div class="memo">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="(item, index) in topTodos" :key="index">
        <span @click="tryToEditTodo(index),makeTrueToEdit()">
          {{ item }}
        </span>
      </li>
      <li>
        <span @click="makeTrueToAdd()">+</span>
      </li>
    </ul>
    <div v-if="whetherToAdd">
      <textarea v-model="addTemp"></textarea>
      <button @click="addTodo()">追加</button><br>
    </div>
    <div v-if="whetherToEdit">
        <textarea v-model="editTemp"></textarea>
        <button @click="editTodo()">編集</button>
        <button @click="deleteTodo()">削除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoIndex',
  props: {
    msg: String
  },
  data: function() {
    return{
      whetherToAdd: false,
      whetherToEdit: false,
      todos: [],
      topTodos: [],
      addTemp: null,
      editTemp: null,
      editIndex: null,
    }
  },
  mounted() {
    if (localStorage.getItem('memos')) {
      try {
        this.todos = JSON.parse(localStorage.getItem('memos'));
      } catch(e) {
        localStorage.removeItem('memos');
      }
    }
    for (let i = 0; i < this.todos.length; i++) {
      this.topTodos[i] = this.todos[i].split('\n')[0]
    }
  },
  methods: {
    makeTrueToAdd() {
      this.whetherToAdd = true
      this.whetherToEdit = false
      this.editTemp =''
      this.editIndex=''
    },
    makeTrueToEdit() {
      this.whetherToAdd = false
      this.whetherToEdit = true
      this.addTemp = null
    },
    addTodo() {
      this.todos.push(this.addTemp)
      this.topTodos.push(this.addTemp.split('\n')[0])
      this.addTemp = null
      this.saveTodo()
    },
    saveTodo(){
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem('memos', parsed);
    },
    deleteTodo() {
      this.todos.splice(this.editIndex,1)
      this.topTodos.splice(this.editIndex,1)
      this.editTemp = null
      this.editIndex= null
      this.saveTodo()
    },
    tryToEditTodo(index) {
      this.editTemp = this.todos[index]
      this.editIndex = index
    },
    editTodo() {
      this.todos.splice(this.editIndex, 1, this.editTemp)
      this.topTodos.splice(this.editIndex, 1, this.editTemp.split('\n')[0])
      this.editTemp = null
      this.editIndex= null
      this.saveTodo()
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
li:hover {
  color: blue;
}
a {
  color: #42b983;
  margin: 0 10px;
}
textarea {
  width: 50%;
  height: 400px;
}
</style>
