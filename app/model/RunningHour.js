/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.model.RunningHour', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax',
    ],
        
    //fields: [],
    proxy: {
		type: 'ajax',
		api: {
			read: 'php/runninghour/read.php'
        },
        reader: {
            type: 'json',
            root: 'runninghour',
            messageProperty: 'message'
        }
    }
});
