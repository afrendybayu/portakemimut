/* AfrendyBayu 24Apr2014 */
Ext.define('rcm.store.SpReGsUt', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.AvSpeedo',

	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'php/utama/spAvReU.php?qe=regs',
        reader: {
            type: 'json',
            root: 'greq',
            messageProperty: 'message'
        }
    }
});

