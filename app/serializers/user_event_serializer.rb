class UserEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :activated, :archived, :latitude, :longitude, :tasks_markers

  def activated
    return true
  end

  def tasks_markers
    features = []
    Task.where(event_id: object.id).each do |task|
      features << {:type => "Feature", 
        :geometry => {
          :type => "Point",
          :coordinates => [task.longitude, task.latitude]
        },
        :properties => {
          :title => "#{task.user.organization_name}: #{task.title}",
          :location => task.location,
          :description => task.description,
          :start => task.start,
          :end => task.end,
          :zipcode => task.zipcode,
          "marker-symbol" => "marker"
        }
      }
    end
    features
  end
end