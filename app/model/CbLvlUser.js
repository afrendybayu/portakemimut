/* Jono, 4Nov2014 */
Ext.define('rcm.model.CbLvlUser', {
	extend: 'Ext.data.Model',
	
	
	fields: [ 'level','nama'],
    data : [
    	{"level":"0", "nama":"Administrator"},
        {"level":"1", "nama":"Operator"}
    ]
});
