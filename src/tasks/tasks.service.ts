import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import GetTasksFilterDTO from './dto/get-tasks-filter.dto';
import TaskRepository from './task.repository';
import Task from './task.entity';
import TaskStatus from './task-status.enum';
import CreateTaskDTO from './dto/create-task.dto';

@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDTO);

    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDTO);

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const { affected } = await this.taskRepository.delete(id);

    if (affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    await task.save();

    return task;
  }
}
