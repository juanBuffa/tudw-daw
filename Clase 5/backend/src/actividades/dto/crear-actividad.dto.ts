import { IsNotEmpty, IsString } from "class-validator"
import { PrioridadesEnum } from "../enums/prioridades.enum"

export class CrearActividadDto{

    @IsString()
    descripcion:string

    @IsNotEmpty()
    idUsuarioActual:number

    @IsNotEmpty()
    prioridad:PrioridadesEnum
}