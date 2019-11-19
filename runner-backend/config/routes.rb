Rails.application.routes.draw do
  resources :awards, only: [:index, :show, :update, :create, :destroy]
  resources :races, only: [:index, :show, :update, :create, :destroy]
  resources :runs, only: [:index, :show, :update, :create, :destroy]
  resources :goals, only: [:index, :show, :update, :create, :destroy]
  resources :runners, only: [:index, :show, :update, :create, :destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
