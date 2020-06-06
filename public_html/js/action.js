$(document).ready(function(){
    var panel = {
        el: '#info-panel',
        seletedDateBlock: null,
        open: function(isNew, e){

            $(panel.el).addClass('open').css({
                top: e.pageY+'px',
                left: e.pageX+'px',
            }).find('.title [contenteditable]').focus();

            panel.updateDate(e);

            if(isNew){
                $(panel.el).addClass('new').removeClass('update');
                panel.seletedDateBlock = $(e.currentTarget);
            }
            else{
                $(panel.el).addClass('update').removeClass('new');
                panel.seletedDateBlock = $(e.currentTarget).closest('.date-block');
            }
            
        },
        close: function(){
            $(panel.el).removeClass('open');
        },
        updateDate: function(e){
            // get date from .date-block 
            if ($(e.currentTarget).is('.date-block'))
                var date = $(e.currentTarget).data('date');
            else
                var date = $(e.currentTarget).closest('.date-block').data('date');
            
            // get month from calendar 
            var month = $('#calendar').data('month');

            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            $(panel.el).find('[name="month"]').val(month);
            $(panel.el).find('[name="date"]').val(date);

            // console.log($(panel.el).find('[name="month"]').val());
            // console.log($(panel.el).find('[name="date"]').val());
        },
    };

   $('.date-block').dblclick(function(e){
    // console.log(e.pageX);
    // console.log(e.pageY);
        panel.open(true, e);
    }).on('dblclick', '.event', function(e){
        e.stopPropagation();
        panel.open(false, e);
   });




   $(panel.el)
   .on('click', 'button', function(e){
    if ($(this).is('.create')){
        // collect data 
        var data = $(panel.el).find('form').serialize();

        // AJAX call - create API 
        $.post('event/create.php'.data, function(data, textStatus, xhr){
            // insert into events
        });  

        var source = $('#event-template').html();
        var eventTemplate = Handlebars.compile(source);
        var event = {
            id:1,
            title:'title',
            start_time:'10:20'
        };
        var eventUI = eventTemplate(event);

        panel.seletedDateBlock.find('.events').append(eventUI);
        panel.close();

    }
    if ($(this).is('.update')){
        
    }
    if ($(this).is('.cancel')){
        panel.close();
    }
    if ($(this).is('.delete')){
        
    }

   })

   .on('click', '.close', function(e){
    $('button.cancel').click();
   });
});