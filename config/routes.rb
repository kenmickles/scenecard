Scenecard::Application.routes.draw do
  resources :characters
  resources :scenes
  
  match 'scenes/reorder' => 'scenes#reorder', :as => :reorder_scenes, :via => :post
  match 'scenes/:id/add_character/:character_id' => 'scenes#add_character', :as => :add_character_to_scene
  match 'scenes/:id/remove_character/:character_id' => 'scenes#remove_character', :as => :remove_character_from_scene
  
  match 'timeline' => 'timeline#index', :as => :timeline
  
  root :to => 'scenes#index'
end
