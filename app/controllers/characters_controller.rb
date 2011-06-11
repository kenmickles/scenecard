class CharactersController < ApplicationController
  def index
    @page_title = "Characters"
    @characters = Character.all(:order => :name)
  end
  
  def show
    @character = Character.find(params[:id])
    @page_title = @character.name
  end
  
  def new
    @page_title = "New Character"
    @character = Character.new
  end
  
  def create
    @character = Character.new(params[:character])

    if @character.save
      redirect_to characters_path, :notice => "#{@character.name} was successfully created."
    else
      render :action => "new"
    end
  end
  
  def edit
    @page_title = "Edit Character"
    @character = Character.find(params[:id])
  end
  
  def update
    @character = Character.find(params[:id])
    
    if @character.update_attributes(params[:character])
      redirect_to character_path(@character), :notice => "#{@character.name} was successfully updated."
    else
      render :action => "edit"
    end
  end
  
  def destroy
    @character = Character.find(params[:id])
    @character.destroy
    
    redirect_to characters_path, :notice => "#{@character.name} was successfully deleted."
  end
end
