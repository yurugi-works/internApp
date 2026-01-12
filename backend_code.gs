/**
 * インターンアプリからの提出データを受け取り、メール/チャットで通知するスクリプト
 */

function doPost(e) {
  try {
    // 1. データの解析
    const postData = JSON.parse(e.postData.contents);
    const timeline = postData.timeline || []; // カードIDの配列
    const gaps = postData.gaps || {};         // { "0": "gap info", ... }
    
    // 2. 通知本文の作成
    const subject = "【インターン提出】ワーク回答が届きました";
    let body = "インターン生から回答が提出されました。\n\n";
    body += "--------------------------------------\n";
    body += "■ 提出日時: " + new Date().toLocaleString() + "\n\n";
    
    body += "■ タイムライン構成:\n";
    // カードIDとタイトルのマッピング（必要に応じて更新してください）
    const cardMap = {
      1: '家族で相談する',
      2: 'メーカー・モデルルーム見学',
      3: 'プラン・見積もり提案をもらう',
      4: '契約する',
      5: '業者との詳細打ち合わせ',
      6: '完成立ち合い・チェック',
      7: '引き渡し・引っ越し'
    };

    timeline.forEach((cardId, index) => {
      const cardTitle = cardMap[cardId] || `不明なカード(ID:${cardId})`;
      body += `[${index + 1}] ${cardTitle}\n`;
      
      // このスロットの下のGAPを確認
      if (gaps[index]) {
         body += `    + GAP: ${gaps[index]}\n`;
      }
    });

    body += "--------------------------------------\n";
    
    // 3. 通信先への送信
    
    // パターンA: 実行者（あなた）のメールアドレスに送る場合
    // 実行者のメールアドレスを取得
    const recipient = Session.getActiveUser().getEmail(); 
    if (recipient) {
       GmailApp.sendEmail(recipient, subject, body);
    } else {
       // 権限設定によってはメールが取れない場合があるので、その場合は固定アドレスを指定してください
       // GmailApp.sendEmail("your-email@example.com", subject, body);
    }
    
    // パターンB: Google ChatにWebhookで送る場合 (必要ならコメントアウトを外してURLを設定)
    /*
    const webhookUrl = "https://chat.googleapis.com/v1/spaces/YOUR_SPACE/messages?key=YOUR_KEY&token=YOUR_TOKEN";
    const chatPayload = {
      "text": subject + "\n" + body
    };
    UrlFetchApp.fetch(webhookUrl, {
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(chatPayload)
    });
    */

    // 4. レスポンス（成功）
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // エラーハンドリング
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
