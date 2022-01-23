import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DistancesModule } from './distances/distances.module';
import { CheckpointsModule } from './checkpoints/checkpoints.module';
import { UserDistancesModule } from './user-distances/user-distances.module';
import { ConfigModule, ConfigService } from "nestjs-config";
import { UserCheckpointsModule } from '@app/user-checkpoints/controllers/user-checkpoints.module';

@Module({
  imports: [
    ConfigModule.load("dist/**/*.config.js", {
      modifyConfigName: name => name.replace(".config", "")
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) =>
        configService.get("app.database"),
      inject: [ConfigService]
    }),
 UsersModule, DistancesModule, CheckpointsModule, UserDistancesModule, UserCheckpointsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
