class LinebotController < ApplicationController
require 'line/bot'
require 'date'
require 'json'

protect_from_forgery :except => [:callback]
# クロスサイトリクエストフォージェリ対策

def callback 
  body = request.body.read
  signature =  request.env['HTTP_X_LINE_SIGNATURE']
  unless client.validate_signature(body, signature)
    return head :bad_request
  end
  events = client.parse_events_from(body)
  events.each do |event| 
    case event
      when Line::Bot::Event::Message
        case event.type
          when Line::Bot::Event::MessageType::Text
            input = event.message['text']
            case input
              when /.*(微罪処理事件|微罪処理|微罪).*/
                  message = template_bizai
              when /.*(簡易処理事件|簡易処理|簡易).*/
                  message = template_kanni
              when /.*(干支|干支の計算|えと).*/
                  message = template_eto
              when /.*(明治|大正|昭和|平成|令和|).*(年).*(月).*(日)/
                  birthday = nengo_change(input)
                  age = age_calculation(birthday)
                  message = {
                    type: 'text',
                    text: "この人の年齢は#{age}歳です"
                  }
              when /[0-9]{4}.*/
                  input = input.to_i
                  input = Date.new(input).jisx0301.split(".")
                  nengo = input[0].split(//)
                  nengo[0] = NENGO_EIJI_KANJI[nengo[0]]
                  nengo = nengo.join
                  message = {
                    type: 'text',
                    text: "和暦に変換すると#{nengo}年です"
                  }
              when /(交通違反|反則|いはん|切符)/
                  message = first_template_ihan
              when /(時差修正|時差|カメラ|時刻修正)/ 
                  message = template_uri
              end
              
              if Hansoku.pluck(:hansoku_name).include?(input)
                money_seeds = Hansoku.find_by(hansoku_name: input)
                
                big_car = (money_seeds[:big_car].to_i * 1000)
                normal_car = (money_seeds[:normal_car].to_i * 1000)
                motorcycle = (money_seeds[:motorcycle].to_i * 1000)
                small_specsial_car = (money_seeds[:small_specsial_car].to_i * 1000)
                motorized_bicycle = (money_seeds[:motorized_bicycle].to_i * 1000)
                
                message = [{
                  type: 'text',
                  text: "大型車の反則金は#{big_car}円です。"
                  }, {
                  type: 'text',
                  text: "普通車の反則金は#{normal_car}円です。"
                  }, {
                  type: 'text',
                  text: "二輪車の反則金は#{motorcycle}円です。"
                  }, {
                  type: 'text',
                  text: "小型特車の反則金は#{small_specsial_car}円です。"
                  }, {
                  type: 'text',
                  text: "原付の反則金は#{motorized_bicycle}円です。"
                  }]
              end
            
              client.reply_message(event['replyToken'], message)
        end
    when Line::Bot::Event::Postback
      data = event['postback']['data']
        case 
          when data == "template_eto"
          birthday = event['postback']['params']['date']
          age = age_calculation(birthday)
          birthday = Date.parse(birthday)
          eto_year = birthday.strftime("%Y").to_i
          result_eto = ETO[ eto_year%12 ]
          message = [{
            type: 'text',
            text: "選択した生年月日は#{birthday}でした。\nこの人の干支は#{result_eto}です。"
            }, {
            type: 'text',
            text: "ちなみにこの人の年齢は#{age}歳です"
            }]
          when Hansoku.pluck(:category).include?(data)
            message = second_template_ihan(data)
        end
            client.reply_message(event['replyToken'], message)
    end
end
    head :ok
end

private
  def client
    @client ||= Line::Bot::Client.new { |config|
      config.channel_secret = ENV["LINE_BOT_CHANNEL_SECRET"]
      config.channel_token = ENV["LINE_BOT_CHANNEL_TOKEN"]
    }
  end

  def nengo_change(input, to='')  
    if input.class==String then input=input.split(//) end
    if !['年','月'].index(input[0]).nil?
      to += '.'
    elsif !['日'].index(input[0]).nil?
      to += ''
    elsif input.size>1 && NENGO_KANJI_EIJI.key?(input[0]+input[1])
      to = NENGO_KANJI_EIJI[(input[0]+input[1])]
      input.delete_at 0
    else
      to += input[0].to_s
    end
    if input[0].nil? then return to end
    input.delete_at 0
    return nengo_change(input, to)
  end
  
  def age_calculation(birthday)
    birthday = Date.parse(birthday)
    return (Date.today.strftime('%Y%m%d').to_i - birthday.strftime('%Y%m%d').to_i) / 10000
  end

  def template_bizai
    [{
      type: 'text',
      text: BIZAI1
    },{
      type: 'text',
      text: BIZAI2 
    },{
      type: 'text',
      text: BIZAI3 
    },{
      type: 'text',
      text: BIZAI4 
    }]
  end

  def template_kanni 
    [{
      type: 'text',
      text: KANI1
    },{
      type: 'text',
      text: KANI2
    },{
      type: 'text',
      text: KANI3
    }]
  end

  def template_eto
    {
      "type": "template",
      "altText": "干支計算",
      "template": {
          "type": "buttons",
          "title": "干支計算",
          "text": "対象の生年月日を選んでください",
          "actions": [{
                "type": "datetimepicker",
                "label": "選択する",
                "mode": "date",
                "data": "template_eto"
              }]
      }
    }
  end
  
  def first_template_ihan
    ihanmeies = Hansoku.select(:category).distinct.pluck(:category)
    hansokus = []
    ihanmeies.each do |ihan|
      hansoku = {type: "action", action: {type: "postback", label: ihan, data: ihan, text: ihan}}
      hansokus << hansoku
    end
    { "type": "text",
      "text": "どの種類の違反ですか？",
      "quickReply": {
        "items":
          hansokus
      }
    }   
  end
  
  def second_template_ihan(money_seed)
    ihanmeies = Hansoku.where(category: money_seed).pluck(:hansoku_name)
    hansokus = []
      ihanmeies.each do |ihan|
        hansoku = {type: "action", action: {type: "message", label: ihan, text: ihan}}
        hansokus << hansoku
      end
      
    { "type": "text",
      "text": "どの違反ですか？",
      "quickReply": {
        "items":
        hansokus
      }
    }
  end

  def template_uri
    {
      "type": "template",
      "altText": "時差修正",
      "template": {
          "type": "buttons",
          "title": "時差修正",
          "text": "時差修正を行うWebサイトに移動します",
          "actions": [{
                "type":"uri",
                "label":"移動する",
                "uri":"https://tell---me.herokuapp.com/",
                "altUri": {
                  "desktop":"https://tell---me.herokuapp.com/"
              }
      }]}
    }
  end
end