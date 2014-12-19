Ext.define('rcm.view.Util', {
	
	require: [
	//	'Ext.grid.RowNumberer',
	],
	initConfigList: [],
	
    statics: {
        Ubb: function(no)	{
			var a = (Math.floor(parseInt(no)/10)*10);
			return (no==a)?(a-10):a;
		},
		
		Ujdl2: function(j)	{
			var jar=j.split(" ");
			if (jar.length==1)	{
				return ((j-1)+" & "+j);
			} else {
				return ((jar[1]-1)+" & "+jar[1]);
			}
		},
		
        UnmBln:function(no)	{
			var strbln = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
			return strbln[no];
		},
		
		Ublnini: function(w)	{
			var strbln = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
			if (w=="")	{
				var d = new Date();
			}
			else {
				var d = new Date(w);
			}
			return (strbln[d.getMonth()]+" "+d.getFullYear());		
		},
        
        Upad: function(n)	{
			return (n<10)?("0"+n):n;
		},
		
		Udate: function(w) {
			if (w=="")	return new Date();
			var res=w.split("-");
			return new Date(parseInt(res[0]),(parseInt(res[1])-1),parseInt(res[2]));
		},
		
		U2th: function(w)	{
			var d = new Date(w);
			return ((d.getFullYear()-1)+" & "+d.getFullYear());
		},
		
		U1th: function(w)	{
			if (w=="")	
				var d = new Date();
			else 
				var d = new Date(w);
			return d.getFullYear();
		},
		
		Uthm1: function()	{
			var d = new Date();
			return (d.getFullYear()-1);
		},
		
		cid: function(str)	{
			//if (str.localeCompare("Gas Comp")==0)	{
			if (str=="Gas Compressor")	{
				return 5;
			//} else if (str.localeCompare("Pump")==0)	{
			} else if (str=="Pump System")	{
				return 6;
			//} else if (str.localeCompare("Generator Set")==0)	{
			} else if (str=="Generator Set")	{
				return 7;
			}
		},
		
		Uytd: function()	{
			var d = new Date();
			return ("YTD/Avg " + d.getFullYear());
		},
		
		Uspeedo: function(w)	{
			var d = new Date(w);
			return (this.UnmBln(d.getMonth())+" "+d.getFullYear());
		},
		
		Utime: function(w)	{
			if (w=="")	return "";
			var res=w.split(":");
			return (this.Upad(res[0])+":"+this.Upad(res[1]));
		},
		
		UxcolAvRe: function()	{
			
		},
		
		UxcolOH: function()	{
			var items=new Array(),
				col=new Array();
			
			items = [
				{ xtype:'rownumberer',width:25 
				},{ header:'Lokasi',dataIndex:'lok',width:130, hideable : false, 
					locked: true, filter: { type: 'string' }
				},{ header:'Nama Unit',dataIndex:'nama',width:220, hideable : false, 
					locked: true, filter: { type: 'string' } 
				}
			];
			
			for(var i=1; i<13; i++)	{
				col = [];
				for (var j=1; j<5; j++)		{
					col.push({ header: 'W'+j, dataIndex: 'b'+i+'m'+j, width:55,tdCls: 'x-change-cell',
						renderer: function(value,meta,a,b)	{
							var n=value.split(";");
							var d = parseInt(n[1]);
							//console.log(d);
							if (d<=3000)	{
								meta.style = "background-color:#a9d08e;";
							} else if (d<=4500)	{
								meta.style = "background-color:#00b050;";
							} else if (d<=9000)	{
								meta.style = "background-color:#b4c6e7;";
							} else if (d<=16000)	{
								meta.style = "background-color:#ffd966;";
							} else if (d<=24000)	{
								meta.style = "background-color:#f4b084;";
							} else if (d<=36000)	{
								meta.style = "background-color:#b46c95;";
							} else if (d<=1000000)	{
								meta.style = "background-color:#ff2828;";
							} 
							
							
							
							return (n[0]);
							//console.log(a);
							//if (value=="PM9K") {	// (value.localeCompare("IFOH")==0) {
							//	meta.style = "background-color:#a8ff94;";
							//} else if (value=="PM9K" || value=="PM18K")	{	// (value.localeCompare("TOH")==0) {
							/*
							if (value=="PM9K" || value=="PM18K")	{	// (value.localeCompare("TOH")==0) {
								meta.style = "background-color:#feffac;";
							} else if (value=="PM36K" || value=="PM48K" || value=="PM72K")	{	//(value.localeCompare("GOH")==0) {
								meta.style = "background-color:#ffbdbd;";
							} else if (value=="PM1.5K")	{
								meta.style = "background-color:#bdbdff;";
							}
							return value;
							//*/
						}
						
					});
				}
				items.push({ header:this.UnmBln(i-1),hideable:false,columns:col });
			}
			//items.push({ header:'Keterangan',dataIndex:'ket',minWidth: 180,flex:1,hideable:false });
			
			//console.log(items);
			return items;
		},
		
		UcariThn: function(w)	{
			var trm = w.trim(),
				arr = trm.split(" ");
			if (arr.length>1)	{
				return arr[1];
			}
			else {
				return arr[0];
			}
		},
		
		UxcolGrid: function()	{
			var strbln = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
			var items=new Array(), blnthn=new Array();
			var bln,thn,tgl,date;
			var column = new Array();
			var xtgl,xwkt;
			var w=14;
			
			//console.log("UxcolGrid rcmSettings.tgl: "+rcmSettings.tgl+5000);
			if (rcmSettings.tgl=='0')	{
				tgl=new Date();
			} else {
				tgl=new Date(rcmSettings.tgl);
			}
			
			items = [
				{ xtype: 'rownumberer' },	// ,locked:true
				{ header:'Unit', dataIndex: 'eq', width:200 }	// ,locked:true
			];
			
			tgl.setDate(tgl.getDate() - w + 1);
			var xbln=tgl.getMonth(); 
			//console.log("xbln "+xbln+" "+strbln[xbln]);
			var grid={}; var j=0;
			for(var i=w; i>=0; i--)	{
				if (((tgl.getDate()==1)&&(i!=w)) || (i==0))	{
					blnthn.push({ header:(strbln[xbln]+" "+(tgl.getFullYear())), columns: column });
					xbln=tgl.getMonth();
					column=[];
					j=0;
					if (i==0) break;
				}
				
				xwkt="k"+(tgl.getFullYear()-2000)+""+this.Upad(tgl.getMonth()+1)+""+this.Upad(tgl.getDate());
				//grid={header:tgl.getDate(),dataIndex:xwkt,width:50,editor:'textfield', tdCls: 'x-change-cell'};
				grid={header:tgl.getDate(),dataIndex:xwkt,width:50,editor:'textfield',tdCls: 'x-change-cell'
					//*
					,renderer: function(value,meta)	{
						//if(value.localeCompare("24:00")==0) {
						if(value=="24:00") {
							meta.style = "background-color:#a8ff94;";
						} else if (value=="-") {
							meta.style = "background-color:#feffac;";
						} else {
							meta.style = "background-color:#ffbdbd;";
						}
						return '<span style="color:black;">' + value + '</span>';
					}
					//*/
				};
				//grid={header:tgl.getDate(),dataIndex:xwkt,width:55,editor:{xtype:'timefield',labelAlign:'top',format:'H:i',maxValue:'10:00'} };
				
				column.push(grid);
				xtgl=tgl.setDate(tgl.getDate() + 1);
				j++;
			}
			//items.push({ header:'Cat',dataIndex:'cat',width:30 });
			if (blnthn.length>1)	{
				//if (!blnthn[0].header.localeCompare("Desember "+tgl.getFullYear()))
				if (!blnthn[0].header.localeCompare("Desember "+tgl.getFullYear()))
					blnthn[0].header = "Desember "+(tgl.getFullYear()-1)
				//alert(blnthn[0].columns.length);
				if (blnthn[0].columns.length==1) blnthn[0].columns[0].width = 100;
				if (blnthn[1].columns.length==1) blnthn[1].columns[0].width = 100;
			}
			items.push.apply(items,blnthn);
			
			//alert("blnthn[0]: "+blnthn[0].header+" "+blnthn[1].header);
			//items.push({ header:'Catatan',dataIndex:'note',flex:1,minWidth:300 });		// 
			items.push({ header:'RunningHour',dataIndex:'rhtot',flex:1,minWidth:90 });		// 
			items.push({ header:'Last PM',dataIndex:'lpm',flex:1,minWidth:320 });		// ganti dgn note
			items.push({ header:'Next PM',dataIndex:'npm',flex:1,minWidth:450 });		// ganti dgn note
			/*
			items.push({ header:'Next PM',//flex:3,
					columns: [{ 
							header: 'Equip 1', dataIndex:'npm1',flex:1,minWidth:230
						},{ 
							header: 'Equip 2',dataIndex:'npm2',flex:1,minWidth:230
					} 
				}]
			});
			//*/
			//console.log(items);
			//rcmS = items;
			
			return items;
		},
		
		Ublntgl: function(x)	{
			var ww = 14;
			var tglbln=new Array();
			tglbln[0] = 'eq'; tglbln[1] = 'Lokasi'; tglbln[2] = 'cat'; 
			tglbln[3] = 'rhtot'; tglbln[4] = 'lpm'; tglbln[5] = 'npm';
			var xx = 6;
			//*
			//alert("x: "+x+", Ublntgl: "+rcmSettings.tgl);
				
			for (var i=0;i<ww;i++)	{
				var date;
				if (rcmSettings.tgl==='0')	{
					date=new Date();
					//alert("Ublntgl Ublntgl 000");
				}
				else date=new Date(x);
				//alert("Ublntgl tgl: "+date);
				date.setDate(date.getDate() - i);
				//tglbln[i] = "'"+this.Upad((date.getMonth()+1))+""+this.Upad(date.getDate())+"'";
				tglbln[i+xx] = "k"+(date.getFullYear()-2000)+this.Upad((date.getMonth()+1))+this.Upad(date.getDate());
				//tglbln[i+4] = "k"+i;
			}
			//tglbln[i+4] = 'k140426';
			//*/
			//console.log("item judul: "+tglbln);
			//alert("item judul: "+tglbln);
			return tglbln;
		},
		setCookie: function(cname,cvalue)	{
			var d = new Date();
			//d.setTime(d.getTime()+(exdays*24*60*60*1000));
			//var expires = "expires="+d.toGMTString();
			document.cookie = cname + "=" + cvalue;
		},
		
		getCookie: function (cname)	{
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++)	{
				var c = ca[i].trim();
				if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
		},
		
		format2: function(sido, n, currency) {
			if (sido>0) {
				return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}
			else {
				return n;
			}
		}
		
		//*/
		
    }
    
    
});
