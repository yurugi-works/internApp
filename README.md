# Rookie Training 2026 - Internship App

2026年度新卒採用インターンシップ（Lecture 3）で使用する「リフォーム工程並べ替えワーク」のWebアプリです。

## 概要

参加者は、リフォームの工程カードを正しい順序に並べ替え、さらに工程間の「隙間（Gap）」に隠れたタスクを追加していきます。
ソリティア形式のUIで、直感的に操作可能です。

## 機能

- ドラッグ&ドロップによるカード配置
- 工程間のGap入力
- 提出機能（Google Apps Script連携）

## デプロイ方法（GitHub Pages）

1. このリポジトリを公開（Public）に設定します。
2. GitHubリポジトリの `Settings` > `Pages` に移動します。
3. `Source` を `Deploy from a branch` に設定し、`main` ブランチの `/ (root)` を選択してSaveします。
4. 数分後、発行されたURLでアプリが公開されます。

## 提出機能セットアップ

`backend/code.gs` の内容を Google Apps Script にコピペしてデプロイし、発行されたURLを `index.html` に設定してください。
