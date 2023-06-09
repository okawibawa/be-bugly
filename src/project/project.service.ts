import { Prisma } from '@prisma/client';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async findProjectById(findProjectById: { id: string }) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: +findProjectById.id,
      },
    });

    if (!project) {
      throw new BadRequestException("Project doesn't exist.");
    }

    return project;
  }

  async findProjects(findProjectQuery: { skip: number; take: number }) {
    try {
      const skip = 0;
      const take = 5;

      const projects = await this.prismaService.project.findMany({
        skip: findProjectQuery?.skip ? +findProjectQuery?.skip : skip,
        take: findProjectQuery?.take ? +findProjectQuery?.take : take,
      });

      const count = await this.prismaService.project.count();

      return {
        metadata: {
          count,
        },
        projects: [...projects],
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(
          'Incorrect URL params data type. Skip and take must be number.',
        );
      }

      throw error;
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const project = await this.prismaService.project.create({
        data: {
          name: createProjectDto.name,
          description: createProjectDto.description,
          slug: 'SLUG', // placeholder value, replace with value from the project name
          leadId: 15 // placeholder value, replace with value fetched from user model 
        },
      });

      return project;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException(
            'Project with the same name is already exist.',
          );
        }
      }

      throw error;
    }
  }
}
