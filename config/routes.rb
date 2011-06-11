Scenecard::Application.routes.draw do
  resources :characters
  resources :scenes
  
  match 'timeline' => 'timeline#index', :as => :timeline
  
  root :to => 'scenes#index'
end
