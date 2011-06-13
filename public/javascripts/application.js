// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

App = {
	save_scene_order: function(){
		var scenes = [];

		$.each($('#cards form'), function(i, form){
			scenes.push($(form).attr('id').replace(/^edit_scene_/, ''));
		});

		$.post('/scenes/reorder', {scenes: scenes}, function(data){
			// console.log(data);
		}, 'json');
	},
	
	init: function(){
		$(document).ready(function(){	
			var $body = $('body');
	
		//-- Scenes

			if ( $body.is('.scenes.index') ) {
		
				// make scene cards sortable
				$('#cards').sortable({
					stop: function(e, ui){
						App.save_scene_order();
					}
				});
				
				$('#cards :input').add('disabled', 'disabled');
		
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
						$('#cards').prepend('<li>' + html + '</li>');
						$('#cards form:first input[type="text"]:first').focus().select();
						App.save_scene_order();
					});
					return false;
				});
		
				// delete card link. this is already remoted, so we just need to handle the UI
				$('a.delete').live('click', function(){
					$(this).closest('li').fadeOut();
				});
				
				// edit characters link. show the character form
				$('#cards .characters a.edit').live('click', function(){
					var $ul = $(this).closest('.characters').addClass('editable').find('ul');
					
					var active_ids = [];
					$.each($ul.find('li a'), function(i, a){
						active_ids.push($(a).metadata().character_id);
					});

					for ( var i = 0; i < CHARACTERS.length; i++ ) {
						var c = CHARACTERS[i];
						
						if ( $.inArray(c.id, active_ids) === -1 ) {
							$ul.append('<li><a href="#" class="{character_id: ' + c.id + '}"><img src="' + c.thumbnail_url + '" alt="[Photo of ' + c.name + ']" title="' + c.name + '" /></a></ul>');
						}
					}
					
					return false;
				});
				
				// done editing characters. hide the character form
				$('#cards .characters a.done').live('click', function(){
					var $ul = $(this).closest('.characters').removeClass('editable').find('ul');
					$.each($ul.find('li a:not(.active)'), function(i, a){
						$(this).closest('li').remove();
					});
					
					return false;
				});
				
				// add or remove a character from the scene
				$('#cards .characters.editable li a').live('click', function(){
					var $this = $(this);
					$this.toggleClass('active');
										
					var scene_id = $this.closest('.characters').metadata().scene_id;
					var character_id = $this.metadata().character_id;
					
					if ( $this.hasClass('active') ) {
						var action = 'add_character'
					}
					else {
						var action = 'remove_character';
					}					
					
					$.get('/scenes/' + scene_id + '/' + action + '/' + character_id, function(data){
						// console.log(data);
					});
					
					return false;
				});
				
				// character name tooltips
				$('#cards .characters li a img').tipsy({gravity: 's'});
			}
	
		});
	}
}