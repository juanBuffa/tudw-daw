import { Usuario } from "src/auth/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { EstadosActividadEnum } from "../enums/estados.enum";

@Entity({name:'actividades'})
export class Actividad{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    descripcion:string;

    @ManyToOne(()=>Usuario)
    @JoinColumn({name:'id_usuario_actual'})
    usuarioActual:Usuario;

    @Column({type:'enum',enum:PrioridadesEnum})
    prioridad:PrioridadesEnum

    @ManyToOne(()=>Usuario)
    @JoinColumn({name:'id_usuario_modificacion'})
    usuarioModificacion:Usuario;

    @Column({name:'fecha_modificacion'})
    fechaModificacion:Date

    @Column({type:'enum',enum:EstadosActividadEnum})
    estado: EstadosActividadEnum;

} 