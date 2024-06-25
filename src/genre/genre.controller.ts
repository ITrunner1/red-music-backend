import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenreDto, GenreService } from './genre.service';
import { Auth } from 'src/decorators/auth.decorator';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) { }

  @Get()    
  async getAll() {
      return this.genreService.getAll()
  }    

  @Get('by-slug/:slug')    
  async getBySlug(@Param('slug') slug: string) {
      return this.genreService.bySlug(slug)
  }  

  // Admin    
  @Auth('admin') 
  @Get(':id')    
  async getById(@Param('id') id: string) {
      return this.genreService.byId(+id)
  } 
  
//   @UsePipes(new ValidationPipe()) 
//   @HttpCode(200)
//   @Auth('admin')  
//   @Put(':id')
//   async update(@Param('id') id: string, @Body() dto: GenreDto) {
//       return this.genreService.update(+id, dto)
//   }

//   @HttpCode(200)
//   @Auth('admin')    
//   @Delete(':id')
//   async delete(@Param('id') id: string){
//       return this.genreService.delete(+id)
//   }

//   @HttpCode(200)
//   @Auth('admin')  
//   @Post()
//   async create() {
//       return this.genreService.create()
//   } 
}
