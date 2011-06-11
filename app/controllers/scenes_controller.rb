class ScenesController < ApplicationController
  def index
    @scenes = Scene.all(:order => 'weight')
  end
end
