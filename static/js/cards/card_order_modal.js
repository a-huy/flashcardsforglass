$('.list-group').sortable({
    update: function(evt, ui) {
        var $iframe = ui.item.find('iframe.nolink');
        var sizeClass = getSizeClass();
        $iframe.attr('src', $iframe.attr('src').split('&')[0] + '&size=' + sizeClass);
        $iframe.removeClass('smcard xscard').addClass(sizeClass);
        $iframe.parent().prev().removeClass('smcard xscard').addClass(sizeClass);
    },
    handle: '.shift-btn-wrapper'
});

$('iframe.nolink').each(function() {
    $(this).fadeOut(0);
    $(this).parent().prev().fadeOut(0);
    this.onload = function() {
        var sizeClass = getSizeClass();
        updateIframe(this, sizeClass);
        $(this).fadeIn();
        $(this).parent().prev().fadeIn();
    };
});

var getSizeClass = function() {
    var width = $(window).width();
    if (width >= 490) {
        return 'smcard';
    }
    if (width < 490) {
        return 'xscard';
    }
    return 'smcard';
};

var updateIframe = function(iframe, sizeClass) {
    iframe.contentWindow.postMessage({
        event: 'resize',
        sizeClass: sizeClass
    }, '*');
    $(iframe).removeClass('smcard xscard').addClass(sizeClass);
    $(iframe).parent().prev().removeClass('smcard xscard').addClass(sizeClass);
};

var updateCardPreviewDimensions = function() {
    var sizeClass = getSizeClass();
    $('iframe.nolink').each(function() {
        updateIframe(this, sizeClass);
    });
};

$(window).smartresize(updateCardPreviewDimensions);

$('.order-submit').click(function() {
    var ids = $('.nolink').map(function() {
        return $(this).data('card-id');
    }).get();
    var url = $('#card-order-modal').data('url');
    $.ajax({
        method: 'post',
        url: url,
        data: {
            card_ids: JSON.stringify(ids)
        },
        success: function(response) {
            location.reload()
        },
        error: function(response) {

        }
    });
});

$.fn.randomize = function(selector){
    var $elems = selector ? $(this).find(selector) : $(this).children(),
        $parents = $elems.parent();

    $parents.each(function(){
        $(this).children(selector).sort(function(){
            return Math.round(Math.random()) - 0.5;
        }).remove().appendTo(this);
    });

    return this;
};

$('.order-random').click(function() {
    var $group = $('.list-group');
    $group.randomize();
});
