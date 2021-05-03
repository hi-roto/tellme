Rails.application.routes.draw do
  post '/callback', to: 'linebot#callback'
  get "jikoku", to: 'jikoku#index'
  root to: 'jikoku#index'
end
