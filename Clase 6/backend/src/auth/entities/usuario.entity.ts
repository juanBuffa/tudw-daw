import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EstadosUsuarioEnum } from '../enums/estado-usuario.enum';
import { RolesEnum } from '../enums/roles.enum';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column()
  clave: string;

  @Column()
  apellidos: string;

  @Column()
  nombres: string;

  @Column({ type: 'enum', enum: EstadosUsuarioEnum })
  estado: EstadosUsuarioEnum;

  @Column({ name: 'nombre_usuario' })
  nombreUsuario: string;

  @Column({ type: 'enum', enum: RolesEnum })
  rol: RolesEnum;

  @Expose()
  get nombreCompleto(): string {
    return this.apellidos + ', ' + this.nombres;
  }
}
