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
			ajax: function (method, url, oldData, success, error) {
				var data;
				switch(oldData.action) {
				case 'create':
					method = 'POST';
					url = '/api/v1/contacts';
					data = {};
					for (prop in oldData.data[0]) {
						data[prop] = oldData.data[0][prop];
					}
					break;
				case 'edit':
					method = 'PUT';
					data = {};
					for (prop in oldData.data) {
						url = prop;
						for (subprop in oldData.data[prop]) {
							data[subprop] = oldData.data[prop][subprop];
						}
						break;
					}
					break;
				case 'remove':
					method = 'DELETE';
					url = '/api/v1/contacts/TODO';
					break;
				default:
					console.log("Unrecognised action '" + data.action + "'");
					break;
				}
				console.log(method + ' ' + url + ' ' + JSON.stringify(data));
				$.ajax({
					type: method,
					url: url,
					data: data ? JSON.stringify(data) : undefined,
					contentType: "application/json",
					dataType: "json",
					processData: false,
					success: function(json) {
						success(json);
					},
					error: function(xhr, err, thrown) {
						error(xhr, err, thrown);
					}
				});
			},
			table: '#contactsTable',
			fields: editorColumns,
			idSrc: 'url'
		});
		$('#contactsTable').DataTable({
			ajax: {
				url: '/api/v1/contacts',
				dataSrc: 'results'
			},
			dom: 'Bfrtip',
			deferRender: true,
			columns: tableColumns,
			select: true,
			idSrc: 'url',
			buttons: [
				{ extend: 'create', editor: editor },
				{ extend: 'edit',   editor: editor },
				{ extend: 'remove', editor: editor }
			]
		});
	});
})(jQuery);
