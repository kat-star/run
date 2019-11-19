class AwardsController < ApplicationController

  def index
    awards = Award.all
    render json: awards
  end

  def show
    award = Award.find(params[:id])
    render json: award
  end

  def create
    award = Award.new(award_params)
    if award.save
      render json: award
    else
      render json: {error: "Something went wrong"}
    end
  end

  def update
    award = Award.find(params[:id])
    if award.update
      render json: award
    else
      render json: {error: "Something went wrong"}
    end
  end

  def destroy
    award = Award.find(params[:id])
    if award.destroy
      render json: {message: "Successfully deleted goal"}
    else
      render json: {error: "Something went wrong"}
    end
  end

  private

  def award_params
    params.require(:award).permit(:name, :goal_id, :runner_id)
  end

end
