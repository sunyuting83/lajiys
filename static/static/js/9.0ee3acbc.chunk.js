(this.webpackJsonpimovie=this.webpackJsonpimovie||[]).push([[9],{72:function(t,e,a){"use strict";a.r(e);var n,i=a(20),s=a.n(i),c=a(21),o=a(2),r=a(3),l=a(6),u=a(4),h=a(5),m=a(0),d=a.n(m),p=a(27),g=a(37),f=a(18),v=a(23),S=a(7),k=a(24),y=function(t){Object(h.a)(a,t);var e=Object(u.a)(a);function a(t){var n;return Object(o.a)(this,a),(n=e.call(this,t)).state={id:t.match.params.id,hname:"classheight:".concat(t.match.params.id),data:{},scrollTop:0},n.handleScroll=n.handleScroll.bind(Object(l.a)(n)),n}return Object(r.a)(a,[{key:"getData",value:function(){var t=Object(c.a)(s.a.mark((function t(e){var a,n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=Object(f.a)(e),t.next=3,Object(v.a)(a);case 3:n=t.sent,this.setState({data:n}),0===n.status&&(n.ttl=Date.now()+72e5,localStorage.setItem("classify:".concat(e),JSON.stringify(n)),this.setTitle(e,n),this.getHeight());case 6:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"setTitle",value:function(t,e){var a=e.menu.filter((function(e){return e.id===Number(t)}))[0].c_name;document.title="".concat(f.c," -").concat(a," - \u5728\u7ebf\u89c2\u770b,\u514d\u8d39\u89c2\u770b"),document.getElementsByTagName("meta").keywords.content=Object(f.i)(a),document.getElementsByTagName("meta").description.content=f.b}},{key:"handleScroll",value:function(){var t=this._container.scrollTop;this.setState({scrollTop:t})}},{key:"getHeight",value:function(){var t=this,e=sessionStorage.getItem(this.state.hname);e||(e=0),n=setTimeout((function(){t._container.scrollTop=e}),100)}},{key:"componentDidMount",value:function(){var t=this.state.id,e=localStorage.getItem("classify:".concat(t));null===e?this.getData(t):Date.now()+1>=(e=JSON.parse(e)).ttl?(localStorage.removeItem("classify:".concat(t)),this.getData(t)):(this.setState({data:e}),this.setTitle(t,e),this.getHeight(t))}},{key:"componentWillReceiveProps",value:function(t,e){var a=t.match.params.id;a!==this.state.id&&(this.setState({data:{status:3},id:a,hname:"classheight:".concat(a)}),this.getData(a))}},{key:"componentWillUnmount",value:function(){clearTimeout(n)}},{key:"render",value:function(){var t=this,e=this.state,a=e.data,n=e.scrollTop,i=e.hname;return d.a.createElement("div",{className:"skin "+this.props.data.skin},0===a.status?d.a.createElement("div",null,d.a.createElement(p.a,{menu:a.menu,menumore:a.menumore,setSkin:this.props.setSkin,height:n,page:i}),d.a.createElement("section",{className:"content has-header",ref:function(e){return t._container=e},id:"totop",onScrollCapture:function(){return t.handleScroll()}},d.a.createElement(g.a,{data:a.movielist,height:n,page:i}))):d.a.createElement(S.a,{data:a,getData:function(){return t.getData(t.state.id)}}))}}]),a}(m.Component);e.default=Object(k.a)(y)}}]);