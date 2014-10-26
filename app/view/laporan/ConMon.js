// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.ConMon', {
    xtype: 'tConMon',
	//extend: 'Ext.container.Container',
	extend: 'Ext.panel.Panel',

	requires: [
		'rcm.view.laporan.GridConMon'
		,'Ext.toolbar.Spacer'
		,'rcm.view.laporan.ConMonUnit'
		,'rcm.view.laporan.ConMonInput'
		,'rcm.view.laporan.CmGasComp'
		,'rcm.view.laporan.DetCmGasComp'
		//'rcm.view.laporan.EPOPie'

	],
	/*
	dockedItems: [{
		dock: 'bottom',
		idThn: 'iThnOcostxxx',
		idbSr: 'srOcostxxx',
		xtype: 'tFThn'
	}],
	//*/
	layout: 'border',
    
	items: [{

        //title: 'Grafik Condition Monitoring',
        region: 'center',     
        //height: 500,
		//margins: '0 5 5 5',
		layout : {
			type : 'vbox',
			align : 'stretch'},
		items:[{
			xtype : 'panel',
			
			layout : {type : 'hbox', align: 'stretch' },
			flex : 1,
			items :[{
				xtype : 'gascompcm',
				flex :1,
				param: 'GasComp',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Gas Compressor',
				dstore: 'ConMonGr',
				warna : '#7cb5ec',
				idx: 'gc'
			},{
				flex :1,
				xtype : 'gascompcm',
				param: 'Genset',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Genset',
				dstore: 'ConMonGr',
				warna : '#434348',
				idx: 'gs'	
			},{
				flex :1,
				xtype : 'gascompcm',
				param: 'Pump',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Pump',
				dstore: 'ConMonGr',
				warna : '#90ed7d',
				idx: 'pmp'				
			}]
		},{
			xtype : 'panel',
			// title : 'dua',
			flex : 1,
			layout : {type : 'hbox', align: 'stretch' },
			items : [{
				xtype : 'detgascompcm',
				flex :1,
				// yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Gas Compressor',
				dstore: 'DetConMonGr'
			},{
				xtype : 'detgascompcm',
				flex :1,
				// yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Genset',
				dstore: 'DetConMonGs'
			},{
				xtype : 'detgascompcm',
				flex :1,
				// yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Pump',
				dstore: 'DetConMonPmp'
			}]
		}]
		
    },{
		region: 'south',     
		title: 'Detail Condition Monitoring',
        split: true,
        collapsible: true,        
		collapsed: true,
		height: 220,
        //*
		layout: 'border',
		items: [{
				xtype: 'tFUpl',
				region:'north',
				idbDownL: 'idDwCm',
				idbUpl: 'idUpCm',
				idtLok: 'idLFileCm',
				idThn: 'idThnCm',
				etext: 'Upload File ConMon',
				nameFile: 'fileCm',
				idbSr: 'idSrCm',
				idbPdf: 'idPdfCm'
			},{
				region:'west',
				xtype : 'tGridConMon',
				width: 200
			},{
				region: 'center',    
				//xtype : 'iConMon',
				xtype : 'tGridContract',
				duit: false,
				totcv: true,
				budg: true,
				pbudg: true,
				region:'center'
		}]
		//*/
		/*
        region:'west',
        //xtype: 'panel',
        xtype : 'tGridConMon',
        //margins: '5 0 0 5',
        width: 200
		
		split : true,
        layout: 'fit',
		items : [{
			xtype : 'tGridConMon'
		}]
		//*/
    //},{
		/*
        region: 'center',    
        xtype : 'iConMon',
        //xtype: 'panel',
        layout: 'fit',
        //margins: '5 5 0 0',
		//items : [{
			//xtype : 'iConMon'
		//}]
		//*/
    }]
});
