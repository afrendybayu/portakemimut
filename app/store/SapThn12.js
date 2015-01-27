/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.SapThn12', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapThn',
    //autoLoad: true,
    requires: 'rcm.model.SapThn'

	,proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rHistori/getThnSap12'
        },
        reader: {
            type: 'json',
            root: 'sapthn',
            messageProperty: 'message'
        }
    }
});
