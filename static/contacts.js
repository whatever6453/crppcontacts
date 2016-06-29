function toTitleCase(str) {
	return str.replace(/[^a-zA-Z0-9 ]/, ' ')
	.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
(function($) {
	$(function() {
		var columnNames = [
			'first_name',
			'last_name',
			'organization',
			'position',
			'department',
			'email1',
			'email2',
			'telephone',
			'mobile1',
			'mobile2',
			'country',
			'state',
			'city',
			'street',
			'zip_code',
			'website'
		];
		var tableColumns, editorColumns;
		tableColumns = $.map(columnNames, function(columnName, index) {
			return {
				data: columnName,
				title: toTitleCase(columnName)
			};
		});
		tableColumns.concat(
			// Combine the first and last names into a single table field
			{ data: null, render: function(data, type, row) {
				return data.first_name+' '+data.last_name;
			}}
		);
		editorColumns = $.map(columnNames, function(columnName, index) {
			return {
				name: columnName,
				label: toTitleCase(columnName)
			};
		});
		var editor = new $.fn.dataTable.Editor({
			ajax: {
				create: {
					type: 'POST',
					url: '/contacts/v1/contacts',
				},
				edit: {
					type: 'PUT',
					url: '/contacts/v1/contacts/_id_'
				},
				remove: {
					type: 'DELETE',
					url: '/contacts/v1/contacts/_id_'
				}
			},
			table: '#contactsTable',
			fields: editorColumns
		});
		$('#contactsTable').DataTable({
			ajax: {
				url: '/contacts/v1/contacts',
				dataSrc: ''
			},
			dom: 'Bfrtip',
			deferRender: true,
			columns: tableColumns,
			select: true,
			buttons: [
				{ extend: 'create', editor: editor },
				{ extend: 'edit',   editor: editor },
				{ extend: 'remove', editor: editor }
			]
		});
	});
})(jQuery);
