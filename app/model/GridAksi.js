/* Afrendy Bayu, 3Des2013 */
Ext.define('rcm.model.GridAksi', {
	extend: 'Ext.data.Model',
	// requires:[
		// 'Ext.data.proxy.Ajax'
	// ],

	fields: [ 'nama', 'ket']
    // proxy: {
		// type: 'ajax',
		// api: {
			// read: 'ci/index.php/rh/rAksi'
        // },
        // reader: {
            // type: 'json',
            // root: 'aksi',
            // messageProperty: 'message'
        // }
    // }
	
});
