class CreateAwards < ActiveRecord::Migration[6.0]
  def change
    create_table :awards do |t|
      t.string :name
      t.references :goal, null: false, foreign_key: true
      t.references :runner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
