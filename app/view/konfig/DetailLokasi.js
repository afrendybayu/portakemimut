Ext.define('rcm.view.konfig.DetailLokasi', {
    extend: 'Ext.panel.Panel',
    xtype: 'panLokasi',
	/*
	title : 'isi Lokasi',
	width : 300,
	height : 400,
	html : 'ini detail'
	*/
	
	
	bodyPadding: 10,  // Don't want content to crunch against the borders
    width: 300,
    // title: 'Filters',
    items: [{
		xtype: 'label',
        //fieldLabel: 'Lokasi',
        text: 'Lokasi'
    }, {
        xtype: 'textfield',
        fieldLabel: 'Nama',
        disabled: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Kode',
        disabled: true
	},{
		xtype: 'textfield',
        fieldLabel: 'Unit',
        disabled: true
	},{
		xtype: 'textfield',
        fieldLabel: 'Type Unit'
    }],
    

});
