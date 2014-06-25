/* AfrendyBayu, 25Jan2014 */
Ext.define('rcm.model.AvReUnit', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax',
    ],
    //fields: [],
    fields: ['m','b',
				{ name:'av2013',type:'float' },
				{ name:'re2013',type:'float' },
				{ name:'av2014',type:'float' },
				{ name:'re2014',type:'float' }],

    proxy: {
		type: 'ajax',
		api: {
			read: 'php/obafuncloc/read.php'
        },
		reader: {
            type: 'json',
            root: 'avre',
            messageProperty: 'message'
        }
    }
});
