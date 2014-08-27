/* AfrendyBayu 24Apr2014 */
Ext.define('rcm.store.WoOpenL60', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.SapSpeedo',

	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rWOjml/WoOpen?gr=4',
        reader: {
            type: 'json',
            root: 'sap',
            messageProperty: 'message'
        }
    }
});
