function getValue($input) {
    switch($input.attr('type')) {
        case 'checkbox':
            return $input.is(':checked');
        case 'radio':
            return $('input[name=' + $input.attr('name') + ']:checked').val();
        default:
            return $input.val();
    }
}

function showErrors(errors) {
    $.each(errors, function(field_name, error_msg) {
        var input = $('input[name=' + field_name + ']');
        var errors_elem = $(input).next('.errors');
        $(errors_elem).text(error_msg);
    });
}

$('.form-submit').click(function(evt) {
    evt.preventDefault();
    var $submitBtn = $(this);
    $submitBtn.button('loading');
    var formId = $submitBtn.data('form');
    var form = $(formId)[0];
    var $form = $(form);
    var fields = {};
    $.each(form.querySelectorAll('input, textarea, select'), function(argi, input) {
        $input = $(input);
        fields[$input.attr('name')] = getValue($input);
    });
    console.log(fields);
    $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: fields,
        success: function(response) {
            var successWait = parseInt($submitBtn.data('success-wait'));
            var waitTime = !isNaN(successWait) ? successWait : 0;
            setTimeout(function() {
                if (response.redirect_url) {
                    location.href = response.redirect_url;
                }
                else {
                    location.reload();
                }
            }, waitTime);
        },
        error: function(response) {
            if (response.status == 400) {
                showErrors(response.responseJSON.errors);
                $submitBtn.button('reset');
            }
        }
    });
});

$('input[type=text]').keypress(function(evt) {
    if (evt.charCode === 13) {
        evt.preventDefault();
        $('.form-submit').trigger('click');
    }
});

$('input').focus(function() {
    var errors_elem = $(this).next('.errors');
    $(errors_elem).text('');
});
