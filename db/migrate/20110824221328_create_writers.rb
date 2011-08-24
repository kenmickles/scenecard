class CreateWriters < ActiveRecord::Migration
  def self.up
    create_table :writers, :force => true do |t|
      t.string :name, :null => false
      t.string :facebook_id
      t.timestamps
    end
    
    add_index :writers, :name
  end

  def self.down
    drop_table :writers
  end
end