/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.SapTipe', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.SapTipe',
    //autoLoad: true,
    requires: 'rcm.model.SapTipe'

	,proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/sap/rFMEA/getNTipe'
        },
        reader: {
            type: 'json',
            root: 'sapntipe',
            messageProperty: 'message'
        }
    }
});
