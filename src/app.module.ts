import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { Category } from './category/models/category.model';
import { CategoryModule } from './category/category.module';
import { TermsModule } from './terms/term.module';
import { Term } from './terms/models/term.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Category],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    SequelizeModule.forFeature([Category, Term]),

    CategoryModule,
    TermsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
