import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ActividadesModule } from './actividades/actividades.module';

@Module({
  imports: [
    AuthModule,
    ActividadesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'app',
      password: '1234',
      database: 'daw',
      autoLoadEntities: true,
      synchronize: false,
      logging: true,
      logger:'advanced-console'
    }),
    JwtModule.register({
      global: true,
      secret: 'dawsecreto',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
