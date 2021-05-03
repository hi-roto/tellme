require 'csv'

CSV.foreach('db/hansoku.csv', encoding: 'Shift_JIS:UTF-8') do |hansoku|
  Hansoku.create(
    :hansoku_name => hansoku[0], 
    :big_car => hansoku[1], 
    :normal_car => hansoku[2], 
    :motorcycle => hansoku[3], 
    :small_special_car => hansoku[4], 
    :motorized_bicycle => hansoku[5], 
    :category => hansoku[6]
  )
end