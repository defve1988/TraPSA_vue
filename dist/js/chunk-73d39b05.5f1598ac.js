(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-73d39b05"],{"36a7":function(t,e,i){},"4fad":function(t,e,i){var a=i("23e7"),s=i("6f53").entries;a({target:"Object",stat:!0},{entries:function(t){return s(t)}})},"5e23":function(t,e,i){},"6cbc":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{height:"card_height",width:"1000"}},[i("v-card-text",{staticClass:"map_card_full_screen pa-0 ma-0"},[i("v-toolbar",{staticClass:"elevation-0"},[i("v-toolbar-title",{staticClass:"font-weight-light pr-3"},[t._v(" "+t._s(t.map_title)+" ")]),i("v-spacer"),t._l(t.tool_buttons,(function(e,a){return i("v-tooltip",{key:a,attrs:{bottom:""},scopedSlots:t._u([e.show?{key:"activator",fn:function(a){var s=a.on;return["change_map_type"!=e.text?i("v-btn",t._g({attrs:{icon:"",disabled:e.isdisabled},on:{click:function(i){return t.tool_buttons_func(e.text)}}},Object.assign({},s)),["full_screen"==e.text&&t.full_screen_map?t._e():i("v-icon",[t._v(t._s(e.mdi))]),"full_screen"==e.text&&t.full_screen_map?i("v-icon",[t._v("mdi-arrow-collapse-all")]):t._e()],1):i("v-menu",{attrs:{"offset-y":"",transition:"scroll-x-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[i("v-btn",t._g({attrs:{icon:""}},Object.assign({},s,a)),[i("v-icon",[t._v(" mdi-map")])],1)]}}],null,!0)},[i("v-list",[i("v-list-item-group",t._l(t.map_type,(function(e){return i("v-list-item",{key:e,on:{click:function(i){return t.change_map_type(e)}}},[t._v(" "+t._s(e)+" ")])})),1)],1)],1)]}}:null],null,!0)},[i("span",[t._v(t._s(e.tooltips))])])}))],2),i("div",{ref:t.map_div_id,attrs:{id:t.map_div_id}})],1)],1)},s=[],n=(i("99af"),i("4de4"),i("d81d"),i("13d5"),i("5530")),o=i("2f62"),r=(i("a9e3"),i("4fad"),i("3835")),c=i("d4ec"),l=i("bee2"),d=i("030a"),h=i.n(d),p=function(){function t(e){Object(c["a"])(this,t),this.div=e,this.layout={dragmode:"zoom",margin:{r:0,t:0,b:0,l:0},width:800,height:600,font:{size:14},showlegend:!0,legend:{font:{size:12},xanchor:"auto",yanchor:"auto",x:1,y:0},coloraxis:{colorbar:{xanchor:"right",yanchor:"top",x:1,y:1,len:.3}},autosize:!0},this.config={mapboxAccessToken:"pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",displaylogo:!1,responsive:!0,displayModeBar:!1,editable:!0}}return Object(l["a"])(t,[{key:"set_layout",value:function(t){Object.assign(this.layout,t)}},{key:"set_config",value:function(t){Object.assign(this.config,t)}},{key:"update_map",value:function(t){this.layout.mapbox=Object.assign(this.layout.mapbox,t),h.a.relayout(this.div,this.layout)}},{key:"update_layout",value:function(t){this.set_layout(t),h.a.relayout(this.div,t)}},{key:"add_trace",value:function(t){h.a.addTraces(this.div,t)}},{key:"plot_map",value:function(t){this.set_layout({mapbox:t}),h.a.newPlot(this.div,[{type:"scattermapbox"}],this.layout,this.config)}},{key:"plot_dot",value:function(t,e,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,s=[{type:"scattermapbox",text:i,lon:e,lat:t,hovertemplate:"%{text}<br>%{lat:.2f}, %{lon:.2f}<extra></extra>",hoverlabel:{bgcolor:"rgba(70,70,70,1)"},marker:{color:"rgb(0, 150, 100)",size:12,opacity:.5}}];null!=a&&(s=s.map((function(t){return t.mode="markers+text",t.textposition=a,t})));var n={zoom:4,center:{lat:u(t),lon:u(e)}};this.add_trace(s),this.update_map(n),this.update_layout({showlegend:!1})}},{key:"plot_heat_map",value:function(t){t=[{type:"densitymapbox",lon:t.lon,lat:t.lat,z:t.z,radius:25,coloraxis:"coloraxis"}],this.add_trace(t)}},{key:"cal_PSCF",value:function(t){var e,i,a=t.model.weight,s=this.gene_grid(t.model.grid),n=t.model.c,o=t.data;n=parseInt((1-n)*o.length),o.sort((function(t,e){return t.conc>e.conc?-1:1}));for(var c=0,l=0;l<o.length;l++){e=o[l].lat.map((function(t){return Math.ceil(t)})),i=o[l].lon.map((function(t){return Math.ceil(t)}));for(var d=0;d<e.length;d++)l<n&&(s[e[d]][i[d]].up+=1),s[e[d]][i[d]].bottom+=1,c+=1}e=[],i=[];for(var h=[],p=[],u=0,m=Object.entries(s);u<m.length;u++)for(var g=Object(r["a"])(m[u],2),f=g[0],_=g[1],v=0,b=Object.entries(_);v<b.length;v++){var y=Object(r["a"])(b[v],2),S=y[0],w=y[1],x=w.up/w.bottom;isNaN(x)||(e.push(f),i.push(S),h.push(x),p.push(w.bottom))}c/=h.length,a=a.map((function(t){return{n:t.n*c,w:t.w}})),console.log(a),console.log(p);for(var k=0;k<p.length;k++)for(var j=0;j<a.length;j++)if(p[k]<a[j].n){h[k]=h[k]*a[j].w;break}return{lat:e,lon:i,z:h}}},{key:"gene_grid",value:function(t){for(var e={},i=0;i<180/t;i++){for(var a={},s=0;s<360/t;s++)a[(s+1)*t-180]={up:null,bottom:null};e[(i+1)*t-90]=a}return e}},{key:"save_image",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"map";h.a.toImage(this.div,{format:"png",height:800,width:1200}).then((function(e){var i=document.createElement("a");i.href=e,i.setAttribute("download",t+".png"),i.click()}))}}]),t}();function u(t){t=t.map(Number);var e=t.reduce((function(t,e){return t+e}),0)/t.length;return e}var m={name:"mapping_widget",components:{},props:["map_div_id","map_title","button_not_uesd","card_height","map_card_type"],data:function(){return{map_type:["Simple Map","Dark Theme","Land Map","Satellite Map"],full_screen_map:!1,tool_buttons:[{text:"change_map_type",show:!0,tooltips:"Change Map Style",mdi:"mdi-map",isdisabled:!1},{text:"reset_map",show:!0,tooltips:"Reset Map",mdi:"mdi-refresh",icnisdisabled:!1},{text:"full_screen",show:!0,tooltips:"Full Screen",mdi:"mdi-arrow-expand-all",isdisabled:!1},{text:"grid_smoothing",show:!0,tooltips:"Grid Smoothing",mdi:"mdi-grain",isdisabled:!1},{text:"identify_source",show:!0,tooltips:"Identify hotspots",mdi:"mdi-map-marker-circle",isdisabled:!1},{text:"show_text",show:!0,tooltips:"Show text notation",mdi:"mdi-format-text",isdisabled:!1},{text:"color_map",show:!0,tooltips:"Adjust Colormap",mdi:"mdi-palette",isdisabled:!1},{text:"save_image",show:!0,tooltips:"Save Current Map",mdi:"mdi-download",isdisabled:!1}]}},watch:{site_data:function(){"site_preview"==this.map_card_type&&this.plot_site()}},computed:Object(n["a"])(Object(n["a"])({},Object(o["c"])({app_data:"app_data"})),{},{site_data:function(){return this.app_data.sites.data}}),created:function(){window.addEventListener("resize",this.resize_map)},destroyed:function(){window.removeEventListener("resize",this.resize_map)},mounted:function(){this.init_map();for(var t=0;t<this.button_not_uesd.length;t++)this.tool_buttons[this.button_not_uesd[t]].show=!1},methods:{init_map:function(){this.map_config={style:"light",center:{lat:45,lon:-90},zoom:1},this.mapping=new p(this.map_div_id),this.mapping.set_layout({width:this.$refs[this.map_div_id].clientWidth,height:this.card_height-40}),this.mapping.plot_map(this.map_config)},resize_map:function(){this.mapping.update_layout({width:this.$refs[this.map_div_id].clientWidth})},tool_buttons_func:function(t){switch(t){case"save_image":this.mapping.save_image();break;case"reset_map":"site_preview"==this.map_card_type?(this.init_map(),this.plot_site()):this.show_map();break;case"full_screen":this.$fullscreen.toggle(this.$el.querySelector(".map_card_full_screen"),{wrap:!1,callback:this.fullscreenChange}),this.full_screen_map=!this.full_screen_map,this.full_screen_map?this.mapping.update_layout({width:this.$refs.map_card.clientWidth,height:1e3}):this.mapping.update_layout({width:this.$refs.map_card.clientWidth,height:this.card_height-40});break}},fullscreenChange:function(t){this.full_screen_map=t},plot_site:function(){var t=this.app_data.sites.data.map((function(t){return t.lat})),e=this.app_data.sites.data.map((function(t){return t.lon})),i=this.app_data.sites.data.map((function(t){return t.site_name}));this.mapping.plot_dot(t,e,i,"right")},show_map:function(){var t=this;this.app_data.case.filter((function(t){return t.model.selected})).length>0&&(this.app_data.ui_control.isLoading="primary lighten-2",this.isdisabled=!0,this.$worker.run((function(t,e){for(var i=t.filter((function(t){return t.model.selected})),a=i[0].model.type,s=i[0].chemical,n=i[0].model.traj,o={error:0,data:[],model:i[0].model,chemical:s},r=[],c=0;c<i.length;c++)a!=i[c].model.type?o={error:1,text:"Ensemble model types should be the same."}:s!=i[c].chemical?o={error:1,text:"Chemicals should be the same."}:n!=i[c].model.traj&&(o={error:1,text:"Trajectory jobs should be the same."});if(1==o.error)return o;for(var l=0;l<i.length;l++){var d=i[l].data.measurement,h=e.filter((function(t){return t.job_name==i[l].model.traj}));h=h[0].data,h=h.filter((function(t){return t.site_name==i[l].site})),d=d.map((function(t){return t.id=+new Date(t.TimeString),t})),h=h.map((function(t){return t.id=+new Date(t.timestamp),t}));var p=d.reduce((function(t,e){return t[e.id]=e.selected_chemical,t}),{}),u=h.map((function(t){return t.conc=p[t.id],t}));u=u.filter((function(t){return null!=t.conc})),r=r.concat(u)}return o.data=r,o}),[this.app_data.case,this.app_data.traj_data]).then((function(e){if(console.log(e),1==e.error)console.log("display warning");else switch(e.model.type){case"PSCF":var i=t.mapping.cal_PSCF(e);t.mapping.plot_heat_map(i);break}t.app_data.ui_control.isLoading=!1,t.isdisabled=!1})))},change_map_type:function(t){switch(delete this.map_config.layers,t){case"Land Map":this.map_config.style="outdoors";break;case"Simple Map":this.map_config.style="light";break;case"Satellite Map":this.map_config.style="white-bg",this.map_config.layers=[{sourcetype:"raster",source:["https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"],below:"traces"},{sourcetype:"streets"}];break;case"Dark Theme":this.map_config.style="dark";break}this.mapping.update_map(this.map_config)}}},g=m,f=i("2877"),_=i("6544"),v=i.n(_),b=i("8336"),y=i("b0af"),S=i("99d9"),w=i("132d"),x=i("8860"),k=i("da13"),j=i("1baa"),z=i("e449"),O=i("2fa4"),C=(i("0481"),i("4160"),i("4069"),i("5e23"),i("8dd9")),$=i("adda"),E=i("80d2"),I=i("d9bd"),B=C["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"},tile:{type:Boolean,default:!0}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(n["a"])(Object(n["a"])({},C["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(n["a"])(Object(n["a"])({},this.measurableStyles),{},{height:Object(E["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var i=Object(r["a"])(e,2),a=i[0],s=i[1];t.$attrs.hasOwnProperty(a)&&Object(I["a"])(a,s,t)}))},methods:{genBackground:function(){var t={height:Object(E["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement($["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(E["g"])(this.computedContentHeight)}},Object(E["r"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(E["g"])(this.extensionHeight)}},Object(E["r"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}}),L=Object(E["i"])("v-toolbar__title"),M=(Object(E["i"])("v-toolbar__items"),i("3a2f")),N=Object(f["a"])(g,a,s,!1,null,null,null);e["default"]=N.exports;v()(N,{VBtn:b["a"],VCard:y["a"],VCardText:S["b"],VIcon:w["a"],VList:x["a"],VListItem:k["a"],VListItemGroup:j["a"],VMenu:z["a"],VSpacer:O["a"],VToolbar:B,VToolbarTitle:L,VTooltip:M["a"]})},"8efc":function(t,e,i){},adda:function(t,e,i){"use strict";i("a15b"),i("a9e3"),i("8efc");var a=i("90a2"),s=(i("36a7"),i("24b2")),n=i("58df"),o=Object(n["a"])(s["a"]).extend({name:"v-responsive",props:{aspectRatio:[String,Number]},computed:{computedAspectRatio:function(){return Number(this.aspectRatio)},aspectStyle:function(){return this.computedAspectRatio?{paddingBottom:1/this.computedAspectRatio*100+"%"}:void 0},__cachedSizer:function(){return this.aspectStyle?this.$createElement("div",{style:this.aspectStyle,staticClass:"v-responsive__sizer"}):[]}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-responsive__content"},this.$slots.default)}},render:function(t){return t("div",{staticClass:"v-responsive",style:this.measurableStyles,on:this.$listeners},[this.__cachedSizer,this.genContent()])}}),r=o,c=i("d9bd"),l="undefined"!==typeof window&&"IntersectionObserver"in window;e["a"]=r.extend({name:"v-img",directives:{intersect:a["a"]},props:{alt:String,contain:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:function(){return{root:void 0,rootMargin:void 0,threshold:void 0}}},position:{type:String,default:"center center"},sizes:String,src:{type:[String,Object],default:""},srcset:String,transition:{type:[Boolean,String],default:"fade-transition"}},data:function(){return{currentSrc:"",image:null,isLoading:!0,calculatedAspectRatio:void 0,naturalWidth:void 0}},computed:{computedAspectRatio:function(){return Number(this.normalisedSrc.aspect||this.calculatedAspectRatio)},normalisedSrc:function(){return"string"===typeof this.src?{src:this.src,srcset:this.srcset,lazySrc:this.lazySrc,aspect:Number(this.aspectRatio||0)}:{src:this.src.src,srcset:this.srcset||this.src.srcset,lazySrc:this.lazySrc||this.src.lazySrc,aspect:Number(this.aspectRatio||this.src.aspect)}},__cachedImage:function(){if(!this.normalisedSrc.src&&!this.normalisedSrc.lazySrc)return[];var t=[],e=this.isLoading?this.normalisedSrc.lazySrc:this.currentSrc;this.gradient&&t.push("linear-gradient(".concat(this.gradient,")")),e&&t.push('url("'.concat(e,'")'));var i=this.$createElement("div",{staticClass:"v-image__image",class:{"v-image__image--preload":this.isLoading,"v-image__image--contain":this.contain,"v-image__image--cover":!this.contain},style:{backgroundImage:t.join(", "),backgroundPosition:this.position},key:+this.isLoading});return this.transition?this.$createElement("transition",{attrs:{name:this.transition,mode:"in-out"}},[i]):i}},watch:{src:function(){this.isLoading?this.loadImage():this.init(void 0,void 0,!0)},"$vuetify.breakpoint.width":"getSrc"},mounted:function(){this.init()},methods:{init:function(t,e,i){if(!l||i||this.eager){if(this.normalisedSrc.lazySrc){var a=new Image;a.src=this.normalisedSrc.lazySrc,this.pollForSize(a,null)}this.normalisedSrc.src&&this.loadImage()}},onLoad:function(){this.getSrc(),this.isLoading=!1,this.$emit("load",this.src)},onError:function(){Object(c["b"])("Image load failed\n\n"+"src: ".concat(this.normalisedSrc.src),this),this.$emit("error",this.src)},getSrc:function(){this.image&&(this.currentSrc=this.image.currentSrc||this.image.src)},loadImage:function(){var t=this,e=new Image;this.image=e,e.onload=function(){e.decode?e.decode().catch((function(e){Object(c["c"])("Failed to decode image, trying to render anyway\n\n"+"src: ".concat(t.normalisedSrc.src)+(e.message?"\nOriginal error: ".concat(e.message):""),t)})).then(t.onLoad):t.onLoad()},e.onerror=this.onError,e.src=this.normalisedSrc.src,this.sizes&&(e.sizes=this.sizes),this.normalisedSrc.srcset&&(e.srcset=this.normalisedSrc.srcset),this.aspectRatio||this.pollForSize(e),this.getSrc()},pollForSize:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=function a(){var s=t.naturalHeight,n=t.naturalWidth;s||n?(e.naturalWidth=n,e.calculatedAspectRatio=n/s):null!=i&&setTimeout(a,i)};a()},genContent:function(){var t=r.options.methods.genContent.call(this);return this.naturalWidth&&this._b(t.data,"div",{style:{width:"".concat(this.naturalWidth,"px")}}),t},__genPlaceholder:function(){if(this.$slots.placeholder){var t=this.isLoading?[this.$createElement("div",{staticClass:"v-image__placeholder"},this.$slots.placeholder)]:[];return this.transition?this.$createElement("transition",{props:{appear:!0,name:this.transition}},t):t[0]}}},render:function(t){var e=r.options.render.call(this,t);return e.data.staticClass+=" v-image",l&&(e.data.directives=[{name:"intersect",modifiers:{once:!0},value:{handler:this.init,options:this.options}}]),e.data.attrs={role:this.alt?"img":void 0,"aria-label":this.alt},e.children=[this.__cachedSizer,this.__cachedImage,this.__genPlaceholder(),this.genContent()],t(e.tag,e.data,e.children)}})}}]);
//# sourceMappingURL=chunk-73d39b05.5f1598ac.js.map