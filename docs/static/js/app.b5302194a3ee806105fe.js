webpackJsonp([1],{117:function(s,t,e){e(123);var n=e(116)(e(119),e(127),null,null);s.exports=n.exports},119:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e(125),a=e.n(n);t.default={name:"app",components:{SoundCloudPlayer:a.a}}},120:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e(0),a=e.n(n);t.default={name:"soundcloudwebplayer",props:["url"],data:function(){return{running:!1,content:!1,newSongModal:!1,player:"",song:{cover:"",title:"",artist:"",permalink_url:"",description:"",created_at:"",duration:0,currentPosition:0},newUrl:"",newUrlNotPassing:!1,changePosition:!1}},created:function(){window.addEventListener("keyup",this.checkKeyPressed,!1)},mounted:function(){var s=this,t=document.getElementById("sc-player");this.player=SC.Widget(t),this.player.bind(SC.Widget.Events.PLAY_PROGRESS,function(t){s.song.currentPosition=t.currentPosition})},methods:{iFrameLoaded:function(){var s=this;this.content=!1,this.player.getCurrentSound(function(t){s.content=!0,s.song.cover=t.artwork_url,s.song.title=t.title,s.song.artist=t.user.username,s.song.permalink_url=t.permalink_url,s.song.description=t.description,s.song.created_at=a()(t.created_at).format("D MMM YYYY - h:mm a"),s.song.duration=t.duration,s.song.currentPosition=0,s.running=!1})},toggleSong:function(){this.running?(this.running=!1,this.player.pause()):(this.running=!0,this.player.play())},changeSong:function(){this.newSongModal=!0},playNewSong:function(){null!==this.newUrl.match(/^https:\/\/soundcloud\.com\/[a-z1-9\/-]*/)?(this.newUrlNotPassing=!1,this.newSongModal=!1,this.player.load(this.newUrl)):this.newUrlNotPassing=!0},checkKeyPressed:function(s){"Space"===s.code&&this.toggleSong()}},computed:{songSrc:function(){return"https://w.soundcloud.com/player/?url="+this.url},prettyDescription:function(){return this.song.description.replace(/\n/g,"<br>")},progressBarCurrentPosition:function(){return a()(this.song.currentPosition).format("mm:ss")},progressBarDuration:function(){return a()(this.song.duration).format("mm:ss")}},filters:{}}},121:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e(118),a=e(117),r=e.n(a);n.a.config.productionTip=!1,new n.a({el:"#app",template:"<App/>",components:{App:r.a}})},122:function(s,t){},123:function(s,t){},124:function(s,t,e){function n(s){return e(a(s))}function a(s){var t=r[s];if(!(t+1))throw new Error("Cannot find module '"+s+"'.");return t}var r={"./af":1,"./af.js":1,"./ar":8,"./ar-dz":2,"./ar-dz.js":2,"./ar-kw":3,"./ar-kw.js":3,"./ar-ly":4,"./ar-ly.js":4,"./ar-ma":5,"./ar-ma.js":5,"./ar-sa":6,"./ar-sa.js":6,"./ar-tn":7,"./ar-tn.js":7,"./ar.js":8,"./az":9,"./az.js":9,"./be":10,"./be.js":10,"./bg":11,"./bg.js":11,"./bn":12,"./bn.js":12,"./bo":13,"./bo.js":13,"./br":14,"./br.js":14,"./bs":15,"./bs.js":15,"./ca":16,"./ca.js":16,"./cs":17,"./cs.js":17,"./cv":18,"./cv.js":18,"./cy":19,"./cy.js":19,"./da":20,"./da.js":20,"./de":23,"./de-at":21,"./de-at.js":21,"./de-ch":22,"./de-ch.js":22,"./de.js":23,"./dv":24,"./dv.js":24,"./el":25,"./el.js":25,"./en-au":26,"./en-au.js":26,"./en-ca":27,"./en-ca.js":27,"./en-gb":28,"./en-gb.js":28,"./en-ie":29,"./en-ie.js":29,"./en-nz":30,"./en-nz.js":30,"./eo":31,"./eo.js":31,"./es":33,"./es-do":32,"./es-do.js":32,"./es.js":33,"./et":34,"./et.js":34,"./eu":35,"./eu.js":35,"./fa":36,"./fa.js":36,"./fi":37,"./fi.js":37,"./fo":38,"./fo.js":38,"./fr":41,"./fr-ca":39,"./fr-ca.js":39,"./fr-ch":40,"./fr-ch.js":40,"./fr.js":41,"./fy":42,"./fy.js":42,"./gd":43,"./gd.js":43,"./gl":44,"./gl.js":44,"./gom-latn":45,"./gom-latn.js":45,"./he":46,"./he.js":46,"./hi":47,"./hi.js":47,"./hr":48,"./hr.js":48,"./hu":49,"./hu.js":49,"./hy-am":50,"./hy-am.js":50,"./id":51,"./id.js":51,"./is":52,"./is.js":52,"./it":53,"./it.js":53,"./ja":54,"./ja.js":54,"./jv":55,"./jv.js":55,"./ka":56,"./ka.js":56,"./kk":57,"./kk.js":57,"./km":58,"./km.js":58,"./kn":59,"./kn.js":59,"./ko":60,"./ko.js":60,"./ky":61,"./ky.js":61,"./lb":62,"./lb.js":62,"./lo":63,"./lo.js":63,"./lt":64,"./lt.js":64,"./lv":65,"./lv.js":65,"./me":66,"./me.js":66,"./mi":67,"./mi.js":67,"./mk":68,"./mk.js":68,"./ml":69,"./ml.js":69,"./mr":70,"./mr.js":70,"./ms":72,"./ms-my":71,"./ms-my.js":71,"./ms.js":72,"./my":73,"./my.js":73,"./nb":74,"./nb.js":74,"./ne":75,"./ne.js":75,"./nl":77,"./nl-be":76,"./nl-be.js":76,"./nl.js":77,"./nn":78,"./nn.js":78,"./pa-in":79,"./pa-in.js":79,"./pl":80,"./pl.js":80,"./pt":82,"./pt-br":81,"./pt-br.js":81,"./pt.js":82,"./ro":83,"./ro.js":83,"./ru":84,"./ru.js":84,"./sd":85,"./sd.js":85,"./se":86,"./se.js":86,"./si":87,"./si.js":87,"./sk":88,"./sk.js":88,"./sl":89,"./sl.js":89,"./sq":90,"./sq.js":90,"./sr":92,"./sr-cyrl":91,"./sr-cyrl.js":91,"./sr.js":92,"./ss":93,"./ss.js":93,"./sv":94,"./sv.js":94,"./sw":95,"./sw.js":95,"./ta":96,"./ta.js":96,"./te":97,"./te.js":97,"./tet":98,"./tet.js":98,"./th":99,"./th.js":99,"./tl-ph":100,"./tl-ph.js":100,"./tlh":101,"./tlh.js":101,"./tr":102,"./tr.js":102,"./tzl":103,"./tzl.js":103,"./tzm":105,"./tzm-latn":104,"./tzm-latn.js":104,"./tzm.js":105,"./uk":106,"./uk.js":106,"./ur":107,"./ur.js":107,"./uz":109,"./uz-latn":108,"./uz-latn.js":108,"./uz.js":109,"./vi":110,"./vi.js":110,"./x-pseudo":111,"./x-pseudo.js":111,"./yo":112,"./yo.js":112,"./zh-cn":113,"./zh-cn.js":113,"./zh-hk":114,"./zh-hk.js":114,"./zh-tw":115,"./zh-tw.js":115};n.keys=function(){return Object.keys(r)},n.resolve=a,s.exports=n,n.id=124},125:function(s,t,e){e(122);var n=e(116)(e(120),e(126),"data-v-0832d262",null);s.exports=n.exports},126:function(s,t){s.exports={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",[e("div",{staticClass:"card",attrs:{id:"sc-webplayer"}},[s._m(0),s._v(" "),s.content?e("div",{staticClass:"card-content"},[e("div",{staticClass:"media"},[e("div",{staticClass:"media-left"},[e("img",{attrs:{src:s.song.cover,alt:"Image"}})]),s._v(" "),e("div",{staticClass:"media-content"},[e("p",{staticClass:"title is-4"},[s._v(s._s(s.song.title))]),s._v(" "),e("p",{staticClass:"subtitle is-6"},[s._v(s._s(s.song.artist))]),s._v(" "),e("p",{staticClass:"subtitle is-6"},[s._v(s._s(s.song.created_at))])])]),s._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"level"},[e("div",{staticClass:"level-item is-narrow has-text-centered"},[e("span",[s._v(s._s(s.progressBarCurrentPosition))])]),s._v(" "),e("div",{staticClass:"level-item has-text-centered",staticStyle:{padding:"0 10px"},attrs:{id:"progressBar"}},[e("progress",{staticClass:"progress",attrs:{value:s.song.currentPosition,max:s.song.duration}})]),s._v(" "),e("div",{staticClass:"level-item is-narrow has-text-centered"},[s._v(s._s(s.progressBarDuration))])]),s._v(" "),e("p",{domProps:{innerHTML:s._s(s.prettyDescription)}})])]):s._e(),s._v(" "),e("footer",{staticClass:"card-footer"},[e("a",{staticClass:"card-footer-item",on:{click:function(t){t.preventDefault(),s.changeSong(t)}}},[s._v("New Song")]),s._v(" "),e("a",{directives:[{name:"show",rawName:"v-show",value:s.running,expression:"running"}],staticClass:"card-footer-item",on:{click:function(t){t.preventDefault(),s.toggleSong(t)}}},[e("i",{staticClass:"fa fa-pause",attrs:{"aria-hidden":"true"}})]),s._v(" "),e("a",{directives:[{name:"show",rawName:"v-show",value:!s.running,expression:"!running"}],staticClass:"card-footer-item",on:{click:function(t){t.preventDefault(),s.toggleSong(t)}}},[s.content?s._e():e("i",{staticClass:"fa fa-spinner fa-pulse fa-fw is-primary"}),s._v(" "),s.content?e("i",{staticClass:"fa fa-play",attrs:{"aria-hidden":"true"}}):s._e()])])]),s._v(" "),e("iframe",{attrs:{frameborder:"0",id:"sc-player",src:s.songSrc},on:{load:s.iFrameLoaded}}),s._v(" "),e("div",{staticClass:"modal",class:s.newSongModal?"is-active":""},[e("div",{staticClass:"modal-background",on:{click:function(t){t.preventDefault(),s.newSongModal=!1}}}),s._v(" "),e("div",{staticClass:"modal-card"},[e("header",{staticClass:"modal-card-head"},[e("p",{staticClass:"modal-card-title"},[s._v("New Song")]),s._v(" "),e("button",{staticClass:"delete",on:{click:function(t){t.preventDefault(),s.newSongModal=!1}}})]),s._v(" "),e("section",{staticClass:"modal-card-body"},[e("div",{staticClass:"field has-addons"},[e("p",{staticClass:"control is-expanded"},[e("input",{directives:[{name:"model",rawName:"v-model",value:s.newUrl,expression:"newUrl"}],staticClass:"input",attrs:{type:"text",placeholder:"New SoundCloud Song"},domProps:{value:s.newUrl},on:{input:function(t){t.target.composing||(s.newUrl=t.target.value)}}})]),s._v(" "),e("p",{staticClass:"control"},[e("a",{staticClass:"button is-info",on:{click:function(t){t.preventDefault(),s.playNewSong(t)}}},[s._m(1),s._v(" "),e("span",[s._v("Play")])])])]),s._v(" "),e("p",{directives:[{name:"show",rawName:"v-show",value:s.newUrlNotPassing,expression:"newUrlNotPassing"}],staticClass:"help is-danger"},[s._v("\n          Enter a valid https://soundcloud.com url"),e("br"),s._v("\n          Example: https://soundcloud.com/potionrecords/the-magician-together\n        ")])])])])],1)},staticRenderFns:[function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("header",{staticClass:"card-header"},[e("p",{staticClass:"card-header-title"},[s._v("\n        SoundCloud Web Player\n      ")])])},function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("span",{staticClass:"icon"},[e("i",{staticClass:"fa fa-play",attrs:{"aria-hidden":"true"}})])}]}},127:function(s,t){s.exports={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"columns"},[e("div",{staticClass:"column is-6 is-offset-3"},[e("SoundCloudPlayer",{attrs:{url:"https://soundcloud.com/potionrecords/the-magician-together"}})],1)])])},staticRenderFns:[]}}},[121]);
//# sourceMappingURL=app.b5302194a3ee806105fe.js.map