class RunsController < ApplicationController
  def index
    runs = Run.all
    render json: runs
  end

  def show
    run = Run.find(params[:id])
    render json: run
  end

  def create
    run = Run.new(run_params)
    if run.save
      runner = Runner.find(run.runner_id)
      runner.calculate_streak 
      render json: { run: run, runner_streak: runner.streak }
    else
      render json: {error: "Something went wrong, try again"}
    end
  end

  def update
    run = Run.find(params[:id])
    if run.update(run_params)
      render json: run
    else
      render json: {error: "Something went wrong, try again"}
    end
  end

  def destroy
    run = Run.find(params[:id])
    if run.destroy
      render json: {message: "Successfully deleted run."}
    else
      render json: {error: "something went wrong"}
    end
  end

  private

  def run_params
    params.require(:run).permit(:distance, :pace, :date, :rating, :goal_id, :runner_id)
  end
end