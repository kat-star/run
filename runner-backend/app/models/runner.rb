class Runner < ApplicationRecord
  has_many :goals, dependent: :destroy
  has_many :runs, through: :goals
  validates :name, uniqueness: true
end
