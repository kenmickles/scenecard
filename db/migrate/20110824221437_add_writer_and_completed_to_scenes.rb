class AddWriterAndCompletedToScenes < ActiveRecord::Migration
  def self.up
    add_column :scenes, :writer_id, :integer
    add_column :scenes, :completed, :boolean, :default => false
  end

  def self.down
    drop_column :scenes, :writer_id
    drop_column :scenes, :completed
  end
end
