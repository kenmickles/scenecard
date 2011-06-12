Scenecard::Application.routes.draw do
  resources :characters
  resources :scenes
  
  match 'scenes/reorder' => 'scenes#reorder', :as => :reorder_scenes, :via => :post
  
  match 'timeline' => 'timeline#index', :as => :timeline
  
  root :to => 'scenes#index'
end
