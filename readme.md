

## モノレポ

rushを使って、node_modulesはpnpmで管理されている。

### パッケージの追加

プロジェクトのフォルダに移動し

```
rush add -m -p パッケージ (--dev)
```

## Next.js

reactじゃなくてNextなのは、

Server Componentが使いやすいから

これを使うと、DBの内容を返すAPIを定義しなくて良い。

app directoryについて

https://zenn.dev/azukiazusa/articles/next-js-app-dir-tutorial

## データベース


## ORM

ORM に prismaを使用
vscodeの拡張を入れるとシンタックスハイライトされる

以下のコマンドでUIからDBを操作可能
rushx prisma studio

prisma/schema.prismaを編集後、以下のコマンドでマイグレーション生成＆DB更新

rushx prisma migrate dev (その後名前を入力)
or
rushx migrate

本番環境でDBの更新だけ行う場合

rushx prisma migrate deploy

DBをリセットして再seedする

rushx prisma migrate reset


## DockerFileで行っておきたいこと

npm install -g @microsoft/rush
