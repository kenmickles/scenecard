class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :authenticate
  
  protected

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['HTTP_USERNAME'] && password == ENV['HTTP_PASSWORD']
    end
  end
  
end
