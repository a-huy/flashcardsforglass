$('.btn-confirm-delete').click(function() {
    $(this).button('loading');
    var $submitBtn = $(this);
    var deckSlug = $('.deck-slug').val();
    var url = '/deck/delete/' + deckSlug;
    $.ajax({
        url: url,
        type: 'delete',
        data: {},
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

        }
    });
});
