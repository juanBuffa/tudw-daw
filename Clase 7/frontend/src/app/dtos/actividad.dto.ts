import { EstadosActividadEnum } from "../enums/estados-actividad.enum";
import { PrioridadesEnum } from "../enums/prioridades.enum";
import { UsuarioDto } from "./usuario.dto";

export interface ActividadDto{
    
    id: number;

    descripcion: string|null;
  
    usuarioActual: UsuarioDto|null;
  
    prioridad: PrioridadesEnum|null;
  
    estado: EstadosActividadEnum|null;
  
}