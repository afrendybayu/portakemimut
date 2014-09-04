/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.store.SapOrderCot', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.HoOrderC',
	requires: 'rcm.model.HoOrderC',
	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rOrderCost/sapOCostOt',
        reader: {
            type: 'json',
            root: 'orderc',
            messageProperty: 'message'
        }
    }
	
});
