class Character < ActiveRecord::Base
  has_and_belongs_to_many :scenes, :order => :weight
  validates :name, :presence => true
  
  # before_save :fetch_actor_name
    
  def facebook_url
    if self.facebook_id.blank?
      nil
    else
      "https://www.facebook.com/profile.php?id=#{self.facebook_id}"
    end
  end
  
  def thumbnail_url
    if facebook_id.present?
      "http://graph.facebook.com/#{facebook_id}/picture"
    elsif name.present?
      "https://robohash.org/#{name.parameterize}?size=50x50"
    else
      "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm"
    end
  end
  
  def photo_url
    if facebook_id.present?
      "http://graph.facebook.com/#{facebook_id}/picture?type=large"
    elsif name.present?
      "https://robohash.org/#{name.parameterize}?size=200x200"
    else
      "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&s=200"
    end
  end
  
  protected
  
  # def fetch_actor_name
  #   if self.facebook_id.blank?
  #     self.actor_name = nil
  #   else
  #     require 'net/http'
  #     http = Net::HTTP.new('graph.facebook.com', 80)
  #     headers, result = http.get("/#{self.facebook_id}")
  #     data = ActiveSupport::JSON.decode(result)
  #     if !data["name"].blank?
  #       self.actor_name = data["name"]
  #     end
  #   end
  # end
end
