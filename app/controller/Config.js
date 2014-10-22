Ext.define('rcm.controller.Config', {
    extend: 'Ext.app.Controller',
    //*
    
	
	
	views: [
        // TODO: add views here
        'konfig.TabKonfig',
		'konfig.TreeHirarki',
		'konfig.AksiGrid',
		'konfig.PanelList',
		'konfig.TreeCat',
		'konfig.AksiForm'
		
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
		'LokUnit',
		'GridAksi',
		'PMDefs',
		'Causes',
		'Damages',
		'ModeDefs',
		'Refers',
		'Symptoms',
		'OpartDefs',
		'Users',
		
		'GridPMIn',
		'GridPMnIn',
		'GridKfEquip',
		'CatHir',
		'GridOPnIn',
		'GridOPIn',
		'GridModenIn',
		'GridModeIn'
    ],
    
    models: [
		'LokUnit',
		'GridAksi',
		'GridPMIn'
	],
    
    refs: [{
			ref: 'treeHirarki',
			selector: 'treeHirarki'
		},{
			ref: 'tCatHir',
			selector: 'tCatHir'
		},{
			ref: 'tKGridL',
			selector: 'tKGridL'
			//xtype: 'tKGridL',
			//autoCreate: true
		},{
			ref: 'fAksi',
			selector : 'fAksi'
	}],
    
    init: function() {
		var me = this;
        me.control({
			//*
			'[iconCls=new_folder_tree]': {
                click: me.tblNewLokasi
            },
			'[iconCls=delete_folder_tree]': {
                click: me.tblDelLokasi
            },
			'#tambah_lokasi' : {
				click : me.tambahLokasi
			},
			
			'treeHirarki': {
                // afterrender: me.handleAfterListTreeRender,
                edit: me.updateTreeHirarki,
                // completeedit: me.handleCompleteEdit,
                // canceledit: me.handleCancelEdit,
                deleteclick: me.handleDeleteIconClick,
                // selectionchange: me.filterTaskGrid,
                // taskdrop: me.updateTaskList,
                // listdrop: me.reorderList,
                itemmouseenter: me.showActions,
                itemmouseleave: me.hideActions,
                // itemcontextmenu: me.showContextMenu
            },
            
            'tCatHir': {
				catclick: me.hdlCatHir
			},
			
			'tKGridL': {
				cdragdrop: me.hdlDropListC,
				ddragdrop: me.hdlDropListD
			},
			 
			'fAksi button[text=Save]' : {
				click : me.hdlSimpanForm
			
			}
			
		});
		
    },
    
	hdlSimpanForm : function(){
		alert('tekan tombol simpan');
		var me = this,
		// f_aksi = me.getTAksi().getForm(),
		// var	f_aksi = me.getFAksi();
		getDataAksi = me.getFAksi().getForm().getValues(),
			// t=Ext.getCmp('idThnOh').getValue(),
		// foh.id_unit = this.getTaskOverHaul().idunit;
		// foh.id_equip = this.getTaskOverHaul().ideq;
		// foh.oh = this.getTaskOverHaul().idoh;
		AksiSave = Ext.create('rcm.model.GridAksi', getDataAksi);
		console.log(AksiSave);
		
		
	},
	
    hdlDropListD: function(data, cat, tab)	{
		//alert("hdlDropListD: "+data.get("id"));
		var me=this,
			dl;
		if (tab=="tk_pl")	{
			dl=new rcm.model.GridPMIn({ id:data.get("id") });
		}
		dl.destroy();
	},
    
    hdlDropListC: function(data, cat, tab)	{
		var me=this,
			dl,
			p={ eqcat:cat,list:data.get("id") };
		//alert("tab: "+tab+",cat: "+cat+", data: "+data.get("id"));

		if (tab=="tk_pl")	{
			dl=new rcm.model.GridPMIn(p);
		}
		else if (tab=="tk_ol")	{
			dl=new rcm.model.GridOPIn(p);
		}
		else if (tab=="tk_md")	{
			dl=new rcm.model.GridModeIn(p);
		}
		dl.save();
		//console.log("listeners GridL 3");
	},
    
    hdlCatHir: function(id,tab)	{
		var me=this;
		//alert("hdlCatHir: "+id+" "+tab);
		//me.getGridKfEquipStore().load({ params: {cat:id} });
		me.getGridKfEquipStore().clearFilter(true);
		me.getGridKfEquipStore().filter('durasi',id);
		if (tab=="tk_pl")	{
			me.getGridPMInStore().load({ params: {cat:id} });
			me.getGridPMnInStore().load({ params: {cat:id} });
		}
		else if (tab=="tk_ol")	{
			me.getGridOPInStore().load({ params: {cat:id} });
			me.getGridOPnInStore().load({ params: {cat:id} });
		}
		else if (tab=="tk_md")	{
			me.getGridModeInStore().load({ params: {cat:id} });
			me.getGridModenInStore().load({ params: {cat:id} });
		}		
	},
	
	tambahLokasi : function(){
		console.log('tambah lokasi');
	},
	
	tblNewLokasi : function(){
		// alert('buat lokasi baru');
		this.addTreeHirarki();
	
	},
	tblDelLokasi : function(){
		// alert('delete Lokasi');
		this.addTreeHirarki(true);
	},
	
	addTreeHirarki: function(leaf) {
        var me = this,
            hTree = me.getTreeHirarki(),
            cellEditingPlugin = hTree.cellEditingPlugin,
            selectionModel = hTree.getSelectionModel(),
            selectedList = selectionModel.getSelection()[0], //ambil id selected
            parentList = selectedList.isLeaf() ? selectedList.parentNode : selectedList, //if leaf, then selecetd parent id, else select id
            newList = Ext.create('rcm.model.LokUnit', {
				nama: 'New ' + (leaf ? 'Equipt' : 'FuncLoc'),
                leaf: leaf,
				// level : selectedList.data.depth,
                loaded: true // set loaded to true, so the tree won't try to dynamically load children for this node when expanded
            }),
			//*
            expandAndEdit = function() {
                if(parentList.isExpanded()) {
                    selectionModel.select(newList);
                    me.addedNode = newList;
                    cellEditingPlugin.startEdit(newList, 0);
                } else {
                    hTree.on('afteritemexpand', function startEdit(list) {
                        if(list === parentList) {
                            selectionModel.select(newList);
                            me.addedNode = newList;
							// console.log(newList);
                            cellEditingPlugin.startEdit(newList, 0);
                            // remove the afterexpand event listener
                            hTree.un('afteritemexpand', startEdit);
                        }
                    });
                    parentList.expand();
                }
            };
            //*/
		// console.log(selectionModel);
		// console.log('newlist : ');
		// console.log(newList);
		// console.log('list selected : ');
		console.log(selectedList);
		console.log(parentList);
		// alert ('dipilih parent dengan id '+ selectedList.raw.id + selectedList.raw.leaf );
		// alert ('dipilih parent dengan id '+ selectedList.raw.id + selectedList.raw.leaf );
		
        parentList.appendChild(newList);
        
		hirarkiStore = me.getLokUnitStore();
		hirarkiStore.sync();
		hirarkiStore.reload();
		
		
		// hTree.getStore().sync();
        if(hTree.getView().isVisible(true)) {
            expandAndEdit();
        } else {
            hTree.on('expand', function onExpand() {
                expandAndEdit();
                hTree.un('expand', onExpand);
            });
            hTree.expand();
        }
		//*/
    },
	
	updateTreeHirarki: function(editor, e) {
		console.log('diedit');
        //*
		var me = this,
            list = e.record;
		// console.log(e.row);
		console.log(e);
       //*
		list.save({
            success: function(list, operation) {
                // filter the task list by the currently selected list.  This is necessary for newly added lists
                // since this is the first point at which we have a primary key "id" from the server.
                // If we don't filter here then any new tasks that are added will not appear until the filter is triggered by a selection change.
                // me.filterTaskGrid(me.getTreeHirarki().getSelectionModel(), [list]);
            },
            failure: function(list, operation) {
                var error = operation.getError(),
                    msg = Ext.isObject(error) ? error.status + ' ' + error.statusText : error;

                Ext.MessageBox.show({
                    title: 'Update List Failed',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
		//*/
    },

	
	handleDeleteIconClick: function(view, rowIndex, colIndex, column, e) {
        alert ('delete nya ketahuan di controller');
		console.log ('lagi ngeklik delete');
		// this.deleteList(view.getRecord(view.findTargetByEvent(e)));
    },
	
	updateList : function(editor, e){
		// console.log ('coba hirarki diupdate');
	},
	
	showActions: function(view, list, node, rowIndex, e) {
        // console.log(node);
        // console.log('icon showActions');
		var icons = Ext.DomQuery.select('.x-action-col-icon', node);
        // console.log(icons);
		Ext.each(icons, function(icon){
            Ext.get(icon).removeCls('x-hidden');
        });
		//*/
    },
	 hideActions: function(view, list, node, rowIndex, e) {
		// console.log(node);
		// console.log('ikon hideActions');
		var icons = Ext.DomQuery.select('.x-action-col-icon', node);
		// console.log(icons);
        Ext.each(icons, function(icon){
            Ext.get(icon).addCls('x-hidden');
        });
    }
	
});
