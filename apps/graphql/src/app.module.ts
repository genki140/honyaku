import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { PostsResolver } from './posts/posts.resolver';
import { AuthorResolver } from './auther.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'graphql-ws': true,
        "subscriptions-transport-ws": true,
      },
      // playground: {
      //   subscriptionEndpoint: 'ws://localhost:4000/graphql',
      // }
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostsResolver, AuthorResolver],
})
export class AppModule { }
