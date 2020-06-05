<?php include('header.php') ?>
<?php include('data.php') ?>

<div id="calendar">
    <div id="header">
        <?= date('Y')?>/<?= date('m')?>
    </div>

    <div id="days">
        <div class="day">SUN</div>
        <div class="day">MON</div>
        <div class="day">TUE</div>
        <div class="day">WED</div>
        <div class="day">THU</div>
        <div class="day">FRI</div>
        <div class="day">SAT</div>
    </div>

    <div id="dates">
        <div class="date-block">
            <div class="date">20</div>
            <div class="events">
                
            </div>
        </div>
    </div>
</div>





<?php include('footer.php') ?>