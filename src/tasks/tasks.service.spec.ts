import { Test } from '@nestjs/testing';

import TasksService from './tasks.service';
import TaskRepository from './task.repository';
import GetTasksFilterDTO from './dto/get-tasks-filter.dto';
import TaskStatus from './task-status.enum';

const mockUser = { id: 12, username: 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('should get all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDTO = {
        status: TaskStatus.IN_PROGRESS,
        search: 'Some search query',
      };

      const result = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should retrieve a specific task', async () => {
      const mockTask = {
        title: 'Test task',
        description: 'Test desc',
      };

      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);

      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id,
        },
      });
    });

    it('should throws an error if the task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow();
    });
  });
});
