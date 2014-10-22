/* AfrendyBayu 18Okt2014 */
Ext.define('rcm.store.GridPMIn', {
    extend: 'Ext.data.Store',
	model: 'rcm.model.GridPMIn'
	
	//autoLoad: true
	/*
	sorters: [{
		property: 'durasi',
		direction: 'ASC' // or 'ASC'
	}],
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/rh/rPM/rPMdefcat?',
			create: 'ci/index.php/rh/rPM/cPMList',
			update:  'ci/index.php/rh/rPM/uPMList',
        },
        reader: {
            type: 'json',
            root: 'pmlist',
            messageProperty: 'message'
        }
    }
	//*/
	
});
