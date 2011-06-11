class Scene < ActiveRecord::Base
  has_and_belongs_to_many :characters
  validates :title, :presence => true
end
