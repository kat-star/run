class RunnersController < ApplicationController
  def index
    runners = Runner.all 
    render json: runners
  end

  def show
    runner = Runner.find(params[:id])
    render json: runner
  end

  def create
    runner = Runner.new(runner_params)
    if runner.save
      render json: runner
    else
      render json: {error: "Something went wrong, try again"}
    end
  end

  def update
    runner = Runner.find(params[:id])
    if runner.update(runner_params)
      render json: runner
    else
      render json: {error: "something went wrong"}
    end
  end

  def destroy
    runner = Runner.find(params[:id])
    if runner.destroy
      render json: {message: "Successfully deleted runner."}
    else 
      render json: {error: "something went wrong"}
    end
  end

  private

  def runner_params
    params.require(:runner).permit(:name, :miles, :streak)
  end
end
