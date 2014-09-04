// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.ConMon', {
    xtype: 'tConMon',
	extend: 'Ext.container.Container',

	requires: [
		'rcm.view.laporan.GridConMon'
		,'Ext.toolbar.Spacer'
		,'rcm.view.laporan.ConMonUnit'
		,'rcm.view.laporan.ConMonInput'
		//'rcm.view.laporan.EPOPie'

	],
	layout: 'border',
    items: [{
        title: 'Grafik',
        region: 'south',     
        xtype: 'panel',
        height: 100,
        split: true,        
        colapsible : true,
		floatable: true,
        margins: '0 5 5 5'
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
	

});
