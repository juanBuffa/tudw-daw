import { Injectable } from '@nestjs/common';
import { CrearActividadDto } from '../dto/crear-actividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividad } from '../entidades/actividades.entity';
import { Repository } from 'typeorm';
import { EstadosActividadEnum } from '../enums/estados.enum';
import { UsuariosService } from 'src/auth/services/usuarios.service';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad) private actividadesRepo: Repository<Actividad>,
    private usuariosService: UsuariosService,
  ) {}

  async crearActividad(crearActividadDto: CrearActividadDto, usuario: Usuario) {
    const actividad: Actividad = this.actividadesRepo.create();
    actividad.descripcion = crearActividadDto.descripcion;
    actividad.estado = EstadosActividadEnum.PENDIENTE;
    actividad.fechaModificacion = new Date();
    actividad.prioridad = crearActividadDto.prioridad;
    actividad.usuarioActual = await this.usuariosService.findOneById(
      crearActividadDto.idUsuarioActual,
    );
    actividad.usuarioModificacion = usuario;
    await this.actividadesRepo.save(actividad);
  }

  async getActividades(usuario: Usuario): Promise<Actividad[]> {
    const rol:RolesEnum =  usuario.rol;

    const consulta = this.actividadesRepo
    .createQueryBuilder('actividad')
    .innerJoin('actividad.usuarioActual', 'usuario');

    if(rol === RolesEnum.EJECUTOR){
        consulta.where('actividad.estado = :estado',{
            estado: EstadosActividadEnum.PENDIENTE
        }).andWhere('usuario.id = :idUsuario',{
            idUsuario:usuario.id
        });
    }

    return await consulta.getMany();
  }
}
