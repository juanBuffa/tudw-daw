import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'app',
      password: '1234',
      database: 'daw',
      autoLoadEntities: true,
      synchronize: false
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
