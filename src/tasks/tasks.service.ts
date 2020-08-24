import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

import * as uuid from 'uuidv1';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDTO;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = this.tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter(task => 
        task.title.includes(search) ||
        task.description.includes(search),
      );      
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    const [task] = this.tasks.splice(taskIndex, 1);

    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const taskIndex = this.tasks.findIndex(task => task.id === id);

    this.tasks[taskIndex].status = status;

    console.log(status);

    return this.tasks[taskIndex];
  }
}
