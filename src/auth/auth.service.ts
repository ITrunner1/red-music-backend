import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,        
        private jwt: JwtService
    ) { }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto)
        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwt.verify(refreshToken)
        if (!result) throw new UnauthorizedException('Invalid fresh token')

        const user = await this.userService.byId(result.id)  

        const tokens = await this.issueTokens(user.id)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    async register(dto: RegisterDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                email: dto.email
            }
        })

        if (existUser) throw new BadRequestException('User already exist')

        const newUser = this.userRepository.create({
            email: dto.email,
            password: await hash(dto.password),
            name: dto.name,
            isAdmin: false
        })

        const tokens = await this.issueTokens(newUser.id)

        const user = await this.userRepository.save(newUser)

        return {
            user: this.returnUserFields(user),
            ...tokens
        }
    }

    // Генерация 2-ух токенов
    private async issueTokens(userId: number) {
        const data = { id: userId }

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1',
        })

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '7d',
        })

        return { accessToken, refreshToken }
    }

    private returnUserFields(user: UserEntity) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        }
    }

    private async validateUser(dto: AuthDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: dto.email
            }
        })

        if (!user) throw new NotFoundException('User not found')

        const isValid = await verify(user.password, dto.password)

        if (!isValid) throw new UnauthorizedException('Invalid password')

        return user
    }
}
