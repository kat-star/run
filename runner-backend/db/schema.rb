# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_17_212557) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "awards", force: :cascade do |t|
    t.string "name"
    t.bigint "goal_id", null: false
    t.bigint "runner_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["goal_id"], name: "index_awards_on_goal_id"
    t.index ["runner_id"], name: "index_awards_on_runner_id"
  end

  create_table "goals", force: :cascade do |t|
    t.string "category"
    t.float "value"
    t.boolean "active", default: true
    t.bigint "runner_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["runner_id"], name: "index_goals_on_runner_id"
  end

  create_table "races", force: :cascade do |t|
    t.string "category"
    t.date "date"
    t.boolean "active", default: true
    t.bigint "runner_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["runner_id"], name: "index_races_on_runner_id"
  end

  create_table "runners", force: :cascade do |t|
    t.string "name"
    t.float "miles", default: 0.0
    t.integer "streak", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "runs", force: :cascade do |t|
    t.float "distance"
    t.float "pace"
    t.date "date"
    t.integer "rating"
    t.bigint "goal_id", null: false
    t.bigint "runner_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["goal_id"], name: "index_runs_on_goal_id"
    t.index ["runner_id"], name: "index_runs_on_runner_id"
  end

  add_foreign_key "awards", "goals"
  add_foreign_key "awards", "runners"
  add_foreign_key "goals", "runners"
  add_foreign_key "races", "runners"
  add_foreign_key "runs", "goals"
  add_foreign_key "runs", "runners"
end
