import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest<{user: UserEntity}>();
    const user = request.user

    if (!user.isAdmin) throw new ForbiddenException('У вас нет прав!')

    return user.isAdmin;
  }
}