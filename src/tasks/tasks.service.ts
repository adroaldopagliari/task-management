import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/auth/user.entity';
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

  async getTasks(filterDTO: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDTO, user);

    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const { id: userId } = user;

    const task = await this.taskRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = await this.taskRepository.createTask(createTaskDTO, user);

    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const { id: userId } = user;

    const { affected } = await this.taskRepository.delete({ id, userId });

    if (affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;

    await task.save();

    return task;
  }
}
