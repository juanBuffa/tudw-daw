import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column()
  clave: string;

  @Column()
  apellido: string;

  @Column()
  nombres: string;

  @Column({ type: 'enum', enum: EstadosUsuarioEnum })
  estado: EstadosUsuarioEnum;

  @Column()
  nombreUsuario: string;

  @Column({ type: 'enum', enum: RolesEnum })
  rol: RolesEnum;
}
