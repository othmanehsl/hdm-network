import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
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
  ) {
    // For create operation (no id provided)
    if (!data.id) {
      return this.prisma.task.create({
        data: {
          // Ensure name is treated as a string
          name: data.name as string,
        },
      });
    } else {
      // For update operation
      return this.prisma.task.update({
        where: { id: Number(data.id) }, // Convert to number
        data: {
          // Only include name in the update data
          name: data.name as string,
        },
      });
    }
  }
}
