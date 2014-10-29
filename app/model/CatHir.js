/* AfrendyBayu, 26Okt2014 */
Ext.define('rcm.model.CatHir', {
    extend: 'Ext.data.Model',
    requires:[
		'Ext.data.proxy.Ajax'
    ],
    fields: [{ name:'id',type:'int' },'text','tipe','parent' ],
    
	//*
    proxy: {
		type: 'ajax',
		api: {
			read: 'ci/index.php/konfig/rCatEquip/rHirarki',
			create: 'ci/index.php/konfig/rCatEquip/cHirCat',
			destroy: 'ci/index.php/konfig/rCatEquip/dHirCat'
        },
        reader: {
            type: 'json',
            root: 'cateq',
            messageProperty: 'message'
        }
    }
    //*/
});

