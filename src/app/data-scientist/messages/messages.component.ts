import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  tasks: Task[] = [
    {name: 'Task 1', description: 'Description 1', progress: 50},
    {name: 'Task 2', description: 'Description 2', progress: 70},
  ];

  constructor() { }

  ngOnInit() {
  }

}
