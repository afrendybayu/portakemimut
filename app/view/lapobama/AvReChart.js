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
	},{
		//*
		xtype: 'label',
		text: ' * Klik data kolom grafik untuk melihat detail',
		//*/
		/*
		xtype: 'container',
		layout: {
			type: 'hbox',
			align: 'stretch'
		},
		item:[{
			xtype: 'label',
			text: ' * Klik data kolom grafik untuk melihat detail',
		},{
			xtype: 'label',
			text: 'Afrendy',
		}],
		//*/
		dock: 'bottom'
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
			id: 'tavgr',
			flex: 1,
			fldY: ['av2014'],
			jdl: 'Availability & Reliability',
			subJdl: 'Gas Comp '+rcm.view.Util.Ublnini('')
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
					fldY: ['av2014'],
					jdl: 'Summary Availability ',
					subJdl: 'Gas Compressor'
				},{
					//*
					id: 'ReBar3',
					xtype: 'tReHome',
					width: '50%',
					height: '33.3%',
					jdl: 'Summary Reliability'
				}]
			},{
				//height: '23.3%',
				height: 140,
				//flex: 3,
				layout: {
					type: 'hbox',
					align: 'stretch'
				},
				//border: 0,
				items:[{
					id:'spAvR',
					width: '50%',
					xtype: 'tAvSpeedo',
					fldY: ['av2014'],
					//jdl: 'Availability',
					nama: 'Av',
					dstore: 'AvSpeedo',
					min: 50
				},{
					id:'spReR',
					width: '50%',
					xtype: 'tAvSpeedo',
					fldY: ['re2014'],
					//jdl: 'Reliability',
					nama: 'Re',
					dstore: 'ReSpeedo',
					min: 50
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
					fldY: ['av2014'],
					jdl: 'Availability',
					avrem1: 'av2013',
					avre: 'av2014',
					navre: 'av'+rcm.view.Util.U1th(''),
					navrem1: 'av'+rcm.view.Util.Uthm1()
				},{
					id: 'Re2Thn',
					//xtype: 'tAvReUnitx',
					xtype: 'tAv2Thn',
					width: '50%',
					//height: '33.3%',
					jdl: 'Reliability',
					avrem1: 're2013',
					avre: 're2014',
					navre: 're'+rcm.view.Util.U1th(''),
					navrem1: 're'+rcm.view.Util.Uthm1()
				}]
			}]
		}]
	}]
	//*/
	
});
