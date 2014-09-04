/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.store.SapTop10', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.SapTop',
	requires: 'rcm.model.SapTop',
	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rOrderCost/sapTop10',
        reader: {
            type: 'json',
            root: 'orderc',
            messageProperty: 'message'
        }
    }
	
});
