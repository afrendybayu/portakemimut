Ext.define('rcm.view.konfig.DetailLokasi', {
    extend: 'Ext.panel.Panel',
    xtype: 'panLokasi',
	/*
	title : 'isi Lokasi',
	width : 300,
	height : 400,
	html : 'ini detail'
	*/
	
	
	bodyPadding: 5,  // Don't want content to crunch against the borders
    width: 300,
    // title: 'Filters',
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Lokasi'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Kode'
	},{
		xtype: 'textfield',
        fieldLabel: 'Unit'
	},{
		xtype: 'textfield',
        fieldLabel: 'Type Unit'
    }],
    

});