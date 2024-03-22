# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Users
users = [{ name: 'Anton', email: 'anton.kalinin1304@gmail.com', password: '111111' }]
users.each do |user|
  next if User.exists?(email: user[:email])

  u = User.new(user)
  u.save!
end

user_id = User.find_by_email(users.first[:email]).id
tasks = [
  { user_id: user_id, task: 'make simple db schema', is_done: true },
  { user_id: user_id, task: 'add js - webpack, react, etc.', is_done: true },
  { user_id: user_id, task: 'create app skeleton', is_done: false },
  { user_id: user_id, task: 'implement todo crud - backend', is_done: false },
  { user_id: user_id, task: 'implement todo crud - frontend', is_done: false },
  { user_id: user_id, task: 'implement front-end features (filter, search)', is_done: false },
  { user_id: user_id, task: 'add styles', is_done: false },
  { user_id: user_id, task: 'add d&d', is_done: false },
  { user_id: user_id, task: 'add auth', is_done: false }
]

Todo.where(user_id: user_id).delete_all
tasks.each do |task|
  Todo.create!(task)
end
