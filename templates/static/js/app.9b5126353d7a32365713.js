webpackJsonp([1],{"9M+g":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("b-nav",{attrs:{tabs:""}},[e("b-nav-item",{attrs:{disabled:""}},[this._v("JSON-storage")])],1)},staticRenderFns:[]},r=n("VU/8")(null,o,!1,null,null,null).exports,i=n("//Fk"),a=n.n(i),l=n("Gu7T"),u=n.n(l),c={data:function(){return{lastFile:Object,files:[],textStatus:""}},props:{currJson:String},methods:{emptyTextStatus:function(){this.textStatus=" "},getCookie:function(t){var e=null;if(console.log("cookieValue"),document.cookie&&""!==document.cookie){var n=document.cookie.split(";");console.log("cookies: "+n);for(var s=0;s<n.length;s++){var o=n[s].trim();if(o.substring(0,t.length+1)===t+"="){e=decodeURIComponent(o.substring(t.length+1));break}}}return e},dataToBackend:function(t){var e=new FormData;console.log(t.name),console.log(t);var n=this.getCookie("csrftoken"),s=new Headers;s.append("X-CSRFToken",n),e.append("json",t.json),e.append("name",t.name),fetch("http://localhost:8000/json_storage/add/",{method:"POST",headers:s,body:e}).then(function(t){console.log("response ="+t)})},addText:function(){this.isJson("t")&&(console.log(this.currJson),this.dataToBackend({json:this.currJson,name:""}))},addFile:function(t){var e=this,n=t.dataTransfer.files;if(n){this.lastFile=n;var s=null;this.isJson("f").then(function(t){var o;(s=t[0],console.log("then block "+t[0]+" "+t[1]),s)?(console.log("file is json"),(o=e.files).push.apply(o,u()(n)),console.log(e.lastFile),console.log(),e.dataToBackend({json:t[1],name:e.lastFile[0].name}),e.getImagePreviews()):(e.textStatus="file is not json",console.log("file is not json"))})}},getImagePreviews:function(){for(var t=this,e=function(e){var n=new FileReader;n.addEventListener("load",function(){this.$refs["filename"+parseInt(e)][0].src=n.result}.bind(t),!1),n.readAsDataURL(t.files[e])},n=0;n<this.files.length;n++)e(n)},changeJson:function(t){this.$emit("updateJson",t.target.value)},inputJsonVerifier:function(){this.isJson("t")?this.$refs.jsonInputArea.classList.add("right"):this.$refs.jsonInputArea.classList.add("wrong")},resetClass:function(){this.$refs.jsonInputArea.classList.remove("wrong"),this.$refs.jsonInputArea.classList.remove("right")},setFile:function(t,e){this.lastFile={json:t,name:e}},isJson:function(t){var e=this,n="";if("f"===t)return new a.a(function(t){var s=new FileReader;s.onload=function(e){n=s.result;try{console.log("try "+n),JSON.parse(n)}catch(e){t([!1,s.result])}t([!0,s.result])},s.readAsText(e.lastFile[0])});if("t"===t){n=this.currJson;try{JSON.parse(n)}catch(t){return!1}return!0}}}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("textarea",{ref:"jsonInputArea",staticStyle:{"text-align":"center",resize:"none"},attrs:{cols:"70",placeholder:"type or paste your JSON data",rows:"20"},on:{input:function(e){return e.preventDefault(),t.changeJson(e)},drop:function(e){return e.preventDefault(),t.addFile(e)},focusout:t.inputJsonVerifier,focusin:t.resetClass}}),t._v(" "),n("br"),t._v(" "),n("div",{on:{click:t.emptyTextStatus}},[t._v(" "+t._s(this.textStatus)+" ")]),t._v(" "),t._l(t.files,function(e,s){return n("div",{key:s,staticClass:"file-listing"},[n("img",{ref:"filename"+parseInt(s),refInFor:!0,staticClass:"filename"}),t._v("\n      "+t._s(e.name)+">\n    ")])}),t._v(" "),n("br"),t._v(" "),n("b-button",{attrs:{variant:"primary"},on:{click:t.addText}},[t._v("\n      Submit\n    ")])],2)},staticRenderFns:[]};var d={name:"app",components:{Header:r,Body:n("VU/8")(c,f,!1,function(t){n("sKCU")},null,null).exports},data:function(){return{currJson:""}},methods:{updateJson:function(t){this.currJson=t}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Header"),this._v(" "),e("p",[this._v(this._s(this.currJson))]),this._v(" "),e("Body",{attrs:{currJson:this.currJson},on:{updateJson:this.updateJson}})],1)},staticRenderFns:[]},h=n("VU/8")(d,p,!1,null,null,null).exports,v=n("Tqaz");n("Jmt5"),n("9M+g");s.default.config.productionTip=!1,s.default.use(v.a),new s.default({el:"#app",components:{App:h},template:"<App/>"})},sKCU:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.9b5126353d7a32365713.js.map