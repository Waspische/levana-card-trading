(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{257:function(e,t,r){"use strict";var n=r(6),c=r(258),o=r(22),l=r(30),d=r(48),v=r(105);n({target:"Array",proto:!0},{flat:function(){var e=arguments.length?arguments[0]:void 0,t=o(this),r=l(t),n=v(t,0);return n.length=c(n,t,t,r,0,void 0===e?1:d(e)),n}})},258:function(e,t,r){"use strict";var n=r(0),c=r(71),o=r(30),l=r(50),d=n.TypeError,v=function(e,t,source,r,n,m,f,h){for(var element,C,y=n,x=0,k=!!f&&l(f,h);x<r;){if(x in source){if(element=k?k(source[x],x,t):source[x],m>0&&c(element))C=o(element),y=v(e,t,element,C,y,m-1)-1;else{if(y>=9007199254740991)throw d("Exceed the acceptable array length");e[y]=element}y++}x++}return y};e.exports=v},259:function(e,t,r){r(133)("flat")},265:function(e,t,r){"use strict";r.r(t);r(47),r(40),r(49),r(32),r(31),r(51),r(52),r(33);var n=r(9);r(53),r(27),r(72),r(54),r(185),r(257),r(259),r(41),r(14);function c(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return o(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var i=0,n=function(){};return{s:n,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,l=!0,d=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return l=e.done,e},e:function(e){d=!0,c=e},f:function(){try{l||null==r.return||r.return()}finally{if(d)throw c}}}}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}var l={name:"LvLanding",data:function(){return{userForm:{valid:!1,discordUsername:"",terraAddress:""},ownedCardForm:{luckyNumber:null,faction:null},searchedCardForm:{luckyNumber:null,faction:null},searchForm:{luckyNumber:null,faction:null},factions:["martian","guardian","terran","council"],luckyNumbers:[2,4,6,8,10],discordRules:[function(e){return!!e||"Discord is required"},function(e){return/^.{3,32}#[0-9]{4}$/.test(e)||"Discord name is invalid"}],addressRules:[function(e){return!!e||"Address is required"}],levanaUser:null,trades:null,searchResults:null}},methods:{connect:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.userForm.validate(),t.prev=1,t.next=4,e.$axios.$get("/levana-users?populate=%2A&"+"filters[discordUsername][$eq]=".concat(e.userForm.discordUsername.replace("#","%23")));case 4:if(0!==(n=t.sent).data.length){t.next=16;break}return console.log("user does not exist"),c={data:{discordUsername:e.userForm.discordUsername,terraWalletAddress:e.userForm.terraAddress}},t.next=10,e.$axios.$post("/levana-users",c);case 10:n=t.sent,r=n.data,e.levanaUser={id:r.id,discordUsername:r.attributes.discordUsername,terraWalletAddress:r.attributes.terraWalletAddress,ownedCards:[],searchedCards:[]},e.trades=[],t.next=20;break;case 16:console.log("user already exist"),r=n.data[0],e.levanaUser={id:r.id,discordUsername:r.attributes.discordUsername,terraWalletAddress:r.attributes.terraWalletAddress,ownedCards:r.attributes.ownedCards.data.map((function(e){return{id:e.id,faction:e.attributes.faction,luckyNumber:e.attributes.luckyNumber}})),searchedCards:r.attributes.searchedCards.data.map((function(e){return{id:e.id,faction:e.attributes.faction,luckyNumber:e.attributes.luckyNumber}}))},e.getTrades();case 20:t.next=25;break;case 22:t.prev=22,t.t0=t.catch(1),console.log(JSON.stringify(t.t0));case 25:case"end":return t.stop()}}),t,null,[[1,22]])})))()},search:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.searchForm.validate(),console.log("search"),t.next=4,e.$axios.get("/levana-users?populate=%2A&pagination[pageSize]=100&pagination[page]=1&"+"filters[ownedCards][luckyNumber][$eq]=".concat(e.searchForm.luckyNumber,"&")+"filters[ownedCards][faction][$eq]=".concat(e.searchForm.faction));case 4:r=t.sent,console.log(r),e.searchResults=r.data.data.map((function(u){return u.attributes.discordUsername}));case 7:case"end":return t.stop()}}),t)})))()},removeOwnedCard:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return console.log("You deleted owned ".concat(JSON.stringify(t.levanaUser.ownedCards[e]))),t.levanaUser.ownedCards.splice(e,1),n={data:{ownedCards:t.levanaUser.ownedCards}},r.next=5,t.$axios.$put("/levana-users/".concat(t.levanaUser.id),n);case 5:case"end":return r.stop()}}),r)})))()},addOwnedCard:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.ownedCardForm.validate(),r={data:{faction:e.ownedCardForm.faction,luckyNumber:e.ownedCardForm.luckyNumber}},t.next=4,e.$axios.$post("/levana-cards",r);case 4:return n=t.sent,c={id:n.data.id,faction:n.data.attributes.faction,luckyNumber:n.data.attributes.luckyNumber},e.levanaUser.ownedCards.push(c),o={data:{ownedCards:e.levanaUser.ownedCards}},t.next=10,e.$axios.$put("/levana-users/".concat(e.levanaUser.id),o);case 10:e.$refs.ownedCardForm.reset();case 11:case"end":return t.stop()}}),t)})))()},removeSearchedCard:function(e){var t=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return console.log("You deleted searched ".concat(JSON.stringify(t.levanaUser.searchedCards[e]))),t.levanaUser.searchedCards.splice(e,1),n={data:{searchedCards:t.levanaUser.searchedCards}},r.next=5,t.$axios.$put("/levana-users/".concat(t.levanaUser.id),n);case 5:case"end":return r.stop()}}),r)})))()},addSearchedCard:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.$refs.searchedCardForm.validate(),r={data:{faction:e.searchedCardForm.faction,luckyNumber:e.searchedCardForm.luckyNumber}},t.next=4,e.$axios.$post("/levana-cards",r);case 4:return n=t.sent,c={id:n.data.id,faction:n.data.attributes.faction,luckyNumber:n.data.attributes.luckyNumber},e.levanaUser.searchedCards.push(c),o={data:{searchedCards:e.levanaUser.searchedCards}},t.next=10,e.$axios.$put("/levana-users/".concat(e.levanaUser.id),o);case 10:e.$refs.searchedCardForm.reset();case 11:case"end":return t.stop()}}),t)})))()},getTrades:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,o,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],o=function(){var t=Object(n.a)(regeneratorRuntime.mark((function t(r){var n,o,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n=[],o=c(r),t.prev=2,o.s();case 4:if((l=o.n()).done){t.next=13;break}return d=l.value,t.t0=n,t.next=9,e.$axios.get("/levana-users?populate=%2A&pagination[pageSize]=100&pagination[page]=1&"+"filters[ownedCards][luckyNumber][$eq]=".concat(d.luckyNumber,"&")+"filters[ownedCards][faction][$eq]=".concat(d.faction));case 9:t.t1=t.sent,t.t0.push.call(t.t0,t.t1);case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t2=t.catch(2),o.e(t.t2);case 18:return t.prev=18,o.f(),t.finish(18);case 21:return t.abrupt("return",n);case 22:case"end":return t.stop()}}),t,null,[[2,15,18,21]])})));return function(e){return t.apply(this,arguments)}}(),t.next=4,o(e.levanaUser.searchedCards);case 4:r=(r=(r=t.sent).map((function(e){return e.data.data})).flat(1)).filter((function(t){return t.attributes.searchedCards.data.some((function(t){var r,n=c(e.levanaUser.ownedCards);try{for(n.s();!(r=n.n()).done;){var o=r.value;if(t.attributes.luckyNumber===o.luckyNumber&&t.attributes.faction===o.faction)return!0}}catch(e){n.e(e)}finally{n.f()}return!1}))})),l=r.map((function(t){return{discordUsername:t.attributes.discordUsername,hasCard:t.attributes.ownedCards.data.map((function(e){return{id:e.id,faction:e.attributes.faction,luckyNumber:e.attributes.luckyNumber}})),myCard:e.levanaUser.ownedCards.map((function(e){return{id:e.id,faction:e.faction,luckyNumber:e.luckyNumber}}))}})),e.trades=l;case 9:case"end":return t.stop()}}),t)})))()}}},d=l,v=r(34),component=Object(v.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-container",{staticClass:"pb-0 pt-lg-15 text-center px-0"},[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"12"}},[r("h1",{staticClass:"text-h4 text-sm-h4 text-md-h3 text-lg-h2"},[r("span",{staticClass:"primary--text"},[e._v("Levana")]),e._v(" Trading Card Helper\n        ")])])],1)],1),e._v(" "),r("v-container",{staticClass:"pt-4",attrs:{fluid:""}},[e.levanaUser?r("v-sheet",{staticClass:"py-6 px-md-12 px-4"},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"12"}},[r("div",{staticClass:"text-center text-h6 text-sm-h5 text-md-h4 text-lg-h3"},[e._v("\n            Hi "+e._s(e.levanaUser.discordUsername)+"\n          ")])]),e._v(" "),r("v-col",{attrs:{cols:"12",md:"6"}},[r("v-list",{attrs:{subheader:""}},[r("v-subheader",{staticClass:"headline"},[e._v("\n              Cards you trade\n            ")]),e._v(" "),r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[r("v-form",{ref:"ownedCardForm",model:{value:e.ownedCardForm.valid,callback:function(t){e.$set(e.ownedCardForm,"valid",t)},expression:"ownedCardForm.valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"5"}},[r("v-select",{attrs:{items:e.factions,label:"Faction"},model:{value:e.ownedCardForm.faction,callback:function(t){e.$set(e.ownedCardForm,"faction",t)},expression:"ownedCardForm.faction"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-select",{attrs:{items:e.luckyNumbers,label:"Lucky number"},model:{value:e.ownedCardForm.luckyNumber,callback:function(t){e.$set(e.ownedCardForm,"luckyNumber",t)},expression:"ownedCardForm.luckyNumber"}})],1),e._v(" "),r("v-btn",{staticClass:"mt-6",attrs:{color:"success"},on:{click:e.addOwnedCard}},[e._v("\n                        Add\n                      ")])],1)],1)],1)],1)],1)],1),e._v(" "),r("v-list",[r("v-list-item-group",e._l(e.levanaUser.ownedCards,(function(t,i){return r("v-list-item",{key:i},[r("v-list-item-content",[r("v-list-item-title",[e._v("\n                    "+e._s(t.faction)+" "+e._s(t.luckyNumber)+"\n                  ")])],1),e._v(" "),r("v-btn",{attrs:{fab:"","x-small":""},on:{click:function(t){return e.removeOwnedCard(i)}}},[r("v-icon",{staticClass:"white--text"},[e._v("\n                    mdi-close\n                  ")])],1)],1)})),1)],1)],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"6"}},[r("v-list",{attrs:{subheader:""}},[r("v-subheader",{staticClass:"headline"},[e._v("\n              Cards you want\n            ")]),e._v(" "),r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[r("v-form",{ref:"searchedCardForm",model:{value:e.searchedCardForm.valid,callback:function(t){e.$set(e.searchedCardForm,"valid",t)},expression:"searchedCardForm.valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"5"}},[r("v-select",{attrs:{items:e.factions,label:"Faction"},model:{value:e.searchedCardForm.faction,callback:function(t){e.$set(e.searchedCardForm,"faction",t)},expression:"searchedCardForm.faction"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-select",{attrs:{items:e.luckyNumbers,label:"Lucky number"},model:{value:e.searchedCardForm.luckyNumber,callback:function(t){e.$set(e.searchedCardForm,"luckyNumber",t)},expression:"searchedCardForm.luckyNumber"}})],1),e._v(" "),r("v-btn",{staticClass:"mt-6",attrs:{color:"success"},on:{click:e.addSearchedCard}},[e._v("\n                        Add\n                      ")])],1)],1)],1)],1)],1)],1),e._v(" "),r("v-list",{attrs:{flat:""}},[r("v-list-item-group",e._l(e.levanaUser.searchedCards,(function(t,i){return r("v-list-item",{key:i},[r("v-list-item-content",[r("v-list-item-title",[e._v("\n                    "+e._s(t.faction)+" "+e._s(t.luckyNumber)+"\n                  ")])],1),e._v(" "),r("v-btn",{attrs:{fab:"","x-small":""},on:{click:function(t){return e.removeSearchedCard(i)}}},[r("v-icon",{staticClass:"white--text"},[e._v("\n                    mdi-close\n                  ")])],1)],1)})),1)],1)],1)],1)],1):r("v-sheet",{staticClass:"py-6 px-md-12 px-4"},[r("v-form",{ref:"userForm",on:{submit:[e.connect,function(e){e.preventDefault()}]},model:{value:e.userForm.valid,callback:function(t){e.$set(e.userForm,"valid",t)},expression:"userForm.valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"12"}},[r("div",{staticClass:"text-center text-h6 text-sm-h5 text-md-h4 text-lg-h3"},[e._v("\n              User information\n            ")]),e._v(" "),r("div",{staticClass:"text-center body-1 ma-2"},[e._v("\n              Needed to identify who has which card\n            ")])]),e._v(" "),r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-text-field",{attrs:{rules:e.discordRules,label:"Discord username",placeholder:"Wasp#1975",required:""},model:{value:e.userForm.discordUsername,callback:function(t){e.$set(e.userForm,"discordUsername",t)},expression:"userForm.discordUsername"}},[r("template",{slot:"append-outer"},[r("v-btn",{staticClass:"mr-4",attrs:{disabled:!e.userForm.valid,color:"success",type:"submit"}},[e._v("\n                  Explore\n                ")])],1)],2)],1)],1)],1)],1)],1),e._v(" "),r("v-container",{staticClass:"pt-4",attrs:{fluid:""}},[e.trades?r("v-sheet",{staticClass:"py-6 px-md-12 px-4"},[r("v-btn",{staticClass:"mr-4",attrs:{color:"info"},on:{click:e.getTrades}},[e._v("\n        Refresh\n      ")]),e._v(" "),r("v-row",[r("v-col",{attrs:{cols:"12",md:"12"}},[r("div",{staticClass:"text-center text-h7 text-sm-h6 text-md-h5 text-lg-h4"},[e._v("\n            Player who has cards for you and you have for them\n          ")])]),e._v(" "),r("v-col",{attrs:{cols:"12",md:"12"}},[e._l(e.trades,(function(t,i){return r("v-list-item",{key:i},[r("v-list-item-content",[r("v-list-item-title",[e._v("\n                Player "),r("strong",[e._v(e._s(t.discordUsername))]),e._v(" has\n                "),e._l(t.hasCard,(function(t,i){return r("span",{key:i},[r("strong",[e._v(" "+e._s(t.faction)+" "+e._s(t.luckyNumber))])])})),e._v(" "),r("span",[e._v(" and he wants ")]),e._v(" "),e._l(t.myCard,(function(t,i){return r("span",{key:i},[r("strong",[e._v(" "+e._s(t.faction)+" "+e._s(t.luckyNumber))])])}))],2)],1)],1)})),e._v(" "),0===e.trades.length?r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",[e._v("\n                Nobody has cards matchting your need\n              ")])],1)],1):e._e()],2)],1)],1):e._e()],1),e._v(" "),r("v-container",{staticClass:"pt-4",attrs:{fluid:""}},[e.levanaUser?r("v-sheet",{staticClass:"py-6 px-md-12 px-4"},[r("v-row",[r("v-col",{attrs:{cols:"12",md:"12"}},[r("div",{staticClass:"text-center text-h7 text-sm-h6 text-md-h5 text-lg-h4"},[e._v("\n            Search card\n          ")])]),e._v(" "),r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-form",{ref:"searchForm",model:{value:e.searchForm.valid,callback:function(t){e.$set(e.searchForm,"valid",t)},expression:"searchForm.valid"}},[r("v-row",[r("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[r("v-select",{attrs:{items:e.factions,label:"Faction",required:""},model:{value:e.searchForm.faction,callback:function(t){e.$set(e.searchForm,"faction",t)},expression:"searchForm.faction"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",sm:"6",md:"6"}},[r("v-select",{attrs:{items:e.luckyNumbers,label:"Lucky number",required:""},model:{value:e.searchForm.luckyNumber,callback:function(t){e.$set(e.searchForm,"luckyNumber",t)},expression:"searchForm.luckyNumber"}})],1)],1),e._v(" "),r("v-btn",{staticClass:"my-4",attrs:{color:"success"},on:{click:e.search}},[e._v("\n              Search\n            ")]),e._v(" "),r("v-row",e._l(e.searchResults,(function(t,i){return r("v-list-item",{key:i},[r("v-list-item-content",[r("v-list-item-title",[r("strong",[e._v(e._s(t))])])],1)],1)})),1)],1)],1)],1)],1):e._e()],1),e._v(" "),r("v-container",{staticClass:"pt-4",attrs:{fluid:""}},[r("v-row",{staticClass:"my-4"},[r("v-col",{staticClass:"mx-auto",attrs:{cols:"10"}},[r("div",{staticClass:"text-h5"},[e._v("\n          Do you appreciate the content here ?\n        ")]),e._v(" "),r("div",{staticClass:"text-subtitle-1"},[e._v("\n          Support me on Terra\n          "),r("span",{staticClass:"primary--text font-weight-bold"},[e._v(" terra1syt83hpsk9sefxypccvfa8x344z7uc2zfuw5wy")])]),e._v(" "),r("div",{staticClass:"text-subtitle-1"},[e._v("\n          PS: I'm looking for a Guardian 6\n        ")])])],1)],1)],1)}),[],!1,null,"3edf3779",null);t.default=component.exports}}]);