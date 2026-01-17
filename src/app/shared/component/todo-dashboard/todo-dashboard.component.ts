import { Component, Input, OnInit } from '@angular/core';
import { Itodo } from '../../model/todo';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.scss']
})
export class TodoDashboardComponent implements OnInit {
  getEditObj !: Itodo

  constructor(
    private _snackbar : SnackbarService
  ) { }

  ngOnInit(): void {
  }

  todoArr: Array<Itodo> = [
    {
      todoId: '123',
      todoItem: 'Angular'
    },
    {
      todoId: '124',
      todoItem: 'JavaScript'
    },
    {
      todoId: '125',
      todoItem: 'RxJs'
    }
  ]

  getNewTodo(todo: Itodo){
    this.todoArr.unshift(todo)
    this._snackbar.openSnackBar(`The TodoItem Added Successfully`)
  }

  getRemove(id: string){
    let getIndex = this.todoArr.findIndex(t => t.todoId === id)
    this.todoArr.splice(getIndex,1)

    this._snackbar.openSnackBar(`The TodoItem Removed Successfully!!!`)
  }

  getEdit(todo: Itodo){
    this.getEditObj = todo
  }

  getUpdateTodo(todo: Itodo){
    let getIndex = this.todoArr.findIndex(t => t.todoId === todo.todoId)
    console.log(getIndex)
    this.todoArr[getIndex] = todo

    this._snackbar.openSnackBar(`The TodoItem Updated Successfully`)
  }

}
