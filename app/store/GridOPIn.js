/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridOPIn', {
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
			read: 'ci/index.php/rh/rOPart/rOPartdefcat?cat=10'
        },
        reader: {
            type: 'json',
            root: 'pmlist',
            messageProperty: 'message'
        }
    }
	
	
});
