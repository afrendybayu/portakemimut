/* AfrendyBayu 11Feb2014 */
Ext.define('rcm.model.AvHome', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax',
    ],
    fields: [ 'm',
				{ name:'tgt',type:'float' },
				{ name:'th1',type:'float' },
				{ name:'avg',type:'float' },
				{ name:'bln',type:'float' }],

    proxy: {
		type: 'ajax',
		api: {
			read: 'php/obafuncloc/rAvHome.php?tp=av'
        },
		reader: {
            type: 'json',
            root: 'avhome',
            messageProperty: 'message'
        }
    }
});
