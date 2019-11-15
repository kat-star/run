class CreateRuns < ActiveRecord::Migration[6.0]
  def change
    create_table :runs do |t|
      t.float :distance
      t.float :pace
      t.date :date
      t.integer :rating
      t.references :goal, null: false, foreign_key: true
      t.references :runner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
