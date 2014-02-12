var $cardContentInputs = $('.card-content');
var $baseTemplates = $('.smallcard-template');
var $inputFrontContent = $('#input-front-content');
var $cardPreview = $('#card-preview');

$cardContentInputs.keydown(function(evt) {
    if (evt.keyCode === 9) {
        var ss = this.selectionStart;
        var se = this.selectionEnd;
        var content = $(this).val();
        $(this).val(content.substring(0, ss) + '    ' + content.substring(se));
        this.selectionStart = this.selectionEnd = ss + 4;
        evt.preventDefault();
    }
});

$cardContentInputs.bind('input propertychange', function() {
    updatePreview(this);
});

$('.card-tab-label').click(function() {
    if ($(this).attr('for') === 'tab-general-radio') {
        $('.base-templates').fadeOut();
    }
    else {
        $('.base-templates').fadeIn();
        updatePreview($(this).next().find('.card-content'));
    }
});

$('.card-iframe-wrapper').click(function() {
    var $currentTab = $('[id^=tab]:checked')
    var cardBaseTemplateHTML = cardBaseTemplates[$(this).data('template-name')];
    var $cardContent = $currentTab.next().next().find('.card-content')
    $cardContent.val(cardBaseTemplateHTML);
    $currentTab.next().trigger('click');
});

function updatePreview(cardContentElem) {
    var rawContent = $(cardContentElem).val().trim();
    if (!rawContent) return;
    content = rawContent.search('<article') !== -1 ? { html: rawContent} : { text: rawContent }
    payload = {
        id: null,
        event: 'content',
        content: content,
        footer: 'just now',
        brand_icon: undefined,
        selected: true
    }
    $('#card-preview')[0].contentWindow.postMessage(payload, '*');
}

//templateMessageHandler = function() {
//    window.addEventListener('message', function(evt) {
//        var $currentTab = $('[id^=tab]:checked');
//        if ($currentTab.attr('id').indexOf('general') !== -1) return;
//        $baseTemplates.each(function() {
//            this.contentWindow.postMessage({
//                event: 'unselect'
//            }, '*');
//        });
//        var $caller = $baseTemplates.filter(function() {
//            return $(this).data('template') == evt.data.template;
//        });
//        $caller[0].contentWindow.postMessage({
//            event: 'select'
//        }, '*');
//        var cardBaseTemplateHTML = cardBaseTemplates[evt.data.template];
//        var $cardContent = $currentTab.next().next().find('.card-content')
//        $cardContent.val(cardBaseTemplateHTML);
//        $currentTab.next().trigger('click');
//    });
//};

var initCardPreview = function() {
    if ($inputFrontContent.val() === '') {
        $inputFrontContent.val(cardBaseTemplates['text']);
    }
    updatePreview($('#input-front-content'));
//    $('#tab-front-radio').next().trigger('click');
};

/* Form submitting */
function getValue($input) {
    switch($input.attr('type')) {
        case 'checkbox':
            return $input.is(':checked');
        case 'radio':
            return $('input[name=' + $input.attr('name') + ']:checked').val();
        default:
            return $input.val().trim();
    }
}

function showError(errors) {
    var errors_keys = Object.keys(errors);
    if (errors_keys.length === 0) return;
    $('.form-error').text(errors_keys[0].replace('_', ' ').toUpperCase() + ': ' + errors[errors_keys[0]]);
}

$('.form-submit').click(function(evt) {
    evt.preventDefault();
    var formId = $(this).data('form');
    var form = $(formId)[0];
    $form = $(form);
    fields = {}
    $.each(form.querySelectorAll('input, textarea'), function(argi, input) {
        $input = $(input);
        fields[$input.attr('name')] = getValue($input);
    });
    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: fields,
        success: function(response) {
            if (response.redirect_url) {
                location.href = response.redirect_url;
            }
            else {
                location.reload();
            }
        },
        error: function(response) {
            if (response.status == 400) {
                showError(response.responseJSON.errors);
            }
        }
    });
});
/* End Form submitting */

var updateCardPreviewDimensions = function() {
    var width = $(window).width();
    var sizeClass = '';
    if (width >= 1200) {
        sizeClass = 'scalable';
    }
    if (width < 1200) {
        sizeClass = 'mdcard';
    }
    if (width < 992) {
        sizeClass = 'scalable';
    }
    if (width < 670) {
        sizeClass = 'mdcard';
    }
    if (width < 566) {
        sizeClass = 'smcard';
    }
    $cardPreview[0].contentWindow.postMessage({
        event: 'resize',
        sizeClass: sizeClass
    }, '*');
    $cardPreview.attr('class', sizeClass)
    $('.card-preview-wrapper').removeClass('scalable mdcard smcard').addClass(sizeClass);
};

$(window).smartresize(updateCardPreviewDimensions);

$(document).ready(function() {
//    templateMessageHandler();
    updateCardPreviewDimensions();
    initCardPreview();
});
