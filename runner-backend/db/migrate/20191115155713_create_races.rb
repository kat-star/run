class CreateRaces < ActiveRecord::Migration[6.0]
  def change
    create_table :races do |t|
      t.string :category
      t.date :date
      t.boolean :active, default: true
      t.references :runner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
