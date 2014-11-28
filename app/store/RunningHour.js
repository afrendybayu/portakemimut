/* AfrendyBayu 14Nov2013 */
Ext.define('rcm.store.RunningHour', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.RunningHour',
    requires: 'rcm.model.RunningHour',
    groupField : 'Lokasi',
    autoLoad: true, //--> load read.php
	//autoSync: true,
	
	proxy: {
		type: 'ajax',
		//url: 'php/hirarki/read.php',
		//url: 'ci/index.php/rh/rRunningHour',
		url: 'ci/index.php/rh/rRunningHour/rExGrid',
        reader: {
            type: 'json',
            root: 'runninghour',
            messageProperty: 'message'
        }
    }
});
