class Writer < ActiveRecord::Base
  has_many :scenes
  validates :name, :presence => true
  
  def facebook_url
    if self.facebook_id.blank?
      nil
    else
      "https://www.facebook.com/profile.php?id=#{self.facebook_id}"
    end
  end
  
  def thumbnail_url
    if self.facebook_id.blank?
      "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"
    else
      "http://graph.facebook.com/#{self.facebook_id}/picture"
    end
  end
  
  def photo_url
    if self.facebook_id.blank?
      "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=200"
    else
      "http://graph.facebook.com/#{self.facebook_id}/picture?type=large"
    end
  end
end