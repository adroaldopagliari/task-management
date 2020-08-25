import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }
  /*private tasks: Task[] = [];
 
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
 
   deleteTask(id: string): void {
     const task = this.getTaskById(id);
 
     this.tasks = this.tasks.filter(taskItem => taskItem.id !== task.id);
   }
 
   updateTaskStatus(id: string, status: TaskStatus): Task {
     const task = this.getTaskById(id);
 
     task.status = status;
 
     return task;
   }*/

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }
}
