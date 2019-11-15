class GoalsController < ApplicationController

  def index
    goals = Goal.all
    render json: goals
  end

  def show
    goal = Goal.all
    render json: goal
  end

  def create
    goal = Goal.new(goal_params)
    if goal.save
      render json: goal
    else
      render json: {error: "something went wrong"}
    end
  end

  def update
    goal = Goal.find(params[:id])
    if goal.update(goal_params)
      render json: goal
    else
      render json: {error: "something went wrong"}
    end
  end

  def destroy
    goal = Goal.find(params[:id])
    if goal.destroy
      render json: {message: "Successfully deleted goal."}
    else
      render json: {error: "something went wrong"}
    end
  end

  private

  def goal_params
    params.require(:goal).permit(:category, :value, :runner_id, :active)
  end
  
end
