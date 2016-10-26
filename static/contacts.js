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

