/* AfrendyBayu 24Apr2014 */
Ext.define('rcm.store.SpAvPmUt', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.AvSpeedo',

	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'php/utama/spAvReU.php?qe=avpm',
        reader: {
            type: 'json',
            root: 'greq',
            messageProperty: 'message'
        }
    }
});

