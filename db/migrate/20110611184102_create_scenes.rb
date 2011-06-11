class CreateScenes < ActiveRecord::Migration
  def self.up
    create_table :scenes do |t|
      t.string :title, :null => false
      t.text :description
      t.datetime :start_time
      t.datetime :end_time
      t.string :location
      t.integer :weight, :null => false, :default => 0

      t.timestamps
    end
    
    add_index :scenes, :weight
  end

  def self.down
    drop_table :scenes
  end
end
