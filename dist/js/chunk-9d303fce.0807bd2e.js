(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9d303fce","chunk-05386022"],{"34c3":function(t,e,i){"use strict";i("498a");var s=i("2b0e");e["a"]=s["a"].extend({name:"v-list-item-icon",functional:!0,render:function(t,e){var i=e.data,s=e.children;return i.staticClass="v-list-item__icon ".concat(i.staticClass||"").trim(),t("div",i,s)}})},"56b0":function(t,e,i){"use strict";i("ac1f"),i("466d");var s=i("5530"),n=i("ade3"),c=(i("db42"),i("9d26")),o=i("da13"),a=i("34c3"),l=i("7e2b"),r=i("9d65"),h=i("a9ad"),u=i("f2e7"),_=i("3206"),d=i("5607"),p=i("0789"),m=i("58df"),v=i("80d2"),f=Object(m["a"])(l["a"],r["a"],h["a"],Object(_["a"])("list"),u["a"]);e["a"]=f.extend().extend({name:"v-list-group",directives:{ripple:d["a"]},props:{activeClass:{type:String,default:""},appendIcon:{type:String,default:"$expand"},color:{type:String,default:"primary"},disabled:Boolean,group:String,noAction:Boolean,prependIcon:String,ripple:{type:[Boolean,Object],default:!0},subGroup:Boolean},computed:{classes:function(){return{"v-list-group--active":this.isActive,"v-list-group--disabled":this.disabled,"v-list-group--no-action":this.noAction,"v-list-group--sub-group":this.subGroup}}},watch:{isActive:function(t){!this.subGroup&&t&&this.list&&this.list.listClick(this._uid)},$route:"onRouteChange"},created:function(){this.list&&this.list.register(this),this.group&&this.$route&&null==this.value&&(this.isActive=this.matchRoute(this.$route.path))},beforeDestroy:function(){this.list&&this.list.unregister(this)},methods:{click:function(t){var e=this;this.disabled||(this.isBooted=!0,this.$emit("click",t),this.$nextTick((function(){return e.isActive=!e.isActive})))},genIcon:function(t){return this.$createElement(c["a"],t)},genAppendIcon:function(){var t=!this.subGroup&&this.appendIcon;return t||this.$slots.appendIcon?this.$createElement(a["a"],{staticClass:"v-list-group__header__append-icon"},[this.$slots.appendIcon||this.genIcon(t)]):null},genHeader:function(){return this.$createElement(o["a"],{staticClass:"v-list-group__header",attrs:{"aria-expanded":String(this.isActive),role:"button"},class:Object(n["a"])({},this.activeClass,this.isActive),props:{inputValue:this.isActive},directives:[{name:"ripple",value:this.ripple}],on:Object(s["a"])(Object(s["a"])({},this.listeners$),{},{click:this.click})},[this.genPrependIcon(),this.$slots.activator,this.genAppendIcon()])},genItems:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement("div",{staticClass:"v-list-group__items",directives:[{name:"show",value:t.isActive}]},Object(v["r"])(t))]}))},genPrependIcon:function(){var t=this.subGroup&&null==this.prependIcon?"$subgroup":this.prependIcon;return t||this.$slots.prependIcon?this.$createElement(a["a"],{staticClass:"v-list-group__header__prepend-icon"},[this.$slots.prependIcon||this.genIcon(t)]):null},onRouteChange:function(t){if(this.group){var e=this.matchRoute(t.path);e&&this.isActive!==e&&this.list&&this.list.listClick(this._uid),this.isActive=e}},toggle:function(t){var e=this,i=this._uid===t;i&&(this.isBooted=!0),this.$nextTick((function(){return e.isActive=i}))},matchRoute:function(t){return null!==t.match(this.group)}},render:function(t){return t("div",this.setTextColor(this.isActive&&this.color,{staticClass:"v-list-group",class:this.classes}),[this.genHeader(),t(p["a"],this.genItems())])}})},"5d23":function(t,e,i){"use strict";i.d(e,"a",(function(){return p})),i.d(e,"b",(function(){return m}));var s=i("80d2"),n=i("8860"),c=i("56b0"),o=i("da13"),a=i("1baa"),l=i("1800"),r=(i("a9e3"),i("5530")),h=i("713a"),u=h["a"].extend({name:"v-list-item-avatar",props:{horizontal:Boolean,size:{type:[Number,String],default:40}},computed:{classes:function(){return Object(r["a"])(Object(r["a"])({"v-list-item__avatar--horizontal":this.horizontal},h["a"].options.computed.classes.call(this)),{},{"v-avatar--tile":this.tile||this.horizontal})}},render:function(t){var e=h["a"].options.render.call(this,t);return e.data=e.data||{},e.data.staticClass+=" v-list-item__avatar",e}}),_=i("34c3"),d=Object(s["i"])("v-list-item__action-text","span"),p=Object(s["i"])("v-list-item__content","div"),m=Object(s["i"])("v-list-item__title","div"),v=Object(s["i"])("v-list-item__subtitle","div");n["a"],c["a"],o["a"],l["a"],a["a"],_["a"]},"713a":function(t,e,i){"use strict";var s=i("8212");e["a"]=s["a"]},"9d01":function(t,e,i){},b73d:function(t,e,i){"use strict";i("0481"),i("4069");var s=i("5530"),n=(i("ec29"),i("9d01"),i("fe09")),c=i("c37a"),o=i("c3f0"),a=i("0789"),l=i("490a"),r=i("80d2");e["a"]=n["a"].extend({name:"v-switch",directives:{Touch:o["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},c["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.disabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(a["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(l["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===r["x"].left&&this.isActive||t.keyCode===r["x"].right&&!this.isActive)&&this.onChange()}}})},db42:function(t,e,i){},e63b:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",[i("v-card-title",{staticClass:"py-1 title font-weight-medium secondary primary--text text--darken-2"},[t._v(" New Resaerch Case "),i("v-spacer"),i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,n=e.attrs;return[i("v-icon",t._g(t._b({attrs:{icon:""},on:{click:t.reset_dialog}},"v-icon",n,!1),s),[t._v("mdi-refresh")])]}}])},[i("span",[t._v("Reset selections.")])]),i("v-btn",{attrs:{icon:""},on:{click:function(e){t.ui_control.new_case.show=!1}}},[i("v-icon",[t._v("mdi-close")])],1)],1),i("v-divider"),i("v-card-text",[i("v-row",{attrs:{dense:""}},[i("v-col",{staticClass:"mt-3",attrs:{cols:"6"}},[i("v-text-field",{attrs:{label:"Name the new case"},model:{value:t.ui_control.new_case.selection.case_name,callback:function(e){t.$set(t.ui_control.new_case.selection,"case_name",e)},expression:"ui_control.new_case.selection.case_name"}})],1)],1),i("v-row",{attrs:{dense:""}},[i("v-col",[i("v-select",{attrs:{items:t.app_data.sites.df.map((function(t){return t.site_name})),label:"Select sites",chips:""},model:{value:t.ui_control.new_case.selection.site,callback:function(e){t.$set(t.ui_control.new_case.selection,"site",e)},expression:"ui_control.new_case.selection.site"}})],1),i("v-col",{staticClass:"mx-5"},[i("v-select",{attrs:{items:t.chemical_calculated,label:"Select chemicals",chips:"",multiple:""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[i("v-list-item",{attrs:{ripple:""},on:{click:t.toggle_chemical}},[i("v-list-item-action",[i("v-icon",{attrs:{color:t.ui_control.new_case.selection.chemical.length>0?"primary":""}},[t._v(t._s(t.chemical_icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Select All")])],1)],1),i("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.ui_control.new_case.selection.chemical,callback:function(e){t.$set(t.ui_control.new_case.selection,"chemical",e)},expression:"ui_control.new_case.selection.chemical"}})],1)],1),i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{cols:"9"}},[i("v-select",{attrs:{items:t.year_calculated,label:"Select years",chips:"",multiple:""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[i("v-list-item",{attrs:{ripple:""},on:{click:t.toggle_year}},[i("v-list-item-action",[i("v-icon",{attrs:{color:t.ui_control.new_case.selection.year.length>0?"primary":""}},[t._v(t._s(t.year_icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Select All")])],1)],1),i("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.ui_control.new_case.selection.year,callback:function(e){t.$set(t.ui_control.new_case.selection,"year",e)},expression:"ui_control.new_case.selection.year"}})],1),i("v-col")],1),i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{cols:"9"}},[i("v-select",{attrs:{items:t.by_season?t.month_1:t.month_2,label:"Select months",chips:"",multiple:""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[i("v-list-item",{attrs:{ripple:""},on:{click:t.toggle_month}},[i("v-list-item-action",[i("v-icon",{attrs:{color:t.ui_control.new_case.selection.month.length>0?"primary":""}},[t._v(t._s(t.month_icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Select All")])],1)],1),i("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.ui_control.new_case.selection.month,callback:function(e){t.$set(t.ui_control.new_case.selection,"month",e)},expression:"ui_control.new_case.selection.month"}})],1),i("v-col",{attrs:{cols:"3"}},[i("v-switch",{staticClass:"mt-6 mx-5",attrs:{label:t.by_season?"By season":"By month"},on:{change:function(e){t.ui_control.new_case.selection.month=[]}},model:{value:t.by_season,callback:function(e){t.by_season=e},expression:"by_season"}})],1)],1),i("v-row",{attrs:{dense:""}},[i("v-col",{attrs:{cols:"9"}},[i("v-select",{attrs:{items:t.by_period?t.hour_1:t.hour_2,label:"Select hours",chips:"",multiple:""},scopedSlots:t._u([{key:"prepend-item",fn:function(){return[i("v-list-item",{attrs:{ripple:""},on:{click:t.toggle_hour}},[i("v-list-item-action",[i("v-icon",{attrs:{color:t.ui_control.new_case.selection.hour.length>0?"primary":""}},[t._v(t._s(t.hour_icon))])],1),i("v-list-item-content",[i("v-list-item-title",[t._v("Select All")])],1)],1),i("v-divider",{staticClass:"mt-2"})]},proxy:!0}]),model:{value:t.ui_control.new_case.selection.hour,callback:function(e){t.$set(t.ui_control.new_case.selection,"hour",e)},expression:"ui_control.new_case.selection.hour"}})],1),i("v-col",{attrs:{cols:"3"}},[i("v-switch",{staticClass:"mt-6 mx-5",attrs:{label:t.by_period?"By period":"By hour"},on:{change:function(e){t.ui_control.new_case.selection.hour=[]}},model:{value:t.by_period,callback:function(e){t.by_period=e},expression:"by_period"}})],1)],1),i("v-btn",{staticClass:"mt-3",on:{click:t.add_new_case}},[t._v("Finish")])],1)],1)},n=[],c=(i("99af"),i("4de4"),i("a630"),i("caad"),i("c975"),i("d81d"),i("13d5"),i("a434"),i("d3b7"),i("2532"),i("3ca3"),i("ddb0"),i("b85c")),o=i("5530"),a=i("2f62"),l={props:["select_type"],components:{},data:function(){return{by_season:!0,by_period:!0,month_1:["Spring","Summer","Autumn","Winter"],month_2:["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],hour_2:Array.from(Array(24).keys()),hour_1:["Morning rush hours (6:00-9:00)","Daytime hours (10:00-16:00)","Afternoon rush hours (15:00-20:00)","Night hours (21:00-5:00)"]}},computed:Object(o["a"])(Object(o["a"])({},Object(a["c"])({app_data:"app_data",ui_control:"ui_control"})),{},{year_calculated:function(){var t=this.ui_control.new_case.selection.site,e=this.app_data.conc_df.df.reduce((function(e,i){var s=new Date(i.time_stamp).getFullYear();return e.includes(s)||i.site_name!=t||e.push(s),e}),[]);return e},chemical_calculated:function(){var t=["wind_direction","wind_speed","time_stamp","site_name"],e=this.app_data.conc_df.attrs;return e.filter((function(e){return!t.includes(e)}))},hour_icon:function(){return 24==this.ui_control.new_case.selection.hour.length&&!this.by_period||4==this.ui_control.new_case.selection.hour.length&&this.by_period?"mdi-close-box":this.ui_control.new_case.selection.hour.length>0&&this.ui_control.new_case.selection.hour.length<24?"mdi-minus-box":"mdi-checkbox-blank-outline"},month_icon:function(){return 12==this.ui_control.new_case.selection.month.length&&!this.by_season||4==this.ui_control.new_case.selection.month.length&&this.by_season?"mdi-close-box":this.ui_control.new_case.selection.month.length>0&&this.ui_control.new_case.selection.month.length<24?"mdi-minus-box":"mdi-checkbox-blank-outline"},year_icon:function(){return this.ui_control.new_case.selection.year.length==this.year_calculated.length?"mdi-close-box":this.ui_control.new_case.selection.year.length>0&&this.ui_control.new_case.selection.year.length<this.year_calculated.length?"mdi-minus-box":"mdi-checkbox-blank-outline"},chemical_icon:function(){return this.ui_control.new_case.selection.chemical.length==this.chemical_calculated.length?"mdi-close-box":this.ui_control.new_case.selection.chemical.length>0&&this.ui_control.new_case.selection.chemical.length<this.chemical_calculated.length?"mdi-minus-box":"mdi-checkbox-blank-outline"}}),mounted:function(){},methods:{reset_dialog:function(){this.ui_control.new_case.selection={case_name:"New Case",site:[],chemical:[],year:[],month:["Spring","Summer","Autumn","Winter"],hour:["Morning rush hours (6:00-9:00)","Daytime hours (10:00-16:00)","Afternoon rush hours (15:00-20:00)","Night hours (21:00-5:00)"]},this.by_season=!0,this.by_period=!0},toggle_hour:function(){4==this.ui_control.new_case.selection.hour.length&&this.by_period||24==this.ui_control.new_case.selection.hour.length&&!this.by_period?this.ui_control.new_case.selection.hour=[]:this.ui_control.new_case.selection.hour=this.by_period?this.hour_1:this.hour_2},toggle_month:function(){4==this.ui_control.new_case.selection.month.length&&this.by_season||12==this.ui_control.new_case.selection.month.length&&!this.by_season?this.ui_control.new_case.selection.month=[]:this.ui_control.new_case.selection.month=this.by_season?this.month_1:this.month_2},toggle_year:function(){this.ui_control.new_case.selection.year.length==this.year_calculated.length?this.ui_control.new_case.selection.year=[]:this.ui_control.new_case.selection.year=this.year_calculated},toggle_chemical:function(){this.ui_control.new_case.selection.chemical.length==this.chemical_calculated.length?this.ui_control.new_case.selection.chemical=[]:this.ui_control.new_case.selection.chemical=this.chemical_calculated},cal_case_selected_month:function(){var t;if(this.by_season)t=this.ui_control.new_case.selection.month.reduce((function(t,e){return"Spring"==e?t.push(2,3,4):"Summer"==e?t.push(5,6,7):"Autumn"==e?t.push(8,9,10):"Winter"==e&&t.push(11,0,1),t}),[]);else{var e=this.month_2;t=this.ui_control.new_case.selection.month.map((function(t){return e.indexOf(t)}))}return t},cal_case_selected_hour:function(){var t;return t=this.by_period?this.ui_control.new_case.selection.hour.reduce((function(t,e){return"Morning rush hours (6:00-9:00)"==e?t.push(6,7,8,9):"Daytime hours (10:00-16:00)"==e?t.push(10,11,12,13,14,15,16):"Afternoon rush hours (15:00-20:00)"==e?t.push(17,18,19,20):"Night hours (21:00-5:00)"==e&&t.push(21,22,23,0,1,2,3,4,5),t}),[]):this.ui_control.new_case.selection.hour,t},add_new_case:function(){var t,e=this.ui_control.new_case.selection.site,i=[].concat(this.ui_control.new_case.selection.chemical),s=this.ui_control.new_case.selection.year,n=this.cal_case_selected_month(),o=this.cal_case_selected_hour(),a=this.app_data.conc_df.df.reduce((function(t,i){var c=new Date(i.time_stamp);return i.site_name==e&&s.includes(c.getFullYear())&&n.includes(c.getMonth())&&o.includes(c.getHours())&&t.push({time_stamp:i.time_stamp,wind_speed:parseFloat(i.wind_speed),wind_direction:parseFloat(i.wind_direction)}),t}),[]),l=Object(c["a"])(i);try{for(l.s();!(t=l.n()).done;){var r=t.value,h=this.app_data.conc_df.df.reduce((function(t,i){var c=new Date(i.time_stamp);return i.site_name==e&&s.includes(c.getFullYear())&&n.includes(c.getMonth())&&o.includes(c.getHours())&&!isNaN(i[r])&&t.push({time_stamp:i.time_stamp,selected_chemical:parseFloat(i[r])}),t}),[]),u={name:-1==this.ui_control.new_case.edit?this.ui_control.new_case.selection.case_name+"_"+r:this.ui_control.new_case.selection.case_name,chemical:r,site:this.ui_control.new_case.selection.site,selected:!1,data:{measurement:h,wind:a},selections:{year:this.ui_control.new_case.selection.year,month:this.ui_control.new_case.selection.month,hour:this.ui_control.new_case.selection.hour,year_value:s,month_value:n,hour_value:o},model:{type:"PSCF",c:.8,grid:.5,weight:[{n:.25,w:.1},{n:.5,w:.25},{n:.75,w:.5},{n:1,w:.75},{n:1.5,w:.9}],traj:this.app_data.traj_data.length>0?this.app_data.traj_data[0].job_name:"",selected:!1}};-1==this.ui_control.new_case.edit?("case"==this.select_type?this.app_data.case.push(u):"source_case"==this.select_type&&this.app_data.source_case.push(u),this.ui_control.snackbar={show:!0,text:"New research case added!",color:"info"}):("case"==this.select_type?this.app_data.case.splice(this.ui_control.new_case.edit,1,u):"source_case"==this.select_type&&this.app_data.source_case.splice(this.ui_control.new_case.edit,1,u),this.ui_control.snackbar={show:!0,text:"Research case edited!",color:"info"},this.$emit("data_edited"))}}catch(_){l.e(_)}finally{l.f()}this.ui_control.new_case.show=!1}}},r=l,h=i("2877"),u=i("6544"),_=i.n(u),d=i("8336"),p=i("b0af"),m=i("99d9"),v=i("62ad"),f=i("ce7e"),g=i("132d"),w=i("da13"),b=i("1800"),y=i("5d23"),x=i("0fd9"),k=i("b974"),C=i("2fa4"),S=i("b73d"),A=i("8654"),$=i("3a2f"),j=Object(h["a"])(r,s,n,!1,null,null,null);e["default"]=j.exports;_()(j,{VBtn:d["a"],VCard:p["a"],VCardText:m["b"],VCardTitle:m["c"],VCol:v["a"],VDivider:f["a"],VIcon:g["a"],VListItem:w["a"],VListItemAction:b["a"],VListItemContent:y["a"],VListItemTitle:y["b"],VRow:x["a"],VSelect:k["a"],VSpacer:C["a"],VSwitch:S["a"],VTextField:A["a"],VTooltip:$["a"]})}}]);
//# sourceMappingURL=chunk-9d303fce.0807bd2e.js.map