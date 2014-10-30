/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridModenIn', {
    extend: 'Ext.data.Store',
    // model: 'rcm.model.GridAksi' ,
	
	autoLoad: true,
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rMode/rModenotdef'
        },
        reader: {
            type: 'json',
            root: 'mdef',
            messageProperty: 'message'
        }
    }
	
	
});
