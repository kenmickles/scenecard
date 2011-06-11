class CreateCharacters < ActiveRecord::Migration
  def self.up
    create_table :characters do |t|
      t.string :name, :null => false
      t.string :facebook_id
      t.text :description

      t.timestamps
    end
    
    add_index :characters, :name
  end

  def self.down
    drop_table :characters
  end
end
