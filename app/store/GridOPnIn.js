/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridOPnIn', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.GridAksi' ,
	
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rOPart/rOPnotdef?cat=10'
        },
        reader: {
            type: 'json',
            root: 'opdef',
            messageProperty: 'message'
        }
    }
	
	
});
