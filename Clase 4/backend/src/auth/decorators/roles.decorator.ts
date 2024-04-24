import { Reflector } from "@nestjs/core";
import { RolesEnum } from "../enums/roles.enum";

export const Roles = Reflector.createDecorator<RolesEnum[]>();