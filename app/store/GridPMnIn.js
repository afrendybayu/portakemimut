/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridPMnIn', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.GridAksi' ,
	
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rPM/rPMnotdef?cat=10'
        },
        reader: {
            type: 'json',
            root: 'pmndef',
            messageProperty: 'message'
        }
    }
	
	
});
