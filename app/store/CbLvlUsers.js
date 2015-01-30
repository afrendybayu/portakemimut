/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.CbLvlUsers', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.CbLvlUser',
    // requires: 'rcm.model.CbEquip',

    // autoLoad: true
    data : [
    	{"level":"0", "nama":"Super Admin"},
    	{"level":"1", "nama":"Administrator"},
        {"level":"2", "nama":"Operator"}
    ]
});
