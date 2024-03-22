class ApplicationController < ActionController::Base
  # before_action :authenticate_user!

  protected

  def current_user
    user = User.last
    user.attributes.with_indifferent_access.slice(:id, :name, :email)
  end
end
