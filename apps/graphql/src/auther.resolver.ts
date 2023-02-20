// import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
// import { PrismaService } from 'src/prisma.service';
// import { RedisPubSub } from 'graphql-redis-subscriptions';
import { PubSub } from 'graphql-subscriptions';
import { Post, PostMessage } from './posts/models/post.model';

@Resolver(() => Post)
export class AuthorResolver {
  private pubSub: PubSub;
  constructor() {
    this.pubSub = new PubSub();
  }

  @Mutation(() => PostMessage)
  async sendMessage(
    @Args('roomId') roomId: number,
    @Args('message') message: string,
  ) {
    // 権限のないroomであれば例外を投げれる。Guardもたぶんできる。
    // throw new UnauthorizedException();

    const value: PostMessage = { roomId: roomId, message: '送信：' + message };
    this.pubSub.publish('postMessage', value);
    return value;
  }

  @Subscription(() => PostMessage, {
    resolve: (value) => value, // これは必ず必要らしい
    filter: (payload, variables) => payload.roomId === variables.roomId, // 自分の部屋の情報だけsubscript
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  receiveMessage(@Args('roomId') roomId: number) {
    // 権限のないroomであれば例外を投げれる。Guardもたぶんできる。
    // throw new UnauthorizedException();

    return this.pubSub.asyncIterator('postMessage');
  }
}
