class Goal < ApplicationRecord
  belongs_to :runner
  has_many :runs, dependent: :destroy
  has_many :awards, dependent: :destroy
end
