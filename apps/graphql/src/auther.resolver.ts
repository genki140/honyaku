import { UnauthorizedException } from '@nestjs/common';
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
  async sendMessage(@Args('message') message: string) {
    const value: PostMessage = { message: '送信：' + message };
    console.debug(value);
    this.pubSub.publish('postMessage', value);
    return value;
  }

  @Subscription(() => PostMessage, {
    resolve: (value) => value, // これは必ず必要らしい
    //filter // ここにフィルターが書けるらしいので、roomIDを入れとけば何とかなる？
  })
  receiveMessage() {

    // 認証は例外も投げれる。Guardもたぶんできる
    // throw new UnauthorizedException();

    return this.pubSub.asyncIterator('postMessage');
  }
}
