$(document).ready(function(){
    var source = $('#event-template').html();
    var eventTemplate = Handlebars.compile(source);

    var panel = {
        el: '#info-panel',
        selectedDateBlock: null,
        init: function(e) {
            panel.clear();

            panel.updateDate(e);
        },
        clear: function() {
            $(panel.el).find('input').val('');
            $(panel.el).find('textarea').val('');
        },
        open: function(isNew, e){
            panel.init(e);
            $(panel.el).addClass('open').css({
                top: e.pageY+'px',
                left: e.pageX+'px',
            }).find('.title [contenteditable]').focus();

            if(isNew){
                $(panel.el).addClass('new').removeClass('update');
                panel.selectedDateBlock = $(e.currentTarget);
            }
            else{
                $(panel.el).addClass('update').removeClass('new');
                panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');
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
            
            // get month and year from calendar 
            var year = $('#calendar').data('year');
            var month = $('#calendar').data('month');

            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            $(panel.el).find('[name="year"]').val(year);
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

        panel.selectedEvent = $(e.currentTarget);

        var id = $(this).data('id');
   });

   $(panel.el)
   .on('click', 'button', function(e){
    if ($(this).is('.create')){
        // collect data 
        var data = $(panel.el).find('form').serialize();
        // console.log(data);

        // AJAX call - create API 
        $.post('event/create.php', data, function(data, textStatus, xhr){
            
            var eventUI = eventTemplate(data);

            // todo: insert with from time order
            panel.selectedDateBlock.find('.events').append(eventUI);
            panel.close();
        });  

        

    }
    if ($(this).is('.update')){
        
    }
    if ($(this).is('.cancel')){
        panel.close();
    }
    if ($(this).is('.delete')){
        var id = panel.selectedEvent.data('id');
        panel.selectedEvent.remove();
        panel.close();
    }

   })

   .on('click', '.close', function(e){
    $('button.cancel').click();
   });
});