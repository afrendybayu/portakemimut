/* AfrendyBayu, 26Okt2014 */
Ext.define('rcm.model.CatHirEq', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    fields: [{ name:'id',type:'int' },'text','tipe','parent' ],
    
	//*
    proxy: {
		type: 'ajax',
		api: {
			destroy: 'ci/index.php/konfig/rCatEquip/dHirCatEq'
        },
        reader: {
            type: 'json',
            root: 'cateq',
            messageProperty: 'message'
        }
    }
    //*/
});

