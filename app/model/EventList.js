/* Afrendy Bayu, 4Des2013 */
Ext.define('rcm.model.EventList', {
	extend: 'Ext.data.Model',
	requires:[
		'Ext.data.proxy.Ajax'
	],

	fields: [ 'id','nama']
	
	,proxy: {
        type: 'ajax',
        api: {
            read: 'ci/index.php/rEventList'
        },
        reader: {
            type: 'json',
            root: 'event',
            messageProperty: 'message'
        }
    }
});
