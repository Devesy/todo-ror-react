class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :task, limit: 300, null: false
      t.boolean :is_done, null: false, default: false
      t.references :user

      t.timestamps
    end
  end
end
