import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Roles } from '../decorators/roles.decorator';
import { RolesEnum } from '../enums/roles.enum';
import { AuthGuard } from '../guards/auth.guard';

@Controller('/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }
}
