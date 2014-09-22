// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.laporan.OverHaul', {
    xtype: 'pOverHaul',
	extend: 'Ext.container.Container',

	requires: [
		
		'rcm.view.laporan.OverHaulInput'
		/*
		,'Ext.toolbar.Spacer'
		,'rcm.view.laporan.ConMonUnit'
		,'rcm.view.laporan.ConMonInput'
		,'rcm.view.laporan.CmGasComp'
		,'rcm.view.laporan.DetCmGasComp'
		'rcm.view.laporan.EPOPie' 
		//*/
	],
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
			align : 'stretch'}
		
		
		
    },{
   
               
        region: 'center',  
		title : 'pabnel center',
        xtype: 'iOverHaul',
		
        // layout: 'fit',
        
    }]
	

});
