import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'taskit';
  tasks: String[] = [];
  newTask: String = "";
  strikes: number[] = [];
  addTask() {
	this.tasks.push(this.newTask);
	this.newTask = "";
	localStorage.setItem("tasks", JSON.stringify(this.tasks));
	localStorage.setItem("strikes", JSON.stringify(this.strikes));
  }
  deleteTask(position: number) {
	if (!this.strikes.includes(position)) {
		this.strikes.push(position);
	} else {
		this.tasks.splice(position, 1);
		this.strikes = this.strikes.filter((value) => value != position);
	}
	localStorage.setItem("tasks", JSON.stringify(this.tasks));
	localStorage.setItem("strikes", JSON.stringify(this.strikes));
  }

  clearTasks() {
	this.tasks = [];
	this.strikes = [];
	localStorage.setItem("tasks", JSON.stringify(this.tasks));
	localStorage.setItem("strikes", JSON.stringify(this.strikes));
  }

  ngOnInit(): void {
	let task_json = localStorage.getItem("tasks");
	if (task_json !== null) {
		this.tasks = JSON.parse(task_json);
	}
	let strikes_json = localStorage.getItem("strikes");
	if (strikes_json !== null) {
		this.strikes = JSON.parse(strikes_json);
	}
  }
}
