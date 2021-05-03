class JikokuController < ApplicationController

def index
  @current_time = Date.current.strftime('%y/%m/%d')
end

end
