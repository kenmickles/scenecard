// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

App = {
	save_scene_order: function(){
		var scenes = [];

		$.each($('#cards .card'), function(i, div){
			scenes.push($(div).attr('id').replace(/^scene-/, ''));
		});
		
		$.post('/scenes/reorder', {scenes: scenes}, function(data){
			// console.log(data);
		}, 'json');
	},
	
	update_card: function(scene_id) {
		$('#scene-' + scene_id).parent().load('/scenes/' + scene_id);
	},
	
	hide_overlay: function(){
		// save form data
		App.save_scene();		
		
		// remove any lingering tooltips
		$('.tipsy').remove();
		
		// fade out overlay
		$('#overlay').fadeOut('fast', function(){
			$(this).remove();
		});
	},
	
	save_scene: function() {
		var $form = $('#overlay form.scene');
		var scene_id = $form.attr('id').replace(/^edit_scene_/, '');
		$.post($form.attr('action'), $form.serialize(), function(data){
			App.update_card(scene_id)
		}, 'json');
	},
			
	init: function(){
		$(document).ready(function(){	
			// disable ajax caching
  		$.ajaxSetup({ cache: false });

			var $body = $('body');
			
			// hide popup when escape key is pressed
			$(document).keyup(function(e) {
			  if ( e.keyCode == 27 && $('#overlay').is(':visible') ) { 
					App.hide_overlay();
				}
			});			
	
		//-- Scenes

			if ( $body.is('.scenes.index') ) {
		
				// make scene cards sortable
				$('#cards').sortable({
					stop: function(e, ui){
						App.save_scene_order();
					}
				});
				
				// new card link
				$('a.new').click(function(){
					var title = prompt('Scene Title:', 'New Scene');
					
					$.get('/scenes/new', {title: title}, function(html){
						// add card to list
						$('#cards').append('<li>' + html + '</li>');
						
						// update the scene weights
						App.save_scene_order();
						
						// scroll to new card
						$('html,body').animate({scrollTop: $('#cards li:last').offset().top},'slow');						
					});
					return false;
				});
		
				// delete card link. this is already remoted, so we just need to handle the UI
				$('a.delete').live('click', function(){
					$(this).closest('li').fadeOut();
				});
				
				// double click a card to open the edit form
				$('#cards .card').live('dblclick', function(){					
					$.get('/scenes/' + $(this).attr('id').replace(/^scene-/, '') + '/edit', function(html){
						// make sure no other overlays exist. this can result from rapid double clicking
						$('#overlay').remove();						
						
						// attach form
						$('body').append('<div id="overlay"><div class="backdrop"></div><div class="card">' + html + '</div></div>');
						
						// add close button
						// $('#overlay form').prepend('<a class="x close" href="#" title="Close this form"><span>x</span></a>');						
						
						// center form
						var left = ($(window).width() - $('#overlay .card').width()) / 2;
						var top = $(window).scrollTop() + 100;
						$('#overlay .card').css({left: left, top: top});
						
						// add character name tooltips
						$('#overlay .characters li a img').tipsy({gravity: 's'});					
						
						// save card data on change
						$('#overlay form :input').change(function(){
							App.save_scene();
						});
						
						// focus on the description field
						$('#scene_description').focus();
					});
				});
				
				// .close links close the overlay
				$('#overlay a.close').live('click', function(){
					App.hide_overlay();
					return false;
				});			
								
				// add or remove a character from the scene
				$('#overlay .characters li a').live('click', function(){
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
			}
	
		});
	}
}