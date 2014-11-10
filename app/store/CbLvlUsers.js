/* AfrendyBayu 18Jan2014 */
Ext.define('rcm.store.CbLvlUsers', {
    extend: 'Ext.data.Store',
    model: 'rcm.model.CbLvlUser',
    // requires: 'rcm.model.CbEquip',

    // autoLoad: true
    data : [
    	{"level":"0", "nama":"Administrator"},
        {"level":"1", "nama":"Operator"}
    ]
});
