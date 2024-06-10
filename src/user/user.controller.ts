import { Body, Controller, Get, HttpCode, Param, Patch, Put, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/decorators/auth.decorator';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('user/profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id)
  }

  @Get('by-id/:id')
  // @Auth()
  async getUser(@Param('id') id: string) {
    return this.userService.byId(+id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateCurrentUserProfile(
    @CurrentUser('id') id: number,
    @Body() dto: UserDto
  ) {
    return this.userService.updateProfile(+id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('subscribe/:artistId')
  async subscribeToArtist(
    @CurrentUser('id') id: string,
    @Param('artistId') artistId: string
  ) {
    return this.userService.subscribe(+id, +artistId)
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async updateProfile(
    @Param('id') id: number,
    @Body() dto: UserDto
  ) {
    return this.userService.updateProfile(+id, dto)
  }
}
