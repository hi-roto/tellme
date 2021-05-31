class JikokusController < ApplicationController

  def index
    days = []
    days = ["日", "月", "火", "水", "木", "金", "土"]
    @current_wday = days[Time.now.wday]
  end
  
end
