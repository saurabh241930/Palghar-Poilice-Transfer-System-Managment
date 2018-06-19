

$('#table-body').on('click', '.view-request', function() {
	$(this).parent().siblings('.request-user').toggle();
});