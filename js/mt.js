
try {
    window.top.location.hostname;
    if (top.location.hostname != window.location.hostname) {
        top.location.href = window.location.href;
    }
}
catch (e) {
    top.location.href = window.location.href;
}

function setCookie(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) + (expires ? "; expires=" + expires : "") +
        (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "secure" : "");
    document.cookie = curCookie;
}

function getCookie(name) {
    var prefix = name + '=';
    var c = document.cookie;
    var nullstring = '';
    var cookieStartIndex = c.indexOf(prefix);
    if (cookieStartIndex == -1)
        return nullstring;
    var cookieEndIndex = c.indexOf(";", cookieStartIndex + prefix.length);
    if (cookieEndIndex == -1)
        cookieEndIndex = c.length;
    return unescape(c.substring(cookieStartIndex + prefix.length, cookieEndIndex));
}

function deleteCookie(name, path, domain) {
    if (getCookie(name))
        document.cookie = name + "=" + ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function fixDate(date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0)
        date.setTime(date.getTime() - skew);
}

function rememberMe(f) {
    var now = new Date();
    fixDate(now);
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    now = now.toGMTString();
    if (f.author != undefined)
        setCookie('mtcmtauth', f.author.value, now, '/', '', '');
    if (f.email != undefined)
        setCookie('mtcmtmail', f.email.value, now, '/', '', '');
    if (f.url != undefined)
        setCookie('mtcmthome', f.url.value, now, '/', '', '');
}

function forgetMe(f) {
    deleteCookie('mtcmtmail', '/', '');
    deleteCookie('mtcmthome', '/', '');
    deleteCookie('mtcmtauth', '/', '');
    f.email.value = '';
    f.author.value = '';
    f.url.value = '';
}

function hideDocumentElement(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

function showDocumentElement(id) {
    var el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

var commenter_name;

function individualArchivesOnLoad(commenter_name) {

    hideDocumentElement('trackbacks-info');

    if (document.comments_form) {
        if (document.comments_form.email != undefined &&
            (mtcmtmail = getCookie("mtcmtmail")))
            document.comments_form.email.value = mtcmtmail;
        if (document.comments_form.author != undefined &&
            (mtcmtauth = getCookie("mtcmtauth")))
            document.comments_form.author.value = mtcmtauth;
        if (document.comments_form.url != undefined &&
            (mtcmthome = getCookie("mtcmthome")))
            document.comments_form.url.value = mtcmthome;
        if (mtcmtauth || mtcmthome) {
            document.comments_form.bakecookie.checked = true;
        } else {
            document.comments_form.bakecookie.checked = false;
        }
    }
}


function RemoveBlockquote(strText) {
    var regEx = /<blockquote>(.|\n|\r)*<\/blockquote>/ig;
    regEx.multiline = true;
    return strText.replace(regEx, "");
}

function RemoveHTML(strText) {
    var regEx = /<[^>]*>/g;
    return strText.replace(regEx, "");
}

function ignoreSpaces(string) {
    var temp = "";
    string = '' + string;
    splitstring = string.split("  "); //双引号之间是个空格；
    for (i = 0; i < splitstring.length; i++)
        temp += splitstring[i];
    return temp;
}





document.addEventListener("DOMContentLoaded", function (event) {
    individualArchivesOnLoad(commenter_name);
});

function hab(container) {
    var items = document.querySelectorAll(container + ' a img');
    // console.log(items);
    items = Array.prototype.slice.call(items);
    if (!items.length) return;
    if (!getComputedStyle) return;
    items.forEach(function (i) {
        // console.log(getComputedStyle(i).display);
        if (getComputedStyle(i).display !== 'none') return;
        var src = i.src;
        // console.log(src);
        if (!src) return;
        // src = Array.prototype.slice.call(src);
        // src.splice(src.lastIndexOf('.'), 0, '_backup');
        src = src.split('/');
        src[src.length - 1] = 'backup_' + src[src.length - 1];
        if (src[2] === 'www.cui.com') {
            src = src.join('/');
        } else {
            src = '/blog/images/' + src[src.length - 1];
        }
        var img = new Image();
        img.src = src;
        if (i.width) img.width = i.width;
        img.style = 'border: none;';
        i.parentNode.appendChild(img);
    });
}