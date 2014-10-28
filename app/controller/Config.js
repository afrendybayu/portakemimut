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
		'konfig.AksiForm',
		'konfig.AksiGrid'
		
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
		'LokUnit',
		
		'FormAksis',
		'FormPmDefs',
		
		// 'GridAksi',
		//'PMDefs',
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

    ],
    
    models: [
		'LokUnit',
		// 'GridAksi',
		
		'FormAksi',
		'FormPmDef',
		
		
		'GridPMIn',
		
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
		},{
			ref : 'gridAksi',
			selector : 'gridAksi'
		},{
			ref : 'fPmDef',
			selector : 'fPmDef'
		},{
			ref : 'gridPmDef',
			selector : 'gridPmDef'
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
			 
			'fAksi button[text=Simpan]' : {
				click : me.hdlSmpAksiForm
			
			},
			'fAksi button[text=Edit]' : {
				click : me.hdlEditAksiForm
			},
			'fPmDef button[text=Simpan]' : {
				click : me.hdlSmpPmDefForm
			},
			'fPmDef button[text=Edit]' : {
				click : me.hdlEditPmDefForm
			},
			'gridAksi' :{
				AksiGridDel  : me.delAksiGrid,
				selectionchange : me.slctAksiGrid
			},
			
			'gridPmDef' : {
				PmDefGridDel : me.delPmDefGrid,
				selectionchange : me.slctPmDefGrid
			}
			
		});
		
    },
	
	slctPmDefGrid : function (model, records){
		var me =this;
		if (records[0]) {
			me.getFPmDef().getForm().loadRecord(records[0]);
        }
	},
	
	delPmDefGrid : function (rec){
		alert ('Awas Kau Pencet-Penccet Aku '+rec);
		console.log(rec);
		
		var me = this, 
		record = rec.data,
		delPm = new rcm.model.FormPmDef(record );
		Ext.MessageBox.show({
				title : 'Hapus Predictive Maintenance Def.',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delPm.destroy ({
							success : function(delPm, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getFormPmDefsStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
	
	},

	hdlEditPmDefForm : function(){
		alert ('edit Form PM DEF');

		var me = this;
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isiform = me.getFPmDef().getForm();
		dataid = isiform.getRecord().data.id;
		isivalue = isiform.getValues();
		// isiform.//.newValues();
		// isistore = me.getFormAksisStore().getNewRecords();
		
		// editsave = new rcm.model.FormAksi();
		// editsave.set({id:dataid, nama:isivalue.nama, ket : isivalue.ket});

		editpmdef = Ext.create(rcm.model.FormPmDef,{
			id:dataid, 
			nama:isivalue.nama,
			kode:isivalue.kode,
			durasi:isivalue.durasi,
			ket : isivalue.ket
		});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);
		isiform.reset();
		editpmdef.save({
			success: function(record, operation){
				me.getFormPmDefsStore().reload();
			}

		});
	},
	
	hdlSmpPmDefForm : function (){
		alert('ke teken');
		var me = this,
		f_pmdef = me.getFPmDef().getForm(),
		getDataPMDef = f_pmdef.getValues(),
		PmDefSave = new rcm.model.FormPmDef(getDataPMDef);
		console.log(PmDefSave);
		f_pmdef.reset();
		PmDefSave.save({
			success: function(record, operation){
				me.getFormPmDefsStore().reload();
			}
			
		
		});
	},
    slctAksiGrid : function (model, records){
		var me =this;
		if (records[0]) {
			me.getFAksi().getForm().loadRecord(records[0]);
        }
	},
	
	delAksiGrid : function (rec){
		alert ('Awas Kau Pencet-Penccet Aku '+rec);
		console.log(rec);
		
		var me = this, 
		record = rec.data,
		delAksi 	= new rcm.model.FormAksi(record );
		Ext.MessageBox.show({
				title : 'Hapus Aksi',
				msg   : 'Yakin Data Akan di Hapus ??',
				buttons: Ext.MessageBox.OKCANCEL,
				icon  : Ext.MessageBox.WARNING,
				fn	: function (oks){
					if (oks === 'ok'){ 
						
						delAksi.destroy ({
							success : function(delAksi, operation){
								// dcmon.destroy();
								// me.getConMonStore().reload();
								me.getFormAksisStore().reload();
							},
							callback : function(){
								
							}
						}) 
					}
					
				}
			});
	
	},
	hdlEditAksiForm : function(){
		// alert ('ini tombol edit');
		var me = this;
		// isiform = me.getFAksi().getForm().newValue(); getValues; getUpdatedRecords
		isiform = me.getFAksi().getForm();
		dataid = isiform.getRecord().data.id;
		isivalue = isiform.getValues();
		// isiform.//.newValues();
		// isistore = me.getFormAksisStore().getNewRecords();
		
		// editsave = new rcm.model.FormAksi();
		// editsave.set({id:dataid, nama:isivalue.nama, ket : isivalue.ket});

		editsave = Ext.create(rcm.model.FormAksi,{id:dataid, nama:isivalue.nama, ket : isivalue.ket});
		// console.log(isivalue);
		// console.log(dataid);

		// console.log(editsave);
		isiform.reset();
		editsave.save({
			success: function(record, operation){
				me.getFormAksisStore().reload();
			}

		});

		
	},
	hdlSmpAksiForm : function(){
		// alert('tekan tombol simpan');
		var me = this,
		f_aksi = me.getFAksi().getForm(),
		getDataAksi = f_aksi.getValues(),
		AksiSave = new rcm.model.FormAksi(getDataAksi);
		// console.log(AksiSave);
		f_aksi.reset();
		AksiSave.save({
			success: function(record, operation){
				me.getFormAksisStore().reload();
			}
			
		
		});
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
			p={ eqcat:cat,pm:data.get("id") };
		//alert("tab: "+tab+",cat: "+cat+", data: "+data.get("id"));

		if (tab=="tk_pl")	{
			dl=new rcm.model.GridPMIn(p);
		}
		else if (tab=="tk_ol")	{
			dl=new rcm.model.GridOPIn(p);
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
			//me.get
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
