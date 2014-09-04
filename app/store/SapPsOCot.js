/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.store.SapPsOCot', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.SapOcPs',
	requires: 'rcm.model.SapOcPs',
	autoLoad: true,

	proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rOrderCost/sapPsOCot',
        reader: {
            type: 'json',
            root: 'orderc',
            messageProperty: 'message'
        }
    }
	
});
