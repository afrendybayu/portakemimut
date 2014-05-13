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
		
		Ublnini: function()	{
			var strbln = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
			var d = new Date();
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
			var d = new Date(w);
			return d.getFullYear();
		},
		
		Uthm1: function()	{
			var d = new Date();
			return (d.getFullYear()-1);
		},
		
		cid: function(str)	{
			if (str.localeCompare("Gas Comp")==0)	{
				return 5;
			} else if (str.localeCompare("Pump")==0)	{
				return 6;
			} else if (str.localeCompare("Generator Set")==0)	{
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
		
		UxcolGrid: function()	{
			var strbln = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
			var items=new Array(), blnthn=new Array();
			var bln,thn,tgl,date;
			var column = new Array();
			var xtgl,xwkt;
			
			//console.log("UxcolGrid rcmSettings.tgl: "+rcmSettings.tgl+5000);
			if (rcmSettings.tgl=='0')	{
				tgl=new Date();
			} else {
				tgl=new Date(rcmSettings.tgl);
			}
			
			items = [
				{ xtype: 'rownumberer' },
				{ header:'Unit', dataIndex: 'eq', width:200 },
			];
			
			tgl.setDate(tgl.getDate() - 13);
			var xbln=tgl.getMonth(); 
			//console.log("xbln "+xbln+" "+strbln[xbln]);
			var grid={}; var j=0;
			for(var i=14; i>=0; i--)	{
				if (((tgl.getDate()==1)&&(i!=14)) || (i==0))	{
					//items.push({ header:(strbln[xbln]+" "+(tgl.getYear()+1900)), columns: column });
					blnthn.push({ header:(strbln[xbln]+" "+(tgl.getYear()+1900)), columns: column });
					xbln=tgl.getMonth();
					column=[];
					j=0;
					if (i==0) break;
				}
				
				xwkt="k"+(tgl.getYear()-100)+""+this.Upad(tgl.getMonth()+1)+""+this.Upad(tgl.getDate());
				//grid={header:tgl.getDate(),dataIndex:xwkt,width:50,editor:'textfield', tdCls: 'x-change-cell'};
				grid={header:tgl.getDate(),dataIndex:xwkt,width:50,editor:'textfield',
					/*
					renderer: function(value, meta) {
						if (value === '24:00') { 
							meta.tdCls = 'price-rise'; 
							//return; 
						} else {
							meta.tdCls = 'price-fall'; 
						}
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
				if (!blnthn[0].header.localeCompare("Desember "+(tgl.getYear()+1900)))
					blnthn[0].header = "Desember "+(tgl.getYear()+1900-1)
				//alert(blnthn[0].columns.length);
				if (blnthn[0].columns.length==1) blnthn[0].columns[0].width = 100;
				if (blnthn[1].columns.length==1) blnthn[1].columns[0].width = 100;
			}
			items.push.apply(items,blnthn);
			
			//alert("blnthn[0]: "+blnthn[0].header+" "+blnthn[1].header);
			items.push({ header:'Catatan',dataIndex:'note',flex:1 });		// ganti dgn note
			//console.log(items);
			rcmS = items;
			
			return items;
		},
		
		Ublntgl: function()	{
			var tglbln=new Array();
			tglbln[0] = 'eq'; tglbln[1] = 'Lokasi'; tglbln[2] = 'cat'; tglbln[3] = 'note';
			//*
			for (var i=0;i<14;i++)	{
				var date;
				if (rcmSettings.tgl==='0')	date=new Date();
				else date=new Date(rcmSettings.tgl);
				date.setDate(date.getDate() - i);
				//tglbln[i] = "'"+this.Upad((date.getMonth()+1))+""+this.Upad(date.getDate())+"'";
				//tglbln[i+4] = "k"+(date.getYear()-100)+""+this.Upad((date.getMonth()+1))+""+this.Upad(date.getDate());
				tglbln[i+4] = "k"+(date.getYear()-100)+this.Upad((date.getMonth()+1))+this.Upad(date.getDate());
				//tglbln[i+4] = "k"+i;
			}
			tglbln[i+4] = 'k140426';
			//*/
			console.log("item judul: "+tglbln);
			return tglbln;
		}
    }
});
