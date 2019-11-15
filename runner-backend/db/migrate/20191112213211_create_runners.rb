class CreateRunners < ActiveRecord::Migration[6.0]
  def change
    create_table :runners do |t|
      t.string :name
      t.float :miles, default: 0
      t.integer :streak, default: 0

      t.timestamps
    end
  end
end
