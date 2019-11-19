class Award < ApplicationRecord
  belongs_to :goal
  belongs_to :runner
end
