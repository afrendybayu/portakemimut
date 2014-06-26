// afrendyBayu,26Jan2014 //
Ext.define('rcm.view.lapobama.AvReChart', {
    xtype: 'tAvReChart',
	extend: 'Ext.panel.Panel',
	//extend: 'Ext.container.Container',
	requires: [
		'rcm.view.MonthYear',
		'rcm.view.lapobama.BlnAv'
		
	],
	
	dockedItems: [{
		xtype: 'taskBlnAv',
		dock: 'top'
	//*
	},{
		xtype: 'label',
		text: ' * Klik data kolom grafik untuk melihat detail',
		dock: 'bottom'
	//*/
    }],
	
	layout: {
        type: 'hbox',
        align: 'stretch',
		columns: 2
        
	},

	defaults: {
		flex: 1,
		hideLabel: true
	},

	items: [{
		xtype: 'container',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		border:0,
		items:[{
			xtype: 'tAvGroup',
			//title : 'judul tAvGroup',
			flex: 1,
			fldY: ['av2014'],
			jdl: 'Availability Group'
		},{
			width: '60%',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				//height: '33.3%',
				flex: 4,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				border: 0,
				items:[{
					id: 'AvBar3',
					width: '50%',
					xtype: 'tAvHome',
					title : 'judul tAvHome',
					fldY: ['av2014'],
					jdl: 'Summary Availability ',
					subJdl: 'Gas Compressor'
				},{
					//*
					id: 'ReBar3',
					xtype: 'tReHome',
					//title : 'judul tReHome',
					width: '50%',
					height: '33.3%',
					jdl: 'Summary Reliability'
					//*/
				}]
			},{
				//height: '23.3%',
				flex: 3,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				//border: 0,
				items:[{
					id:'spAvR',
					width: '50%',
					xtype: 'tAvSpeedo',
					//title: 'gauge Av SPeedo',
					fldY: ['av2014'],
					jdl: 'Availability'
					//dstore: 'AvSpeedo'
				},{
					id:'spReR',
					width: '50%',
					xtype: 'tAvSpeedo',
					//title: 'gauge Re SPeedo',
					fldY: ['re2014'],
					jdl: 'Reliability'
					//dstore: 'ReSpeedo'
				}]
			},{
				//height: '43.3%',
				flex: 5,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				border: 0,
				items:[{
					id: 'Av2Thn',
					width: '50%',
					//xtype: 'tAvReUnitx',
					xtype: 'tAv2Thn',
					//title : 'chart av2thn',
					fldY: ['av2014'],
					jdl: 'Availability',
					avrem1: 'av2013',
					avre: 'av2014'
				},{
					id: 'Re2Thn',
					//xtype: 'tAvReUnitx',
					xtype: 'tAv2Thn',
					//title : 'chart re2thn',
					width: '50%',
					//height: '33.3%',
					jdl: 'Reliability',
					avrem1: 're2013',
					avre: 're2014'
				}]
			}]
		}]
	}]
	//*/
	
});
