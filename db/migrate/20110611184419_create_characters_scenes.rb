class CreateCharactersScenes < ActiveRecord::Migration
  def self.up
    create_table :characters_scenes, :id => false, :force => true do |t|
      t.references :character, :null => false
      t.references :scene, :null => false
      t.timestamps
    end
    
    add_index :characters_scenes, [:character_id, :scene_id], :unique => true
    add_index :characters_scenes, :scene_id
    add_index :characters_scenes, :character_id
  end

  def self.down
    drop_table :characters_scenes
  end
end