/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridPMIn', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.GridAksi' ,
	
	autoLoad: true,
	/*
	sorters: [{
		property: 'durasi',
		direction: 'ASC' // or 'ASC'
	}],
	//*/
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rPM/rPMdefcat?cat=10'
        },
        reader: {
            type: 'json',
            root: 'pmlist',
            messageProperty: 'message'
        }
    }
	
	
});
