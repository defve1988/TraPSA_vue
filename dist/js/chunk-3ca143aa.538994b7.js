(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ca143aa"],{"0f7d":function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("v-snackbar",{staticClass:"ma-1",attrs:{top:"","multi-line":""},model:{value:t.app_data.ui_control.snackbar.show,callback:function(a){t.$set(t.app_data.ui_control.snackbar,"show",a)},expression:"app_data.ui_control.snackbar.show"}},[t._v(" "+t._s(t.app_data.ui_control.snackbar.text)+" "),s("v-btn",{attrs:{color:t.app_data.ui_control.snackbar.color,text:""},on:{click:function(a){t.app_data.ui_control.snackbar.show=!1}}},[t._v("Close")])],1)},e=[],n=s("5530"),o=s("2f62"),c={data:function(){return{}},computed:Object(n["a"])({},Object(o["c"])({app_data:"app_data"}))},r=c,u=s("2877"),l=s("6544"),h=s.n(l),v=s("8336"),p=(s("a9e3"),s("ca71"),s("a9ad")),d=s("f2e7"),b=s("fe6c"),m=s("58df"),k=s("d9bd"),f=Object(m["a"])(p["a"],d["a"],Object(b["b"])(["absolute","top","bottom","left","right"])).extend({name:"v-snackbar",props:{multiLine:Boolean,timeout:{type:Number,default:6e3},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--active":this.isActive,"v-snack--absolute":this.absolute,"v-snack--bottom":this.bottom||!this.top,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--top":this.top,"v-snack--vertical":this.vertical}}},watch:{isActive:function(){this.setTimeout()}},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(k["d"])("auto-height",this)},mounted:function(){this.setTimeout()},methods:{setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout),this.isActive&&this.timeout&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),this.timeout))}},render:function(t){return t("transition",{attrs:{name:"v-snack-transition"}},[this.isActive&&t("div",{staticClass:"v-snack",class:this.classes,on:this.$listeners},[t("div",this.setBackgroundColor(this.color,{staticClass:"v-snack__wrapper",attrs:{role:"alert"}}),[t("div",{staticClass:"v-snack__content"},this.$slots.default)])])])}}),_=Object(u["a"])(r,i,e,!1,null,null,null);a["default"]=_.exports;h()(_,{VBtn:v["a"],VSnackbar:f})},ca71:function(t,a,s){}}]);
//# sourceMappingURL=chunk-3ca143aa.538994b7.js.map