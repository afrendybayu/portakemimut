// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.ConMon', {
    xtype: 'tConMon',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.GridConMon'
		,'Ext.toolbar.Spacer'
		,'rcm.view.laporan.ConMonUnit'
		,'rcm.view.laporan.ConMonInput'
		,'rcm.view.laporan.CmGasComp'
		
		//'rcm.view.laporan.EPOPie'

	],
	layout: 'border',
    items: [{

        // title: 'Grafik',
        region: 'south',     
        xtype: 'panel',
        height: 400,
        split: true,        
        colapsible : true,
        margins: '0 5 5 5',
		layout : {type : 'hbox', align: 'stretch' },
		items : [{
			xtype : 'panel',
			// title : 'panel1',
			flex :1,
			items : [{
				xtype : 'gascompcm',
				param: 'GasComp',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Gas Compressor',
				dstore: 'ConMonGr',
				idx: 'gc'
				
			}]
			
		},{
			xtype : 'panel',
			flex :1,
			items : [{
				xtype : 'gascompcm',
				param: 'Genset',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Genset',
				dstore: 'ConMonGr',
				idx: 'gs'
			}]
		},{
			xtype : 'panel',
			flex :1,
			items : [{
				xtype : 'gascompcm',
				param: 'Pump',
				yNama: 'Cond. Monitoring',
				jdl: 'Condition Monitoring Pump',
				dstore: 'ConMonGr',
				idx: 'pmp'
			}]
		
		}]
    },{
   
        region:'west',
        xtype: 'panel',
        margins: '5 0 0 5',
        width: 200,
		split : true,
        layout: 'fit',
		items : [{
			xtype : 'tGridConMon'
		}]
		
    },{
       
        region: 'center',    
        xtype: 'panel',
        layout: 'fit',
        margins: '5 5 0 0',
		items : [{
			xtype : 'iConMon'
		}]
    }]
	

// =======
	/*	xtype: 'container',
		// html : 'isi container',
		layout: {
			type: 'vbox',
			align: 'stretch'
        },//*/
	/*	items:[{
			xtype: 'panel',
			dockedItems:{
				xtype : 'toolbar',
				items : [{
					xtype:'label',
					text : 'Condition Monitoring Schedule'
				},'->',{
					xtype: 'button',
					iconCls : 'cog',
					text : 'Upload Data',
					
				},{
					xtype: 'button',
					iconCls : 'add',
					// margin : '0 0 0 800',
					text : 'Tambah',
					
				}]
				
			
			},
			//height: 120,
			flex: 1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'tGridConMon',
					// width : 200,
					 flex: 1
				},{
					xtype: 'iConMon',
					flex: 4
				
			}]//*/
	/*	},{
			xtype: 'container',
			flex: 1,
			title : 'panel2',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items: [{
					xtype: 'panel',
					title : '1',
					flex: 1,
					// jdl: 'Work Order Number'
				},{
					xtype: 'panel',
					title : '2',
					flex: 1
				},{
					xtype: 'panel',
					title : '3',
					flex: 1
			}]
		}]//*/
	//}]
// >>>>>>> afrendy
});
