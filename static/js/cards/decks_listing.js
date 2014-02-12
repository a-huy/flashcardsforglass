$inactive = $('td.inactive');
$active = $('td.active');

var inactiveOnHoverListener = function() {
    $(this).find('i').attr('class', 'fa fa-check-circle-o');
};

var inactiveOffHoverListener = function() {
    $(this).find('i').attr('class', 'fa fa-circle-o');
};

$inactive.hover(inactiveOnHoverListener, inactiveOffHoverListener);

var activeOnHoverListener = function() {
    $(this).find('i').attr('class', 'fa fa-circle-o');
};

var activeOffHoverListener = function() {
    $(this).find('i').attr('class', 'fa fa-check-circle-o');
};

$active.hover(activeOnHoverListener, activeOffHoverListener);

var inactiveClickListener = function() {
    var selected = $(this);
    var deckSlug = selected.data('deck-slug');
    var url = '/deck/select/' + deckSlug;
    $.ajax({
        url: url,
        type: 'post',
        data: {},
        success: function(response) {
            $('td.active').removeClass('active').addClass('inactive');
            selected.removeClass('inactive').addClass('active');
            selected.find('i').attr('class', 'fa fa-check-circle-o');
            selected.unbind();
            selected.hover(activeOnHoverListener, activeOffHoverListener);
            selected.click(activeClickListener);
        },
        error: function(response) {

        }
    });
};

var activeClickListener = function() {
    var selected = $(this);
    var deckSlug = selected.data('deck-slug');
    var url = '/deck/unselect/' + deckSlug;
    $.ajax({
        url: url,
        type: 'post',
        data: {},
        success: function(response) {
            $('td.active').removeClass('active').addClass('inactive');
            selected.find('i').attr('class', 'fa fa-circle-o');
            selected.unbind();
            selected.hover(inactiveOnHoverListener, inactiveOffHoverListener);
            selected.click(inactiveClickListener);
        },
        error: function(response) {

        }
    });
};

$inactive.click(inactiveClickListener);

$active.click(activeClickListener);

$('body').on('hidden.bs.modal', '.modal', function() {
    $(this).removeData('bs.modal');
});
