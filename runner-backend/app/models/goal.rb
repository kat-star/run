class Goal < ApplicationRecord
  belongs_to :runner
  has_many :runs
end
