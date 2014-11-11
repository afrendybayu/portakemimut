/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.SapCause', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapCause',
    requires: 'rcm.model.SapCause',
	
	//autoLoad: true,
	
	sorters: [{
        property: 'jml',
        direction: 'desc'
    }, {
		property: 'kode',
        direction: 'asc'
	}]
	
    
});
