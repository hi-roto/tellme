class CreateHansokus < ActiveRecord::Migration[6.0]
  def change
    create_table :hansokus do |t|
      t.string :hansoku_name,                null: false
      t.integer :big_car,                    null: false
      t.integer :normal_car,                 null: false
      t.integer :motorcycle,                 null: false
      t.integer :small_special_car,          null: false
      t.integer :motorized_bicycle,          null: false
      t.string :category,                    null: false
      t.timestamps
    end
  end
end
