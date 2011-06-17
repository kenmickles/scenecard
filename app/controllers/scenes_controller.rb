class ScenesController < ApplicationController
  def index
    @scenes = Scene.all(:order => 'weight')
  end
  
  def show
    @character = Character.find(params[:id])
    @page_title = @character.name
  end
  
  def new
    @page_title = params[:title] || "New Scene"
    @scene = Scene.create!({:title => @page_title})
    render :layout => false
  end
  
  def create
    @scene = Scene.new(params[:scene])

    if @scene.save
      render :json => {:success => true}
    else
      render :json => {:success => false}
    end
  end
  
  def edit
    @page_title = "Edit Scene"
    @scene = Scene.find(params[:id])
    render :layout => false
  end
  
  def update
    @scene = Scene.find(params[:id])
    
    if @scene.update_attributes(params[:scene])
      render :json => {:success => true}
    else
      render :json => {:success => false}
    end
  end
  
  def destroy
    @scene = Scene.find(params[:id])
    @scene.destroy
    
    render :json => {:success => true}
  end
  
  def reorder
    params[:scenes].each_with_index do |id, i|
      @scene = Scene.find(id)
      @scene.update_attribute(:weight, (i*100))
    end
    
    render :json => {:success => true}
  end
  
  def add_character
    @scene = Scene.find(params[:id])    
    @character = Character.find(params[:character_id])
    @scene.characters << @character
    
    render :json => {:success => true}
  end
  
  def remove_character
    @scene = Scene.find(params[:id])    
    @character = Character.find(params[:character_id])
    @scene.characters.delete(@character)
    
    render :json => {:success => true}
  end
end
