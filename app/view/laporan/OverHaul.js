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
		dock: 'top',
		xtype: 'tFUpl',
		idbDownL: 'idDwOh',
		idbUpl: 'idUpOh',
		idtLok: 'idLFileOh',
		idThn: 'idThnOh',
		idCatH: 'idCatOh',
		etext: 'Upload File OverHaul',
		nameFile: 'fileOh',
		idLok: 'idLokOh',
		idbSr: 'idSrOh',
		idbPdf: 'idbPdfOh',
		idbExc: 'idbExcOh',
		idbExcP:'idbExcPOh',
		hdPdf: true,
		hdExc: false
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
