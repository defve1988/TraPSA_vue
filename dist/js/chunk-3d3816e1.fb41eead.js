(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d3816e1"],{"1ff3":function(t,e,s){},"50d2":function(t,e,s){"use strict";var a=s("1ff3"),i=s.n(a);i.a},"56a4":function(t,e,s){"use strict";s("45fc"),s("a9e3"),s("d3b7"),s("25f0");var a=s("9d26"),i=s("a9ad"),r=s("3206"),n=s("5607"),o=s("58df"),p=Object(o["a"])(i["a"],Object(r["a"])("stepper","v-stepper-step","v-stepper"));e["a"]=p.extend().extend({name:"v-stepper-step",directives:{ripple:n["a"]},inject:["stepClick"],props:{color:{type:String,default:"primary"},complete:Boolean,completeIcon:{type:String,default:"$complete"},editable:Boolean,editIcon:{type:String,default:"$edit"},errorIcon:{type:String,default:"$error"},rules:{type:Array,default:function(){return[]}},step:[Number,String]},data:function(){return{isActive:!1,isInactive:!0}},computed:{classes:function(){return{"v-stepper__step--active":this.isActive,"v-stepper__step--editable":this.editable,"v-stepper__step--inactive":this.isInactive,"v-stepper__step--error error--text":this.hasError,"v-stepper__step--complete":this.complete}},hasError:function(){return this.rules.some((function(t){return!0!==t()}))}},mounted:function(){this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.stepper&&this.stepper.unregister(this)},methods:{click:function(t){t.stopPropagation(),this.$emit("click",t),this.editable&&this.stepClick(this.step)},genIcon:function(t){return this.$createElement(a["a"],t)},genLabel:function(){return this.$createElement("div",{staticClass:"v-stepper__label"},this.$slots.default)},genStep:function(){var t=!(this.hasError||!this.complete&&!this.isActive)&&this.color;return this.$createElement("span",this.setBackgroundColor(t,{staticClass:"v-stepper__step__step"}),this.genStepContent())},genStepContent:function(){var t=[];return this.hasError?t.push(this.genIcon(this.errorIcon)):this.complete?this.editable?t.push(this.genIcon(this.editIcon)):t.push(this.genIcon(this.completeIcon)):t.push(String(this.step)),t},toggle:function(t){this.isActive=t.toString()===this.step.toString(),this.isInactive=Number(t)<Number(this.step)}},render:function(t){return t("div",{staticClass:"v-stepper__step",class:this.classes,directives:[{name:"ripple",value:this.editable}],on:{click:this.click}},[this.genStep(),this.genLabel()])}})},"7e85":function(t,e,s){"use strict";s("4de4"),s("b0c0"),s("a9e3");var a=s("5530"),i=(s("8836"),s("3206")),r=s("a452"),n=s("7560"),o=s("58df"),p=s("d9bd"),c=Object(o["a"])(Object(i["b"])("stepper"),r["a"],n["a"]);e["a"]=c.extend({name:"v-stepper",provide:function(){return{stepClick:this.stepClick,isVertical:this.vertical}},props:{altLabels:Boolean,nonLinear:Boolean,vertical:Boolean},data:function(){var t={isBooted:!1,steps:[],content:[],isReverse:!1};return t.internalLazyValue=null!=this.value?this.value:(t[0]||{}).step||1,t},computed:{classes:function(){return Object(a["a"])({"v-stepper--is-booted":this.isBooted,"v-stepper--vertical":this.vertical,"v-stepper--alt-labels":this.altLabels,"v-stepper--non-linear":this.nonLinear},this.themeClasses)}},watch:{internalValue:function(t,e){this.isReverse=Number(t)<Number(e),e&&(this.isBooted=!0),this.updateView()}},created:function(){this.$listeners.input&&Object(p["a"])("@input","@change",this)},mounted:function(){this.updateView()},methods:{register:function(t){"v-stepper-step"===t.$options.name?this.steps.push(t):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content.push(t))},unregister:function(t){"v-stepper-step"===t.$options.name?this.steps=this.steps.filter((function(e){return e!==t})):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content=this.content.filter((function(e){return e!==t})))},stepClick:function(t){var e=this;this.$nextTick((function(){return e.internalValue=t}))},updateView:function(){for(var t=this.steps.length;--t>=0;)this.steps[t].toggle(this.internalValue);for(var e=this.content.length;--e>=0;)this.content[e].toggle(this.internalValue,this.isReverse)}},render:function(t){return t("div",{staticClass:"v-stepper",class:this.classes},this.$slots.default)}})},8836:function(t,e,s){},"9c54":function(t,e,s){"use strict";s.d(e,"a",(function(){return o})),s.d(e,"b",(function(){return p}));var a=s("80d2"),i=s("7e85"),r=s("56a4"),n=s("e516"),o=Object(a["i"])("v-stepper__header"),p=Object(a["i"])("v-stepper__items");i["a"],n["a"],r["a"]},a04d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",{attrs:{color:"secondary",flat:""}},[s("v-container",{staticClass:"px-10"},[s("v-stepper",{staticClass:"mt-5",model:{value:t.e1,callback:function(e){t.e1=e},expression:"e1"}},[s("v-stepper-header",{staticClass:"px-5",attrs:{height:"100px"}},[s("v-stepper-step",{attrs:{rules:t.isStep1,color:"primary lighten-2",complete:t.e1>1,step:"1"}},[t._v(" Site Locations "),t.isStep1[0]()?t._e():s("small",[t._v("Please Upload Site location Data.")])]),s("v-divider"),s("v-stepper-step",{attrs:{color:"primary lighten-2",complete:t.e1>2,step:"2",rules:t.isStep2}},[t._v(" Upload Measurement Data "),t.isStep2[0]()?t._e():s("small",[t._v("Please Upload Measurement Data.")])]),s("v-divider"),s("v-stepper-step",{attrs:{color:"primary lighten-2",complete:t.e1>3,step:"3"}},[t._v(" Upload Wind Data "),s("small",[t._v("Optional")])])],1),s("v-stepper-items",[s("v-stepper-content",{attrs:{step:"1"}},[s("v-card",{attrs:{height:t.stepper_height}},[s("v-card",{attrs:{height:t.stepper_height-80,flat:""}},[s("v-row",{attrs:{justify:"center"}},[s("v-col",{staticClass:"pa-1",attrs:{cols:"4"}},[s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("upload_card",{attrs:{upload_card:t.upload_site}})],1)],1),s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("v-card",{staticClass:"pa-3"},[s("v-data-table",{attrs:{headers:t.app_data.sites.header,items:t.app_data.sites.data,"items-per-page":5,height:"210"}})],1)],1)],1)],1),s("v-col",{staticClass:"px-5 pt-1",attrs:{cols:"8"}},[s("v-container",[s("div",{staticClass:"my_dataviz",attrs:{id:"map_div"}})])],1)],1)],1),s("v-divider",{staticClass:"my-5"}),s("v-btn",{attrs:{dark:"",color:"primary"},on:{click:t.next_1}},[t._v("Continue")])],1)],1),s("v-stepper-content",{attrs:{step:"2"}},[s("v-card",{attrs:{height:t.stepper_height}},[s("v-card",{attrs:{height:t.stepper_height-80,flat:""}},[s("v-row",{attrs:{justify:"center"}},[s("v-col",{staticClass:"pa-1",attrs:{cols:"4"}},[s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("v-card",{staticClass:"py-2"},[s("v-card-title",[s("span",{staticClass:"subtitle-1"},[t._v("Missing Value")])]),s("v-text-field",{staticClass:"px-5 py-2",attrs:{label:"Missing value will be excluded for analysis.",hint:"For example, -999 or NaN"},model:{value:t.app_data.missing_data,callback:function(e){t.$set(t.app_data,"missing_data",e)},expression:"app_data.missing_data"}}),s("v-divider",{staticClass:"mx-3"}),s("v-card-title",[s("span",{staticClass:"subtitle-1"},[t._v("Datetime Formats")]),s("v-spacer"),s("v-btn",{attrs:{color:"primary"},on:{click:t.dateFromat_check}},[t._v("Check")])],1),s("v-text-field",{staticClass:"px-5 py-2",attrs:{label:"Copy a timestamp from your data.",hint:"For example, yyyy/mm/dd hh:mm"},model:{value:t.date_example,callback:function(e){t.date_example=e},expression:"date_example"}})],1)],1)],1),s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("upload_card",{attrs:{upload_card:t.upload_measurement}})],1)],1)],1),s("v-col",{staticClass:"px-5 pt-1",attrs:{cols:"8"}},[s("v-container",[s("v-card",{staticClass:"pa-3"},[s("v-data-table",{staticClass:"pl-1",attrs:{headers:t.app_data.measurement.header,items:t.app_data.measurement.data,"items-per-page":10,height:"415"}})],1)],1)],1)],1)],1),s("v-divider",{staticClass:"my-5"}),s("v-btn",{attrs:{color:"primary"},on:{click:t.next_2}},[t._v("Continue")]),s("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=1}}},[t._v("Previous")])],1)],1),s("v-stepper-content",{attrs:{step:"3"}},[s("v-card",{attrs:{height:t.stepper_height}},[s("v-card",{attrs:{height:t.stepper_height-80,flat:""}},[s("v-row",{attrs:{justify:"center"}},[s("v-col",{staticClass:"pa-1",attrs:{cols:"4"}},[s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("upload_card",{attrs:{upload_card:t.upload_wind}})],1)],1),s("v-row",[s("v-col",{staticClass:"ml-3",attrs:{cols:"12"}},[s("v-card",{staticClass:"pa-3"},[s("v-data-table",{attrs:{headers:t.app_data.wind_data.header,items:t.app_data.wind_data.data,"items-per-page":5,height:"210"}})],1)],1)],1)],1),s("v-col",{staticClass:"px-5 pt-1",attrs:{cols:"8"}},[s("v-container",[s("wind_rose",{attrs:{canvas_config:t.wind_rose_config}})],1)],1)],1)],1),s("v-divider",{staticClass:"my-5"}),s("v-btn",{attrs:{color:"primary"},on:{click:t.finish_upload}},[t._v("Continue")]),s("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=2}}},[t._v("Previous")])],1)],1)],1)],1)],1)],1)},i=[],r=(s("d3b7"),s("5530")),n=s("2f62"),o={name:"App",components:{upload_card:function(){return s.e("chunk-64631964").then(s.bind(null,"14ee"))},wind_rose:function(){return Promise.all([s.e("chunk-2825802f"),s.e("chunk-7201d0ea"),s.e("chunk-5ee3312c")]).then(s.bind(null,"3f1b"))}},data:function(){return{e1:1,stepper_height:600,isStep1:[function(){return!0}],isStep2:[function(){return!0}],date_example:"",upload_measurement:{title:"Upload Measurement Data",label:"Measurement Data",isLoading:!1,update_data:"measurement",isExpand:!0},upload_site:{title:"Upload Site Data",label:"Site Locations",isLoading:!1,update_data:"sites",isExpand:!1},upload_wind:{title:"Upload Wind Data",label:"Wind Speed and Direction",isLoading:!1,update_data:"wind_data",isExpand:!0},wind_rose_config:{}}},computed:Object(r["a"])({},Object(n["c"])({app_data:"app_data"})),methods:{next_1:function(){this.isStep1=this.app_data.sites.data.length>0?[function(){return!0}]:[function(){return!1}],this.isStep1[0]()&&(this.e1=2)},next_2:function(){this.isStep2=this.app_data.measurement.data.length>0?[function(){return!0}]:[function(){return!1}],this.isStep2[0]()&&(this.e1=3)},finish_upload:function(){0==this.app_data.wind_data.data.length&&(this.app_data.i_control.snackbar={show:!0,text:"You did not upload wind data, CPF and CBPF analysis will not be avaiable!",color:"warning"}),this.app_data.ui_control.curr_tab+=1},dateFromat_check:function(){var t=Date.parse(this.date_example);this.app_data.ui_control.snackbar={show:!0,text:isNaN(t)?"Date format error.":"ISO String: "+new Date(this.date_example).toISOString(),color:isNaN(t)?"error":"info"}}}},p=o,c=(s("50d2"),s("2877")),l=s("6544"),d=s.n(l),u=s("8336"),h=s("b0af"),v=s("99d9"),f=s("62ad"),m=s("a523"),_=s("8fea"),g=s("ce7e"),b=s("0fd9"),C=s("2fa4"),y=s("7e85"),w=s("e516"),x=s("9c54"),S=s("56a4"),k=s("8654"),V=Object(c["a"])(p,a,i,!1,null,"a96295fe",null);e["default"]=V.exports;d()(V,{VBtn:u["a"],VCard:h["a"],VCardTitle:v["c"],VCol:f["a"],VContainer:m["a"],VDataTable:_["a"],VDivider:g["a"],VRow:b["a"],VSpacer:C["a"],VStepper:y["a"],VStepperContent:w["a"],VStepperHeader:x["a"],VStepperItems:x["b"],VStepperStep:S["a"],VTextField:k["a"]})},a523:function(t,e,s){"use strict";s("99af"),s("4de4"),s("b64b"),s("2ca0"),s("20f6"),s("4b85");var a=s("e8f2"),i=s("d9f7");e["a"]=Object(a["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var s,a=e.props,r=e.data,n=e.children,o=r.attrs;return o&&(r.attrs={},s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),t(a.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(s||[])}),n)}})},e516:function(t,e,s){"use strict";s("a9e3"),s("d3b7"),s("25f0");var a=s("0789"),i=s("3206"),r=s("80d2"),n=s("58df"),o=Object(n["a"])(Object(i["a"])("stepper","v-stepper-content","v-stepper"));e["a"]=o.extend().extend({name:"v-stepper-content",inject:{isVerticalProvided:{from:"isVertical"}},props:{step:{type:[Number,String],required:!0}},data:function(){return{height:0,isActive:null,isReverse:!1,isVertical:this.isVerticalProvided}},computed:{computedTransition:function(){var t=this.$vuetify.rtl?!this.isReverse:this.isReverse;return t?a["g"]:a["h"]},styles:function(){return this.isVertical?{height:Object(r["g"])(this.height)}:{}}},watch:{isActive:function(t,e){t&&null==e?this.height="auto":this.isVertical&&(this.isActive?this.enter():this.leave())}},mounted:function(){this.$refs.wrapper.addEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.$refs.wrapper.removeEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.unregister(this)},methods:{onTransition:function(t){this.isActive&&"height"===t.propertyName&&(this.height="auto")},enter:function(){var t=this,e=0;requestAnimationFrame((function(){e=t.$refs.wrapper.scrollHeight})),this.height=0,setTimeout((function(){return t.isActive&&(t.height=e||"auto")}),450)},leave:function(){var t=this;this.height=this.$refs.wrapper.clientHeight,setTimeout((function(){return t.height=0}),10)},toggle:function(t,e){this.isActive=t.toString()===this.step.toString(),this.isReverse=e}},render:function(t){var e={staticClass:"v-stepper__content"},s={staticClass:"v-stepper__wrapper",style:this.styles,ref:"wrapper"};this.isVertical||(e.directives=[{name:"show",value:this.isActive}]);var a=t("div",s,[this.$slots.default]),i=t("div",e,[a]);return t(this.computedTransition,{on:this.$listeners},[i])}})}}]);
//# sourceMappingURL=chunk-3d3816e1.fb41eead.js.map