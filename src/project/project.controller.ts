import { Controller, Query, Body, Get, Post } from '@nestjs/common';

import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async findProjects(
    @Query() findProjectQuery: { skip: number; take: number },
  ) {
    return this.projectService.findProjects(findProjectQuery);
  }

  @Post()
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }
}
