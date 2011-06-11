class AddActorName < ActiveRecord::Migration
  def self.up
    add_column :characters, :actor_name, :string
  end

  def self.down
    remove_column :characters, :actor_name
  end
end
