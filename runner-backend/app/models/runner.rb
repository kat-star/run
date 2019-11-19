class Runner < ApplicationRecord
  has_many :goals, dependent: :destroy
  has_many :runs, dependent: :destroy
  has_many :races, dependent: :destroy
  has_many :awards, dependent: :destroy
  validates :name, uniqueness: true

  def calculate_streak 
    todays_date = Date.today.to_time.to_i
    runs = self.runs
    new_runs = runs.map do |run|
      unix_time = run.date.to_time.to_i
    end.sort{|a,b| b <=> a}
    new_runs.unshift(todays_date)
  
    count = 0
    streak = 0
    while count < new_runs.length - 1  do
      if new_runs[count] - new_runs[count+1] <= 86400
        streak += 1
      else
        break
      end
      count += 1
    end
    self.update(streak: streak)
  end
end
