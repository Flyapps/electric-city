var $hxClasses = $hxClasses || {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var EReg = $hxClasses["EReg"] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	customReplace: function(s,f) {
		var buf = new StringBuf();
		while(true) {
			if(!this.match(s)) break;
			buf.b += Std.string(this.matchedLeft());
			buf.b += Std.string(f(this));
			s = this.matchedRight();
		}
		buf.b += Std.string(s);
		return buf.b;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,split: function(s) {
		var d = "#__delim__#";
		return s.replace(this.r,d).split(d);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matchedLeft: function() {
		if(this.r.m == null) throw "No string matched";
		return this.r.s.substr(0,this.r.m.index);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,r: null
	,__class__: EReg
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,h: null
	,__class__: Hash
}
var HxOverrides = $hxClasses["HxOverrides"] = function() { }
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	toString: function() {
		var s = new StringBuf();
		s.b += Std.string("{");
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b += Std.string(i);
			s.b += Std.string(" => ");
			s.b += Std.string(Std.string(this.get(i)));
			if(it.hasNext()) s.b += Std.string(", ");
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,h: null
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	next: function() {
		return this.min++;
	}
	,hasNext: function() {
		return this.min < this.max;
	}
	,max: null
	,min: null
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !$iterator(it)().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = $iterator(a)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = $iterator(b)();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b += Std.string(sep);
			s.b += Std.string(l[0]);
			l = l[1];
		}
		return s.b;
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b += Std.string("{");
		while(l != null) {
			if(first) first = false; else s.b += Std.string(", ");
			s.b += Std.string(Std.string(l[0]));
			l = l[1];
		}
		s.b += Std.string("}");
		return s.b;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,length: null
	,q: null
	,h: null
	,__class__: List
}
var Reflect = $hxClasses["Reflect"] = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && (v.__name__ || v.__ename__);
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	toString: function() {
		return this.b;
	}
	,addSub: function(s,pos,len) {
		this.b += HxOverrides.substr(s,pos,len);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,add: function(x) {
		this.b += Std.string(x);
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += HxOverrides.substr(c,0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = $hxClasses["Type"] = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	HxOverrides.remove(a,"__name__");
	HxOverrides.remove(a,"__interfaces__");
	HxOverrides.remove(a,"__properties__");
	HxOverrides.remove(a,"__super__");
	HxOverrides.remove(a,"prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var co = co || {}
if(!co.doubleduck) co.doubleduck = {}
co.doubleduck.Assets = $hxClasses["co.doubleduck.Assets"] = function() {
};
co.doubleduck.Assets.__name__ = ["co","doubleduck","Assets"];
co.doubleduck.Assets.loader = function() {
	if(co.doubleduck.Assets._loader == null) {
		co.doubleduck.Assets._loader = new createjs.PreloadJS();
		co.doubleduck.Assets._loader.initialize(true);
		co.doubleduck.Assets._loader.onFileLoad = co.doubleduck.Assets.handleFileLoaded;
		co.doubleduck.Assets._loader.onFileError = co.doubleduck.Assets.handleLoadError;
		co.doubleduck.Assets._loader.setMaxConnections(10);
	}
	return co.doubleduck.Assets._loader;
}
co.doubleduck.Assets.loadAndCall = function(uri,callbackFunc) {
	co.doubleduck.Assets.loader().loadFile(uri);
	co.doubleduck.Assets._loadCallbacks[uri] = callbackFunc;
}
co.doubleduck.Assets.loadAll = function() {
	var sounds = new Array();
	sounds[sounds.length] = "sound/button_click";
	sounds[sounds.length] = "sound/Clear_screen";
	sounds[sounds.length] = "sound/Complete_puzzle";
	sounds[sounds.length] = "sound/connected_2";
	sounds[sounds.length] = "sound/connected_3";
	sounds[sounds.length] = "sound/disconnected";
	sounds[sounds.length] = "sound/Planting_pole";
	sounds[sounds.length] = "sound/theme_music";
	if(co.doubleduck.SoundManager.available) {
		var _g1 = 0, _g = sounds.length;
		while(_g1 < _g) {
			var mySound = _g1++;
			co.doubleduck.SoundManager.initSound(sounds[mySound]);
		}
	}
	var manifest = new Array();
	manifest[manifest.length] = "images/orientation_error.png";
	manifest[manifest.length] = "images/menu/bg.png";
	manifest[manifest.length] = "images/menu/tap2play.png";
	manifest[manifest.length] = "images/menu/help.png";
	manifest[manifest.length] = "images/menu/help_btn.png";
	manifest[manifest.length] = "images/menu/audio_btn.png";
	manifest[manifest.length] = "images/menu/level.png";
	manifest[manifest.length] = "images/menu/level_unlocked.png";
	manifest[manifest.length] = "images/menu/level_completed.png";
	manifest[manifest.length] = "images/menu/btn_arrow_r.png";
	manifest[manifest.length] = "images/menu/earth.png";
	manifest[manifest.length] = "images/menu/menu_cloud.png";
	manifest[manifest.length] = "images/menu/logo.png";
	manifest[manifest.length] = "images/menu/splash_bg.png";
	manifest[manifest.length] = "images/session/bg.png";
	manifest[manifest.length] = "images/session/houses.png";
	manifest[manifest.length] = "images/session/houses_lighten.png";
	manifest[manifest.length] = "images/session/poles.png";
	manifest[manifest.length] = "images/session/powerplants.png";
	manifest[manifest.length] = "images/session/powerplants_lighten.png";
	manifest[manifest.length] = "images/session/wires.png";
	manifest[manifest.length] = "images/session/button_next.png";
	manifest[manifest.length] = "images/session/button_menu.png";
	manifest[manifest.length] = "images/session/button_ok.png";
	manifest[manifest.length] = "images/session/popup_bad.png";
	manifest[manifest.length] = "images/session/popup_good-1.png";
	manifest[manifest.length] = "images/session/popup_good-2.png";
	manifest[manifest.length] = "images/session/popup_good-3.png";
	manifest[manifest.length] = "images/session/grass.png";
	manifest[manifest.length] = "images/session/btn_menu.png";
	manifest[manifest.length] = "images/session/btn_restart.png";
	manifest[manifest.length] = "images/session/cloud.png";
	manifest[manifest.length] = "images/session/colors.png";
	manifest[manifest.length] = "images/session/arrow.png";
	manifest[manifest.length] = "images/session/btn_b2m.png";
	manifest[manifest.length] = "images/session/end_game.png";
	manifest[manifest.length] = "images/menu/font/0.png";
	manifest[manifest.length] = "images/menu/font/1.png";
	manifest[manifest.length] = "images/menu/font/2.png";
	manifest[manifest.length] = "images/menu/font/3.png";
	manifest[manifest.length] = "images/menu/font/4.png";
	manifest[manifest.length] = "images/menu/font/5.png";
	manifest[manifest.length] = "images/menu/font/6.png";
	manifest[manifest.length] = "images/menu/font/7.png";
	manifest[manifest.length] = "images/menu/font/8.png";
	manifest[manifest.length] = "images/menu/font/9.png";
	if(co.doubleduck.Assets._useLocalStorage) co.doubleduck.Assets.loadFromLocalStorage(manifest);
	if(manifest.length == 0) {
		if(co.doubleduck.Assets.onLoadAll != null) co.doubleduck.Assets.onLoadAll();
	}
	co.doubleduck.Assets.loader().onProgress = co.doubleduck.Assets.handleProgress;
	co.doubleduck.Assets.loader().onFileLoad = co.doubleduck.Assets.manifestFileLoad;
	co.doubleduck.Assets.loader().loadManifest(manifest);
	co.doubleduck.Assets.loader().load();
}
co.doubleduck.Assets.audioLoaded = function(event) {
	co.doubleduck.Assets._cacheData[event.src] = event;
}
co.doubleduck.Assets.manifestFileLoad = function(event) {
	if(co.doubleduck.Assets._useLocalStorage && event != null) {
		var utils = new ddjsutils();
		try {
			var fileName = event.src;
			if(HxOverrides.substr(fileName,fileName.length - 3,null) == "jpg") return;
			co.doubleduck.Persistence.setValue(event.src,utils.getBase64Image(event.result));
		} catch( err ) {
		}
	}
}
co.doubleduck.Assets.loadFromLocalStorage = function(manifest) {
	var entriesToRemove = new Array();
	var _g1 = 0, _g = manifest.length;
	while(_g1 < _g) {
		var i = _g1++;
		var entry = manifest[i];
		var value = co.doubleduck.Persistence.getValue(entry);
		if(value != null) {
			var bmp = new createjs.Bitmap("data:image/png;base64," + value);
			co.doubleduck.Assets._cacheData[entry] = bmp.image;
			entriesToRemove.push(manifest[i]);
		}
	}
	var _g1 = 0, _g = entriesToRemove.length;
	while(_g1 < _g) {
		var j = _g1++;
		HxOverrides.remove(manifest,entriesToRemove[j]);
	}
}
co.doubleduck.Assets.handleProgress = function(event) {
	co.doubleduck.Assets.loaded = event.loaded;
	if(event.loaded == event.total) {
		co.doubleduck.Assets.loader().onProgress = null;
		co.doubleduck.Assets.onLoadAll();
	}
}
co.doubleduck.Assets.handleLoadError = function(event) {
}
co.doubleduck.Assets.handleFileLoaded = function(event) {
	if(event != null) {
		co.doubleduck.Assets._cacheData[event.src] = event.result;
		var callbackFunc = Reflect.field(co.doubleduck.Assets._loadCallbacks,event.src);
		if(callbackFunc != null) callbackFunc();
	}
}
co.doubleduck.Assets.getAsset = function(uri) {
	var cache = Reflect.field(co.doubleduck.Assets._cacheData,uri);
	if(cache == null) {
		if(co.doubleduck.Assets.loader().getResult(uri) != null) {
			cache = co.doubleduck.Assets.loader().getResult(uri).result;
			co.doubleduck.Assets._cacheData[uri] = cache;
		}
	}
	return cache;
}
co.doubleduck.Assets.getRawImage = function(uri) {
	var cache = co.doubleduck.Assets.getAsset(uri);
	if(cache == null) {
		var bmp = new createjs.Bitmap(uri);
		co.doubleduck.Assets._cacheData[uri] = bmp.image;
		cache = bmp.image;
		null;
	}
	return cache;
}
co.doubleduck.Assets.getImage = function(uri,mouseEnabled) {
	if(mouseEnabled == null) mouseEnabled = false;
	var result = new createjs.Bitmap(co.doubleduck.Assets.getRawImage(uri));
	result.mouseEnabled = mouseEnabled;
	return result;
}
co.doubleduck.Assets.prototype = {
	__class__: co.doubleduck.Assets
}
co.doubleduck.Button = $hxClasses["co.doubleduck.Button"] = function(bmp,pauseAffected,clickType,clickSound) {
	if(clickType == null) clickType = 2;
	if(pauseAffected == null) pauseAffected = true;
	createjs.Container.call(this);
	if(clickSound == null) clickSound = "sound/button_click";
	this._clickSound = clickSound;
	this._bitmap = bmp;
	this._bitmap.mouseEnabled = true;
	this._clickType = clickType;
	this._pauseAffected = pauseAffected;
	this.image = this._bitmap.image;
	if(clickType == co.doubleduck.Button.CLICK_TYPE_TOGGLE) {
		var initObject = { };
		var size = this.image.width / 2;
		initObject.images = [this.image];
		initObject.frames = { width : size, height : this.image.height, regX : size / 2, regY : this.image.height / 2};
		this._states = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		this._states.gotoAndStop(0);
		this.onClick = $bind(this,this.handleToggle);
		this.addChild(this._states);
	} else {
		this._bitmap.regX = this.image.width / 2;
		this._bitmap.regY = this.image.height / 2;
		this._bitmap.x = this.image.width / 2;
		this._bitmap.y = this.image.height / 2;
		this.addChild(this._bitmap);
	}
	this.onPress = $bind(this,this.handlePress);
};
co.doubleduck.Button.__name__ = ["co","doubleduck","Button"];
co.doubleduck.Button.__super__ = createjs.Container;
co.doubleduck.Button.prototype = $extend(createjs.Container.prototype,{
	getLabel: function() {
		return this._label;
	}
	,addLabel: function(label) {
		var fontHelper = new co.doubleduck.FontHelper(co.doubleduck.FontHelper.FONT_MENU);
		var num = fontHelper.getNumber(Std.parseInt(label),1,true);
		num.x = this.image.width / 2;
		num.y = this.image.height / 2;
		this._label = label;
		this.addChild(num);
	}
	,handleEndPress: function() {
		co.doubleduck.Utils.tintBitmap(this._bitmap,1,1,1,1);
		if(createjs.Ticker.getPaused()) co.doubleduck.Game.getStage().update();
	}
	,setToggle: function(flag) {
		if(flag) this._states.gotoAndStop(0); else this._states.gotoAndStop(1);
	}
	,handleToggle: function() {
		if(this.onToggle == null) return;
		this._states.gotoAndStop(1 - this._states.currentFrame);
		this.onToggle();
	}
	,handlePress: function() {
		if(createjs.Ticker.getPaused() && this._pauseAffected) return;
		if(this.onClick != null) {
			if(this._clickSound != null) {
				co.doubleduck.SoundManager.playEffect(this._clickSound);
				null;
			}
			switch(this._clickType) {
			case co.doubleduck.Button.CLICK_TYPE_TINT:
				co.doubleduck.Utils.tintBitmap(this._bitmap,0.55,0.55,0.55,1);
				var tween = createjs.Tween.get(this._bitmap);
				tween.ignoreGlobalPause = true;
				tween.wait(200).call($bind(this,this.handleEndPress));
				if(createjs.Ticker.getPaused()) co.doubleduck.Game.getStage().update();
				break;
			case co.doubleduck.Button.CLICK_TYPE_JUICY:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.25;
				this._bitmap.scaleY = startScaleY * 0.75;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},500,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_SCALE:
				this._juiceTween = createjs.Tween.get(this._bitmap);
				this._juiceTween.ignoreGlobalPause = true;
				var startScaleX = this._bitmap.scaleX;
				var startScaleY = this._bitmap.scaleY;
				this._bitmap.scaleX = startScaleX * 1.18;
				this._bitmap.scaleY = startScaleY * 1.18;
				this._juiceTween.to({ scaleX : startScaleX, scaleY : startScaleY},200,createjs.Ease.elasticOut);
				break;
			case co.doubleduck.Button.CLICK_TYPE_TOGGLE:
				break;
			case co.doubleduck.Button.CLICK_TYPE_NONE:
				break;
			}
		}
	}
	,setNoSound: function() {
		this._clickSound = null;
	}
	,_label: null
	,_clickSound: null
	,_juiceTween: null
	,_clickType: null
	,_pauseAffected: null
	,_states: null
	,_bitmap: null
	,onToggle: null
	,image: null
	,__class__: co.doubleduck.Button
});
co.doubleduck.GridCell = $hxClasses["co.doubleduck.GridCell"] = function() {
	this._isTracePoint = false;
	createjs.Container.call(this);
	this._wireStates = new Array();
	this._wireStates[co.doubleduck.GridCell.DIRECT_UP] = co.doubleduck.GridCell.WIRE_NONE;
	this._wireStates[co.doubleduck.GridCell.DIRECT_LEFT] = co.doubleduck.GridCell.WIRE_NONE;
	this._wireStates[co.doubleduck.GridCell.DIRECT_DOWN] = co.doubleduck.GridCell.WIRE_NONE;
	this._wireStates[co.doubleduck.GridCell.DIRECT_RIGHT] = co.doubleduck.GridCell.WIRE_NONE;
	this._wireCount = 0;
	if(co.doubleduck.GridCell._wireSheet == null || co.doubleduck.GridCell._bgColorSheet == null) {
		var img = co.doubleduck.Assets.getRawImage("images/session/wires.png");
		var frameWidth = img.width / 6 | 0;
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : frameWidth, height : img.height, regX : frameWidth - co.doubleduck.GridCell.SIZE, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g = 0;
		while(_g < 2) {
			var i = _g++;
			initObject.animations[co.doubleduck.GridCell.WIRE_NORMAL + "-" + i] = { frames : i + (co.doubleduck.GridCell.WIRE_NORMAL - 1) * 2, frequency : 20};
			initObject.animations[co.doubleduck.GridCell.WIRE_START + "-" + i] = { frames : i + (co.doubleduck.GridCell.WIRE_START - 1) * 2, frequency : 20};
			initObject.animations[co.doubleduck.GridCell.WIRE_END + "-" + i] = { frames : i + (co.doubleduck.GridCell.WIRE_END - 1) * 2, frequency : 20};
		}
		co.doubleduck.GridCell._wireSheet = new createjs.SpriteSheet(initObject);
		img = co.doubleduck.Assets.getRawImage("images/session/colors.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : co.doubleduck.GridCell.SIZE, regX : 0, regY : 0};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["bg" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.GridCell._bgColorSheet = new createjs.SpriteSheet(initObject);
	}
	this._backColor = new createjs.BitmapAnimation(co.doubleduck.GridCell._bgColorSheet);
	this._backColor.alpha = 0.4;
	this._backColor.visible = false;
	this.addChild(this._backColor);
	this._wires = new Array();
	this._wires[co.doubleduck.GridCell.DIRECT_UP] = new createjs.BitmapAnimation(co.doubleduck.GridCell._wireSheet);
	this._wires[co.doubleduck.GridCell.DIRECT_UP].visible = false;
	this.addChild(this._wires[co.doubleduck.GridCell.DIRECT_UP]);
	this._wires[co.doubleduck.GridCell.DIRECT_LEFT] = new createjs.BitmapAnimation(co.doubleduck.GridCell._wireSheet);
	this._wires[co.doubleduck.GridCell.DIRECT_LEFT].visible = false;
	this.addChild(this._wires[co.doubleduck.GridCell.DIRECT_LEFT]);
	this._states = new Array();
	var _g = 0;
	while(_g < 4) {
		var i = _g++;
		var sq = new createjs.Shape();
		sq.graphics.beginFill("#000000");
		sq.graphics.drawRect(0,0,10,10);
		sq.graphics.endFill();
		sq.regX = 5;
		sq.regY = 5;
		sq.visible = false;
		this.addChild(sq);
		this._states[i] = sq;
	}
	this._states[0].x = co.doubleduck.GridCell.SIZE / 2 - 6;
	this._states[0].y = 0;
	this._states[1].x = 0;
	this._states[1].y = co.doubleduck.GridCell.SIZE / 2 + 6;
	this._states[2].x = co.doubleduck.GridCell.SIZE / 2 + 6;
	this._states[2].y = co.doubleduck.GridCell.SIZE;
	this._states[3].x = co.doubleduck.GridCell.SIZE;
	this._states[3].y = co.doubleduck.GridCell.SIZE / 2 - 6;
};
co.doubleduck.GridCell.__name__ = ["co","doubleduck","GridCell"];
co.doubleduck.GridCell.getColorByName = function(name) {
	if(name == "blue") return 0; else if(name == "red") return 1; else if(name == "gray") return 2; else if(name == "green") return 3; else if(name == "purple") return 4; else if(name == "yellow") return 5; else if(name == "pink") return 6; else if(name == "cyan") return 7; else if(name == "orange") return 8;
	return -1;
}
co.doubleduck.GridCell.__super__ = createjs.Container;
co.doubleduck.GridCell.prototype = $extend(createjs.Container.prototype,{
	getCellInDirection: function(direction) {
		switch(direction) {
		case co.doubleduck.GridCell.DIRECT_UP:
			return this._grid.getCell(this._col,this._row - 1);
		case co.doubleduck.GridCell.DIRECT_LEFT:
			return this._grid.getCell(this._col - 1,this._row);
		case co.doubleduck.GridCell.DIRECT_DOWN:
			return this._grid.getCell(this._col,this._row + 1);
		case co.doubleduck.GridCell.DIRECT_RIGHT:
			return this._grid.getCell(this._col + 1,this._row);
		}
		return null;
	}
	,getDirectionTo: function(cell) {
		if(this._col == cell._col - 1 && this._row == cell._row) return co.doubleduck.GridCell.DIRECT_RIGHT; else if(this._col == cell._col + 1 && this._row == cell._row) return co.doubleduck.GridCell.DIRECT_LEFT; else if(this._row == cell._row - 1 && this._col == cell._col) return co.doubleduck.GridCell.DIRECT_DOWN; else if(this._row == cell._row + 1 && this._col == cell._col) return co.doubleduck.GridCell.DIRECT_UP;
		return -1;
	}
	,isBackColorOn: function() {
		return this._backColor.visible;
	}
	,setBackColor: function(flag) {
		this._backColor.visible = flag;
		if(flag) this._backColor.gotoAndStop("bg" + this._color);
	}
	,getColor: function() {
		return this._color;
	}
	,setPos: function(col,row) {
		this._col = col;
		this._row = row;
	}
	,getWireCount: function() {
		return this._wireCount;
	}
	,isTracePoint: function() {
		return this._isTracePoint;
	}
	,setIsTracePoint: function(flag) {
		this._isTracePoint = flag;
	}
	,setGrid: function(grid) {
		this._grid = grid;
	}
	,handleWiresShown: function() {
	}
	,handleWiresHidden: function() {
	}
	,removeWires: function() {
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			if(this._wireStates[i] != co.doubleduck.GridCell.WIRE_NONE) this.toggleWire(i);
		}
	}
	,toggleWire: function(direction) {
		if(this._wireStates[direction] != co.doubleduck.GridCell.WIRE_NONE) this.unsetWire(direction); else this.setWire(direction);
	}
	,unsetWire: function(direction) {
		if(this._wireStates[direction] != co.doubleduck.GridCell.WIRE_NONE) {
			this._wireStates[direction] = co.doubleduck.GridCell.WIRE_NONE;
			this._wireCount--;
			if(direction == co.doubleduck.GridCell.DIRECT_UP || direction == co.doubleduck.GridCell.DIRECT_LEFT) this._wires[direction].visible = false;
			if(this._wireCount == 0) this.handleWiresHidden();
		}
	}
	,setWire: function(direction) {
		if(this._wireStates[direction] == co.doubleduck.GridCell.WIRE_NONE) {
			if(this._wireCount == 0) this.handleWiresShown();
			this._wireCount++;
			var type = co.doubleduck.GridCell.WIRE_NORMAL;
			if(direction == co.doubleduck.GridCell.DIRECT_UP || direction == co.doubleduck.GridCell.DIRECT_LEFT) {
				if(js.Boot.__instanceof(this,co.doubleduck.CellStructure)) type = co.doubleduck.GridCell.WIRE_START; else if(js.Boot.__instanceof(this.getCellInDirection(direction),co.doubleduck.CellStructure)) type = co.doubleduck.GridCell.WIRE_END;
			}
			this._wireStates[direction] = type;
			if(direction == co.doubleduck.GridCell.DIRECT_UP || direction == co.doubleduck.GridCell.DIRECT_LEFT) {
				this._wires[direction].gotoAndStop(type + "-" + direction);
				this._wires[direction].visible = true;
			}
		}
	}
	,_states: null
	,_backColor: null
	,_color: null
	,_col: null
	,_row: null
	,_isTracePoint: null
	,_wires: null
	,_wireStates: null
	,_wireCount: null
	,_grid: null
	,__class__: co.doubleduck.GridCell
});
co.doubleduck.CellPath = $hxClasses["co.doubleduck.CellPath"] = function() {
	this._chainParent = null;
	co.doubleduck.GridCell.call(this);
	if(co.doubleduck.CellPath._sheet == null) {
		var img = co.doubleduck.Assets.getRawImage("images/session/poles.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : img.height, regX : 0, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["wire" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.CellPath._sheet = new createjs.SpriteSheet(initObject);
	}
	this._bitmap = new createjs.BitmapAnimation(co.doubleduck.CellPath._sheet);
	this.addChild(this._bitmap);
};
co.doubleduck.CellPath.__name__ = ["co","doubleduck","CellPath"];
co.doubleduck.CellPath.__super__ = co.doubleduck.GridCell;
co.doubleduck.CellPath.prototype = $extend(co.doubleduck.GridCell.prototype,{
	cutTrace: function(withChainParent) {
		if(withChainParent == null) withChainParent = true;
		var chain = this._chainParent.chain;
		var myPos = Lambda.indexOf(chain,this);
		if(myPos != -1) {
			if(this._chainParent.isBackColorOn()) {
				co.doubleduck.SoundManager.playEffect("sound/disconnected");
				null;
			}
			this._chainParent.setBackColor(false);
			var _g1 = 0, _g = chain.length;
			while(_g1 < _g) {
				var i = _g1++;
				chain[i].setBackColor(false);
			}
			this._chainParent.twinStruct.setBackColor(false);
			if(myPos > 0) {
				var prevCell = chain[myPos - 1];
				prevCell.toggleWire(prevCell.getDirectionTo(this));
				prevCell.setIsTracePoint(true);
			} else if(withChainParent && this._chainParent.getWireCount() > 0) this._chainParent.toggleWire(this._chainParent.getDirectionTo(this));
			chain[chain.length - 1].setIsTracePoint(false);
			var direct = this._chainParent.twinStruct.getDirectionTo(chain[chain.length - 1]);
			if(withChainParent && direct != -1) {
				if(this._chainParent.twinStruct.getWireCount() > 0) this._chainParent.twinStruct.toggleWire(direct);
			}
			while(chain.length > myPos) {
				chain[chain.length - 1].removeWires();
				chain.pop();
			}
		}
	}
	,getPrev: function() {
		var pos = Lambda.indexOf(this._chainParent.chain,this);
		if(pos != -1 && pos > 0) return this._chainParent.chain[pos - 1];
		return null;
	}
	,cutAfterThis: function() {
		var pos = Lambda.indexOf(this._chainParent.chain,this);
		if(pos != -1 && pos < this._chainParent.chain.length - 1) this._chainParent.chain[pos + 1].cutTrace(false);
	}
	,handleWiresShown: function() {
		co.doubleduck.GridCell.prototype.handleWiresHidden.call(this);
		if(!this._bitmap.isVisible()) {
			this._bitmap.visible = true;
			co.doubleduck.SoundManager.playEffect("sound/Planting_pole");
		}
		this._bitmap.gotoAndStop("wire" + this._color);
	}
	,handleWiresHidden: function() {
		co.doubleduck.GridCell.prototype.handleWiresHidden.call(this);
		this._bitmap.visible = false;
		this._chainParent = null;
	}
	,getParentChain: function() {
		return this._chainParent;
	}
	,setParentChain: function(chain) {
		this._chainParent = chain;
	}
	,setColor: function(color) {
		this._color = color;
	}
	,_chainParent: null
	,_bitmap: null
	,__class__: co.doubleduck.CellPath
});
co.doubleduck.CellStructure = $hxClasses["co.doubleduck.CellStructure"] = function(type,color) {
	co.doubleduck.GridCell.call(this);
	this._type = type;
	this._color = co.doubleduck.GridCell.getColorByName(color);
	this.setIsTracePoint(true);
	this.chain = new Array();
	if(co.doubleduck.CellStructure._sheets == null) {
		co.doubleduck.CellStructure._sheets = new Array();
		var img = co.doubleduck.Assets.getRawImage("images/session/powerplants.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : img.height, regX : 0, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["idle" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.CellStructure._sheets[co.doubleduck.CellStructure.TYPE_SOURCE] = new createjs.SpriteSheet(initObject);
		img = co.doubleduck.Assets.getRawImage("images/session/houses.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : img.height, regX : 0, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["idle" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.CellStructure._sheets[co.doubleduck.CellStructure.TYPE_TARGET] = new createjs.SpriteSheet(initObject);
		co.doubleduck.CellStructure._sheetsLighten = new Array();
		img = co.doubleduck.Assets.getRawImage("images/session/powerplants_lighten.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : img.height, regX : 0, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["idle" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.CellStructure._sheetsLighten[co.doubleduck.CellStructure.TYPE_SOURCE] = new createjs.SpriteSheet(initObject);
		img = co.doubleduck.Assets.getRawImage("images/session/houses_lighten.png");
		initObject = { };
		initObject.images = [img];
		initObject.frames = { width : co.doubleduck.GridCell.SIZE, height : img.height, regX : 0, regY : img.height - co.doubleduck.GridCell.SIZE};
		initObject.animations = { };
		var _g1 = 0, _g = co.doubleduck.GridCell.COLORS;
		while(_g1 < _g) {
			var i = _g1++;
			initObject.animations["idle" + i] = { frames : i, frequency : 20};
		}
		co.doubleduck.CellStructure._sheetsLighten[co.doubleduck.CellStructure.TYPE_TARGET] = new createjs.SpriteSheet(initObject);
	}
	this._bitmap = new createjs.BitmapAnimation(co.doubleduck.CellStructure._sheets[this._type]);
	this._bitmap.gotoAndStop("idle" + this._color);
	this.addChild(this._bitmap);
	this._bitmapLighten = new createjs.BitmapAnimation(co.doubleduck.CellStructure._sheetsLighten[this._type]);
	this._bitmapLighten.gotoAndStop("idle" + this._color);
	this._bitmapLighten.visible = false;
	this.addChild(this._bitmapLighten);
};
co.doubleduck.CellStructure.__name__ = ["co","doubleduck","CellStructure"];
co.doubleduck.CellStructure.__super__ = co.doubleduck.GridCell;
co.doubleduck.CellStructure.prototype = $extend(co.doubleduck.GridCell.prototype,{
	setBackColor: function(flag) {
		co.doubleduck.GridCell.prototype.setBackColor.call(this,flag);
		this._bitmap.visible = !flag;
		this._bitmapLighten.visible = flag;
	}
	,getType: function() {
		return this._type;
	}
	,_bitmapLighten: null
	,_bitmap: null
	,_type: null
	,twinStruct: null
	,chain: null
	,__class__: co.doubleduck.CellStructure
});
co.doubleduck.DataLoader = $hxClasses["co.doubleduck.DataLoader"] = function() {
};
co.doubleduck.DataLoader.__name__ = ["co","doubleduck","DataLoader"];
co.doubleduck.DataLoader.getLevelById = function(id) {
	var resultLevel = null;
	var levels = new LevelDB().getAllLevels();
	var _g1 = 0, _g = levels.length;
	while(_g1 < _g) {
		var currLevel = _g1++;
		var level = levels[currLevel];
		if((level.id | 0) == id) {
			resultLevel = level;
			break;
		}
	}
	return resultLevel;
}
co.doubleduck.DataLoader.prototype = {
	__class__: co.doubleduck.DataLoader
}
co.doubleduck.FontHelper = $hxClasses["co.doubleduck.FontHelper"] = function(type) {
	this._fontType = type;
};
co.doubleduck.FontHelper.__name__ = ["co","doubleduck","FontHelper"];
co.doubleduck.FontHelper.prototype = {
	getNumber: function(num,scale,forceContainer,dims) {
		if(forceContainer == null) forceContainer = false;
		if(scale == null) scale = 1;
		if(num >= 0 && num < 10) {
			var result = new createjs.Container();
			var bmp = this.getDigit(num);
			bmp.scaleX = bmp.scaleY = scale;
			result.addChild(bmp);
			result.regX = bmp.image.width / 2;
			result.regY = bmp.image.height / 2;
			if(forceContainer) {
				if(dims != null) {
					dims.width = bmp.image.width;
					dims.height = bmp.image.height;
				}
				return result;
			} else return bmp;
		} else {
			var result = new createjs.Container();
			var numString = "" + num;
			var digits = new Array();
			var totalWidth = 0;
			digits[digits.length] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,0,1)));
			digits[0].scaleX = digits[0].scaleY = scale;
			result.addChild(digits[0]);
			totalWidth += digits[0].image.width * scale;
			if(numString.length == 4 || numString.length == 7) {
				this._lastComma = this.getComma();
				this._lastComma.scaleX = this._lastComma.scaleY = scale;
				this._lastComma.x = digits[0].x + digits[0].image.width;
				result.addChild(this._lastComma);
				totalWidth += this._lastComma.image.width * scale;
			}
			var _g1 = 1, _g = numString.length;
			while(_g1 < _g) {
				var i = _g1++;
				var index = digits.length;
				digits[index] = this.getDigit(Std.parseInt(HxOverrides.substr(numString,i,1)));
				if(numString.length - i == 3 || numString.length - i == 6) digits[index].x = this._lastComma.x + this._lastComma.image.width; else digits[index].x = digits[index - 1].x + digits[index - 1].image.width;
				digits[index].scaleX = digits[index].scaleY = scale;
				result.addChild(digits[index]);
				totalWidth += digits[index].image.width * scale;
				if(numString.length - i == 4 || numString.length - i == 7) {
					this._lastComma = this.getComma();
					this._lastComma.scaleX = this._lastComma.scaleY = scale;
					this._lastComma.x = digits[index].x + digits[index].image.width;
					result.addChild(this._lastComma);
					totalWidth += this._lastComma.image.width * scale;
				}
			}
			result.regX = totalWidth / 2;
			result.regY = digits[0].image.height / 2;
			if(dims != null) {
				dims.width = totalWidth;
				dims.height = digits[0].image.height;
			}
			return result;
		}
	}
	,getDigit: function(digit) {
		var digit1 = co.doubleduck.Assets.getImage(this._fontType + digit + ".png");
		return digit1;
	}
	,getComma: function() {
		return co.doubleduck.Assets.getImage(this._fontType + ",.png");
	}
	,_fontType: null
	,_lastComma: null
	,__class__: co.doubleduck.FontHelper
}
co.doubleduck.Game = $hxClasses["co.doubleduck.Game"] = function(stage) {
	this._waitingToStart = false;
	this._orientError = null;
	if(co.doubleduck.Game.DEBUG) co.doubleduck.Persistence.clearAll();
	var isGS3Stock = /Android 4.0.4/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && /GT-I9300/.test(navigator.userAgent);
	isGS3Stock = isGS3Stock && !/Chrome/.test(navigator.userAgent);
	if(isGS3Stock) {
		js.Lib.alert("This phone's version is not supported. please update your phone's software.");
		return;
	}
	co.doubleduck.Persistence.initGameData();
	co.doubleduck.Game._stage = stage;
	co.doubleduck.Game._viewport = new createjs.Rectangle(0,0,1,1);
	co.doubleduck.Game.hammer = new Hammer(js.Lib.document.getElementById("stageCanvas"));
	viewporter.preventPageScroll = true;
	viewporter.change($bind(this,this.handleViewportChanged));
	if(viewporter.ACTIVE) {
		viewporter.preventPageScroll = true;
		viewporter.change($bind(this,this.handleViewportChanged));
		if(viewporter.isLandscape()) co.doubleduck.Assets.loadAndCall("images/orientation_error.png",$bind(this,this.waitForPortrait)); else co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.loadBarFill));
	} else co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.loadBarFill));
};
co.doubleduck.Game.__name__ = ["co","doubleduck","Game"];
co.doubleduck.Game._stage = null;
co.doubleduck.Game.hammer = null;
co.doubleduck.Game.getViewport = function() {
	return co.doubleduck.Game._viewport;
}
co.doubleduck.Game.getScale = function() {
	return co.doubleduck.Game._scale;
}
co.doubleduck.Game.getStage = function() {
	return co.doubleduck.Game._stage;
}
co.doubleduck.Game.setScale = function() {
	var regScale = co.doubleduck.Game._viewport.height / co.doubleduck.Game.MAX_HEIGHT;
	if(co.doubleduck.Game._viewport.width >= co.doubleduck.Game._viewport.height) co.doubleduck.Game._scale = regScale; else if(co.doubleduck.Game.MAX_WIDTH * regScale < co.doubleduck.Game._viewport.width) co.doubleduck.Game._scale = co.doubleduck.Game._viewport.width / co.doubleduck.Game.MAX_WIDTH; else co.doubleduck.Game._scale = regScale;
}
co.doubleduck.Game.prototype = {
	handleViewportChanged: function() {
		if(viewporter.isLandscape()) {
			if(this._orientError == null) {
				this._orientError = co.doubleduck.Assets.getImage("images/orientation_error.png");
				this._orientError.regX = this._orientError.image.width / 2;
				this._orientError.regY = this._orientError.image.height / 2;
				this._orientError.x = co.doubleduck.Game._viewport.height / 2;
				this._orientError.y = co.doubleduck.Game._viewport.width / 2;
				co.doubleduck.Game._stage.addChildAt(this._orientError,co.doubleduck.Game._stage.getNumChildren());
				co.doubleduck.Game._stage.update();
			}
		} else if(this._orientError != null) {
			co.doubleduck.Game._stage.removeChild(this._orientError);
			this._orientError = null;
			if(createjs.Ticker.getPaused()) co.doubleduck.Game._stage.update();
			if(this._waitingToStart) {
				this._waitingToStart = false;
				co.doubleduck.Assets.loadAndCall("images/splash_logo.png",$bind(this,this.showSplash));
			}
		}
	}
	,focused: function() {
		co.doubleduck.SoundManager.unmute();
	}
	,blured: function(e) {
		co.doubleduck.SoundManager.mute();
	}
	,handleResize: function(e) {
		var isFirefox = /Firefox/.test(navigator.userAgent);
		var isAndroid = /Android/.test(navigator.userAgent);
		var screenW = js.Lib.window.innerWidth;
		var screenH = js.Lib.window.innerHeight;
		co.doubleduck.Game._stage.canvas.width = screenW;
		co.doubleduck.Game._stage.canvas.height = screenH;
		if(!viewporter.isLandscape()) {
			if(isFirefox) {
				screenH = Math.floor(co.doubleduck.Main.getFFHeight());
				var ffEstimate = Math.ceil((js.Lib.window.screen.height - 110) * (screenW / js.Lib.window.screen.width));
				if(!isAndroid) ffEstimate = Math.ceil((js.Lib.window.screen.height - 30) * (screenW / js.Lib.window.screen.width));
				if(ffEstimate < screenH) screenH = Math.floor(ffEstimate);
			}
			if(!(viewporter.ACTIVE && screenH < screenW)) {
				co.doubleduck.Game._viewport.width = screenW;
				co.doubleduck.Game._viewport.height = screenH;
				co.doubleduck.Game.setScale();
			}
			if(this._orientError != null && isFirefox) this.handleViewportChanged();
		} else if(isFirefox) this.handleViewportChanged();
		if(createjs.Ticker.getPaused()) co.doubleduck.Game._stage.update();
	}
	,handleNextLevel: function() {
		var sessionLevel = this._session.getLevel() + 1;
		this._session.destroy();
		co.doubleduck.Game._stage.removeChild(this._session);
		this._session = null;
		this.startSession(sessionLevel);
	}
	,handleBackToMenu: function() {
		this._session.destroy();
		co.doubleduck.Game._stage.removeChild(this._session);
		this._session = null;
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.Game._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,handleRestart: function() {
		var sessionLevel = this._session.getLevel();
		this._session.destroy();
		co.doubleduck.Game._stage.removeChild(this._session);
		this._session = null;
		this.startSession(sessionLevel);
	}
	,handleSessionEnd: function() {
		if(co.doubleduck.Persistence.getUnlockedLevel() <= this._session.getLevel()) co.doubleduck.Persistence.setUnlockedLevel(this._session.getLevel() + 1);
	}
	,handlePlayClick: function(levelId) {
		co.doubleduck.Game._stage.removeChild(this._menu);
		this.startSession(levelId);
		this._menu.destroy();
		this._menu = null;
	}
	,startSession: function(levelId) {
		this._session = new co.doubleduck.Session(levelId);
		this._session.setOnRestart($bind(this,this.handleRestart));
		this._session.setOnBackToMenu($bind(this,this.handleBackToMenu));
		this._session.onSessionEnd = $bind(this,this.handleSessionEnd);
		this._session.onNextLevel = $bind(this,this.handleNextLevel);
		co.doubleduck.Game._stage.addChild(this._session);
	}
	,tapToPlayTextAlpha: function() {
		if(this._tapToPlayText == null) return;
		if(this._tapToPlayText.alpha == 0) createjs.Tween.get(this._tapToPlayText).to({ alpha : 1},750).call($bind(this,this.tapToPlayTextAlpha)); else if(this._tapToPlayText.alpha == 1) createjs.Tween.get(this._tapToPlayText).to({ alpha : 0},1500).call($bind(this,this.tapToPlayTextAlpha));
	}
	,showMenu: function() {
		this._menu = new co.doubleduck.Menu();
		co.doubleduck.Game._stage.addChildAt(this._menu,0);
		this._menu.onPlayClick = $bind(this,this.handlePlayClick);
	}
	,removeSplash: function() {
		co.doubleduck.Game._stage.removeChild(this._splashScreen);
		this._splashScreen = null;
		co.doubleduck.Game._stage.removeChild(this._logo);
	}
	,closeSplash: function() {
		if(co.doubleduck.SoundManager.engineType == co.doubleduck.SoundType.AUDIO_NO_OVERLAP) {
			var nonUserInitedSounds = new Array();
			nonUserInitedSounds.push("sound/connected 2");
			nonUserInitedSounds.push("sound/connected 3");
			nonUserInitedSounds.push("sound/disconnected");
			nonUserInitedSounds.push("sound/Planting pole");
			nonUserInitedSounds.push("sound/Complete puzzle");
			var _g1 = 0, _g = nonUserInitedSounds.length;
			while(_g1 < _g) {
				var currSound = _g1++;
				var sfx = co.doubleduck.SoundManager.playEffect(nonUserInitedSounds[currSound]);
				sfx.stop();
			}
		}
		createjs.Tween.get(this._splashScreen).wait(250).to({ alpha : 0},500).call($bind(this,this.removeSplash));
		createjs.Tween.get(this._logo).to({ alpha : 0},250);
		this._splashScreen.onClick = null;
		co.doubleduck.Game._stage.removeChild(this._tapToPlayText);
		this._tapToPlayText = null;
		this.showMenu();
	}
	,handleLogoAnimEnd: function() {
		if(this._logo.currentAnimation == "idle_on") {
			this.tapToPlayTextAlpha();
			this._splashScreen.onClick = $bind(this,this.closeSplash);
		}
	}
	,turnOnLogo: function() {
		this._logo.gotoAndPlay("turn_on");
		this._logo.onAnimationEnd = $bind(this,this.handleLogoAnimEnd);
		if(co.doubleduck.Persistence.getUnlockedLevel() > 1) this._splashScreen.onClick = $bind(this,this.closeSplash);
	}
	,logoEase: function(t) {
		var amplitude = 1;
		var inv_amp = 1 / amplitude;
		var period = 0.5;
		var pi2 = Math.PI * 2;
		if(t == 0 || t == 1) return t;
		var s = period / pi2 * Math.asin(inv_amp);
		var val_a = Math.pow(2,-10 * t);
		var val_b = Math.sin((t - s) * pi2 / period);
		return amplitude * val_a * val_b + 1;
	}
	,splashEnded: function() {
		js.Lib.document.body.bgColor = "#000000";
		co.doubleduck.Game._stage.removeChild(this._splash);
		this._splash = null;
		js.Lib.window.onresize = $bind(this,this.handleResize);
		this.handleResize(null);
		this._splashScreen = co.doubleduck.Assets.getImage("images/menu/splash_bg.png",true);
		this._splashScreen.scaleX = this._splashScreen.scaleY = co.doubleduck.Game.getScale();
		this._splashScreen.regX = this._splashScreen.image.width / 2;
		this._splashScreen.regY = this._splashScreen.image.height / 2;
		this._splashScreen.x = co.doubleduck.Game.getViewport().width / 2;
		this._splashScreen.y = co.doubleduck.Game.getViewport().height / 2;
		co.doubleduck.Game._stage.addChildAt(this._splashScreen,0);
		var img = co.doubleduck.Assets.getRawImage("images/menu/logo.png");
		var initObject = { };
		initObject.images = [img];
		initObject.frames = { width : img.width, height : img.height / 3, regX : img.width / 2, regY : img.height / 3};
		initObject.animations = { };
		initObject.animations.turn_on = { frames : [0,0], frequency : 20, next : "short_blink"};
		initObject.animations.short_blink = { frames : [0,1,0,1], frequency : 5, next : "pause_off"};
		initObject.animations.pause_off = { frames : [0,0,0], frequency : 10, next : "long_blink"};
		initObject.animations.long_blink = { frames : [1,0,0,0,0,1,0,0,0,0], frequency : 4, next : "long_pause"};
		initObject.animations.long_pause = { frames : [0,0,0,0], frequency : 9, next : "idle_on"};
		initObject.animations.idle_on = { frames : [1,1], frequency : 20, next : "flicker_on"};
		initObject.animations.flicker_on = { frames : [1,2,1,2,2,2,1,1,2,1,1,1,1,1], frequency : 5, next : "idle_on"};
		this._logo = new createjs.BitmapAnimation(new createjs.SpriteSheet(initObject));
		this._logo.scaleX = this._logo.scaleY = co.doubleduck.Game.getScale();
		this._logo.x = co.doubleduck.Game.getViewport().width / 2;
		var logoPos = img.height / 3 * co.doubleduck.Game.getScale() + 90 * co.doubleduck.Game.getScale();
		this._logo.y = -20;
		this._logo.gotoAndStop("turn_on");
		this._tapToPlayText = co.doubleduck.Assets.getImage("images/menu/tap2play.png");
		this._tapToPlayText.regX = this._tapToPlayText.image.width / 2;
		this._tapToPlayText.x = this._splashScreen.x;
		this._tapToPlayText.y = logoPos + 20 * co.doubleduck.Game.getScale();
		this._tapToPlayText.scaleX = this._tapToPlayText.scaleY = co.doubleduck.Game.getScale();
		this._tapToPlayText.alpha = 0;
		co.doubleduck.Game._stage.addChildAt(this._tapToPlayText,1);
		this._logo.y = -20;
		createjs.Tween.get(this._logo).to({ y : logoPos},1100,$bind(this,this.logoEase)).call($bind(this,this.turnOnLogo));
		co.doubleduck.Game._stage.addChild(this._logo);
	}
	,handleDoneLoading: function() {
		createjs.Tween.get(this._splash).wait(200).to({ alpha : 0},800).call($bind(this,this.splashEnded));
		co.doubleduck.Game._stage.removeChild(this._loadingBar);
		co.doubleduck.Game._stage.removeChild(this._loadingStroke);
	}
	,updateLoading: function() {
		if(co.doubleduck.Assets.loaded != 1) {
			this._loadingBar.visible = true;
			var percent = co.doubleduck.Assets.loaded;
			var barMask = new createjs.Shape();
			barMask.graphics.beginFill("#00000000");
			barMask.graphics.drawRect(this._loadingBar.x - this._loadingBar.image.width / 2,this._loadingBar.y,this._loadingBar.image.width * percent | 0,this._loadingBar.image.height);
			barMask.graphics.endFill();
			this._loadingBar.mask = barMask;
			co.doubleduck.Utils.waitAndCall(this,10,$bind(this,this.updateLoading));
		}
	}
	,exitFocus: function() {
		var hidden = document.mozHidden;
		if(hidden) co.doubleduck.SoundManager.mute(); else if(!co.doubleduck.SoundManager.getPersistedMute()) co.doubleduck.SoundManager.unmute();
	}
	,showSplash: function() {
		if(viewporter.ACTIVE) js.Lib.document.body.bgColor = "#00A99D"; else js.Lib.document.body.bgColor = "#D94D00";
		this._splash = co.doubleduck.Assets.getImage("images/splash_logo.png");
		this._splash.regX = this._splash.image.width / 2;
		this._splash.regY = this._splash.image.height / 2;
		this._splash.x = js.Lib.window.innerWidth / 2;
		this._splash.y = 200;
		co.doubleduck.Game._stage.addChild(this._splash);
		this._loadingStroke = co.doubleduck.Assets.getImage("images/loading_stroke.png");
		this._loadingStroke.regX = this._loadingStroke.image.width / 2;
		co.doubleduck.Game._stage.addChildAt(this._loadingStroke,0);
		this._loadingBar = co.doubleduck.Assets.getImage("images/loading_fill.png");
		this._loadingBar.regX = this._loadingBar.image.width / 2;
		co.doubleduck.Game._stage.addChildAt(this._loadingBar,1);
		this._loadingBar.x = js.Lib.window.innerWidth / 2;
		this._loadingBar.y = this._splash.y + 110;
		this._loadingStroke.x = this._loadingBar.x;
		this._loadingStroke.y = this._loadingBar.y;
		this._loadingBar.visible = false;
		this.updateLoading();
		co.doubleduck.Game._stage.canvas.width = js.Lib.window.innerWidth;
		co.doubleduck.Game._stage.canvas.height = js.Lib.window.innerHeight;
		co.doubleduck.Assets.onLoadAll = $bind(this,this.handleDoneLoading);
		co.doubleduck.Assets.loadAll();
		document.addEventListener('mozvisibilitychange', this.exitFocus);
	}
	,waitForPortrait: function() {
		this._waitingToStart = true;
		this._orientError = co.doubleduck.Assets.getImage("images/orientation_error.png");
		this._orientError.regX = this._orientError.image.width / 2;
		this._orientError.regY = this._orientError.image.height / 2;
		this._orientError.x = js.Lib.window.innerWidth / 2;
		this._orientError.y = js.Lib.window.innerHeight / 2;
		co.doubleduck.Game._stage.addChildAt(this._orientError,co.doubleduck.Game._stage.getNumChildren());
	}
	,loadBarStroke: function() {
		co.doubleduck.Assets.loadAndCall("images/loading_stroke.png",$bind(this,this.showSplash));
	}
	,loadBarFill: function() {
		co.doubleduck.Assets.loadAndCall("images/loading_fill.png",$bind(this,this.loadBarStroke));
	}
	,_logo: null
	,_loadingStroke: null
	,_loadingBar: null
	,_tapToPlayText: null
	,_splashScreen: null
	,_waitingToStart: null
	,_orientError: null
	,_session: null
	,_menu: null
	,_splash: null
	,__class__: co.doubleduck.Game
}
co.doubleduck.Grid = $hxClasses["co.doubleduck.Grid"] = function(levelId) {
	createjs.Container.call(this);
	this._levelData = co.doubleduck.DataLoader.getLevelById(levelId);
	this._rows = this._levelData.rows | 0;
	this._cols = this._levelData.columns | 0;
	this._startStructs = new Array();
	this._isTracing = false;
	this._currTraceStruct = null;
	this._cells = new Array();
	var _g1 = 0, _g = this._cols;
	while(_g1 < _g) {
		var col = _g1++;
		this._cells[col] = new Array();
		var _g3 = 0, _g2 = this._rows;
		while(_g3 < _g2) {
			var row = _g3++;
			this._cells[col][row] = null;
		}
	}
	var pairs = this._levelData.linkPairs;
	var _g1 = 0, _g = pairs.length;
	while(_g1 < _g) {
		var i = _g1++;
		var posX = pairs[i].sourcePos[0];
		var posY = pairs[i].sourcePos[1];
		var sourceStruct = new co.doubleduck.CellStructure(co.doubleduck.CellStructure.TYPE_SOURCE,pairs[i].color);
		sourceStruct.x = posX * co.doubleduck.GridCell.SIZE;
		sourceStruct.y = posY * co.doubleduck.GridCell.SIZE;
		this._cells[posX][posY] = sourceStruct;
		this._startStructs.push(sourceStruct);
		posX = pairs[i].targetPos[0];
		posY = pairs[i].targetPos[1];
		var targetStruct = new co.doubleduck.CellStructure(co.doubleduck.CellStructure.TYPE_TARGET,pairs[i].color);
		targetStruct.x = posX * co.doubleduck.GridCell.SIZE;
		targetStruct.y = posY * co.doubleduck.GridCell.SIZE;
		this._cells[posX][posY] = targetStruct;
		sourceStruct.twinStruct = targetStruct;
		targetStruct.twinStruct = sourceStruct;
	}
	var _g1 = 0, _g = this._cols;
	while(_g1 < _g) {
		var col = _g1++;
		var _g3 = 0, _g2 = this._rows;
		while(_g3 < _g2) {
			var row = _g3++;
			if(this._cells[col][row] == null) {
				var cell = new co.doubleduck.CellPath();
				cell.x = col * co.doubleduck.GridCell.SIZE;
				cell.y = row * co.doubleduck.GridCell.SIZE;
				this._cells[col][row] = cell;
			}
		}
	}
	var _g1 = 0, _g = this._rows;
	while(_g1 < _g) {
		var row = _g1++;
		var _g3 = 0, _g2 = this._cols;
		while(_g3 < _g2) {
			var col = _g3++;
			this._cells[col][row].name = "c" + col + ",r" + row;
			this._cells[col][row].setPos(col,row);
			this._cells[col][row].setGrid(this);
			this.addChild(this._cells[col][row]);
		}
	}
	this._touchOverlay = new createjs.Shape();
	this._touchOverlay.graphics.beginFill("#000000");
	this._touchOverlay.graphics.drawRect(0,0,co.doubleduck.GridCell.SIZE * this._cols,co.doubleduck.GridCell.SIZE * this._rows);
	this._touchOverlay.graphics.endFill();
	this._touchOverlay.alpha = 0.01;
	this._touchOverlay.mouseEnabled = true;
	this._touchOverlay.onPress = $bind(this,this.handleMousePress);
	this._touchOverlay.onClick = $bind(this,this.handleMouseClick);
	this.addChild(this._touchOverlay);
	this.onTick = $bind(this,this.handleTick);
};
co.doubleduck.Grid.__name__ = ["co","doubleduck","Grid"];
co.doubleduck.Grid.__super__ = createjs.Container;
co.doubleduck.Grid.prototype = $extend(createjs.Container.prototype,{
	isGridFull: function() {
		return this.getUnfilledCells().length == 0;
	}
	,removeErrorArrows: function() {
		this._errorArrows.removeAllChildren();
	}
	,showErrorArrows: function() {
		if(this._errorArrows == null) {
			this._errorArrows = new createjs.Container();
			this.addChild(this._errorArrows);
		} else if(this._errorArrows.getNumChildren() > 0) this.removeErrorArrows();
		var cells = this.getUnfilledCells();
		var _g1 = 0, _g = cells.length;
		while(_g1 < _g) {
			var i = _g1++;
			var arrow = co.doubleduck.Assets.getImage("images/session/arrow.png");
			arrow.regX = arrow.image.width / 2;
			arrow.regY = arrow.image.height;
			arrow.x = cells[i].x + co.doubleduck.GridCell.SIZE / 2;
			arrow.y = cells[i].y + co.doubleduck.GridCell.SIZE * 0.6;
			this._errorArrows.addChild(arrow);
		}
		this._errorArrows.alpha = 0;
		createjs.Tween.removeTweens(this._errorArrows);
		createjs.Tween.get(this._errorArrows).to({ alpha : 1},1000).wait(200).to({ alpha : 0},700).call($bind(this,this.removeErrorArrows));
	}
	,getUnfilledCells: function() {
		var cells = new Array();
		var _g1 = 0, _g = this._cols;
		while(_g1 < _g) {
			var col = _g1++;
			var _g3 = 0, _g2 = this._rows;
			while(_g3 < _g2) {
				var row = _g3++;
				if(!this._cells[col][row].isBackColorOn()) cells.push(this._cells[col][row]);
			}
		}
		return cells;
	}
	,getCell: function(col,row) {
		return this._cells[col][row];
	}
	,getHeight: function() {
		return this._rows * co.doubleduck.GridCell.SIZE;
	}
	,getWidth: function() {
		return this._cols * co.doubleduck.GridCell.SIZE;
	}
	,destroy: function() {
		this.onTick = null;
	}
	,finishTrace: function() {
		this._currTraceStruct.setBackColor(true);
		var _g1 = 0, _g = this._currTraceStruct.chain.length;
		while(_g1 < _g) {
			var i = _g1++;
			this._currTraceStruct.chain[i].setBackColor(true);
		}
		this._currTraceStruct.twinStruct.setBackColor(true);
		co.doubleduck.SoundManager.playEffect("sound/connected_2");
		var allConnected = true;
		var _g1 = 0, _g = this._startStructs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!this._startStructs[i].isBackColorOn()) allConnected = false;
		}
		if(allConnected && this.onAllConnected != null) this.onAllConnected();
	}
	,handleTick: function() {
		if(this._isTracing) {
			var currPos = new createjs.Point(0,0);
			if(this._lastMousePos == null) currPos = this.globalToLocal(this.getStage().mouseX,this.getStage().mouseY); else currPos = this.globalToLocal(this._lastMousePos.x,this._lastMousePos.y);
			currPos.x = Math.floor(currPos.x / co.doubleduck.GridCell.SIZE);
			currPos.y = Math.floor(currPos.y / co.doubleduck.GridCell.SIZE);
			if(currPos.x < 0 || currPos.x >= this._cols || (currPos.y < 0 || currPos.y >= this._rows)) return; else {
				var currCell = this._cells[currPos.x][currPos.y];
				if(this._tracePos == null) {
					if(!currCell.isTracePoint()) {
						this.stopTrace();
						return;
					} else if(js.Boot.__instanceof(currCell,co.doubleduck.CellStructure)) {
						this._currTraceStruct = currCell;
						if(this._currTraceStruct.chain.length > 0) this._currTraceStruct.chain[0].cutTrace(); else if(this._currTraceStruct.getWireCount() > 0 && this._currTraceStruct.twinStruct.chain.length > 0) this._currTraceStruct.twinStruct.chain[0].cutTrace();
					} else {
						currCell.setIsTracePoint(false);
						var cPath = currCell;
						this._currTraceStruct = cPath.getParentChain();
					}
				} else if(this._tracePos == null || (currPos.x != this._tracePos.x || currPos.y != this._tracePos.y)) {
					var prevCell = this._cells[this._tracePos.x][this._tracePos.y];
					var pos = Lambda.indexOf(this._currTraceStruct.chain,currCell);
					var toStop = false;
					if(currCell.getDirectionTo(prevCell) == -1) toStop = true; else if(pos == -1) {
						if(js.Boot.__instanceof(currCell,co.doubleduck.CellStructure)) {
							if(currCell == this._currTraceStruct) {
								if(this._currTraceStruct.chain.length == 1) this._currTraceStruct.chain.pop(); else toStop = true;
							} else {
								var cStruct = currCell;
								if(cStruct.getColor() == this._currTraceStruct.getColor()) {
									if(cStruct.chain.length > 0) cStruct.chain[0].cutTrace(true);
									this.finishTrace();
									cStruct.toggleWire(cStruct.getDirectionTo(prevCell));
									prevCell.toggleWire(prevCell.getDirectionTo(cStruct));
								}
								toStop = true;
							}
						} else {
							var addToChain = true;
							if(currCell.getWireCount() > 0) {
								if(currCell.getColor() == prevCell.getColor()) {
									var curr = currCell;
									if(curr.getWireCount() > 1) curr.cutAfterThis();
									curr.setIsTracePoint(false);
									while(curr != null) {
										var prev = curr.getPrev();
										this._currTraceStruct.chain.push(curr);
										curr.setParentChain(this._currTraceStruct);
										curr = prev;
									}
									this._currTraceStruct.twinStruct.chain = new Array();
									addToChain = false;
									currCell.toggleWire(currCell.getDirectionTo(prevCell));
									prevCell.toggleWire(prevCell.getDirectionTo(currCell));
									toStop = true;
									this.finishTrace();
								} else {
									var cPath = currCell;
									cPath.cutTrace();
								}
							}
							if(addToChain) this._currTraceStruct.chain.push(currCell);
						}
					} else if(pos == this._currTraceStruct.chain.length - 2) this._currTraceStruct.chain.pop(); else toStop = true;
					if(toStop) {
						this.stopTrace();
						return;
					}
					if(js.Boot.__instanceof(currCell,co.doubleduck.CellPath)) {
						var cPath = currCell;
						cPath.setColor(this._currTraceStruct.getColor());
						cPath.setParentChain(this._currTraceStruct);
					}
					if(currPos.x == this._tracePos.x + 1 && currPos.y == this._tracePos.y) {
						prevCell.toggleWire(co.doubleduck.GridCell.DIRECT_RIGHT);
						currCell.toggleWire(co.doubleduck.GridCell.DIRECT_LEFT);
					} else if(currPos.y == this._tracePos.y + 1 && currPos.x == this._tracePos.x) {
						prevCell.toggleWire(co.doubleduck.GridCell.DIRECT_DOWN);
						currCell.toggleWire(co.doubleduck.GridCell.DIRECT_UP);
					} else if(currPos.x == this._tracePos.x - 1 && currPos.y == this._tracePos.y) {
						prevCell.toggleWire(co.doubleduck.GridCell.DIRECT_LEFT);
						currCell.toggleWire(co.doubleduck.GridCell.DIRECT_RIGHT);
					} else if(currPos.y == this._tracePos.y - 1 && currPos.x == this._tracePos.x) {
						prevCell.toggleWire(co.doubleduck.GridCell.DIRECT_UP);
						currCell.toggleWire(co.doubleduck.GridCell.DIRECT_DOWN);
					} else {
						if(js.Boot.__instanceof(currCell,co.doubleduck.CellPath)) {
							var cPath = currCell;
							cPath.setParentChain(null);
						}
						this.stopTrace();
						return;
					}
				}
				this._tracePos = currPos;
			}
		}
	}
	,handleTouchMove: function(e) {
		this._lastMousePos = new createjs.Point(e.position.x,e.position.y);
	}
	,stopTrace: function() {
		if(this._isTracing) {
			this._isTracing = false;
			co.doubleduck.Game.hammer.ondrag = null;
			this._lastMousePos = null;
			this._currTraceStruct = null;
			if(this._tracePos != null) {
				var cell = this._cells[this._tracePos.x][this._tracePos.y];
				if(js.Boot.__instanceof(cell,co.doubleduck.CellPath) && cell.getWireCount() == 1) cell.setIsTracePoint(true);
				this._tracePos = null;
			}
		}
	}
	,startTrace: function() {
		if(!this._isTracing) {
			this._isTracing = true;
			co.doubleduck.Game.hammer.ondrag = $bind(this,this.handleTouchMove);
			this.handleTick();
		}
	}
	,handleMouseClick: function() {
		this.stopTrace();
	}
	,handleMousePress: function() {
		this.startTrace();
	}
	,getCols: function() {
		return this._cols;
	}
	,getRows: function() {
		return this._rows;
	}
	,_errorArrows: null
	,_startStructs: null
	,_tracePos: null
	,_lastMousePos: null
	,_currTraceStruct: null
	,_isTracing: null
	,_cellScale: null
	,_cols: null
	,_rows: null
	,_levelData: null
	,_cells: null
	,_touchOverlay: null
	,onAllConnected: null
	,__class__: co.doubleduck.Grid
});
co.doubleduck.Main = $hxClasses["co.doubleduck.Main"] = function() { }
co.doubleduck.Main.__name__ = ["co","doubleduck","Main"];
co.doubleduck.Main._stage = null;
co.doubleduck.Main._game = null;
co.doubleduck.Main._ffHeight = null;
co.doubleduck.Main.main = function() {
	co.doubleduck.Main.testFFHeight();
	createjs.Ticker.useRAF = true;
	createjs.Ticker.setFPS(60);
	co.doubleduck.Main._stage = new createjs.Stage(js.Lib.document.getElementById("stageCanvas"));
	co.doubleduck.Main._game = new co.doubleduck.Game(co.doubleduck.Main._stage);
	createjs.Ticker.addListener(co.doubleduck.Main._stage);
	createjs.Touch.enable(co.doubleduck.Main._stage,true,false);
}
co.doubleduck.Main.testFFHeight = function() {
	var isAplicable = /Firefox/.test(navigator.userAgent);
	if(isAplicable && viewporter.ACTIVE) co.doubleduck.Main._ffHeight = js.Lib.window.innerHeight;
}
co.doubleduck.Main.getFFHeight = function() {
	return co.doubleduck.Main._ffHeight;
}
co.doubleduck.Menu = $hxClasses["co.doubleduck.Menu"] = function() {
	this._menuDestroyed = false;
	createjs.Container.call(this);
	this._numLevels = new LevelDB().getAllLevels().length;
	var focusLevel = co.doubleduck.Persistence.getUnlockedLevel();
	if(focusLevel > this._numLevels) focusLevel = this._numLevels;
	this._background = co.doubleduck.Assets.getImage("images/menu/bg.png");
	this._background.scaleX = this._background.scaleY = co.doubleduck.Game.getScale();
	this._background.regX = this._background.image.width / 2;
	this._background.regY = this._background.image.height / 2;
	this._background.x = co.doubleduck.Game.getViewport().width / 2;
	this._background.y = co.doubleduck.Game.getViewport().height / 2;
	this.addChildAt(this._background,0);
	this._clouds = new createjs.Container();
	this.addChild(this._clouds);
	this._allLevels = new createjs.Container();
	this._numPages = ((this._numLevels - 1) / (co.doubleduck.Menu.ROWS * co.doubleduck.Menu.COLS) | 0) + 1;
	var pageWidth = 0;
	var pageHeight = 0;
	var _g1 = 0, _g = this._numPages;
	while(_g1 < _g) {
		var currPage = _g1++;
		var _currPage = new createjs.Container();
		var _g3 = 0, _g2 = co.doubleduck.Menu.ROWS;
		while(_g3 < _g2) {
			var currRow = _g3++;
			var _g5 = 0, _g4 = co.doubleduck.Menu.COLS;
			while(_g5 < _g4) {
				var currCol = _g5++;
				var levelNum = co.doubleduck.Menu.COLS * co.doubleduck.Menu.ROWS * currPage + currRow * co.doubleduck.Menu.COLS + (currCol + 1);
				if(levelNum > this._numLevels) break;
				var imageType = "";
				var label = "" + levelNum;
				var clickable = false;
				if(levelNum > co.doubleduck.Persistence.getUnlockedLevel()) imageType = "images/menu/level_unlocked.png"; else if(levelNum == co.doubleduck.Persistence.getUnlockedLevel()) {
					imageType = "images/menu/level.png";
					clickable = true;
				} else {
					imageType = "images/menu/level_completed.png";
					clickable = true;
				}
				var currLevel = new co.doubleduck.Button(co.doubleduck.Assets.getImage(imageType));
				var x = (currLevel.image.width + co.doubleduck.Menu.PADDING_WIDTH) * currCol;
				var y = (currLevel.image.width + co.doubleduck.Menu.PADDING_HEIGHT) * currRow;
				currLevel.x = x;
				currLevel.y = y;
				_currPage.addChild(currLevel);
				if(clickable) currLevel.onClick = $bind(this,this.handlePlayClick);
				if(label != "") currLevel.addLabel(label);
			}
		}
		pageWidth = co.doubleduck.Menu.CELL_WIDTH * co.doubleduck.Menu.COLS + co.doubleduck.Menu.PADDING_WIDTH * (co.doubleduck.Menu.COLS - 1);
		pageHeight = co.doubleduck.Menu.CELL_HEIGHT * co.doubleduck.Menu.ROWS + co.doubleduck.Menu.PADDING_HEIGHT * (co.doubleduck.Menu.ROWS - 1);
		_currPage.scaleX = co.doubleduck.Game.getScale();
		_currPage.regX = pageWidth / 2;
		_currPage.regY = pageHeight / 2;
		_currPage.x = co.doubleduck.Game.getViewport().width / 2;
		_currPage.x += currPage * co.doubleduck.Game.getViewport().width;
		this._allLevels.y = co.doubleduck.Game.getViewport().height * 0.4;
		this._allLevels.scaleY = co.doubleduck.Game.getScale();
		this._allLevels.addChild(_currPage);
	}
	this.addChild(this._allLevels);
	this._nextBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/btn_arrow_r.png"));
	this._nextBtn.regY = this._nextBtn.image.height / 2;
	this._nextBtn.y = co.doubleduck.Game.getViewport().height * 0.4;
	this._nextBtn.regX = this._nextBtn.image.width;
	this._nextBtn.x = co.doubleduck.Game.getViewport().width - 5 * co.doubleduck.Game.getScale();
	this._nextBtn.scaleX = this._nextBtn.scaleY = co.doubleduck.Game.getScale();
	this._nextBtn.onClick = $bind(this,this.targetNextPack);
	this.addChild(this._nextBtn);
	this._prevBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/btn_arrow_r.png"));
	this._prevBtn.regY = this._prevBtn.image.height / 2;
	this._prevBtn.y = co.doubleduck.Game.getViewport().height * 0.4;
	this._prevBtn.regX = 0;
	this._prevBtn.x = (this._prevBtn.image.width + 7) * co.doubleduck.Game.getScale();
	this._prevBtn.scaleX = this._prevBtn.scaleY = co.doubleduck.Game.getScale();
	this._prevBtn.scaleX *= -1;
	this._prevBtn.onClick = $bind(this,this.targetPrevPack);
	this.addChild(this._prevBtn);
	this._currPageNum = (focusLevel - 1) / (co.doubleduck.Menu.ROWS * co.doubleduck.Menu.COLS) | 0;
	this._earth = co.doubleduck.Assets.getImage("images/menu/earth.png");
	this._earth.regX = this._earth.image.width / 2;
	this._earth.regY = this._earth.image.height / 2;
	this._earth.scaleX = this._earth.scaleY = co.doubleduck.Game.getScale();
	this._earth.x = co.doubleduck.Game.getViewport().width / 2;
	var padding = co.doubleduck.Game.getViewport().height * 0.1;
	var earthPos = this._allLevels.y + pageHeight * co.doubleduck.Game.getScale() / 2 + padding + co.doubleduck.Game.getScale() * this._earth.image.height / 2;
	this._earth.y = earthPos * 1.5;
	createjs.Tween.get(this._earth).to({ y : earthPos},700,createjs.Ease.sineOut);
	this.addChild(this._earth);
	this.focusPage(this._currPageNum,false);
	co.doubleduck.Game.hammer.onswipe = $bind(this,this.handleSwipe);
	this.onTick = $bind(this,this.handleTick);
	this.spawnCloud();
	this._helpBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/help_btn.png"));
	this.addChild(this._helpBtn);
	this._helpBtn.regX = this._helpBtn.image.width;
	this._helpBtn.regY = this._helpBtn.image.height;
	this._helpBtn.scaleX = this._helpBtn.scaleY = co.doubleduck.Game.getScale();
	this._helpBtn.x = co.doubleduck.Game.getViewport().width - co.doubleduck.Game.getScale() * 20;
	this._helpBtn.y = co.doubleduck.Game.getViewport().height - co.doubleduck.Game.getScale() * 20;
	this._helpBtn.onClick = $bind(this,this.showHelpMenu);
	if(co.doubleduck.SoundManager.available) {
		this._muteBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/menu/audio_btn.png"),true,co.doubleduck.Button.CLICK_TYPE_TOGGLE);
		this.addChild(this._muteBtn);
		this._muteBtn.regX = -this._muteBtn.image.width / 4;
		this._muteBtn.regY = this._muteBtn.image.height / 2;
		this._muteBtn.scaleX = this._muteBtn.scaleY = co.doubleduck.Game.getScale();
		this._muteBtn.x = co.doubleduck.Game.getScale() * 20;
		this._muteBtn.y = this._helpBtn.y;
		this._muteBtn.setToggle(co.doubleduck.Persistence.getIsMuted());
		if(co.doubleduck.Persistence.getIsMuted()) co.doubleduck.SoundManager.mute(); else co.doubleduck.SoundManager.unmute();
		this._muteBtn.onToggle = $bind(this,this.handleMuteToggle);
		this.addChild(this._muteBtn);
	}
	this._helpScreen = co.doubleduck.Assets.getImage("images/menu/help.png");
	this._helpScreen.regX = this._helpScreen.image.width / 2;
	this._helpScreen.regY = this._helpScreen.image.height / 2;
	this._helpScreen.x = co.doubleduck.Game.getViewport().width / 2;
	this._helpScreen.y = co.doubleduck.Game.getViewport().height / 2;
	this._helpScreen.scaleX = this._helpScreen.scaleY = co.doubleduck.Game.getScale();
	this.addChild(this._helpScreen);
	this._helpScreen.alpha = 0;
	this._helpScreen.visible = false;
	this._closeHelp = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/button_ok.png"));
	this._closeHelp.alpha = 0;
	this._closeHelp.regX = this._closeHelp.image.width / 2;
	this._closeHelp.regY = this._closeHelp.image.height / 2;
	this._closeHelp.scaleX = this._closeHelp.scaleY = co.doubleduck.Game.getScale();
	this._closeHelp.x = this._helpScreen.x + this._helpScreen.image.width * co.doubleduck.Game.getScale() * 0.4;
	this._closeHelp.y = this._helpScreen.y + this._helpScreen.image.height * 0.35 * co.doubleduck.Game.getScale();
	this.addChild(this._closeHelp);
	this._themeMusic = co.doubleduck.SoundManager.playMusic("sound/theme_music");
};
co.doubleduck.Menu.__name__ = ["co","doubleduck","Menu"];
co.doubleduck.Menu.__super__ = createjs.Container;
co.doubleduck.Menu.prototype = $extend(createjs.Container.prototype,{
	handleTick: function(elapsed) {
		var angle = this._earth.rotation + elapsed / 1000 * co.doubleduck.Menu.ROTATION_PER_SEC;
		if(angle > 360) angle = 0;
		this._earth.rotation = angle;
		if(Math.abs(this._levelsTargetX - this._allLevels.x) > 0.1) this._allLevels.x += (this._levelsTargetX - this._allLevels.x) * elapsed * co.doubleduck.Menu.SWIPE_EASE;
	}
	,destroy: function() {
		this._menuDestroyed = true;
		this.onPlayClick = null;
		if(this._themeMusic != null) {
			this._themeMusic.stop();
			this._themeMusic = null;
		}
	}
	,handlePlayClick: function(e) {
		if(this.onPlayClick != null) {
			var btn = e.target;
			var num = Std.parseInt(btn.getLabel());
			this.onPlayClick(num);
		}
	}
	,targetNextPack: function() {
		if(this._currPageNum < this._numPages - 1) {
			this._currPageNum += 1;
			this.focusPage(this._currPageNum);
		}
	}
	,targetPrevPack: function() {
		if(this._currPageNum > 0) {
			this._currPageNum -= 1;
			this.focusPage(this._currPageNum);
		}
	}
	,handleSwipe: function(e) {
		if(e.direction == "right") this.targetPrevPack(); else if(e.direction == "left") this.targetNextPack();
	}
	,setArrowsVisibility: function() {
		this._nextBtn.visible = this._currPageNum < this._numPages - 1;
		this._prevBtn.visible = this._currPageNum > 0;
	}
	,focusPage: function(currPage,tween) {
		if(tween == null) tween = true;
		this._levelsTargetX = -1 * currPage * co.doubleduck.Game.getViewport().width;
		if(!tween) this._allLevels.x = this._levelsTargetX;
		this.setArrowsVisibility();
	}
	,removeCloud: function(target) {
		var cloud = target.target;
		this._clouds.removeChild(cloud);
		cloud = null;
	}
	,spawnCloud: function() {
		if(this._menuDestroyed) return;
		var duration = co.doubleduck.Menu.CLOUD_TWEEN_DURATION_MIN + Math.random() * co.doubleduck.Menu.CLOUD_TWEEN_DURATION_RAND;
		var durationInv = co.doubleduck.Menu.CLOUD_TWEEN_DURATION_MIN + co.doubleduck.Menu.CLOUD_TWEEN_DURATION_RAND - duration;
		var scale = co.doubleduck.Utils.map(durationInv,0,co.doubleduck.Menu.CLOUD_TWEEN_DURATION_RAND,0.4,1);
		var newCloud = co.doubleduck.Assets.getImage("images/menu/menu_cloud.png");
		this._clouds.addChild(newCloud);
		newCloud.regX = newCloud.image.width / 2;
		newCloud.regY = newCloud.image.height / 2;
		var destinationX = co.doubleduck.Game.getViewport().width + newCloud.image.width / 2 * co.doubleduck.Game.getScale();
		newCloud.x = -newCloud.image.width / 2 * co.doubleduck.Game.getScale();
		newCloud.y = newCloud.image.height / 2 * co.doubleduck.Game.getScale() + Math.random() * co.doubleduck.Game.getViewport().height * 0.45;
		newCloud.scaleX = newCloud.scaleY = co.doubleduck.Game.getScale() * scale;
		createjs.Tween.get(newCloud).to({ x : destinationX},duration).call($bind(this,this.removeCloud));
		co.doubleduck.Utils.waitAndCall(this,co.doubleduck.Menu.CLOUD_SPAWN_INTERVAL_MIN + Math.random() * co.doubleduck.Menu.CLOUD_SPAWN_INTERVAL_RAND | 0,$bind(this,this.spawnCloud));
	}
	,closeHelp: function() {
		createjs.Tween.removeTweens(this._closeHelp);
		createjs.Tween.removeTweens(this._helpScreen);
		createjs.Tween.removeTweens(this._helpBtn);
		this._inHelp = false;
		createjs.Tween.get(this._helpScreen).to({ alpha : 0},1000,createjs.Ease.sineOut);
		this._closeHelp.alpha = 0;
		this._helpBtn.alpha = 1;
		this._helpBtn.onClick = $bind(this,this.showHelpMenu);
		this._allLevels.mouseEnabled = true;
		this.setArrowsVisibility();
	}
	,showHelpMenu: function() {
		this._inHelp = true;
		createjs.Tween.get(this._helpScreen).to({ alpha : 1},1000,createjs.Ease.sineOut);
		createjs.Tween.get(this._closeHelp).wait(2000).to({ alpha : 1},500,createjs.Ease.sineOut);
		createjs.Tween.get(this._helpBtn).to({ alpha : 0},1000,createjs.Ease.sineOut);
		this._helpScreen.visible = true;
		this._helpBtn.onClick = null;
		this._closeHelp.onClick = $bind(this,this.closeHelp);
		this._allLevels.mouseEnabled = false;
		this._nextBtn.visible = this._prevBtn.visible = false;
	}
	,handleMuteToggle: function() {
		co.doubleduck.SoundManager.toggleMute();
		co.doubleduck.Persistence.setIsMuted(!co.doubleduck.Persistence.getIsMuted());
	}
	,_inHelp: null
	,_closeHelp: null
	,_helpScreen: null
	,_helpBtn: null
	,_muteBtn: null
	,_menuDestroyed: null
	,_prevBtn: null
	,_nextBtn: null
	,_levelsTargetX: null
	,_themeMusic: null
	,_clouds: null
	,_earth: null
	,_currPageNum: null
	,_numPages: null
	,_numLevels: null
	,_allLevels: null
	,_background: null
	,onPlayClick: null
	,__class__: co.doubleduck.Menu
});
co.doubleduck.Persistence = $hxClasses["co.doubleduck.Persistence"] = function() {
};
co.doubleduck.Persistence.__name__ = ["co","doubleduck","Persistence"];
co.doubleduck.Persistence.localStorageSupported = function() {
	var result = null;
	try {
		localStorage.setItem("test","test");
		localStorage.removeItem("test");
		result = true;
	} catch( e ) {
		result = false;
	}
	return result;
}
co.doubleduck.Persistence.getValue = function(key) {
	if(!co.doubleduck.Persistence.available) return "0";
	var val = localStorage[co.doubleduck.Persistence.GAME_PREFIX + key];
	return val;
}
co.doubleduck.Persistence.setValue = function(key,value) {
	if(!co.doubleduck.Persistence.available) return;
	localStorage[co.doubleduck.Persistence.GAME_PREFIX + key] = value;
}
co.doubleduck.Persistence.clearAll = function() {
	if(!co.doubleduck.Persistence.available) return;
	localStorage.clear();
}
co.doubleduck.Persistence.initGameData = function() {
	if(!co.doubleduck.Persistence.available) return;
	co.doubleduck.Persistence.initVar("level");
}
co.doubleduck.Persistence.initVar = function(initedVar) {
	var value = co.doubleduck.Persistence.getValue(initedVar);
	if(value == null) try {
		co.doubleduck.Persistence.setValue(initedVar,"0");
	} catch( e ) {
		co.doubleduck.Persistence.available = false;
	}
}
co.doubleduck.Persistence.getUnlockedLevel = function() {
	var value = co.doubleduck.Persistence.getValue("level");
	if(value == null || value == "0") return 1;
	return Std.parseInt(co.doubleduck.Persistence.getValue("level"));
}
co.doubleduck.Persistence.setUnlockedLevel = function(level) {
	co.doubleduck.Persistence.setValue("level","" + level);
}
co.doubleduck.Persistence.getIsMuted = function() {
	var value = co.doubleduck.Persistence.getValue("is_muted");
	if(value == null) {
		co.doubleduck.Persistence.setIsMuted(false);
		value = "false";
	}
	return value == "true";
}
co.doubleduck.Persistence.setIsMuted = function(flag) {
	co.doubleduck.Persistence.setValue("is_muted","" + Std.string(flag));
}
co.doubleduck.Persistence.prototype = {
	__class__: co.doubleduck.Persistence
}
co.doubleduck.Session = $hxClasses["co.doubleduck.Session"] = function(level) {
	createjs.Container.call(this);
	this._level = level;
	this.constructLevel();
	this.addHud();
};
co.doubleduck.Session.__name__ = ["co","doubleduck","Session"];
co.doubleduck.Session.__super__ = createjs.Container;
co.doubleduck.Session.prototype = $extend(createjs.Container.prototype,{
	getLevel: function() {
		return this._level;
	}
	,setOnRestart: function(cb) {
		this.onRestart = cb;
	}
	,setOnBackToMenu: function(cb) {
		this.onBackToMenu = cb;
	}
	,destroy: function() {
		createjs.Ticker.removeListener(this);
		this.onRestart = null;
		this.onBackToMenu = null;
		this.onSessionEnd = null;
		this._playGrid.destroy();
	}
	,handleErrorOkClicked: function() {
		this.removeChild(this._errorPopup);
		this._errorPopup = null;
		this.removeChild(this._errorOkButton);
		this._errorOkButton = null;
		this._playGrid.mouseEnabled = true;
	}
	,handleGridNotFull: function() {
		this._playGrid.mouseEnabled = false;
		this._playGrid.showErrorArrows();
		this._errorPopup = co.doubleduck.Assets.getImage("images/session/popup_bad.png");
		this._errorPopup.regX = this._errorPopup.image.width / 2;
		this._errorPopup.regY = this._errorPopup.image.height / 2;
		this._errorPopup.x = co.doubleduck.Game.getViewport().width / 2;
		this._errorPopup.y = co.doubleduck.Game.getViewport().height / 2;
		this._errorPopup.scaleX = this._errorPopup.scaleY = co.doubleduck.Game.getScale();
		this.addChild(this._errorPopup);
		this._errorOkButton = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/button_ok.png"));
		this._errorOkButton.regX = this._errorOkButton.image.width / 2;
		this._errorOkButton.regY = this._errorOkButton.image.height / 2;
		this._errorOkButton.x = this._errorPopup.x + this._errorPopup.image.width * 0.4 * co.doubleduck.Game.getScale();
		this._errorOkButton.y = this._errorPopup.y + this._errorPopup.image.height / 2 * co.doubleduck.Game.getScale();
		this._errorOkButton.scaleX = this._errorOkButton.scaleY = co.doubleduck.Game.getScale();
		this.addChild(this._errorOkButton);
		this._errorOkButton.onClick = $bind(this,this.handleErrorOkClicked);
	}
	,handleEndGame: function() {
		var endSplash = co.doubleduck.Assets.getImage("images/session/end_game.png");
		endSplash.regX = endSplash.image.width / 2;
		endSplash.regY = endSplash.image.height / 2;
		endSplash.scaleX = endSplash.scaleY = co.doubleduck.Game.getScale();
		endSplash.x = co.doubleduck.Game.getViewport().width / 2;
		endSplash.y = co.doubleduck.Game.getViewport().height / 2;
		this.addChild(endSplash);
		var b2mButton = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/btn_b2m.png"));
		b2mButton.scaleX = b2mButton.scaleY = co.doubleduck.Game.getScale();
		b2mButton.regX = b2mButton.image.width / 2;
		b2mButton.regY = b2mButton.image.height / 2;
		b2mButton.x = co.doubleduck.Game.getViewport().width / 2;
		b2mButton.y = co.doubleduck.Game.getViewport().height * 0.85;
		this.addChild(b2mButton);
		b2mButton.onClick = this.onBackToMenu;
	}
	,handleAllConnected: function() {
		if(!this._playGrid.isGridFull()) {
			this.handleGridNotFull();
			return;
		}
		this._playGrid.mouseEnabled = false;
		if(this.onSessionEnd != null) this.onSessionEnd();
		co.doubleduck.SoundManager.playEffect("sound/Complete_puzzle");
		this._levelCompletePopup = new createjs.Container();
		var popupType = Std.random(3) + 1;
		var levelCompleteBg = co.doubleduck.Assets.getImage("images/session/popup_good-" + popupType + ".png");
		this._levelCompletePopup.addChild(levelCompleteBg);
		var btnMenu = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/button_menu.png"));
		btnMenu.regX = btnMenu.image.width;
		btnMenu.regY = btnMenu.image.height;
		btnMenu.x = levelCompleteBg.image.width;
		btnMenu.y = levelCompleteBg.image.height * 1.1;
		this._levelCompletePopup.addChild(btnMenu);
		btnMenu.onClick = this.onBackToMenu;
		var totalLevels = new LevelDB().getAllLevels().length;
		if(this._level < totalLevels) {
			var btnNext = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/button_next.png"));
			btnNext.regX = btnNext.image.width;
			btnNext.regY = btnNext.image.height;
			btnNext.x = levelCompleteBg.image.width;
			btnNext.y = levelCompleteBg.image.height * 1.1;
			btnNext.onClick = this.onNextLevel;
			btnMenu.x -= btnNext.image.width;
			this._levelCompletePopup.addChild(btnNext);
		} else btnMenu.onClick = $bind(this,this.handleEndGame);
		this._levelCompletePopup.regX = levelCompleteBg.image.width / 2;
		this._levelCompletePopup.regY = levelCompleteBg.image.height / 2;
		this._levelCompletePopup.x = co.doubleduck.Game.getViewport().width / 2;
		this._levelCompletePopup.y = co.doubleduck.Game.getViewport().height / 2;
		this._levelCompletePopup.scaleX = this._levelCompletePopup.scaleY = co.doubleduck.Game.getScale();
		this.addChild(this._levelCompletePopup);
	}
	,handleReplayClick: function() {
		if(this.onRestart != null) {
			co.doubleduck.SoundManager.playEffect("sound/Clear_screen");
			this.onRestart();
		}
	}
	,handleMenuClick: function() {
		if(this.onBackToMenu != null) this.onBackToMenu();
	}
	,addHud: function() {
		this._menuBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/btn_menu.png"));
		this._menuBtn.regX = 0;
		this._menuBtn.regY = this._menuBtn.image.height;
		this._menuBtn.scaleX = this._menuBtn.scaleY = co.doubleduck.Game.getScale();
		this._menuBtn.x = co.doubleduck.Game.getScale() * 20;
		this._menuBtn.y = co.doubleduck.Game.getViewport().height - co.doubleduck.Game.getScale() * 20;
		this._menuBtn.onClick = $bind(this,this.handleMenuClick);
		this.addChild(this._menuBtn);
		this._replayBtn = new co.doubleduck.Button(co.doubleduck.Assets.getImage("images/session/btn_restart.png"));
		this._replayBtn.regX = this._replayBtn.image.width;
		this._replayBtn.regY = this._replayBtn.image.height;
		this._replayBtn.scaleX = this._replayBtn.scaleY = co.doubleduck.Game.getScale();
		this._replayBtn.setNoSound();
		this._replayBtn.x = co.doubleduck.Game.getViewport().width - co.doubleduck.Game.getScale() * 20;
		this._replayBtn.y = this._menuBtn.y;
		this._replayBtn.onClick = $bind(this,this.handleReplayClick);
		this.addChild(this._replayBtn);
	}
	,constructLevel: function() {
		this._background = co.doubleduck.Assets.getImage("images/session/bg.png");
		this._background.scaleX = this._background.scaleY = co.doubleduck.Game.getScale();
		this._background.regX = this._background.image.width / 2;
		this._background.regY = this._background.image.height / 2;
		this._background.y = co.doubleduck.Game.getViewport().height / 2;
		this._background.x = co.doubleduck.Game.getViewport().width / 2;
		this.addChild(this._background);
		this._playGrid = new co.doubleduck.Grid(this._level);
		var gridScale = co.doubleduck.Game.getViewport().width * 0.93 / this._playGrid.getWidth();
		this._playGrid.regX = this._playGrid.getWidth() / 2;
		this._playGrid.regY = this._playGrid.getHeight() / 2;
		this._playGrid.y = co.doubleduck.Game.getViewport().height * 0.41;
		this._playGrid.x = co.doubleduck.Game.getViewport().width / 2;
		this._playGrid.scaleX = this._playGrid.scaleY = gridScale;
		this._pattern = new createjs.Container();
		this._pattern.y = this._playGrid.y;
		this._pattern.x = this._playGrid.x;
		this._pattern.regX = this._playGrid.regX;
		this._pattern.regY = this._playGrid.regY;
		this._pattern.scaleX = this._pattern.scaleY = gridScale;
		var _g1 = 0, _g = this._playGrid.getRows();
		while(_g1 < _g) {
			var gy = _g1++;
			var even = gy % 2 == 0;
			var _g3 = 0, _g2 = this._playGrid.getCols();
			while(_g3 < _g2) {
				var gx = _g3++;
				if(even) {
					var grass = co.doubleduck.Assets.getImage("images/session/grass.png");
					grass.y = gy * co.doubleduck.GridCell.SIZE;
					grass.x = gx * co.doubleduck.GridCell.SIZE;
					this._pattern.addChild(grass);
				}
				even = !even;
			}
		}
		this.addChild(this._pattern);
		this.addChild(this._playGrid);
		this._playGrid.onAllConnected = $bind(this,this.handleAllConnected);
	}
	,_replayBtn: null
	,_menuBtn: null
	,_errorOkButton: null
	,_errorPopup: null
	,_level: null
	,_levelCompletePopup: null
	,_playGrid: null
	,_pattern: null
	,_background: null
	,onNextLevel: null
	,onBackToMenu: null
	,onSessionEnd: null
	,onRestart: null
	,__class__: co.doubleduck.Session
});
co.doubleduck.SoundType = $hxClasses["co.doubleduck.SoundType"] = { __ename__ : ["co","doubleduck","SoundType"], __constructs__ : ["WEB_AUDIO","AUDIO_FX","AUDIO_NO_OVERLAP","NONE"] }
co.doubleduck.SoundType.WEB_AUDIO = ["WEB_AUDIO",0];
co.doubleduck.SoundType.WEB_AUDIO.toString = $estr;
co.doubleduck.SoundType.WEB_AUDIO.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_FX = ["AUDIO_FX",1];
co.doubleduck.SoundType.AUDIO_FX.toString = $estr;
co.doubleduck.SoundType.AUDIO_FX.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP = ["AUDIO_NO_OVERLAP",2];
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.toString = $estr;
co.doubleduck.SoundType.AUDIO_NO_OVERLAP.__enum__ = co.doubleduck.SoundType;
co.doubleduck.SoundType.NONE = ["NONE",3];
co.doubleduck.SoundType.NONE.toString = $estr;
co.doubleduck.SoundType.NONE.__enum__ = co.doubleduck.SoundType;
if(!co.doubleduck.audio) co.doubleduck.audio = {}
co.doubleduck.audio.AudioAPI = $hxClasses["co.doubleduck.audio.AudioAPI"] = function() { }
co.doubleduck.audio.AudioAPI.__name__ = ["co","doubleduck","audio","AudioAPI"];
co.doubleduck.audio.AudioAPI.prototype = {
	setVolume: null
	,pause: null
	,stop: null
	,playMusic: null
	,playEffect: null
	,init: null
	,__class__: co.doubleduck.audio.AudioAPI
}
co.doubleduck.audio.WebAudioAPI = $hxClasses["co.doubleduck.audio.WebAudioAPI"] = function(src) {
	this._src = src;
	this.loadAudioFile(this._src);
};
co.doubleduck.audio.WebAudioAPI.__name__ = ["co","doubleduck","audio","WebAudioAPI"];
co.doubleduck.audio.WebAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.WebAudioAPI.context = null;
co.doubleduck.audio.WebAudioAPI.webAudioInit = function() {
	co.doubleduck.audio.WebAudioAPI.context = new webkitAudioContext();
}
co.doubleduck.audio.WebAudioAPI.saveBuffer = function(buffer,name) {
	co.doubleduck.audio.WebAudioAPI._buffers[name] = buffer;
}
co.doubleduck.audio.WebAudioAPI.decodeError = function() {
	null;
}
co.doubleduck.audio.WebAudioAPI.prototype = {
	setVolume: function(volume) {
		if(this._gainNode != null) this._gainNode.gain.value = volume;
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._source != null) this._source.noteOff(0);
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		this.playBuffer(this._src,loop);
		this.setVolume(volume);
	}
	,playBuffer: function(name,loop) {
		if(loop == null) loop = false;
		if(this._gainNode == null) {
			this._gainNode = co.doubleduck.audio.WebAudioAPI.context.createGainNode();
			this._gainNode.connect(co.doubleduck.audio.WebAudioAPI.context.destination);
		}
		this._buffer = Reflect.getProperty(co.doubleduck.audio.WebAudioAPI._buffers,this._src);
		if(this._buffer == null) return;
		this._source = co.doubleduck.audio.WebAudioAPI.context.createBufferSource();
		this._source.buffer = this._buffer;
		this._source.loop = loop;
		this._source.connect(this._gainNode);
		this._source.noteOn(0);
	}
	,loadAudioFile: function(src) {
		var request = new XMLHttpRequest();
		request.open("get",src,true);
		request.responseType = "arraybuffer";
		request.onload = function() { co.doubleduck.audio.WebAudioAPI.context.decodeAudioData(request.response, function(decodedBuffer) { buffer = decodedBuffer; co.doubleduck.audio.WebAudioAPI.saveBuffer(buffer,src); }, co.doubleduck.audio.WebAudioAPI.decodeError) }
		request.send();
	}
	,init: function() {
	}
	,_source: null
	,_gainNode: null
	,_buffer: null
	,_src: null
	,__class__: co.doubleduck.audio.WebAudioAPI
}
co.doubleduck.SoundManager = $hxClasses["co.doubleduck.SoundManager"] = function() {
};
co.doubleduck.SoundManager.__name__ = ["co","doubleduck","SoundManager"];
co.doubleduck.SoundManager.engineType = null;
co.doubleduck.SoundManager.EXTENSION = null;
co.doubleduck.SoundManager.getPersistedMute = function() {
	var mute = co.doubleduck.Persistence.getValue("mute");
	if(mute == "0") {
		mute = "false";
		co.doubleduck.SoundManager.setPersistedMute(false);
	}
	return mute == "true";
}
co.doubleduck.SoundManager.setPersistedMute = function(mute) {
	var val = "true";
	if(!mute) val = "false";
	co.doubleduck.Persistence.setValue("mute",val);
}
co.doubleduck.SoundManager.isSoundAvailable = function() {
	var isFirefox = /Firefox/.test(navigator.userAgent);
	var isChrome = /Chrome/.test(navigator.userAgent);
	var isMobile = /Mobile/.test(navigator.userAgent);
	var isAndroid = /Android/.test(navigator.userAgent);
	var isAndroid4 = /Android 4/.test(navigator.userAgent);
	var isSafari = /Safari/.test(navigator.userAgent);
	var agent = navigator.userAgent;
	var reg = new EReg("iPhone OS 6","");
	var isIOS6 = reg.match(agent) && isSafari && isMobile;
	var isIpad = /iPad/.test(navigator.userAgent);
	isIpad = isIpad && /OS 6/.test(navigator.userAgent);
	isIOS6 = isIOS6 || isIpad;
	if(isFirefox) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_FX;
		co.doubleduck.SoundManager.EXTENSION = ".ogg";
		return true;
	}
	if(isChrome && (!isAndroid && !isMobile)) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	if(isIOS6) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.WEB_AUDIO;
		co.doubleduck.audio.WebAudioAPI.webAudioInit();
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	} else if(isAndroid4 && !isChrome) {
		co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.AUDIO_NO_OVERLAP;
		co.doubleduck.SoundManager.EXTENSION = ".mp3";
		return true;
	}
	co.doubleduck.SoundManager.engineType = co.doubleduck.SoundType.NONE;
	return false;
}
co.doubleduck.SoundManager.mute = function() {
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = true;
	var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
	while(_g1 < _g) {
		var currSound = _g1++;
		var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
		if(mySound != null) mySound.setVolume(0);
	}
	co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.unmute = function() {
	if(!co.doubleduck.SoundManager.available) return;
	co.doubleduck.SoundManager._muted = false;
	var _g1 = 0, _g = Reflect.fields(co.doubleduck.SoundManager._cache).length;
	while(_g1 < _g) {
		var currSound = _g1++;
		var mySound = Reflect.getProperty(co.doubleduck.SoundManager._cache,Reflect.fields(co.doubleduck.SoundManager._cache)[currSound]);
		if(mySound != null) mySound.setVolume(1);
	}
	co.doubleduck.SoundManager.setPersistedMute(co.doubleduck.SoundManager._muted);
}
co.doubleduck.SoundManager.toggleMute = function() {
	if(co.doubleduck.SoundManager._muted) co.doubleduck.SoundManager.unmute(); else co.doubleduck.SoundManager.mute();
}
co.doubleduck.SoundManager.isMuted = function() {
	co.doubleduck.SoundManager._muted = co.doubleduck.SoundManager.getPersistedMute();
	return co.doubleduck.SoundManager._muted;
}
co.doubleduck.SoundManager.getAudioInstance = function(src) {
	if(!co.doubleduck.SoundManager.available) return new co.doubleduck.audio.DummyAudioAPI();
	src += co.doubleduck.SoundManager.EXTENSION;
	var audio = Reflect.getProperty(co.doubleduck.SoundManager._cache,src);
	if(audio == null) {
		switch( (co.doubleduck.SoundManager.engineType)[1] ) {
		case 1:
			audio = new co.doubleduck.audio.AudioFX(src);
			break;
		case 0:
			audio = new co.doubleduck.audio.WebAudioAPI(src);
			break;
		case 2:
			audio = new co.doubleduck.audio.NonOverlappingAudio(src);
			break;
		case 3:
			return new co.doubleduck.audio.DummyAudioAPI();
		}
		Reflect.setProperty(co.doubleduck.SoundManager._cache,src,audio);
	}
	return audio;
}
co.doubleduck.SoundManager.playEffect = function(src,volume,optional) {
	if(optional == null) optional = false;
	if(volume == null) volume = 1;
	if(optional && co.doubleduck.SoundManager.engineType == co.doubleduck.SoundType.AUDIO_NO_OVERLAP) return new co.doubleduck.audio.DummyAudioAPI();
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playEffect(playVolume);
	return audio;
}
co.doubleduck.SoundManager.playMusic = function(src,volume,loop) {
	if(loop == null) loop = true;
	if(volume == null) volume = 1;
	var audio = co.doubleduck.SoundManager.getAudioInstance(src);
	var playVolume = volume;
	if(co.doubleduck.SoundManager._muted) playVolume = 0;
	audio.playMusic(playVolume,loop);
	return audio;
}
co.doubleduck.SoundManager.initSound = function(src) {
	co.doubleduck.SoundManager.getAudioInstance(src);
}
co.doubleduck.SoundManager.prototype = {
	__class__: co.doubleduck.SoundManager
}
co.doubleduck.Utils = $hxClasses["co.doubleduck.Utils"] = function() {
};
co.doubleduck.Utils.__name__ = ["co","doubleduck","Utils"];
co.doubleduck.Utils.map = function(value,aMin,aMax,bMin,bMax) {
	if(bMax == null) bMax = 1;
	if(bMin == null) bMin = 0;
	if(value <= aMin) return bMin;
	if(value >= aMax) return bMax;
	return (value - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
co.doubleduck.Utils.waitAndCall = function(parent,delay,func,args) {
	createjs.Tween.get(parent).wait(delay).call(func,args);
}
co.doubleduck.Utils.tintBitmap = function(src,redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier) {
	var colorFilter = new createjs.ColorFilter(redMultiplier,greenMultiplier,blueMultiplier,alphaMultiplier);
	src.cache(src.x,src.y,src.image.width,src.image.height);
	src.filters = [colorFilter];
	src.updateCache();
}
co.doubleduck.Utils.containBitmaps = function(bitmapList,spacing,isRow,dims) {
	if(isRow == null) isRow = true;
	if(spacing == null) spacing = 0;
	var totalWidth = 0;
	var totalHeight = 0;
	var result = new createjs.Container();
	var _g1 = 0, _g = bitmapList.length;
	while(_g1 < _g) {
		var currBitmap = _g1++;
		var bmp = bitmapList[currBitmap];
		bmp.regY = bmp.image.height / 2;
		if(currBitmap != 0) {
			if(isRow) {
				bmp.x = bitmapList[currBitmap - 1].x + bitmapList[currBitmap - 1].image.width + spacing;
				if(bmp.image.height > totalHeight) totalHeight = bmp.image.height;
				totalWidth += bmp.image.width + spacing;
			} else {
				bmp.y = bitmapList[currBitmap - 1].y + bitmapList[currBitmap - 1].image.height + spacing;
				if(bmp.image.width > totalWidth) totalWidth = bmp.image.width;
				totalHeight += bmp.image.height + spacing;
			}
		} else {
			totalWidth = bmp.image.width;
			totalHeight = bmp.image.height;
		}
		result.addChild(bmp);
	}
	result.regX = totalWidth / 2;
	result.regY = totalHeight / 2;
	if(dims != null) {
		dims.width = totalWidth;
		dims.height = totalHeight;
	}
	return result;
}
co.doubleduck.Utils.prototype = {
	__class__: co.doubleduck.Utils
}
co.doubleduck.audio.AudioFX = $hxClasses["co.doubleduck.audio.AudioFX"] = function(src) {
	this._jsAudio = null;
	this._src = src;
	this._loop = false;
	this._volume = 1;
};
co.doubleduck.audio.AudioFX.__name__ = ["co","doubleduck","audio","AudioFX"];
co.doubleduck.audio.AudioFX.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.AudioFX._currentlyPlaying = null;
co.doubleduck.audio.AudioFX.prototype = {
	setVolume: function(volume) {
		this._volume = volume;
		if(this._jsAudio != null) this._jsAudio.setVolume(volume);
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		this._jsAudio.stop();
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(this._jsAudio == null) this.load(loop,2);
		this._jsAudio.play();
		this.setVolume(volume);
	}
	,load: function(isLoop,pool) {
		if(pool == null) pool = 1;
		var pathNoExtension = this._src;
		this._jsAudio = AudioFX(pathNoExtension, { loop: isLoop, pool: pool });
	}
	,init: function() {
	}
	,_volume: null
	,_loop: null
	,_jsAudio: null
	,_src: null
	,__class__: co.doubleduck.audio.AudioFX
}
co.doubleduck.audio.DummyAudioAPI = $hxClasses["co.doubleduck.audio.DummyAudioAPI"] = function() {
};
co.doubleduck.audio.DummyAudioAPI.__name__ = ["co","doubleduck","audio","DummyAudioAPI"];
co.doubleduck.audio.DummyAudioAPI.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.DummyAudioAPI.prototype = {
	setVolume: function(volume) {
	}
	,pause: function() {
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = true;
		if(volume == null) volume = 1;
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
	}
	,init: function() {
	}
	,__class__: co.doubleduck.audio.DummyAudioAPI
}
co.doubleduck.audio.NonOverlappingAudio = $hxClasses["co.doubleduck.audio.NonOverlappingAudio"] = function(src) {
	this._src = src;
	this.load();
	this._isMusic = false;
};
co.doubleduck.audio.NonOverlappingAudio.__name__ = ["co","doubleduck","audio","NonOverlappingAudio"];
co.doubleduck.audio.NonOverlappingAudio.__interfaces__ = [co.doubleduck.audio.AudioAPI];
co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = null;
co.doubleduck.audio.NonOverlappingAudio.prototype = {
	getSrc: function() {
		return this._src;
	}
	,audio: function() {
		return this._audio;
	}
	,setVolume: function(volume) {
		if(this._audio != null) this._audio.volume = volume;
	}
	,pause: function() {
		if(this._audio != null) this._audio.pause();
	}
	,stop: function(fadeOut) {
		if(fadeOut == null) fadeOut = 0;
		if(this._isMusic) co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
		if(this._audio != null) {
			this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
			this._audio.currentTime = 0;
			this._audio.pause();
		}
	}
	,playMusic: function(volume,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._isMusic = true;
		co.doubleduck.audio.NonOverlappingAudio._musicPlaying = true;
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
	}
	,handleEnded: function() {
		this._audio.removeEventListener("ended",$bind(this,this.handleEnded));
		this._audio.currentTime = 0;
	}
	,handleTimeUpdate: function() {
		if(this._audio.currentTime >= this._audio.duration - 0.3) this.stop();
	}
	,playEffect: function(volume,overrideOtherEffects,loop,fadeIn) {
		if(fadeIn == null) fadeIn = 0;
		if(loop == null) loop = false;
		if(overrideOtherEffects == null) overrideOtherEffects = true;
		if(volume == null) volume = 1;
		if(co.doubleduck.audio.NonOverlappingAudio._musicPlaying) return;
		if(overrideOtherEffects && co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying != null) co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying.stop();
		this._audio.play();
		this._audio.volume = volume;
		this._audio.loop = loop;
		if(!loop) this._audio.addEventListener("ended",$bind(this,this.stop));
		co.doubleduck.audio.NonOverlappingAudio._currentlyPlaying = this;
	}
	,handleError: function() {
	}
	,handleCanPlay: function() {
	}
	,load: function() {
		this._audio = new Audio();
		this._audio.src = this._src;
		this._audio.initialTime = 0;
		this._audio.addEventListener("canplaythrough",$bind(this,this.handleCanPlay));
		this._audio.addEventListener("onerror",$bind(this,this.handleError));
	}
	,init: function() {
	}
	,_isMusic: null
	,_audio: null
	,_src: null
	,__class__: co.doubleduck.audio.NonOverlappingAudio
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Public = $hxClasses["haxe.Public"] = function() { }
haxe.Public.__name__ = ["haxe","Public"];
haxe.Serializer = $hxClasses["haxe.Serializer"] = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
};
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype = {
	serializeException: function(e) {
		this.buf.b += Std.string("x");
		this.serialize(e);
	}
	,serialize: function(v) {
		var $e = (Type["typeof"](v));
		switch( $e[1] ) {
		case 0:
			this.buf.b += Std.string("n");
			break;
		case 1:
			if(v == 0) {
				this.buf.b += Std.string("z");
				return;
			}
			this.buf.b += Std.string("i");
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += Std.string("k"); else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += Std.string("d");
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += Std.string("a");
				var l = v.length;
				var _g = 0;
				while(_g < l) {
					var i = _g++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += Std.string("n"); else {
								this.buf.b += Std.string("u");
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += Std.string("n"); else {
						this.buf.b += Std.string("u");
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += Std.string("h");
				break;
			case List:
				this.buf.b += Std.string("l");
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += Std.string("h");
				break;
			case Date:
				var d = v;
				this.buf.b += Std.string("v");
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case Hash:
				this.buf.b += Std.string("b");
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case IntHash:
				this.buf.b += Std.string("q");
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += Std.string(":");
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += Std.string("h");
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += Std.string("s");
				this.buf.b += Std.string(chars.length);
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += Std.string("C");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += Std.string("g");
				} else {
					this.buf.b += Std.string("c");
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += Std.string("o");
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += Std.string(":");
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += Std.string(":");
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g = 2;
			while(_g < l) {
				var i = _g++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += Std.string("g");
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += Std.string("r");
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += Std.string("R");
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += Std.string("y");
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += Std.string(":");
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,useEnumIndex: null
	,useCache: null
	,scount: null
	,shash: null
	,cache: null
	,buf: null
	,__class__: haxe.Serializer
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.Stack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += Std.string("\nCalled from ");
		haxe.Stack.itemToString(b,s);
	}
	return b.b;
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += Std.string("a C function");
		break;
	case 1:
		var m = $e[2];
		b.b += Std.string("module ");
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b += Std.string(" (");
		}
		b.b += Std.string(file);
		b.b += Std.string(" line ");
		b.b += Std.string(line);
		if(s1 != null) b.b += Std.string(")");
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += Std.string(".");
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += Std.string("local function #");
		b.b += Std.string(n);
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
}
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = $hxClasses["haxe.io.Bytes"] = function(length,b) {
	this.length = length;
	this.b = b;
};
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.charCodeAt(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype = {
	getData: function() {
		return this.b;
	}
	,toHex: function() {
		var s = new StringBuf();
		var chars = [];
		var str = "0123456789abcdef";
		var _g1 = 0, _g = str.length;
		while(_g1 < _g) {
			var i = _g1++;
			chars.push(HxOverrides.cca(str,i));
		}
		var _g1 = 0, _g = this.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.b[i];
			s.b += String.fromCharCode(chars[c >> 4]);
			s.b += String.fromCharCode(chars[c & 15]);
		}
		return s.b;
	}
	,toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,compare: function(other) {
		var b1 = this.b;
		var b2 = other.b;
		var len = this.length < other.length?this.length:other.length;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			if(b1[i] != b2[i]) return b1[i] - b2[i];
		}
		return this.length - other.length;
	}
	,sub: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b1[i + pos] = b2[i + srcpos];
		}
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,get: function(pos) {
		return this.b[pos];
	}
	,b: null
	,length: null
	,__class__: haxe.io.Bytes
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.FlashJsConnection = $hxClasses["haxe.remoting.FlashJsConnection"] = function() { }
haxe.remoting.FlashJsConnection.__name__ = ["haxe","remoting","FlashJsConnection"];
haxe.remoting.FlashJsConnection.flashCall = function(flashObj,name,path,params) {
	try {
		var fobj = window.document[flashObj];
		if(fobj == null) fobj = window.document.getElementById[flashObj];
		if(fobj == null) throw "Could not find flash object '" + flashObj + "'";
		var data = null;
		try {
			data = fobj.flashJsRemotingCall(name,path,params);
		} catch( e ) {
		}
		if(data == null) throw "Flash object " + flashObj + " does not have an active FlashJsConnection";
		return data;
	} catch( e ) {
		var s = new haxe.Serializer();
		s.serializeException(e);
		return s.toString();
	}
}
if(!haxe.unit) haxe.unit = {}
haxe.unit.TestCase = $hxClasses["haxe.unit.TestCase"] = function() {
};
haxe.unit.TestCase.__name__ = ["haxe","unit","TestCase"];
haxe.unit.TestCase.__interfaces__ = [haxe.Public];
haxe.unit.TestCase.prototype = {
	assertEquals: function(expected,actual,c) {
		this.currentTest.done = true;
		if(actual != expected) {
			this.currentTest.success = false;
			this.currentTest.error = "expected '" + Std.string(expected) + "' but was '" + Std.string(actual) + "'";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertFalse: function(b,c) {
		this.currentTest.done = true;
		if(b == true) {
			this.currentTest.success = false;
			this.currentTest.error = "expected false but was true";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,assertTrue: function(b,c) {
		this.currentTest.done = true;
		if(b == false) {
			this.currentTest.success = false;
			this.currentTest.error = "expected true but was false";
			this.currentTest.posInfos = c;
			throw this.currentTest;
		}
	}
	,print: function(v) {
		haxe.unit.TestRunner.print(v);
	}
	,tearDown: function() {
	}
	,setup: function() {
	}
	,currentTest: null
	,__class__: haxe.unit.TestCase
}
haxe.unit.TestResult = $hxClasses["haxe.unit.TestResult"] = function() {
	this.m_tests = new List();
	this.success = true;
};
haxe.unit.TestResult.__name__ = ["haxe","unit","TestResult"];
haxe.unit.TestResult.prototype = {
	toString: function() {
		var buf = new StringBuf();
		var failures = 0;
		var $it0 = this.m_tests.iterator();
		while( $it0.hasNext() ) {
			var test = $it0.next();
			if(test.success == false) {
				buf.b += Std.string("* ");
				buf.b += Std.string(test.classname);
				buf.b += Std.string("::");
				buf.b += Std.string(test.method);
				buf.b += Std.string("()");
				buf.b += Std.string("\n");
				buf.b += Std.string("ERR: ");
				if(test.posInfos != null) {
					buf.b += Std.string(test.posInfos.fileName);
					buf.b += Std.string(":");
					buf.b += Std.string(test.posInfos.lineNumber);
					buf.b += Std.string("(");
					buf.b += Std.string(test.posInfos.className);
					buf.b += Std.string(".");
					buf.b += Std.string(test.posInfos.methodName);
					buf.b += Std.string(") - ");
				}
				buf.b += Std.string(test.error);
				buf.b += Std.string("\n");
				if(test.backtrace != null) {
					buf.b += Std.string(test.backtrace);
					buf.b += Std.string("\n");
				}
				buf.b += Std.string("\n");
				failures++;
			}
		}
		buf.b += Std.string("\n");
		if(failures == 0) buf.b += Std.string("OK "); else buf.b += Std.string("FAILED ");
		buf.b += Std.string(this.m_tests.length);
		buf.b += Std.string(" tests, ");
		buf.b += Std.string(failures);
		buf.b += Std.string(" failed, ");
		buf.b += Std.string(this.m_tests.length - failures);
		buf.b += Std.string(" success");
		buf.b += Std.string("\n");
		return buf.b;
	}
	,add: function(t) {
		this.m_tests.add(t);
		if(!t.success) this.success = false;
	}
	,success: null
	,m_tests: null
	,__class__: haxe.unit.TestResult
}
haxe.unit.TestRunner = $hxClasses["haxe.unit.TestRunner"] = function() {
	this.result = new haxe.unit.TestResult();
	this.cases = new List();
};
haxe.unit.TestRunner.__name__ = ["haxe","unit","TestRunner"];
haxe.unit.TestRunner.print = function(v) {
	var msg = StringTools.htmlEscape(js.Boot.__string_rec(v,"")).split("\n").join("<br/>");
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("haxe:trace element not found"); else d.innerHTML += msg;
}
haxe.unit.TestRunner.customTrace = function(v,p) {
	haxe.unit.TestRunner.print(p.fileName + ":" + p.lineNumber + ": " + Std.string(v) + "\n");
}
haxe.unit.TestRunner.prototype = {
	runCase: function(t) {
		var old = haxe.Log.trace;
		haxe.Log.trace = haxe.unit.TestRunner.customTrace;
		var cl = Type.getClass(t);
		var fields = Type.getInstanceFields(cl);
		haxe.unit.TestRunner.print("Class: " + Type.getClassName(cl) + " ");
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			var fname = f;
			var field = Reflect.field(t,f);
			if(StringTools.startsWith(fname,"test") && Reflect.isFunction(field)) {
				t.currentTest = new haxe.unit.TestStatus();
				t.currentTest.classname = Type.getClassName(cl);
				t.currentTest.method = fname;
				t.setup();
				try {
					field.apply(t,new Array());
					if(t.currentTest.done) {
						t.currentTest.success = true;
						haxe.unit.TestRunner.print(".");
					} else {
						t.currentTest.success = false;
						t.currentTest.error = "(warning) no assert";
						haxe.unit.TestRunner.print("W");
					}
				} catch( $e0 ) {
					if( js.Boot.__instanceof($e0,haxe.unit.TestStatus) ) {
						var e = $e0;
						haxe.unit.TestRunner.print("F");
						t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					} else {
					var e = $e0;
					haxe.unit.TestRunner.print("E");
					if(e.message != null) t.currentTest.error = "exception thrown : " + Std.string(e) + " [" + Std.string(e.message) + "]"; else t.currentTest.error = "exception thrown : " + Std.string(e);
					t.currentTest.backtrace = haxe.Stack.toString(haxe.Stack.exceptionStack());
					}
				}
				this.result.add(t.currentTest);
				t.tearDown();
			}
		}
		haxe.unit.TestRunner.print("\n");
		haxe.Log.trace = old;
	}
	,run: function() {
		this.result = new haxe.unit.TestResult();
		var $it0 = this.cases.iterator();
		while( $it0.hasNext() ) {
			var c = $it0.next();
			this.runCase(c);
		}
		haxe.unit.TestRunner.print(this.result.toString());
		return this.result.success;
	}
	,add: function(c) {
		this.cases.add(c);
	}
	,cases: null
	,result: null
	,__class__: haxe.unit.TestRunner
}
haxe.unit.TestStatus = $hxClasses["haxe.unit.TestStatus"] = function() {
	this.done = false;
	this.success = false;
};
haxe.unit.TestStatus.__name__ = ["haxe","unit","TestStatus"];
haxe.unit.TestStatus.prototype = {
	backtrace: null
	,posInfos: null
	,classname: null
	,method: null
	,error: null
	,success: null
	,done: null
	,__class__: haxe.unit.TestStatus
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.isClass = function(o) {
	return o.__name__;
}
js.Boot.isEnum = function(e) {
	return e.__ename__;
}
js.Boot.getClass = function(o) {
	return o.__class__;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.document = null;
js.Lib.window = null;
js.Lib.debug = function() {
	debugger;
}
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
}; else null;
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
var Void = $hxClasses.Void = { __ename__ : ["Void"]};
if(typeof document != "undefined") js.Lib.document = document;
if(typeof window != "undefined") {
	js.Lib.window = window;
	js.Lib.window.onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if(f == null) return false;
		return f(msg,[url + ":" + line]);
	};
}
co.doubleduck.Assets.onLoadAll = null;
co.doubleduck.Assets._loader = null;
co.doubleduck.Assets._cacheData = { };
co.doubleduck.Assets._loadCallbacks = { };
co.doubleduck.Assets.loaded = 0;
co.doubleduck.Assets._useLocalStorage = false;
co.doubleduck.Button.CLICK_TYPE_NONE = 0;
co.doubleduck.Button.CLICK_TYPE_TINT = 1;
co.doubleduck.Button.CLICK_TYPE_JUICY = 2;
co.doubleduck.Button.CLICK_TYPE_SCALE = 3;
co.doubleduck.Button.CLICK_TYPE_TOGGLE = 4;
co.doubleduck.GridCell.SIZE = 95;
co.doubleduck.GridCell.COLORS = 9;
co.doubleduck.GridCell.WIRE_NONE = 0;
co.doubleduck.GridCell.WIRE_NORMAL = 1;
co.doubleduck.GridCell.WIRE_START = 2;
co.doubleduck.GridCell.WIRE_END = 3;
co.doubleduck.GridCell.DIRECT_UP = 0;
co.doubleduck.GridCell.DIRECT_LEFT = 1;
co.doubleduck.GridCell.DIRECT_DOWN = 2;
co.doubleduck.GridCell.DIRECT_RIGHT = 3;
co.doubleduck.GridCell._wireSheet = null;
co.doubleduck.GridCell._bgColorSheet = null;
co.doubleduck.CellPath._sheet = null;
co.doubleduck.CellStructure.TYPE_SOURCE = 0;
co.doubleduck.CellStructure.TYPE_TARGET = 1;
co.doubleduck.CellStructure._sheets = null;
co.doubleduck.CellStructure._sheetsLighten = null;
co.doubleduck.FontHelper.FONT_MENU = "images/menu/font/";
co.doubleduck.FontHelper.FONT_HUD = "images/hud/hud_font/";
co.doubleduck.Game._viewport = null;
co.doubleduck.Game._scale = 1;
co.doubleduck.Game.MAX_HEIGHT = 641;
co.doubleduck.Game.MAX_WIDTH = 427;
co.doubleduck.Game.DEBUG = false;
co.doubleduck.Menu.PADDING_WIDTH = 15;
co.doubleduck.Menu.PADDING_HEIGHT = 15;
co.doubleduck.Menu.CELL_WIDTH = 91;
co.doubleduck.Menu.CELL_HEIGHT = 91;
co.doubleduck.Menu.ROWS = 3;
co.doubleduck.Menu.COLS = 3;
co.doubleduck.Menu.TWEEN_DURATION = 200;
co.doubleduck.Menu.ROTATION_PER_SEC = 5;
co.doubleduck.Menu.SWIPE_EASE = 0.007;
co.doubleduck.Menu.CLOUD_TWEEN_DURATION_MIN = 8000;
co.doubleduck.Menu.CLOUD_TWEEN_DURATION_RAND = 6000;
co.doubleduck.Menu.CLOUD_SPAWN_INTERVAL_MIN = 5000;
co.doubleduck.Menu.CLOUD_SPAWN_INTERVAL_RAND = 2500;
co.doubleduck.Persistence.GAME_PREFIX = "ECY";
co.doubleduck.Persistence.available = co.doubleduck.Persistence.localStorageSupported();
co.doubleduck.audio.WebAudioAPI._buffers = { };
co.doubleduck.SoundManager._muted = false;
co.doubleduck.SoundManager._cache = { };
co.doubleduck.SoundManager.available = co.doubleduck.SoundManager.isSoundAvailable();
co.doubleduck.audio.AudioFX._muted = false;
co.doubleduck.audio.NonOverlappingAudio._musicPlaying = false;
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
js.Lib.onerror = null;
co.doubleduck.Main.main();
