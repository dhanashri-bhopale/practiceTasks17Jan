import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Itodo } from '../../model/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  @ViewChild('todoForm') todoForm !: NgForm
  @Output() emitNewTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>()
  @Input() editObj !: Itodo
  @Output() emitUpdateTodo : EventEmitter<Itodo> = new EventEmitter<Itodo>() 

  isInEditMode: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!!changes['editObj']['currentValue']){
      this.todoForm.form.patchValue(changes['editObj']['currentValue'])
      this.isInEditMode = true
    }
  }

  onAdd(){
    if(this.todoForm.valid){
      let todoObj: Itodo = {...this.todoForm.value, id: Date.now().toString()}
      this.emitNewTodo.emit(todoObj)
    }
  }

  onUpdate(){
    if(this.todoForm.valid){
      let updatedObj : Itodo = {...this.todoForm.value, id: this.editObj.todoId}
      console.log(updatedObj)
      this.emitUpdateTodo.emit(updatedObj)

      this.isInEditMode = false
      this.todoForm.reset()
    }
  }

}
