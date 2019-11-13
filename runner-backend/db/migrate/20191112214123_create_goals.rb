class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.string :category
      t.float :value
      t.boolean :active, default: true
      t.references :runner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
