(function(e){function t(t){for(var n,r,o=t[0],u=t[1],s=t[2],d=0,l=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&l.push(i[r][0]),i[r]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);f&&f(t);while(l.length)l.shift()();return c.push.apply(c,s||[]),a()}function a(){for(var e,t=0;t<c.length;t++){for(var a=c[t],n=!0,r=1;r<a.length;r++){var o=a[r];0!==i[o]&&(n=!1)}n&&(c.splice(t--,1),e=u(u.s=a[0]))}return e}var n={},r={app:0},i={app:0},c=[];function o(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-2d21044c":"b87a32cf","chunk-2fc734a2":"3406593a","chunk-351f46d4":"c7b4cedf","chunk-3bfbbd16":"7540891e","chunk-417d52c4":"d28bfc7d","chunk-4ad6b004":"0e3cf246","chunk-60bef7f6":"c8011192","chunk-382cd924":"c5849106","chunk-27e2d897":"3609f5e9","chunk-3c39a8b2":"e912e434","chunk-92f400e2":"51ba7d3f","chunk-2825802f":"8572709e","chunk-2b576d16":"4d802e1e","chunk-246c9c0a":"b16d005d","chunk-73d39b05":"5f1598ac","chunk-84a45dec":"8e832522","chunk-6ebcf424":"fa9bb5e1","chunk-7be3cde2":"bb4e3186","chunk-81f9462e":"f4de8de8","chunk-01e38d62":"8cd1ea14","chunk-05386022":"cc4cff22","chunk-73e30532":"4a3530cc"}[e]+".js"}function u(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,u),a.l=!0,a.exports}u.e=function(e){var t=[],a={"chunk-2fc734a2":1,"chunk-3bfbbd16":1,"chunk-4ad6b004":1,"chunk-60bef7f6":1,"chunk-382cd924":1,"chunk-27e2d897":1,"chunk-3c39a8b2":1,"chunk-92f400e2":1,"chunk-246c9c0a":1,"chunk-73d39b05":1,"chunk-84a45dec":1,"chunk-6ebcf424":1,"chunk-7be3cde2":1,"chunk-81f9462e":1,"chunk-05386022":1,"chunk-73e30532":1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=new Promise((function(t,a){for(var n="css/"+({}[e]||e)+"."+{"chunk-2d21044c":"31d6cfe0","chunk-2fc734a2":"6a4047db","chunk-351f46d4":"31d6cfe0","chunk-3bfbbd16":"bdc72f73","chunk-417d52c4":"31d6cfe0","chunk-4ad6b004":"23a4a213","chunk-60bef7f6":"57800d62","chunk-382cd924":"548fe094","chunk-27e2d897":"d4c4e2ef","chunk-3c39a8b2":"bffcd4b0","chunk-92f400e2":"27594477","chunk-2825802f":"31d6cfe0","chunk-2b576d16":"31d6cfe0","chunk-246c9c0a":"b7f1ff43","chunk-73d39b05":"3cc05dfd","chunk-84a45dec":"6ad5dd19","chunk-6ebcf424":"342bdb60","chunk-7be3cde2":"e5beb970","chunk-81f9462e":"b95d4230","chunk-01e38d62":"31d6cfe0","chunk-05386022":"33ac40b1","chunk-73e30532":"545eaf29"}[e]+".css",i=u.p+n,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var s=c[o],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===n||d===i))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){s=l[o],d=s.getAttribute("data-href");if(d===n||d===i)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var n=t&&t.target&&t.target.src||i,c=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=n,delete r[e],f.parentNode.removeChild(f),a(c)},f.href=i;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){r[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var c=new Promise((function(t,a){n=i[e]=[t,a]}));t.push(n[2]=c);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=o(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(f);var a=i[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+n+": "+r+")",l.name="ChunkLoadError",l.type=n,l.request=r,a[1](l)}i[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=n,u.d=function(e,t,a){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(u.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)u.d(a,n,function(t){return e[t]}.bind(null,n));return a},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=d;c.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("8a23"),r=a.n(n);r.a},"56d7":function(e,t,a){"use strict";a.r(t),a.d(t,"base",(function(){return Z}));a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-layout",{staticClass:"justify-center"},[a("v-col",{attrs:{lg:"9"}},[a("v-card",{attrs:{color:"secondary",height:"100%",loading:e.app_data.ui_control.isLoading}},[a("v-card-title",{staticClass:"justify-left py-5 px-10"},[a("v-icon",{staticClass:"mr-n5",attrs:{color:"rgba(53, 104, 89, 0.5)",size:"50"}},[e._v("mdi-grid")]),a("v-icon",{staticClass:"ml-n5",attrs:{color:"primary",size:"30"}},[e._v("mdi-rhombus-medium")]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on,r=t.attrs;return[a("div",e._g(e._b({staticClass:"font-weight-bold display-2 primary--text ml-6"},"div",r,!1),n),[e._v(" TraPSA ")])]}}])},[a("span",[e._v("Trajectory-based Potential Sourece Apportionment Project")])]),a("v-spacer"),a("v-btn",{staticClass:"ml-5",attrs:{color:"primary lighten-2"},on:{click:e.open_section}},[a("v-icon",{attrs:{left:""}},[e._v("mdi-folder-open")]),e._v("Open Section ")],1),a("v-btn",{staticClass:"ml-5",attrs:{color:"primary lighten-2"},on:{click:e.save_section}},[a("v-icon",{attrs:{left:""}},[e._v("mdi-download")]),e._v("Save Section ")],1),a("v-btn",{staticClass:"ml-5",attrs:{color:"primary lighten-2"},on:{click:function(t){e.app_data.ui_control.data_view=!0}}},[a("v-icon",{attrs:{left:""}},[e._v("mdi-table-multiple")]),e._v("Data Summary ")],1),a("input",{ref:"open_section",staticClass:"d-none",attrs:{type:"file",accept:".trapsa"},on:{change:e.upload_section}})],1),a("v-divider"),a("v-tabs",{attrs:{"background-color":"transparent",color:"primary",grow:"",height:"45px","slider-color":"primary"},model:{value:e.app_data.ui_control.curr_tab,callback:function(t){e.$set(e.app_data.ui_control,"curr_tab",t)},expression:"app_data.ui_control.curr_tab"}},e._l(e.tabs,(function(t){return a("v-tab",{key:t.index},[a("v-avatar",[a("v-icon",{attrs:{color:e.app_data.ui_control.curr_tab===t.index?"primary":""}},[e._v(e._s(t.icon))])],1),e._v(" "+e._s(t.name)+" ")],1)})),1),a("v-tabs-items",{model:{value:e.app_data.ui_control.curr_tab,callback:function(t){e.$set(e.app_data.ui_control,"curr_tab",t)},expression:"app_data.ui_control.curr_tab"}},[a("v-tab-item",[a("About")],1),a("v-tab-item",[a("Upload")],1),a("v-tab-item",[a("Trajectory")],1),a("v-tab-item",[a("Analysis")],1),a("v-tab-item",[a("Source")],1)],1)],1)],1)],1),a("v-footer",{attrs:{height:"30"}},[a("span",{staticClass:"primary--text caption"},[e._v("Chuanlong Zhou © 2020, Center for Air and Aquatic Resources Engineering and Sciences (CAARES)")])]),a("Message"),a("MetedataDialog"),a("MeteDataRequired"),a("v-dialog",{attrs:{width:"1000"},model:{value:e.app_data.ui_control.data_view,callback:function(t){e.$set(e.app_data.ui_control,"data_view",t)},expression:"app_data.ui_control.data_view"}},[a("DataView")],1)],1)},i=[],c=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("5530")),o=a("2f62"),u=a("f5b2"),s={name:"App",components:{About:function(){return a.e("chunk-2fc734a2").then(a.bind(null,"ed0f"))},Source:function(){return a.e("chunk-351f46d4").then(a.bind(null,"5a8b"))},Trajectory:function(){return Promise.all([a.e("chunk-4ad6b004"),a.e("chunk-60bef7f6"),a.e("chunk-92f400e2")]).then(a.bind(null,"5498"))},Analysis:function(){return Promise.all([a.e("chunk-60bef7f6"),a.e("chunk-2825802f"),a.e("chunk-2b576d16"),a.e("chunk-246c9c0a")]).then(a.bind(null,"5706"))},Upload:function(){return Promise.all([a.e("chunk-4ad6b004"),a.e("chunk-60bef7f6"),a.e("chunk-382cd924"),a.e("chunk-27e2d897")]).then(a.bind(null,"2300"))},Message:function(){return a.e("chunk-3bfbbd16").then(a.bind(null,"6b9f"))},MetedataDialog:function(){return a.e("chunk-2d21044c").then(a.bind(null,"b6bd"))},MeteDataRequired:function(){return a.e("chunk-417d52c4").then(a.bind(null,"bb77"))},DataView:function(){return Promise.all([a.e("chunk-4ad6b004"),a.e("chunk-60bef7f6"),a.e("chunk-382cd924"),a.e("chunk-3c39a8b2")]).then(a.bind(null,"eac2"))}},computed:Object(c["a"])({},Object(o["c"])({app_data:"app_data"})),mounted:function(){},data:function(){return{tab_height:"800px",tabs:[{name:"Introduction",icon:"mdi-information",index:0},{name:"Upload Data",icon:"mdi-arrow-up-bold-circle",index:1},{name:"Trajectory",icon:"mdi-earth",index:2},{name:"Basic Analysis",icon:"mdi-chart-bar",index:3},{name:"Potential Soure",icon:"mdi-hexagon-multiple",index:4}]}},methods:Object(c["a"])(Object(c["a"])({},Object(o["b"])(["OPENSECTION"])),{},{test:function(){this.app_data.ui_control.data_view=!0},save_section:function(){var e=this;this.app_data.ui_control.isLoading="primary",this.$worker.run((function(e){return new Blob([e],{type:"application/json"})}),[JSON.stringify(this.app_data)]).then((function(t){var a=document.createElement("a"),n=URL.createObjectURL(t),r=(new Date).getMonth()+1,i=(new Date).getFullYear()+("0"+r).substr(-2)+(new Date).getDate()+".trapsa";a.href=n,a.setAttribute("download",i),a.click(),e.app_data.ui_control.isLoading=!1,e.app_data.ui_control.snackbar={show:!0,text:"Current section is saved!",color:"info"}}))},open_section:function(){this.$refs.open_section.click()},upload_section:function(e){var t=this;this.app_data.ui_control.isLoading="primary",u["a"].readFileAsync(e.target.files[0]).then((function(e){t.OPENSECTION(JSON.parse(e)),t.app_data.ui_control.snackbar={show:!0,text:"Your previous section is loaded!",color:"info"},t.app_data.ui_control.isLoading=!1}))}})},d=s,l=(a("034f"),a("2877")),f=a("6544"),h=a.n(f),p=a("7496"),m=a("8212"),b=a("8336"),_=a("b0af"),v=a("99d9"),g=a("62ad"),k=a("169a"),y=a("ce7e"),w=a("553a"),x=a("132d"),S=a("a722"),j=a("2fa4"),C=a("71a3"),A=a("c671"),T=a("fe57"),O=a("aac8"),P=a("3a2f"),E=Object(l["a"])(d,r,i,!1,null,null,null),D=E.exports;h()(E,{VApp:p["a"],VAvatar:m["a"],VBtn:b["a"],VCard:_["a"],VCardTitle:v["c"],VCol:g["a"],VDialog:k["a"],VDivider:y["a"],VFooter:w["a"],VIcon:x["a"],VLayout:S["a"],VSpacer:j["a"],VTab:C["a"],VTabItem:A["a"],VTabs:T["a"],VTabsItems:O["a"],VTooltip:P["a"]});var L=a("8c4f");n["a"].use(L["a"]);var N=[],R=new L["a"]({mode:"history",base:"/",routes:N}),V=R,M=(a("4de4"),a("13d5"),a("b0c0"),a("b64b"),{parameters:{cpf:.9,cbpf:.9},ui_control:{isLoading:!1,map_loading:!1,data_view:!1,curr_tab:0,new_case:{show:!1,edit:-1,selection:{case_name:"New Case",site:[],chemical:[],year:[],month:["Spring","Summer","Autumn","Winter"],hour:["Morning rush hours (6:00-9:00)","Daytime hours (10:00-16:00)","Afternoon rush hours (15:00-20:00)","Night hours (21:00-5:00)"]}},thumb_fig_index:"",fig_view:{show:!1,id:"",selected_case_name:[],text:""},snackbar:{show:!0,text:"Thanks for using TraPSA!",color:"info"},mete_dialog:!1,mete_required:{show:!1,items:[]},dateformat:{show:!1,text:[{}]},new_source_layer:{show:!1,eidt:-1}},hysplit:{working:"C:\\Users\\zhouc\\Desktop\\python\\TraPSA\\HYSPLIT",sites:[],start_time:{isExpand:!1,sample_period:null,expand_number:null},height_type:["Height above ground","Relative to mean sea level","Fraction of the mixed layer"],start_height:{value_type:"Height above ground",value:500},trajectory_time:-24,mete:{type:"NCEP/NCAR",path:"C:\\Users\\zhouc\\Desktop\\python\\TraPSA\\data\\mete_data\\GBL"},mete_types:["NCEP/NCAR","GDAS1","GDAS0p5","EDAS40","NARR"]},curr_job:{csv_file:"",job_name:"",start_point:[{timestamp:null,site_name:null,TimeString:null}],trajectory_time:null,height:null,kmsl:null,working_folder:"",mete_folder:"",mete_type:""},missing_data:"",sites:{header:[{text:"site_name",align:"start",value:"site_name"},{text:"lon",value:"lon"},{text:"lat",value:"lat"}],data:[]},measurement:{header:[{text:"timestamp",value:"timestamp"},{text:"site_name",value:"site_name"},{text:"chemical_1",value:"chemical_1"},{text:"chemical_2",value:"chemical_2"},{text:"..."}],data:[]},wind_data:{header:[{text:"timestamp",value:"timestamp"},{text:"site_name",value:"site_name"},{text:"wind_speed",value:"wind_speed"},{text:"wind_direction",value:"wind_direction"}],data:[]},traj_data:[],traj_jobs:[],site_summary:[],case:[],map_layers:[{name:"111"},{name:"222"},{name:"333"}]}),F={},U={},I={OPENSECTION:function(e,t){for(var a in t)e[a]=t[a]},SITESUMMARY:function(e){var t=[];for(var a in e.sites.data){var n=e.sites.data[a].site_name,r=e.measurement.data.filter((function(e){return e.site_name==n})),i={},c=Object.keys(r[0]),o=[];for(var u in c){var s=c[u];"id"!=s.toLowerCase()&&"timestamp"!=s.toLowerCase()&&"site_name"!=s.toLowerCase()&&"timestring"!=s.toLowerCase()&&(i[s]={name:s,record:null,missing:null,mean:0,max:-9999,min:9999},o.push(s))}var d=r.reduce((function(e,t){for(var a in o){var n=o[a],r=parseFloat(t[n]);isNaN(r)?e[n].missing+=1:(e[n].record+=1,e[n].mean+=r,r>e[n].max&&(e[n].max=r),r<e[n].min&&(e[n].min=r))}return e}),i);for(var l in d)d[l].mean=d[l].mean/d[l].record;var f={record:0,missing:0},h=e.wind_data.data.filter((function(e){return e.site_name==n}));f=h.reduce((function(e,t){return null!=t["wind_speed"]&&null!=t["wind_direction"]?e.record+=1:e.missing+=1,e}),f);var p={num:0,jobs:[]};for(var m in e.traj_data){var b=e.traj_data[m].data.filter((function(e){return e.site_name==n}));b.length>0&&(p.num+=1,p.jobs.push(e.traj_data[m].job_name))}var _={site_name:n,location:[e.sites.data[a].lat,e.sites.data[a].lon],chemicals:d,wind:f,traj:p};t.push(_)}e.site_summary=t},UPDATE_DATA:function(e,t){e[t.name]=t.data},MERGE_DATA:function(){}},$={state:M,getters:F,actions:U,mutations:I};n["a"].use(o["a"]);var B=new o["a"].Store({modules:{app_data:$}}),q=a("28bd"),z=a("f309");n["a"].use(z["a"]);var G=new z["a"]({theme:{themes:{light:{primary:"#356859",secondary:"#fffbe6",success:"#F9C413",accent:"#000033",error:"#FF0F50",info:"#37C948",warning:"#FF5722"}}}}),H=a("03cd"),J=a.n(H),Y=a("bc3a"),K=a.n(Y);n["a"].use(q["a"]),n["a"].use(J.a),n["a"].config.productionTip=!1;var W="loacl",Z=K.a.create({baseURL:"loacl"===W?"http://127.0.0.1:5000":"https://trapsa-backend.herokuapp.com/"});n["a"].prototype.$http=Z,new n["a"]({router:V,store:B,vuetify:G,render:function(e){return e(D)}}).$mount("#app")},"8a23":function(e,t,a){},f5b2:function(e,t,a){"use strict";a("99af"),a("4de4"),a("4160"),a("caad"),a("d81d"),a("d3b7"),a("ac1f"),a("2532"),a("5319"),a("1276"),a("498a"),a("159b"),a("96cf");var n=a("1da1");function r(e){return new Promise((function(t,a){var n=new FileReader;n.onload=function(){t(n.result)},n.onerror=a,n.readAsText(e)}))}function i(e,t,a){return c.apply(this,arguments)}function c(){return c=Object(n["a"])(regeneratorRuntime.mark((function e(t,a,n){var i,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,r(t);case 3:return i=e.sent,c=s(i,a,n),e.abrupt("return",{header:c.header,data:c.data});case 6:case"end":return e.stop()}}),e)}))),c.apply(this,arguments)}function o(e,t,a){return u.apply(this,arguments)}function u(){return u=Object(n["a"])(regeneratorRuntime.mark((function e(t,a,n){var i,c,o,u,d;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i={header:[],data:[]},c=[],o=0;case 3:if(!(o<t.length)){e.next=15;break}return console.log(t[o]),e.next=7,r(t[o]);case 7:u=e.sent,d=s(u,a,n),d.header.forEach((function(e){c.includes(e.text)||(c.push(e.tex),i.header.push(e))})),console.log(d.header,i.header,c),i.data=i.data.concat(d.data);case 12:o++,e.next=3;break;case 15:return e.abrupt("return",{header:i.header,data:i.data});case 16:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function s(e,t,a){t=t.split(",").map((function(e){return e.trim()}));var n=e.split("\n"),r=[],i=n[0].trim().split(",").filter((function(e){return e.length>0})),c=[];for(var o in i)c.push({text:i[o]+"_imported",value:i[o]}),"timestamp"==i[o].toLowerCase().trim()&&a&&c.push({text:"TimeString_converted",value:"TimeString"});for(var u=1;u<n.length;u++){var s=n[u].split(",").filter((function(e){return e.length>0}));if(s.length==i.length){var d={};for(var l in i){if("timestamp"==i[l].toLowerCase().trim()&&a){var f=new Date(s[l]);d["TimeString"]=f.toLocaleString().replace(","," ")}d[i[l]]=t.includes(String(s[l]).trim())?null:s[l].trim()}r.push(d)}}return{header:c,data:r}}t["a"]={read_csv:i,readFileAsync:r,read_csv_multiple:o}}});
//# sourceMappingURL=app.7b02da71.js.map