// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){	
	var $body = $('body');
	
//-- Scenes

	if ( $body.is('.scenes.index') ) {
		$('#cards').sortable({
			stop: function(e, ui){
				var scenes = [];
				
				$.each($('#cards form'), function(i, form){
					scenes.push($(form).attr('id').replace(/^edit_scene_/, ''));
				});
				
				$.post('/scenes/reorder', {scenes: scenes}, function(data){
					console.log(data);
				}, 'json');
				
				// Parameters: {"utf8"=>"✓", "authenticity_token"=>"f+LSVCuCbjIFHtNn+07YT44CqvhYbkxODOx4tM16bN8=", "scene"=>{"title"=>"New Scene!", "description"=>"sadsa", "location"=>""}, "id"=>"15"}
			}
		});
		
		// save card data on change
		$('#cards form :input').change(function(){
			$(this).closest('form').submit();
		});
		
		// submit the card form via ajax
		$('#cards form').submit(function(){
			var $form = $(this);
			
			$.post($form.attr('action'), $form.serialize(), function(data){
				// console.log(data);
			}, 'json');
			
			return false;
		});
		
		// make labels work even though we're wrongly using multiple IDs on one page
		$('form.scene label').click(function(){
			$(this).siblings(':input').focus();
			return false;
		});
		
		// new card link
		$('a.new').click(function(){
			$.get('/scenes/new', function(html){
				$('#cards').append('<li>' + html + '</li>');
				$('#cards form:last input[type="text"]:first').focus().select();
			});
			return false;
		});
		
		// delete card link. this is already remoted, so we just need to handle the UI
		$('a.delete').live('click', function(){
			$(this).closest('form.scene').fadeOut();
		});
	}
	
});