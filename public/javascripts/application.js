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
	
	hide_overlay: function(){
		$('#overlay').fadeOut('fast', function(){
			$(this).remove();
		});
	},
	
	init: function(){
		$(document).ready(function(){	
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
						$('#cards').append('<li>' + html + '</li>');
						App.save_scene_order();
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
					});
				});
				
				// .close links close the overlay
				$('#overlay a.close').live('click', function(){
					App.hide_overlay();
					return false;
				});
				
				// change card title as you type
				$('input#scene_title').live('keyup', function(){
					var $this = $(this);
					var scene_id = $this.closest('form').attr('id').replace(/^edit_scene_/, '');
					$('#scene-' + scene_id + ' .title').text($this.val());
				});
				
				// change card description as you type
				$('textarea#scene_description').live('keyup', function(){
					var $this = $(this);
					var scene_id = $this.closest('form').attr('id').replace(/^edit_scene_/, '');
					var excerpt = $this.val().substr(0, 220);
					if ( excerpt.length < $this.val().length ) {
						excerpt += '...';
					}
					$('#scene-' + scene_id + ' .description').text(excerpt);
				});
				
				// change card location as you type
				$('input#scene_location').live('keyup', function(){
					var $this = $(this);
					var scene_id = $this.closest('form').attr('id').replace(/^edit_scene_/, '');
					$('#scene-' + scene_id + ' .location .value').text($this.val());
				});	
			
				// save card data on change
				$('#overlay form :input').live('change', function(){
					$(this).closest('form').submit();
				});
		
				// submit the card form via ajax
				$('#overlay form').live('submit', function(){
					var $form = $(this);
			
					$.post($form.attr('action'), $form.serialize(), function(data){
						// console.log(data);
					}, 'json');
			
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