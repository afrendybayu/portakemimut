/* AfrendyBayu, 14Nov2013 */
Ext.define('rcm.view.dataentry.FormGagal', {
	extend: 'Ext.window.Window',
	xtype: 'taskFormGagal',
	requires: [
		//'Ext.tab.Panel',
		//'rcm.view.dataentry.TabForm',
		'rcm.view.dataentry.IsiTabForm'
	],
	
	//closeAction: 'destroy',		//'hide',
	//modal: true,
	//width: 500,
	closable: false,
	resizable: false,
	x:100,
	y:42,
	//height: 500,
	minWidth: 500,
	layout: 'fit',
	bodypadding : '10',
	// hidden : true,
	initComponent: function() {
		var me=this;
		/*
		me.buttons = [{
				text: 'Batal',
				id: 'cancel-task-fg-btn',
				icon: 'modul/icons/cross.gif',
			},
				'->'
			,{
				text: '<b>Simpan</b>',
				icon: 'modul/icons/savedisk.png',
				id: 'save-task-fg-btn',
				handler: function() {
					var i, dd;
					var tabx = Ext.getCmp('remove-this-tab');
					for(i=1; i<me.items.length; i++)	{
						//dd = me.remove();	//me.getId()
						rcmSettings.grid = me.getComponent("TF"+i);
						//console.log("dihapus: "+dd+ ", id: ");
					}
				}
		}],
		//*/
        me.items = [{
            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            border: false,
            frame: true,
			
            items: [{
				xtype: 'displayfield',
				name: 'eq',
				id: 'fmEq',
				labelAlign: 'left',
				labelWidth: 120,
				fieldLabel: '<b>Function Location</b>'
				
			},{
				xtype: 'isiFormGagal'  //isiTabForm js
				//padding : 10
				//xtype:'label',
				//text: 'aa'
			},{
				xtype: 'hiddenfield',
				id: 'fgid',
				value: 'idhidden'
			}]
		}];
		
		
		/*
		me.listeners = {
			close:function(flag){
				//if(flag == true){
					//alert("close window");
					//add to db
				//}
			}
		};
		//*/
		me.callParent(arguments);
		
	},
	
	ubahLebar: function(n)	{
		var me = this;
		if (n=='1')	me.setWidth(500);
		else if  (n=='2')		me.setWidth(700);
		else	me.setWidth(1000);
	}
});
