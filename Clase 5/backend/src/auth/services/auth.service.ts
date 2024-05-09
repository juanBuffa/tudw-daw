import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const usuario: Usuario =
      await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(
        loginDto.nombreUsuario,
      );

    if (!usuario) {
      throw new BadRequestException('Nombre de usuario no válido');
    }

    const claveCorrecta: boolean = bcrypt.compareSync(
      loginDto.clave,
      usuario.clave,
    );

    if (!claveCorrecta) {
      throw new BadRequestException('Clave incorrecta');
    }

    const token: string = this.jwtService.sign({
      sub: usuario.id,
      rol: usuario.rol,
    });

    return { token };
  }
}
