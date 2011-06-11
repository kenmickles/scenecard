module ApplicationHelper
  def body_class
    if @body_class.blank?
      "#{controller.controller_name} #{controller.action_name}"
    else
      @body_class
    end
  end
end
