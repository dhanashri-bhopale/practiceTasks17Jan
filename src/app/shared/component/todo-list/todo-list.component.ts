import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itodo } from '../../model/todo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetConfirmComponent } from '../get-confirm/get-confirm.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
@Input() todoObj !: Array<Itodo>
@Output() emitRemove : EventEmitter<string> = new EventEmitter<string>()
@Output() emitEdit : EventEmitter<Itodo> = new EventEmitter<Itodo>()
  constructor(
    private _matDialog : MatDialog
  ) { }

  ngOnInit(): void {
  }

  trackById(id: number, todo: Itodo){
    return todo.todoId
  }

  onRemove(todo: Itodo){

    let matConfig = new MatDialogConfig()
    matConfig.disableClose = true

    let matDialogRef = this._matDialog.open(GetConfirmComponent, matConfig)
    matDialogRef.afterClosed()
    .subscribe(res => {
      if(res){
        console.log(res)
        this.emitRemove.emit(todo.todoId)
      }
    })
  }

  onEdit(todo: Itodo){
    this.emitEdit.emit(todo)
  }

}
