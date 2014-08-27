/* AfrendyBayu 24Apr2014 */
Ext.define('rcm.store.WoOpen60', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.SapSpeedo',

	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/sap/rWOjml/WoOpen?gr=3',
        reader: {
            type: 'json',
            root: 'sap',
            messageProperty: 'message'
        }
    }
});
