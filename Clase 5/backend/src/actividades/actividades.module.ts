import { Module } from "@nestjs/common";
import { ActividadesController } from "./controllers/actividades.controller";
import { ActividadesService } from "./services/actvidades.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Actividad } from "./entidades/actividades.entity";
import { Usuario } from "src/auth/entities/usuario.entity";

@Module({
    controllers:[ActividadesController],
    imports:[AuthModule,TypeOrmModule.forFeature([Actividad,Usuario])],
    providers:[ActividadesService]
})
export class ActividadesModule{

}