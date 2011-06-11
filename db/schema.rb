# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110611195909) do

  create_table "characters", :force => true do |t|
    t.string   "name",        :null => false
    t.string   "facebook_id"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "actor_name"
  end

  add_index "characters", ["name"], :name => "index_characters_on_name"

  create_table "characters_scenes", :id => false, :force => true do |t|
    t.integer  "character_id", :null => false
    t.integer  "scene_id",     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "characters_scenes", ["character_id", "scene_id"], :name => "index_characters_scenes_on_character_id_and_scene_id", :unique => true
  add_index "characters_scenes", ["character_id"], :name => "index_characters_scenes_on_character_id"
  add_index "characters_scenes", ["scene_id"], :name => "index_characters_scenes_on_scene_id"

  create_table "scenes", :force => true do |t|
    t.string   "title",                      :null => false
    t.text     "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.string   "location"
    t.integer  "weight",      :default => 0, :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "scenes", ["weight"], :name => "index_scenes_on_weight"

end
