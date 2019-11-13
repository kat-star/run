class Runner < ApplicationRecord
  has_many :goals
  has_many :runs, through: :goals
end
