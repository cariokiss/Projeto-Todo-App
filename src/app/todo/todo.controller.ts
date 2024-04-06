import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

    @Get()
    @ApiOperation({ summary: 'Listar todas as tarefas' })
    @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso' })
    
    async index() {
        return await this.todoService.findAll();
    }   

    @Post()
    @ApiOperation({ summary: 'Adicionar um nova tarefa' })
    @ApiResponse({ status: 201, description: 'Nova tarefa criada com sucesso' })
    @ApiResponse({ status: 400, description: 'Parâmetros inválidos' })
    async create(@Body() body: CreateTodoDto) {
        return await this.todoService.create(body);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Exibir os dados de uma tarefa' })
    @ApiResponse({ status: 200, description: 'Dados de uma tarefa retornado com sucesso' })
    @ApiResponse({ status: 404, description: 'Task não foi encontrada' })
    async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar os dados de uma tarefa' })
    @ApiResponse({ status: 200, description: 'Tarefa atualizada com sucesso' })
    @ApiResponse({ status: 404, description: 'Task não foi encontrada' })
    async update(@Param('id', new ParseUUIDPipe())  id: string, 
    @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remover uma tarefa' })
    @ApiResponse({ status: 204, description: 'Tarefa removida com sucesso' })
    @ApiResponse({ status: 404, description: 'Task não foi encontrada' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(@Param('id', new ParseUUIDPipe()) id: string ) {
        await this.todoService.deleteById(id);
    }
}
