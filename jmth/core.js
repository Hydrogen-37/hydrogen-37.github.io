function dectobin(dec) {
	return dec.toString(2);
}

function bintodec(bin) {
	var m = bin.length - 1;
	var r = 0;
	for (var i = 0; i <= m; i++) {
		if (bin[m - i] == 1)
			r += Math.pow(2, i);
	}
	return r.toString();
}

function encode(str, ch1, ch0, chr, chf) {
	var ret = "";
	var strlen = str.length;
	var strarr = new Array(strlen);

	for (var i = 0; i < strlen; i++) {
		strarr[i] = dectobin(str.slice(i, i + 1).codePointAt(0));
	}

	var re0 = new RegExp("0", "gm"), re1 = new RegExp("1", "gm");
	var real = true;
	for (i in strarr) {
		strarr[i] = strarr[i].replace(re0, real? ch0: ch1).replace(re1, real? ch1: ch0);
		ret += strarr[i] + (real? chr: chf);
		real = Math.random() <= 0.5
	}

	return ret;
}

function decode(str, ch1, ch0, chr, chf) {
	var ret = "";
	var strarr = [], decarr = [];

	var arr1 = str.split(chr), arr2;
	for (i in arr1) {
		arr1[i] += "1";
	}
	for (i in arr1) {
		arr2 = arr1[i].split(chf);
		if (arr2.length != 1) {
			for (var j = 0; j < arr2.length - 1; j++) {
				arr2[j] += "0";
			}
		}
		strarr = strarr.concat(arr2);
	}
	strarr.pop();

	var re1 = new RegExp(ch1, "gm"), re0 = new RegExp(ch0, "gm");
	for (i in strarr) {
		real = strarr[i].endsWith("1");
		decarr.push(strarr[i].substr(0, strarr[i].length - 1).replace(real? re1: re0, "1").replace(real? re0: re1, "0"));
	}

	for (i in decarr) {
		ret += String.fromCharCode(bintodec(decarr[i]));
	}

	return ret;
}

$(document).ready(function(){
	btn_en = $("button#en");
	btn_de = $("button#de");
	txt_in = $("textarea#input");
	txt_out = $("textarea#output");

	btn_en.click(function(){
		ch1 = $("input#ch1").val()
		ch0 = $("input#ch2").val()
		chr = $("input#chr").val()
		chf = $("input#chf").val()
		if (ch1 == "1" || ch2 == "0") {
			alert("字符1不能使用\"1\"，字符2不能使用\"0\"！");
			return;
		}
		txt_out.text(encode(txt_in.val(), ch1, ch0, chr, chf));
	});
	btn_de.click(function(){
		ch1 = $("input#ch1").val()
		ch0 = $("input#ch2").val()
		chr = $("input#chr").val()
		chf = $("input#chf").val()
		if (ch1 == "1" || ch2 == "0") {
			alert("字符1不能使用\"1\"，字符2不能使用\"0\"！");
			return;
		}
		txt_out.text(decode(txt_in.val(), ch1, ch0, chr, chf));
	});
});