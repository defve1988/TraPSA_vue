(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2ad8f6c0"],{"0468":function(t,e,i){},"0fd9":function(t,e,i){"use strict";i("99af"),i("4160"),i("caad"),i("13d5"),i("4ec9"),i("b64b"),i("d3b7"),i("ac1f"),i("2532"),i("3ca3"),i("5319"),i("159b"),i("ddb0");var s=i("ade3"),n=i("5530"),a=(i("4b85"),i("2b0e")),r=i("d9f7"),o=i("80d2"),l=["sm","md","lg","xl"],c=["start","end","center"];function u(t,e){return l.reduce((function(i,s){return i[t+Object(o["F"])(s)]=e(),i}),{})}var p=function(t){return[].concat(c,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:p}})),d=function(t){return[].concat(c,["space-between","space-around"]).includes(t)},v=u("justify",(function(){return{type:String,default:null,validator:d}})),f=function(t){return[].concat(c,["space-between","space-around","stretch"]).includes(t)},m=u("alignContent",(function(){return{type:String,default:null,validator:f}})),_={align:Object.keys(h),justify:Object.keys(v),alignContent:Object.keys(m)},g={align:"align",justify:"justify",alignContent:"align-content"};function b(t,e,i){var s=g[t];if(null!=i){if(e){var n=e.replace(t,"");s+="-".concat(n)}return s+="-".concat(i),s.toLowerCase()}}var y=new Map;e["a"]=a["a"].extend({name:"v-row",functional:!0,props:Object(n["a"])(Object(n["a"])(Object(n["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:p}},h),{},{justify:{type:String,default:null,validator:d}},v),{},{alignContent:{type:String,default:null,validator:f}},m),render:function(t,e){var i=e.props,n=e.data,a=e.children,o="";for(var l in i)o+=String(i[l]);var c=y.get(o);return c||function(){var t,e;for(e in c=[],_)_[e].forEach((function(t){var s=i[t],n=b(e,t,s);n&&c.push(n)}));c.push((t={"no-gutters":i.noGutters,"row--dense":i.dense},Object(s["a"])(t,"align-".concat(i.align),i.align),Object(s["a"])(t,"justify-".concat(i.justify),i.justify),Object(s["a"])(t,"align-content-".concat(i.alignContent),i.alignContent),t)),y.set(o,c)}(),t(i.tag,Object(r["a"])(n,{staticClass:"row",class:c}),a)}})},1800:function(t,e,i){"use strict";i("4de4");var s=i("2b0e");e["a"]=s["a"].extend({name:"v-list-item-action",functional:!0,render:function(t,e){var i=e.data,s=e.children,n=void 0===s?[]:s;i.staticClass=i.staticClass?"v-list-item__action ".concat(i.staticClass):"v-list-item__action";var a=n.filter((function(t){return!1===t.isComment&&" "!==t.text}));return a.length>1&&(i.staticClass+=" v-list-item__action--stack"),t("div",i,n)}})},"2c64":function(t,e,i){},"34c3":function(t,e,i){"use strict";i("498a");var s=i("2b0e");e["a"]=s["a"].extend({name:"v-list-item-icon",functional:!0,render:function(t,e){var i=e.data,s=e.children;return i.staticClass="v-list-item__icon ".concat(i.staticClass||"").trim(),t("div",i,s)}})},"3d86":function(t,e,i){},"43a6":function(t,e,i){"use strict";i("a9e3");var s=i("5530"),n=(i("ec29"),i("3d86"),i("c37a")),a=i("604c"),r=i("8547"),o=i("58df"),l=Object(o["a"])(r["a"],a["a"],n["a"]);e["a"]=l.extend({name:"v-radio-group",provide:function(){return{radioGroup:this}},props:{column:{type:Boolean,default:!0},height:{type:[Number,String],default:"auto"},name:String,row:Boolean,value:null},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},n["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--radio-group":!0,"v-input--radio-group--column":this.column&&!this.row,"v-input--radio-group--row":this.row})}},methods:{genDefaultSlot:function(){return this.$createElement("div",{staticClass:"v-input--radio-group__input",attrs:{id:this.id,role:"radiogroup","aria-labelledby":this.computedId}},n["a"].options.methods.genDefaultSlot.call(this))},genInputSlot:function(){var t=n["a"].options.methods.genInputSlot.call(this);return delete t.data.on.click,t},genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.attrs.id=this.computedId,delete t.data.attrs.for,t.tag="legend",t):null},onClick:a["a"].options.methods.onClick}})},5311:function(t,e,i){"use strict";var s=i("5607"),n=i("2b0e");e["a"]=n["a"].extend({name:"rippleable",directives:{ripple:s["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}})},5498:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-card",{attrs:{color:"secondary",flat:""}},[i("v-container",{staticClass:"px-10"},[i("v-stepper",{staticClass:"mt-5",attrs:{vertical:""},model:{value:t.e1,callback:function(e){t.e1=e},expression:"e1"}},[i("v-stepper-step",{attrs:{rules:t.isStep1,color:"primary lighten-2",complete:t.e1>1,step:"1"}},[t._v(" HYSPLIT Model "),t.isStep1[0]()?t._e():i("small",[t._v("Please enter HYSPLIT installization path.")])]),i("v-stepper-content",{attrs:{step:"1"}},[i("v-card",{staticClass:"stepper_card",attrs:{flat:""}},[i("v-card-text",[i("p",{staticClass:"subtitle-1"},[t._v(" NOAA HYSPLIT4 model (windows-based version) will be used for trajectory endpoints generation. More infromation can be found "),i("a",{attrs:{href:"https://www.ready.noaa.gov/HYSPLIT.php",target:"_blank"}},[t._v("here")]),t._v(". ")]),i("ul",{staticClass:"subtitle-1"},[i("li",[t._v(" If you haven't installed HYSPLIT model, please register and download full HYSPLIT version "),i("a",{attrs:{href:"https://www.ready.noaa.gov/HYSPLIT_register.php",target:"_blank"}},[t._v("here")]),t._v(". ")]),i("li",[t._v(" If you haven't installed HYSPLIT model, you can try TraPSA with HYSPLIT "),i("a",{attrs:{href:"\\data\\HYSPLIT_demo.rar"}},[t._v("demo")]),t._v(". ")])])]),i("v-card-text",[i("p",{staticClass:"subtitle-1"},[t._v(" After HYSPLIT has been installed, copy HYSPLIT installization path: ")]),i("v-col",{staticClass:"my-n5",attrs:{cols:"12",lg:"8",md:"12"}},[i("v-text-field",{attrs:{label:"For example: C:\\HYSPLIT","prepend-inner-icon":"mdi-folder"},model:{value:t.ui_control.hysplit.working,callback:function(e){t.$set(t.ui_control.hysplit,"working",e)},expression:"ui_control.hysplit.working"}})],1)],1)],1),i("v-btn",{attrs:{color:"primary"},on:{click:t.next_1}},[t._v("Continue")])],1),i("v-stepper-step",{attrs:{rules:t.isStep2,color:"primary lighten-2",complete:t.e1>2,step:"2"}},[t._v(" Upsampling "),t.isStep2[0]()?i("small",[t._v("Optional")]):i("small",[t._v("Please correct expansion parameters.")])]),i("v-stepper-content",{attrs:{step:"2"}},[i("v-card",{staticClass:"stepper_card",attrs:{flat:""}},[i("v-card-text",[i("p",{staticClass:"subtitle-1"},[t._v(" Trajectory can be upsampled if the dataset has relatively long sampling periods."),i("br"),t._v(" For example: ")]),i("ul",{staticClass:"subtitle-1",staticStyle:{"list-style":"none"}},[i("li",[t._v(" - Measurement was sampled every "),i("b",[t._v("24 hours")]),t._v(" and one data point was collected at "),i("b",[t._v("2020/1/2 00:00")])]),i("li",[t._v(" - You can upsample to "),i("b",[t._v("4 timestamps")]),t._v(" to cover the whole sampling period ")]),i("li",[t._v(" - The strating timestamp for generating back-trajectory in this case will be: "),i("b",[t._v("2020/1/1 06:00, 2020/1/1 12:00, 2020/1/1 18:00, 2020/1/2 00:00")])])])]),i("v-switch",{staticClass:"mx-5 my-0 py-0",attrs:{label:t.ui_control.hysplit.start_time.isExpand?"Disable Upsampling":"Enable Upsampling"},model:{value:t.ui_control.hysplit.start_time.isExpand,callback:function(e){t.$set(t.ui_control.hysplit.start_time,"isExpand",e)},expression:"ui_control.hysplit.start_time.isExpand"}}),i("v-row",[i("v-col",{staticClass:"my-n5",attrs:{cols:"4"}},[i("v-text-field",{staticClass:"mx-5",attrs:{label:"Data sampling period (hour)",hint:"For the example above: 24",disabled:!t.ui_control.hysplit.start_time.isExpand},model:{value:t.ui_control.hysplit.start_time.sample_period,callback:function(e){t.$set(t.ui_control.hysplit.start_time,"sample_period",e)},expression:"ui_control.hysplit.start_time.sample_period"}})],1),i("v-col",{staticClass:"my-n5",attrs:{cols:"4"}},[i("v-text-field",{staticClass:"mx-5",attrs:{label:"Upsample number",hint:"For the example above: 4",disabled:!t.ui_control.hysplit.start_time.isExpand},model:{value:t.ui_control.hysplit.start_time.expand_number,callback:function(e){t.$set(t.ui_control.hysplit.start_time,"expand_number",e)},expression:"ui_control.hysplit.start_time.expand_number"}})],1)],1)],1),i("v-btn",{attrs:{color:"primary"},on:{click:t.next_2}},[t._v("Continue")]),i("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=1}}},[t._v("Previous")])],1),i("v-stepper-step",{attrs:{rules:t.isStep3,color:"primary lighten-2",complete:t.e1>3,step:"3"}},[t._v(" Trejectory Parameters "),t.isStep3[0]()?t._e():i("small",[t._v("Please correct trejectory parameters.")])]),i("v-stepper-content",{attrs:{step:"3"}},[i("v-card",{staticClass:"stepper_card pt-2",attrs:{flat:""}},[i("v-row",{staticClass:"mx-0",attrs:{dense:""}},[i("v-col",{attrs:{cols:"6",lg:"5",md:"12"}},[i("v-select",{attrs:{items:t.app_data.sites.df.map((function(t){return t.site_name})),label:"Select strating sites",chips:"",multiple:""},model:{value:t.ui_control.hysplit.sites,callback:function(e){t.$set(t.ui_control.hysplit,"sites",e)},expression:"ui_control.hysplit.sites"}})],1),i("v-col",{staticClass:"px-10",attrs:{cols:"12",lg:"5",md:"12"}},[i("v-text-field",{attrs:{label:"Name the trajectory task",hint:"This name will be displayed in future analysis."},model:{value:t.ui_control.hysplit.job_name,callback:function(e){t.$set(t.ui_control.hysplit,"job_name",e)},expression:"ui_control.hysplit.job_name"}})],1)],1),i("v-row",{staticClass:"mx-0",attrs:{dense:""}},[i("v-col",{attrs:{cols:"12",lg:"5",md:"12"}},[i("v-text-field",{attrs:{label:"Back-trajectory time (hour)",hint:"Example for back-trajectory 24 hours: -24",rules:[function(t){return!!parseInt(t)||"Integer number required."}]},model:{value:t.ui_control.hysplit.trajectory_time,callback:function(e){t.$set(t.ui_control.hysplit,"trajectory_time",e)},expression:"ui_control.hysplit.trajectory_time"}})],1)],1),i("v-row",{staticClass:"mx-0",attrs:{dense:""}},[i("v-col",{attrs:{cols:"12",lg:"5",md:"12"}},[i("v-select",{attrs:{items:t.ui_control.hysplit.height_type,rules:[function(t){return!!t||"Item is required"}],label:"Starting point height unit"},model:{value:t.ui_control.hysplit.start_height.value_type,callback:function(e){t.$set(t.ui_control.hysplit.start_height,"value_type",e)},expression:"ui_control.hysplit.start_height.value_type"}})],1),i("v-col",{staticClass:"px-10",attrs:{cols:"12",lg:"5",md:"12"}},[i("v-text-field",{attrs:{label:"Starting point height value (m)",hint:"Example for fraction of mixed layer: 0.5"},model:{value:t.ui_control.hysplit.start_height.value,callback:function(e){t.$set(t.ui_control.hysplit.start_height,"value",e)},expression:"ui_control.hysplit.start_height.value"}})],1)],1)],1),i("v-btn",{attrs:{color:"primary"},on:{click:t.next_3}},[t._v("Continue")]),i("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=2}}},[t._v("Previous")])],1),i("v-stepper-step",{attrs:{rules:t.isStep4,color:"primary lighten-2",complete:t.e1>4,step:"4"}},[t._v(" Meteorological Data "),t.isStep4[0]()?t._e():i("small",[t._v("Please select mete data folder.")])]),i("v-stepper-content",{attrs:{step:"4"}},[i("v-card",{staticClass:"stepper_card",attrs:{flat:""}},[i("v-card-text",[i("p",{staticClass:"subtitle-1"},[t._v(" Various gridded meteorological data format can be used for HYSPLIT model. More information can be found "),i("a",{attrs:{href:"https://www.ready.noaa.gov/archives.php",target:"_blank"}},[t._v("here")]),t._v(". ")]),i("p",{staticClass:"subtitle-1"},[t._v(" Before continuing analysis, "),i("v-btn",{attrs:{small:""},on:{click:t.show_mete_data}},[t._v("Download")]),t._v(" meteorological data, and select corresponding meteorological data format: ")],1),i("v-radio-group",{attrs:{row:""},model:{value:t.ui_control.hysplit.mete.type,callback:function(e){t.$set(t.ui_control.hysplit.mete,"type",e)},expression:"ui_control.hysplit.mete.type"}},t._l(t.ui_control.hysplit.mete_types,(function(t){return i("v-radio",{key:t,attrs:{label:t,value:t}})})),1),i("p",{staticClass:"subtitle-1"},[t._v(" Please store all meteorological data in one folder and copy the path here: ")]),i("v-col",{staticClass:"my-n5 ml-n2",attrs:{cols:"12",lg:"8",md:"12"}},[i("v-text-field",{attrs:{label:"For example: D:\\metedata","prepend-inner-icon":"mdi-folder"},model:{value:t.ui_control.hysplit.mete.path,callback:function(e){t.$set(t.ui_control.hysplit.mete,"path",e)},expression:"ui_control.hysplit.mete.path"}})],1)],1)],1),i("v-btn",{attrs:{color:"primary"},on:{click:t.next_4}},[t._v("Continue")]),i("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=3}}},[t._v("Previous")])],1),i("v-stepper-step",{attrs:{color:"primary lighten-2",complete:t.e1>5,step:"5"}},[t._v("Generate Trajectory")]),i("v-stepper-content",{attrs:{step:"5"}},[i("v-card",{staticClass:"stepper_card",attrs:{flat:""}},[i("v-card-text",[i("p",{staticClass:"subtitle-1"},[t._v(" HYSPLIT model need to be run on your local machine. TraPSA will generate batch file that controls all the necessary processes: ")]),i("ol",{staticClass:"subtitle-1"},[i("li",[i("v-btn",{attrs:{small:""},on:{click:t.generate_bat}},[t._v("Download")]),t._v(" and copy "),i("b",[t._v("run_HYSPLIT.bat")]),t._v(" to "),i("b",[t._v(t._s(t.ui_control.hysplit.working))]),t._v(" (HYSPLIT model path). ")],1),i("li",{staticClass:"my-1"},[t._v(" Run "),i("b",[t._v("run_hysplit.bat")]),t._v(" and wait with patient. ")]),i("li",[i("v-btn",{attrs:{small:""},on:{click:t.upload_traj}},[t._v("Open")]),i("input",{ref:"uploader",staticClass:"d-none",attrs:{type:"file",accept:".csv"},on:{change:t.onFileChanged}}),t._v(" the CSV file generated in "),i("b",[t._v(t._s(t.ui_control.hysplit.working))]),t._v(", if the processes were succeeded. ")],1)])])],1),i("v-btn",{attrs:{color:"primary"},on:{click:t.traj_finish}},[t._v("Continue")]),i("v-btn",{attrs:{text:""},on:{click:function(e){t.e1=4}}},[t._v("Previous")])],1)],1)],1)],1)},n=[],a=(i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),i("96cf"),i("1da1")),r=i("5530"),o=i("2f62"),l=i("db8d"),c={name:"trajectory",components:{},data:function(){return{e1:1,stepper_height:600,isStep1:[function(){return!0}],isStep2:[function(){return!0}],isStep3:[function(){return!0}],isStep4:[function(){return!0}]}},computed:Object(r["a"])({},Object(o["c"])({app_data:"app_data",ui_control:"ui_control",plot_data:"plot_data"})),mounted:function(){},methods:{next_1:function(){console.log(this.ui_control.hysplit.working),this.isStep1=null==this.ui_control.hysplit.working?[function(){return!1}]:[function(){return!0}],this.isStep1[0]()&&(this.e1=2)},next_2:function(){console.log(this.ui_control.hysplit.start_time),this.isStep2=[function(){return!0}],this.ui_control.hysplit.start_time.isExpand?(this.ui_control.hysplit.start_time.sample_period=parseInt(this.ui_control.hysplit.start_time.sample_period),this.ui_control.hysplit.start_time.expand_number=parseInt(this.ui_control.hysplit.start_time.expand_number),console.log(this.ui_control.hysplit.start_time.sample_period),console.log(this.ui_control.hysplit.start_time.expand_number),this.ui_control.hysplit.start_time.sample_period&&this.ui_control.hysplit.start_time.expand_number?(this.isStep2=[function(){return!0}],this.e1=3):this.isStep2=[function(){return!1}]):this.e1=3},next_3:function(){console.log(this.ui_control.hysplit.start_height),console.log(this.ui_control.hysplit.trajectory_time),console.log(this.ui_control.hysplit.sites),this.ui_control.hysplit.start_height.value=parseFloat(this.ui_control.hysplit.start_height.value),this.ui_control.hysplit.trajectory_time=parseInt(this.ui_control.hysplit.trajectory_time),this.ui_control.hysplit.start_height.value&&this.ui_control.hysplit.trajectory_time&&this.ui_control.hysplit.sites.length>0?(this.isStep3=[function(){return!0}],this.e1=4):this.isStep3=[function(){return!1}]},next_4:function(){console.log(this.ui_control.hysplit.mete),this.isStep4=0==this.ui_control.hysplit.mete.path?[function(){return!1}]:[function(){return!0}],this.isStep4[0]()&&(this.e1=5)},traj_finish:function(){console.log(this.app_data),this.isStep1[0]()&&this.isStep2[0]()&&this.isStep3[0]()&&this.isStep4[0]()?this.ui_control.curr_tab+=1:this.ui_control.snackbar={show:!0,text:"Please fix the errors before continuing!",color:"error"}},show_mete_data:function(){this.ui_control.mete_dialog=!0},generate_bat:function(){var t=this;return Object(a["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.ui_control.isLoading="primary",e.next=3,t.app_data.conc_df.traj_task.traj_setup(t.ui_control.hysplit,t.app_data.conc_df,t.app_data.sites);case 3:i=e.sent,t.app_data.curr_job=i.curr_job,t.ui_control.mete_required.items=i.mete_required,t.ui_control.mete_required.show=!0,t.$worker.run((function(t){var e=new Blob(t,{type:"plain/text;charset=utf-8;"});return e}),[i.bat_content]).then((function(e){var i=document.createElement("a"),s=URL.createObjectURL(e);i.href=s,i.setAttribute("download","run_hysplit.bat"),i.click(),t.ui_control.isLoading=!1}));case 8:case"end":return e.stop()}}),e)})))()},upload_traj:function(){this.$refs.uploader.click()},onFileChanged:function(t){var e=this;this.app_data.conc_df.traj_task.upload_traj(t.target.files[0],this.app_data.curr_job).then((function(t){var i={job_name:t.job_name,df:new l["a"]};i.df=t.data,e.app_data.traj_data.push(i),""==e.app_data.parameters.traj_job&&(e.app_data.parameters.traj_job=e.app_data.traj_data[0].job_name),console.log(e.app_data.traj_data),e.ui_control.snackbar={show:!0,text:"Data Uploaded!",color:"success"}})).catch((function(t){console.error(t)}))}}},u=c,p=(i("5f1e"),i("2877")),h=i("6544"),d=i.n(h),v=i("8336"),f=i("b0af"),m=i("99d9"),_=i("62ad"),g=i("a523"),b=i("67b6"),y=i("43a6"),C=i("0fd9"),S=i("b974"),x=i("7e85"),j=i("e516"),w=i("56a4"),k=i("b73d"),I=i("8654"),$=Object(p["a"])(u,s,n,!1,null,"85aeae4e",null);e["default"]=$.exports;d()($,{VBtn:v["a"],VCard:f["a"],VCardText:m["b"],VCol:_["a"],VContainer:g["a"],VRadio:b["a"],VRadioGroup:y["a"],VRow:C["a"],VSelect:S["a"],VStepper:x["a"],VStepperContent:j["a"],VStepperStep:w["a"],VSwitch:k["a"],VTextField:I["a"]})},"56a4":function(t,e,i){"use strict";i("45fc"),i("a9e3"),i("d3b7"),i("25f0");var s=i("9d26"),n=i("a9ad"),a=i("3206"),r=i("5607"),o=i("58df"),l=Object(o["a"])(n["a"],Object(a["a"])("stepper","v-stepper-step","v-stepper"));e["a"]=l.extend().extend({name:"v-stepper-step",directives:{ripple:r["a"]},inject:["stepClick"],props:{color:{type:String,default:"primary"},complete:Boolean,completeIcon:{type:String,default:"$complete"},editable:Boolean,editIcon:{type:String,default:"$edit"},errorIcon:{type:String,default:"$error"},rules:{type:Array,default:function(){return[]}},step:[Number,String]},data:function(){return{isActive:!1,isInactive:!0}},computed:{classes:function(){return{"v-stepper__step--active":this.isActive,"v-stepper__step--editable":this.editable,"v-stepper__step--inactive":this.isInactive,"v-stepper__step--error error--text":this.hasError,"v-stepper__step--complete":this.complete}},hasError:function(){return this.rules.some((function(t){return!0!==t()}))}},mounted:function(){this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.stepper&&this.stepper.unregister(this)},methods:{click:function(t){t.stopPropagation(),this.$emit("click",t),this.editable&&this.stepClick(this.step)},genIcon:function(t){return this.$createElement(s["a"],t)},genLabel:function(){return this.$createElement("div",{staticClass:"v-stepper__label"},this.$slots.default)},genStep:function(){var t=!(this.hasError||!this.complete&&!this.isActive)&&this.color;return this.$createElement("span",this.setBackgroundColor(t,{staticClass:"v-stepper__step__step"}),this.genStepContent())},genStepContent:function(){var t=[];return this.hasError?t.push(this.genIcon(this.errorIcon)):this.complete?this.editable?t.push(this.genIcon(this.editIcon)):t.push(this.genIcon(this.completeIcon)):t.push(String(this.step)),t},toggle:function(t){this.isActive=t.toString()===this.step.toString(),this.isInactive=Number(t)<Number(this.step)}},render:function(t){return t("div",{staticClass:"v-stepper__step",class:this.classes,directives:[{name:"ripple",value:this.editable}],on:{click:this.click}},[this.genStep(),this.genLabel()])}})},"56b0":function(t,e,i){"use strict";i("ac1f"),i("466d");var s=i("5530"),n=i("ade3"),a=(i("db42"),i("9d26")),r=i("da13"),o=i("34c3"),l=i("7e2b"),c=i("9d65"),u=i("a9ad"),p=i("f2e7"),h=i("3206"),d=i("5607"),v=i("0789"),f=i("58df"),m=i("80d2"),_=Object(f["a"])(l["a"],c["a"],u["a"],Object(h["a"])("list"),p["a"]);e["a"]=_.extend().extend({name:"v-list-group",directives:{ripple:d["a"]},props:{activeClass:{type:String,default:""},appendIcon:{type:String,default:"$expand"},color:{type:String,default:"primary"},disabled:Boolean,group:String,noAction:Boolean,prependIcon:String,ripple:{type:[Boolean,Object],default:!0},subGroup:Boolean},computed:{classes:function(){return{"v-list-group--active":this.isActive,"v-list-group--disabled":this.disabled,"v-list-group--no-action":this.noAction,"v-list-group--sub-group":this.subGroup}}},watch:{isActive:function(t){!this.subGroup&&t&&this.list&&this.list.listClick(this._uid)},$route:"onRouteChange"},created:function(){this.list&&this.list.register(this),this.group&&this.$route&&null==this.value&&(this.isActive=this.matchRoute(this.$route.path))},beforeDestroy:function(){this.list&&this.list.unregister(this)},methods:{click:function(t){var e=this;this.disabled||(this.isBooted=!0,this.$emit("click",t),this.$nextTick((function(){return e.isActive=!e.isActive})))},genIcon:function(t){return this.$createElement(a["a"],t)},genAppendIcon:function(){var t=!this.subGroup&&this.appendIcon;return t||this.$slots.appendIcon?this.$createElement(o["a"],{staticClass:"v-list-group__header__append-icon"},[this.$slots.appendIcon||this.genIcon(t)]):null},genHeader:function(){return this.$createElement(r["a"],{staticClass:"v-list-group__header",attrs:{"aria-expanded":String(this.isActive),role:"button"},class:Object(n["a"])({},this.activeClass,this.isActive),props:{inputValue:this.isActive},directives:[{name:"ripple",value:this.ripple}],on:Object(s["a"])(Object(s["a"])({},this.listeners$),{},{click:this.click})},[this.genPrependIcon(),this.$slots.activator,this.genAppendIcon()])},genItems:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement("div",{staticClass:"v-list-group__items",directives:[{name:"show",value:t.isActive}]},Object(m["r"])(t))]}))},genPrependIcon:function(){var t=this.subGroup&&null==this.prependIcon?"$subgroup":this.prependIcon;return t||this.$slots.prependIcon?this.$createElement(o["a"],{staticClass:"v-list-group__header__prepend-icon"},[this.$slots.prependIcon||this.genIcon(t)]):null},onRouteChange:function(t){if(this.group){var e=this.matchRoute(t.path);e&&this.isActive!==e&&this.list&&this.list.listClick(this._uid),this.isActive=e}},toggle:function(t){var e=this,i=this._uid===t;i&&(this.isBooted=!0),this.$nextTick((function(){return e.isActive=i}))},matchRoute:function(t){return null!==t.match(this.group)}},render:function(t){return t("div",this.setTextColor(this.isActive&&this.color,{staticClass:"v-list-group",class:this.classes}),[this.genHeader(),t(v["a"],this.genItems())])}})},"5d23":function(t,e,i){"use strict";i.d(e,"a",(function(){return v})),i.d(e,"b",(function(){return f}));var s=i("80d2"),n=i("8860"),a=i("56b0"),r=i("da13"),o=i("1baa"),l=i("1800"),c=(i("a9e3"),i("5530")),u=i("713a"),p=u["a"].extend({name:"v-list-item-avatar",props:{horizontal:Boolean,size:{type:[Number,String],default:40}},computed:{classes:function(){return Object(c["a"])(Object(c["a"])({"v-list-item__avatar--horizontal":this.horizontal},u["a"].options.computed.classes.call(this)),{},{"v-avatar--tile":this.tile||this.horizontal})}},render:function(t){var e=u["a"].options.render.call(this,t);return e.data=e.data||{},e.data.staticClass+=" v-list-item__avatar",e}}),h=i("34c3"),d=Object(s["i"])("v-list-item__action-text","span"),v=Object(s["i"])("v-list-item__content","div"),f=Object(s["i"])("v-list-item__title","div"),m=Object(s["i"])("v-list-item__subtitle","div");n["a"],a["a"],r["a"],l["a"],o["a"],h["a"]},"5f1e":function(t,e,i){"use strict";var s=i("0468"),n=i.n(s);n.a},"67b6":function(t,e,i){"use strict";i("b0c0");var s=i("5530"),n=(i("2c64"),i("ba87")),a=i("9d26"),r=i("c37a"),o=i("7e2b"),l=i("a9ad"),c=i("4e82"),u=i("5311"),p=i("7560"),h=i("fe09"),d=i("80d2"),v=i("58df"),f=Object(v["a"])(o["a"],l["a"],u["a"],Object(c["a"])("radioGroup"),p["a"]);e["a"]=f.extend().extend({name:"v-radio",inheritAttrs:!1,props:{disabled:Boolean,id:String,label:String,name:String,offIcon:{type:String,default:"$radioOff"},onIcon:{type:String,default:"$radioOn"},readonly:Boolean,value:{default:null}},data:function(){return{isFocused:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({"v-radio--is-disabled":this.isDisabled,"v-radio--is-focused":this.isFocused},this.themeClasses),this.groupClasses)},computedColor:function(){return h["a"].options.computed.computedColor.call(this)},computedIcon:function(){return this.isActive?this.onIcon:this.offIcon},computedId:function(){return r["a"].options.computed.computedId.call(this)},hasLabel:r["a"].options.computed.hasLabel,hasState:function(){return(this.radioGroup||{}).hasState},isDisabled:function(){return this.disabled||!!(this.radioGroup||{}).disabled},isReadonly:function(){return this.readonly||!!(this.radioGroup||{}).readonly},computedName:function(){return this.name||!this.radioGroup?this.name:this.radioGroup.name||"radio-".concat(this.radioGroup._uid)},rippleState:function(){return h["a"].options.computed.rippleState.call(this)},validationState:function(){return(this.radioGroup||{}).validationState||this.computedColor}},methods:{genInput:function(t){return h["a"].options.methods.genInput.call(this,"radio",t)},genLabel:function(){var t=this;return this.hasLabel?this.$createElement(n["a"],{on:{click:function(e){e.preventDefault(),t.onChange()}},attrs:{for:this.computedId},props:{color:this.validationState,focused:this.hasState}},Object(d["r"])(this,"label")||this.label):null},genRadio:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.radioGroup&&this.radioGroup.dense}}),this.computedIcon),this.genInput(Object(s["a"])({name:this.computedName,value:this.value},this.attrs$)),this.genRipple(this.setTextColor(this.rippleState))])},onFocus:function(t){this.isFocused=!0,this.$emit("focus",t)},onBlur:function(t){this.isFocused=!1,this.$emit("blur",t)},onChange:function(){this.isDisabled||this.isReadonly||this.isActive||this.toggle()},onKeydown:function(){}},render:function(t){var e={staticClass:"v-radio",class:this.classes};return t("div",e,[this.genRadio(),this.genLabel()])}})},"713a":function(t,e,i){"use strict";var s=i("8212");e["a"]=s["a"]},"7e85":function(t,e,i){"use strict";i("4de4"),i("b0c0"),i("a9e3");var s=i("5530"),n=(i("8836"),i("3206")),a=i("a452"),r=i("7560"),o=i("58df"),l=i("d9bd"),c=Object(o["a"])(Object(n["b"])("stepper"),a["a"],r["a"]);e["a"]=c.extend({name:"v-stepper",provide:function(){return{stepClick:this.stepClick,isVertical:this.vertical}},props:{altLabels:Boolean,nonLinear:Boolean,vertical:Boolean},data:function(){var t={isBooted:!1,steps:[],content:[],isReverse:!1};return t.internalLazyValue=null!=this.value?this.value:(t[0]||{}).step||1,t},computed:{classes:function(){return Object(s["a"])({"v-stepper--is-booted":this.isBooted,"v-stepper--vertical":this.vertical,"v-stepper--alt-labels":this.altLabels,"v-stepper--non-linear":this.nonLinear},this.themeClasses)}},watch:{internalValue:function(t,e){this.isReverse=Number(t)<Number(e),e&&(this.isBooted=!0),this.updateView()}},created:function(){this.$listeners.input&&Object(l["a"])("@input","@change",this)},mounted:function(){this.updateView()},methods:{register:function(t){"v-stepper-step"===t.$options.name?this.steps.push(t):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content.push(t))},unregister:function(t){"v-stepper-step"===t.$options.name?this.steps=this.steps.filter((function(e){return e!==t})):"v-stepper-content"===t.$options.name&&(t.isVertical=this.vertical,this.content=this.content.filter((function(e){return e!==t})))},stepClick:function(t){var e=this;this.$nextTick((function(){return e.internalValue=t}))},updateView:function(){for(var t=this.steps.length;--t>=0;)this.steps[t].toggle(this.internalValue);for(var e=this.content.length;--e>=0;)this.content[e].toggle(this.internalValue,this.isReverse)}},render:function(t){return t("div",{staticClass:"v-stepper",class:this.classes},this.$slots.default)}})},8547:function(t,e,i){"use strict";var s=i("2b0e"),n=i("80d2");e["a"]=s["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:n["j"]}}})},8836:function(t,e,i){},"9d01":function(t,e,i){},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85");var s=i("e8f2"),n=i("d9f7");e["a"]=Object(s["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,s=e.props,a=e.data,r=e.children,o=a.attrs;return o&&(a.attrs={},i=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),s.id&&(a.domProps=a.domProps||{},a.domProps.id=s.id),t(s.tag,Object(n["a"])(a,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(i||[])}),r)}})},b73d:function(t,e,i){"use strict";i("0481"),i("4069");var s=i("5530"),n=(i("ec29"),i("9d01"),i("fe09")),a=i("c37a"),r=i("c3f0"),o=i("0789"),l=i("490a"),c=i("80d2");e["a"]=n["a"].extend({name:"v-switch",directives:{Touch:r["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.disabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs),this.attrs$)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(o["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(l["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===c["x"].left&&this.isActive||t.keyCode===c["x"].right&&!this.isActive)&&this.onChange()}}})},db42:function(t,e,i){},e516:function(t,e,i){"use strict";i("a9e3"),i("d3b7"),i("25f0");var s=i("0789"),n=i("3206"),a=i("80d2"),r=i("58df"),o=Object(r["a"])(Object(n["a"])("stepper","v-stepper-content","v-stepper"));e["a"]=o.extend().extend({name:"v-stepper-content",inject:{isVerticalProvided:{from:"isVertical"}},props:{step:{type:[Number,String],required:!0}},data:function(){return{height:0,isActive:null,isReverse:!1,isVertical:this.isVerticalProvided}},computed:{computedTransition:function(){var t=this.$vuetify.rtl?!this.isReverse:this.isReverse;return t?s["g"]:s["h"]},styles:function(){return this.isVertical?{height:Object(a["g"])(this.height)}:{}}},watch:{isActive:function(t,e){t&&null==e?this.height="auto":this.isVertical&&(this.isActive?this.enter():this.leave())}},mounted:function(){this.$refs.wrapper.addEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.register(this)},beforeDestroy:function(){this.$refs.wrapper.removeEventListener("transitionend",this.onTransition,!1),this.stepper&&this.stepper.unregister(this)},methods:{onTransition:function(t){this.isActive&&"height"===t.propertyName&&(this.height="auto")},enter:function(){var t=this,e=0;requestAnimationFrame((function(){e=t.$refs.wrapper.scrollHeight})),this.height=0,setTimeout((function(){return t.isActive&&(t.height=e||"auto")}),450)},leave:function(){var t=this;this.height=this.$refs.wrapper.clientHeight,setTimeout((function(){return t.height=0}),10)},toggle:function(t,e){this.isActive=t.toString()===this.step.toString(),this.isReverse=e}},render:function(t){var e={staticClass:"v-stepper__content"},i={staticClass:"v-stepper__wrapper",style:this.styles,ref:"wrapper"};this.isVertical||(e.directives=[{name:"show",value:this.isActive}]);var s=t("div",i,[this.$slots.default]),n=t("div",e,[s]);return t(this.computedTransition,{on:this.$listeners},[n])}})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i("4de4"),i("45fc"),i("d3b7"),i("25f0");var s=i("c37a"),n=i("5311"),a=i("8547"),r=i("58df");e["a"]=Object(r["a"])(s["a"],n["a"],a["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.disabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=this,e=s["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:function(e){e.preventDefault(),t.onChange()}},e):e},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var s=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===s&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-2ad8f6c0.e3e967a5.js.map