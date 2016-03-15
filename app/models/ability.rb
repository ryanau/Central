class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new
    if user.is_a?(Admin)
      can :manage, :all
    else
      can :read, Event, :users => { :id => user.id }
      # can :read, Report, :users => { :id => user.id }
      can [:destroy, :update, :create], Message, :user_id => user.id, :report => { :event => { :archived => false } }
    end
  end
end
