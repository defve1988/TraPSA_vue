(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-475e00f5"],{5311:function(t,e,i){"use strict";var a=i("5607"),n=i("2b0e");e["a"]=n["a"].extend({name:"rippleable",directives:{ripple:a["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}})},"6ca7":function(t,e,i){},a56b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{height:"700"}},[i("v-card-title",{staticClass:"pa-1 px-4 title primary lighten-2 font-weight-regular white--text"},[t._v(" Research Cases "),i("v-spacer"),i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on,n=e.attrs;return[i("v-icon",t._g(t._b({attrs:{dark:"",icon:""},on:{click:t.add_new_case}},"v-icon",n,!1),a),[t._v("mdi-plus-circle")])]}}])},[i("span",[t._v("Add new research case.")])])],1),0==t.app_data.case.length?i("v-list",{staticClass:"pa-0",attrs:{dense:""}},[i("v-list-item",[t._v("No cases exist.")])],1):i("v-list",{staticClass:"pa-0",attrs:{expand:"",dense:"",shaped:""}},t._l(t.app_data.case,(function(e,a){return i("v-list-group",{key:a,scopedSlots:t._u([{key:"activator",fn:function(){return[i("v-list-item-action",[i("v-checkbox",{model:{value:e.model.selected,callback:function(i){t.$set(e.model,"selected",i)},expression:"item.model.selected"}})],1),i("v-list-item-title",{staticClass:"subtitle-1"},[t._v(" "+t._s(e.name)+" ")]),i("v-spacer"),i("v-btn",{attrs:{icon:""},on:{click:function(e){return t.edit_case(a)}}},[i("v-icon",[t._v("mdi-pencil-outline")])],1),i("v-btn",{staticClass:"mr-n9",attrs:{icon:""},on:{click:function(e){return t.remove_case(a)}}},[i("v-icon",[t._v("mdi-delete-outline")])],1)]},proxy:!0}],null,!0),model:{value:e.expand,callback:function(i){t.$set(e,"expand",i)},expression:"item.expand"}},[i("v-list-item",[i("v-row",{staticClass:"mt-2 ml-1",attrs:{dense:""}},[i("v-col",{attrs:{cols:"10"}},[i("v-select",{attrs:{items:t.model_type,label:"Ensemble Model",dense:""},model:{value:e.model.type,callback:function(i){t.$set(e.model,"type",i)},expression:"item.model.type"}})],1),i("v-col",{attrs:{cols:"2"}},[i("v-btn",{attrs:{icon:""},on:{click:function(e){return t.edit_model_setting(a)}}},[i("v-icon",[t._v("mdi-cog")])],1)],1)],1)],1),i("v-list-item",[i("v-row",{staticClass:"mt-1 ml-1",attrs:{dense:""}},[i("v-col",{attrs:{cols:"10"}},[i("v-select",{attrs:{items:t.app_data.traj_jobs,label:"Trajectory data",dense:""},model:{value:e.model.traj,callback:function(i){t.$set(e.model,"traj",i)},expression:"item.model.traj"}})],1),i("v-col",{staticClass:"px-0",attrs:{cols:"2"}})],1)],1)],1)})),1)],1)},n=[],s=(i("4de4"),i("5530")),o=i("2f62"),c={name:"map_layer",components:{},data:function(){return{model_type:["CPF","CFA","CWT","RTWC","PSCF","SQTBA"]}},watch:{},computed:Object(s["a"])({},Object(o["c"])({app_data:"app_data"})),mounted:function(){},methods:{add_new_case:function(){this.app_data.sites.data.length>0&&this.app_data.measurement.data.length>0?(this.app_data.ui_control.new_case.show=!0,this.app_data.ui_control.new_case.edit=-1):this.app_data.ui_control.snackbar={show:!1,text:"No data is uploaded, please upload data first.",color:"error"}},edit_case:function(){},edit_model_setting:function(){},remove_case:function(t){this.app_data.case=this.app_data.case.filter((function(e,i){return i!=t}))}}},l=c,r=(i("eacc"),i("2877")),u=i("6544"),d=i.n(u),h=i("8336"),p=i("b0af"),m=i("99d9"),v=i("ac7c"),f=i("62ad"),b=i("132d"),_=i("8860"),g=i("56b0"),C=i("da13"),k=i("1800"),V=i("5d23"),x=i("0fd9"),y=i("b974"),w=i("2fa4"),I=i("3a2f"),S=Object(r["a"])(l,a,n,!1,null,"ebafe936",null);e["default"]=S.exports;d()(S,{VBtn:h["a"],VCard:p["a"],VCardTitle:m["c"],VCheckbox:v["a"],VCol:f["a"],VIcon:b["a"],VList:_["a"],VListGroup:g["a"],VListItem:C["a"],VListItemAction:k["a"],VListItemTitle:V["b"],VRow:x["a"],VSelect:y["a"],VSpacer:w["a"],VTooltip:I["a"]})},ac7c:function(t,e,i){"use strict";i("d3b7"),i("25f0");var a=i("5530"),n=(i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),o=i("fe09");e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.disabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(n["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(a["a"])(Object(a["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},eacc:function(t,e,i){"use strict";var a=i("ee1d"),n=i.n(a);n.a},ec29:function(t,e,i){},ee1d:function(t,e,i){},fe09:function(t,e,i){"use strict";i("4de4"),i("45fc"),i("d3b7"),i("25f0");var a=i("c37a"),n=i("5311"),s=i("8547"),o=i("58df");e["a"]=Object(o["a"])(a["a"],n["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.disabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,e=a["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:function(e){e.preventDefault(),t.onChange()}},e):e},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var a=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===a&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-475e00f5.ff426cc0.js.map