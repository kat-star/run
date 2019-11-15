class RacesController < ApplicationController
  def index
    races = Race.all
    render json: races
  end

  def show
    race = Race.all
    render json: race
  end

  def create
    race = Race.new(race_params)
    if race.save
      render json: race
    else
      render json: {error: "something went wrong"}
    end
  end

  def update
    race = Race.find(params[:id])
    if race.update(race_params)
      render json: race
    else
      render json: {error: "something went wrong"}
    end
  end

  def destroy
    race = Race.find(params[:id])
    if race.destroy
      render json: {message: "Successfully deleted Race."}
    else
      render json: {error: "something went wrong"}
    end
  end

  private

  def race_params
    params.require(:race).permit(:category, :date, :runner_id, :active)
  end
end
