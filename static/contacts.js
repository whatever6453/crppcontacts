var RESTfulEditor = function(tableElement, entityName, columns) {
	var editor = this, opts = {
		ajax: function (method, url, oldData, success, error) {
			var data = {}, pk;
			pk = editor.DataTablesToDRF(oldData, data);
			url = '/api/v1/' + entityName + '/';
			switch (oldData.action) {
			case 'create':
				method = 'POST';
				break;
			case 'edit':
				method = 'PUT';
				url += pk;
				break;
			case 'remove':
				method = 'DELETE';
				url += pk;
				break;
			default:
				console.log("Unrecognised action '" + data.action + "'");
				error("Unrecognised action '" + data.action + "'");
				return;
			}
			return $.ajax({
				type: method,
				url: url,
				data: data ? JSON.stringify(data) : undefined,
				contentType: "application/json",
				dataType: "json",
				processData: false,
				success: function(response) {
					var editorData = {};
					editor.DRFToDataTables(response, editorData);
					return success(editorData);
				},
				error: error
			});
		},
		table: tableElement,
		fields: columns,
		idSrc: 'id'
	};
	$.fn.dataTable.Editor.call(this, opts);
};
RESTfulEditor.prototype = new $.fn.dataTable.Editor();
$.extend(RESTfulEditor.prototype, {
	/**
	 * Convert from DataTables Editor's pseudo-RESTful API
	 * to Django REST framework's pseudo-RESTful API.
	 * @param originalData The data in DataTables Editor JSON format
	 * @param newData The data in Django REST Framework's JSON format
	 * @returns The primary key of the entity to operate on
	 */
	DataTablesToDRF: function(dtedata, drfdata) {
		var pk;
		if (Object.keys(dtedata.data).length > 1) {
			throw "Cannot operate on more than one entity at a time";
		}
		for (pk in dtedata.data) {
			$.extend(drfdata, dtedata.data[pk]);
			return pk;
		}
		return undefined;
	},
	/**
	 * Convert from Django REST framework's pseudo-RESTful API
	 * to DataTables Editor's pseudo-RESTful API.
	 * @param json The data in Django REST Framework's JSON format
	 */
	DRFToDataTables: function(drfdata, dtedata) {
		dtedata.data = [ drfdata ];
	}
});

function toTitleCase(str) {
	return str.replace(/[^a-zA-Z0-9 ]/, ' ')
	.replace(/\w\S*/g, function(txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

(function($) {
	$(function() {
		var columnNames = [
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
		editorColumns = $.map(columnNames, function(columnName, index) {
			return {
				name: columnName,
				label: toTitleCase(columnName)
			};
		});
		editorColumns.unshift({
			name: 'last_name',
			label: toTitleCase('last_name')
		});
		editorColumns.unshift({
			name: 'first_name',
			label: toTitleCase('first_name')
		});
		tableColumns.unshift(
			// Combine the first and last names into a single table field
			{ data: null, title: "Name", render: function(data, type, row) {
				return row.first_name + ' ' + row.last_name;
			}}
		);
		tableColumns.push(
			// Join the tag names into a comma-separated list
			{ data: "tags", title: "Tags", render: function(data, type, row) {
				return data.join(', ');
			}}
		);
		var contactsTable = $('#contactsTable');
		var editor = new RESTfulEditor(contactsTable, 'contacts', editorColumns);
		contactsTable.DataTable({
			ajax: {
				url: '/api/v1/contacts',
				dataSrc: 'results'
			},
			dom: 'Bfrtip',
			deferRender: true,
			columns: tableColumns,
			select: true,
			idSrc: 'id',
			buttons: [
				{ extend: 'create', editor: editor },
				{ extend: 'edit',   editor: editor },
				{ extend: 'remove', editor: editor },
				'copy', 'csv'
				// TODO: Depends on JSZip, not currently installed
				// 'pdf'
				// TODO: Depends on DataTables print view plugin,
				// not currently installed
				// 'print'
			]
		});
	});
})(jQuery);
