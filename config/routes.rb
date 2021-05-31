Rails.application.routes.draw do
  post '/callback', to: 'linebots#callback'
  get "jikokus", to: 'jikokus#index'
  root to: 'jikokus#index'
end
