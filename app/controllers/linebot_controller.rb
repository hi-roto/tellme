class LinebotController < ApplicationController
require 'line/bot'
protect_from_forgery :except => [:callback]
# クロスサイトリクエストフォージェリ対策
def callback 
  body = request.body.read
  signature =  request.env['HTTP_X_LINE_SIGNATURE']
  unless client.validate_signature(body, signature)
    return head :bad_request
  end
  events = client.parse_events_from(body)
  events.each { |event|
    case event
    when Line::Bot::Event::Message
      
      case event.type
      # メッセージタイプを受け取る
      when Line::Bot::Event::MessageType::Text
      #メッセージタイプがtextだったなら　
        seed1 = select_word
        seed2 = select_word
        while seed1 == seed2
          seed2 = select_word
        end
        #同じ言葉は表示させないためのコード
        message = [{
          type: 'text',
          text: "最初の返信"
        },{
          type: 'text',
          text: "#{seed1} × #{seed2}!! \n 改行したよ"
        }]
        client.reply_message(event['replyToken'], message)
      end
    end
  }
  head :ok
end
private
def client
  @client ||= Line::Bot::Client.new { |config|
    config.channel_secret = ENV["LINE_CHANNEL_SECRET"]
    config.channel_token = ENV["LINE_CHANNEL_TOKEN"]
  }
end
def select_word
  # この中を変えると返ってくるキーワードが変わる
  seeds = ["コマネチ", "アイーン", "エンガチョ", "1、2、3....ダー！！"]
  seeds.sample
  #sampleメソッドは配列の中からランダムに要素を１個返すメソッド
end
end