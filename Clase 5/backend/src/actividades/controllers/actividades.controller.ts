import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CrearActividadDto } from '../dto/crear-actividad.dto';
import { ActividadesService } from '../services/actvidades.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/actividades')
export class ActividadesController {
  constructor(private actividadesService: ActividadesService) {}

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  @Post()
  async crearActividad(
    @Req() request: Request,
    @Body() crearActividadDto: CrearActividadDto,
  ) {
    await this.actividadesService.crearActividad(
      crearActividadDto,
      request['usuario'],
    );
  }

  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR,RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  @Get()
  async getActividades(@Req()request : Request){
    return await this.actividadesService.getActividades(request['usuario']); 
  }
}
