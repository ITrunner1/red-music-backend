import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt.guards";

type TypeRole = "admin" | "user"

export const Auth = (role: TypeRole = 'user') =>
    applyDecorators(role == "admin"
        ? UseGuards(JwtAuthGuard, AdminGuard)
        : UseGuards(JwtAuthGuard)
)