$(document).ready(function(){
   $('.date-block').dblclick(function(e){
        $('#info-panel').addClass(' open');
   });

   $('#info-panel')
   .on('click', 'button', function(e){
    if ($(this).is('.create')){

    }
    if ($(this).is('.update')){
        
    }
    if ($(this).is('.cancel')){
        $('#info-panel').removeClass('open');
    }
    if ($(this).is('.delete')){
        
    }

   })

   .on('click', '.close', function(e){
    $('button.cancel').click();
   });
});