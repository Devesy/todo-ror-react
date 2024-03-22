Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  namespace :api do
    namespace :todos do
      get '' => 'todos#index'
      post '' => 'todos#create'
      put ':id' => 'todos#update'
      delete ':id' => 'todos#delete'
    end
  end
end
