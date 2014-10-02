// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.OverHaul', {
    xtype: 'pOverHaul',
	//extend: 'Ext.container.Container',
	extend: 'Ext.panel.Panel',

	requires: [
		'rcm.view.laporan.OverHaulInput',
		'rcm.view.laporan.FilterUpload'
	],
	
	dockedItems: [{
		xtype: 'tFUpl',
		dock: 'top',
		idbDownL: 'idDwOh',
		idbUpl: 'idUpOh',
		idtLok: 'idLFileOh',
		idThn: 'idThnOh',
		idbSr: 'idSrOh'
	}],
	
	layout: 'border',
    items: [{

        title: 'OverHaul Schedule',
        region: 'south',     
        xtype: 'tOverHaul',
        height : '50%',
        collapsible: true,
		// collapsed	: true,
		split: true,
        margins: '0 5 5 5',
		layout : {
			type : 'vbox',
			align : 'stretch'
		}
    },{  
        region: 'center',
        xtype: 'iOverHaul'
    }]
	

});
