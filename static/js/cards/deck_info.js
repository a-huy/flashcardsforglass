// Caching
var $deckContainer = $('#deck-container');
var $iframe = $('iframe');

$deckContainer.isotope({
    itemSelector : '.card-item',
    layoutMode : 'masonry',
    getSortData : {
        marker : function ($elem) {
            switch($elem.data('card-hex-marker')) {
                case '#808080':
                    return 0;
                case '#34a7ff':
                    return 1;
                case '#cc3333':
                    return 2;
                case '#99cc33':
                    return 3;
                case '#ddbb11':
                    return 4;
                default:
                    return 5;
            }
        },
        created : function($elem) {
            return $elem.data('card-created-date');
        },
        modified : function($elem) {
            return $elem.data('card-modified-date');
        },
        index : function($elem) {
            return $elem.data('card-index');
        }
    },
    sortBy: 'creation',
    sortAscending: true
});

var flipCard = function(iframeElem, side) {
    var content = $(iframeElem).siblings('.card-' + side + '-content').val();
    iframeElem.contentWindow.postMessage({
        id: null,
        event: 'content',
        content: {
            html: content
        },
        brand_icon: undefined,
        selected: true
    }, '*');
};

$iframe.bind('mouseover', function() {
    flipCard(this, 'back');
});

$iframe.bind('mouseout', function() {
    flipCard(this, 'front');
});

$(document).delegate('.btn', 'click', function(evt) {
    if ($(this).hasClass('btn-order')) {
        $i = $(this).find('i');
        if ($i.hasClass('fa-sort-desc')) {
            $i.attr('class', 'fa fa-sort-asc');
        }
        else {
            $i.attr('class', 'fa fa-sort-desc');
        }
    }
    var sortClicked = $(this).data('sort');
    var colorClicked = $(this).data('color');
    updateIsotope(sortClicked, colorClicked);
});

var firstClickDeleteListener = function() {
    var $deleteBtn = $(this);
    $deleteBtn.addClass('active');
    $deleteBtn.tooltip('show');
    $deleteBtn.unbind().click(confirmDeleteListener);
    setTimeout(function() {
        $deleteBtn.tooltip('destroy');
        $deleteBtn.removeClass('active');
        $deleteBtn.unbind().click(firstClickDeleteListener);
    }, 3000);
}

var confirmDeleteListener = function() {
    $deleteBtn = $(this);
    var cardId = $deleteBtn.parent().data('card-id');
    var url = '/card/delete/' + cardId;
    $.ajax({
        url: url,
        type: 'delete',
        data: {},
        success: function(response) {
            $('#deck-container').isotope('remove', $deleteBtn.parent());
        },
        error: function(response) {
            $deleteBtn.tooltip('destroy');
            $deleteBtn.removeClass('active');
            $deleteBtn.unbind().click(firstClickDeleteListener);
        }
    });
}

$(document).ready(function() {
    templateMessageHandler();
    $('.btn').tooltip();
    $('.card-delete').click(firstClickDeleteListener);
});

var glassColorToHex = function(colorName) {
    switch(colorName) {
        case 'gray':
            return '#808080';
        case 'blue':
            return '#34a7ff';
        case 'red':
            return '#cc3333';
        case 'green':
            return '#99cc33';
        case 'yellow':
            return '#ddbb11';
        case 'none':
            return 'none';
        default:
            return undefined;
    }
}

var templateMessageHandler = function() {
    window.addEventListener('message', function(evt) {
        if (!$('#card-order-modal').hasClass('in')) {
            window.location = '/card/edit/' + evt.data.card_id;
        }
    });
};

var updateIsotope = function(sortClicked, colorClicked) {
    var $activeColors = $('.filter-colors .btn');
    var isAscending = !$('.btn-order').hasClass('active');
    var currSort, activeColors = '';
    if (sortClicked) { currSort = sortClicked }
    else { currSort = $('.sort-options .btn.active').data('sort'); }
    $activeColors.each(function () {
        var currColor = $(this).data('color');
        var colorIsActive = $(this).hasClass('active');
        var colorIsClicked = currColor == colorClicked;
        if (colorIsActive != colorIsClicked) {
            activeColors += (activeColors != '' ? ', ' : '') + 'div[data-card-hex-marker="' + glassColorToHex(currColor) + '"]';
        }
    });
    if (!activeColors) activeColors = 'hideEverything';
    $('#deck-container').isotope({
        sortBy: currSort,
        sortAscending: isAscending,
        filter: activeColors
    });
};

$('body').on('hidden.bs.modal', '.modal', function() {
    $(this).removeData('bs.modal');
});
