import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;
  title: string;
  content: string;
  published: boolean;
}

@ObjectType()
export class PostMessage {
  roomId: number;
  message: string;
}
