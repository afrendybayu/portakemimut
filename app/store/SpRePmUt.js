/* AfrendyBayu 24Apr2014 */
Ext.define('rcm.store.SpRePmUt', {
	extend: 'Ext.data.Store',
	model: 'rcm.model.AvSpeedo',

	autoLoad: true,
	proxy: {
		type: 'ajax',
		url: 'ci/index.php/home/rSpAvReU?qe=repm',
        reader: {
            type: 'json',
            root: 'greq',
            messageProperty: 'message'
        }
    }
});

