class Scene < ActiveRecord::Base
  has_and_belongs_to_many :characters
  belongs_to :writer
  validates :title, :presence => true
end
