import { observable, computed, action } from 'mobx'


class AppState {

  @observable todos: any[] = [];


  constructor(initialTodos: any) {
    this.todos = initialTodos || []
  }

  @computed get visibleTodos() {
    return this.todos
  }

  visibleSectionListTodos() {
    const inProgress: any[] = []
    const doneProgress: any[] = []
    this.todos.forEach(todo => {
     console.log(todo);
     if (todo.CheckBoxState){
       doneProgress.push(todo)
     }else{
       inProgress.push(todo)
     }
   });
   const sections = [
     {
       title: '进行中',
       data: inProgress,
     },
     {
       title: '已完成',
       data: doneProgress,
     },
   ];
   return sections;
 }
 @computed get completedCount() {
  console.log("AppState completedCount")
  return this.todos.filter(todo => todo.CheckBoxState).length
}
  findTodo = (id: number) => {
    console.log("AppState.findTodo id:"+id)
    return this.todos.find((todo: any) => todo.id === id)
  }

  @action addTodo = (text: string) => {
    const todo = {
      id: this.todos.length,
      text,
      CheckBoxState: false,
      favoritesState: false,
    }
    this.todos.unshift(todo)
    return todo
  }

  getCellTitle = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.text : '';
  }

  getFavoritesState = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.favoritesState : false;
  }

  getCheckBoxState = (id: number) => {
    const todo = this.findTodo(id);
    return todo ? todo.CheckBoxState : false;
  }

  @action deleteTodo = (id: number) => {
    const todo = this.findTodo(id);
    if (todo) {
      this.todos = this.todos.filter(t => t.id !== id);
    }
  }

  @action editTodo = (id: number, text: string) => {
    const todo = this.findTodo(id);
    if (todo) {
      todo.text = text;
    }
  }

  completeTodo = (id: number) => {
    console.log("AppState.completeTodo id:"+id);
    const todo = this.findTodo(id);
    if (todo) {
      todo.CheckBoxState = !todo.CheckBoxState;
    }
    // console.log("AppState.completeTodo.id:["+id+"]  CheckBoxState:["+todo.CheckBoxState);

  }

  favoritesTodo = (id: number) => {
    console.log("AppState.favoritesTodo id:"+id);
    const todo = this.findTodo(id);
    if (todo) {
      todo.favoritesState = !todo.favoritesState;
    }
    // console.log("AppState.favoritesTodo.id:["+id+"]  favoritesState:["+todo.favoritesState);
  }
}

export default AppState;
