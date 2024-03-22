class Api::Todos::TodosController < ApplicationController
  def index
    @todos = Todo.where(user_id: current_user[:id]).order(:created_at)
    render json: { todos: @todos }, status: :ok
  end

  def create
    todo = Todo.create!(todo_params)
    render json: { result: 'ok', todo: todo }, status: :created
  end

  def update
    todo_id = params[:id]
    todo = Todo.find_by(id: todo_id)
    if todo
      todo.update(todo_params)
      render json: { result: 'ok' }, status: :ok
    else
      render json: { errors: ["no todo item with such id: #{id}"] }, status: :not_found
    end
  end

  def delete
    todo_id = params[:id]
    todo = Todo.find_by(id: todo_id)
    if todo
      todo.destroy
      render json: { result: 'ok' }, status: :ok
    else
      render json: { errors: ["no todo item with such id: #{id}"] }, status: :not_found
    end
  end

  private

  def todo_params
    todo = params.require(:todo).permit(:task, :is_done)
    todo.merge(user_id: current_user[:id])
  end
end
