import { observable, computed, action } from 'mobx'

export interface todo {
  id: number;
  text: string;
  CheckBoxState: boolean;
  favoritesState: boolean;
  subTodos?:[];

}

class AppState {

  @observable todos: any[] = [];

  constructor(initialTodos: any) {
    this.todos = initialTodos || []
  }

  @computed get visibleTodos() {
    console.log("AppState visibleTodos")
    return this.todos
  }

  visibleSectionListTodos() {
    console.log("AppState visibleSectionListTodos")
    const inProgress: any[] = []
    const doneProgress: any[] = []
    this.todos.forEach((todo:any) => {
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
  return this.todos.filter((todo:any) => todo.CheckBoxState).length
}

  findTodo = (id: number) => {
    console.log("AppState.findTodo id:"+id)
    return this.todos.find((todo: any) => todo.id === id)
  }

  @action addTodo = (text: string,CheckBoxState: boolean = false) => {
    console.log("AppState.addTodo text:["+text+"]  CheckBoxState:["+CheckBoxState+"]")

    const todo:todo = {
      id: this.todos.length,
      text,
      CheckBoxState,
      favoritesState: false,
      subTodos:[],
    }
    // this.todos.unshift(todo)
    this.todos.push(todo)
    // console.log("AppState addTodo todos:"+JSON.stringify(this.todos, null, 2))
    // return todo
  }

  @action addSubTodo = (supID:number, text: string,CheckBoxState: boolean = false) => {
    console.log("AppState addSubTodo text:["+text+"]  CheckBoxState:["+CheckBoxState+"]")

    const supTodo = this.findTodo(supID)
    const todo:todo = {
      id: this.todos.length,
      text,
      CheckBoxState,
      favoritesState: false,
    }

    supTodo.subTodos.push(todo)
    // console.log("AppState addTodo todos:"+JSON.stringify(this.todos, null, 2))
    // return todo
  }

  getCellTitle = (id: number) => {
    console.log("AppState.getCellTitle id:"+id);
    const todo = this.findTodo(id);
    return todo ? todo.text : '';
  }

  getFavoritesState = (id: number) => {
    console.log("AppState.getFavoritesState id:"+id);
    const todo = this.findTodo(id);
    return todo ? todo.favoritesState : false;
  }

  getCheckBoxState = (id: number) => {
    console.log("AppState.getCheckBoxState id:"+id);
    const todo = this.findTodo(id);
    return todo ? todo.CheckBoxState : false;
  }

  @action deleteTodo = (id: number) => {
    console.log("AppState.deleteTodo id:"+id);
    const todo = this.findTodo(id);
    if (todo) {
      this.todos = this.todos.filter((t) => t.id !== id);
    }

  }

  @action editTodo = (id: number, text: string, CheckState: boolean) => {
    console.log("AppState.editTodo id:["+id+"] text:["+text+"]");
    const todo = this.findTodo(id);
    if (todo) {
      todo.text = text;
      todo.CheckBoxState = CheckState;
    }
  }

  completeTodo = (id: number) => {
    console.log("AppState.completeTodo id:"+id);
    const todo = this.findTodo(id);
    if (todo) {
      todo.CheckBoxState = !todo.CheckBoxState;
    }

  }

  favoritesTodo = (id: number) => {
    console.log("AppState.favoritesTodo id:"+id);
    const todo = this.findTodo(id);
    if (todo) {
      todo.favoritesState = !todo.favoritesState;
    }
  }
}

export default AppState;
