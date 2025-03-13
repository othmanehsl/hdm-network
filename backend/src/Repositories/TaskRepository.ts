import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ): Promise<Task> {
    if (!data.id) {
      // Création d'une nouvelle tâche
      return this.prisma.task.create({
        data: {
          name: data.name as string,
          description: (data as any).description || null,
          date: new Date(data.date as Date | string),
          status: data.status as any,
        },
      });
    } else {
      // Mise à jour d'une tâche existante
      return this.prisma.task.update({
        where: { id: Number(data.id) },
        data: {
          name: data.name as string,
          description: (data as any).description || null,
          date: new Date(data.date as Date | string),
          status: data.status as any,
        },
      });
    }
  }
}
