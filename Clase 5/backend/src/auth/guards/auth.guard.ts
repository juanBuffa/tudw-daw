import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Usuario } from '../entities/usuario.entity';
  import { Reflector } from '@nestjs/core';
  import { Roles } from '../decorators/roles.decorator';
  import { UsuariosService } from '../services/usuarios.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private usuariosService: UsuariosService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token);
  
        const usuario: Usuario = await this.usuariosService.findOneById(
          payload.sub,
        );
  
        const roles = await this.reflector.get(Roles, context.getHandler());
  
        if (!roles) {
          request['usuario'] = usuario;
          return true;
        }
        if (roles.includes(usuario.rol)) {
          request['usuario'] = usuario;
          return true;
        }
        throw new UnauthorizedException('Permisos insuficientes');
      } catch {
        throw new UnauthorizedException('Token inválido');
      }
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers['authorization']?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  