# Life Book Navigator Gifts

Kindle書籍の読者特典として配布するWeb診断ツールを集約するプロジェクト。

## 提供中の診断ツール

- 松山さん『50代から始めるライフデザイン』向け
  → `/matsuyama-001/`

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動 (http://localhost:3000)
npm run build  # 本番ビルド
npm run start  # 本番サーバー起動
```

## デプロイ

Vercelに自動デプロイ。GitHubの main ブランチへ push すると自動デプロイされる。

## 配布方法

X-DMキャンペーン方式：
1. 著者がXで新刊発売キャンペーンを投稿
2. 読者がフォロー＋RT＋本書購入＋購入スクショをDMで送付
3. 著者がDMで診断URLを返信
