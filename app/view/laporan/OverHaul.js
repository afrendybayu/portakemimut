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
		etext: 'Upload File OverHaul',
		nameFile: 'fileOh',
		idbSr: 'idSrOh',
		idbPdf: 'idbPdfOh',
		idbExc: 'idbExcOh',
		hdPdf: true,
		hdPdf: false
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
