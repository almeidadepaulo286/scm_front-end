/* ==========================================================================
   MENU SIDE-BAR-NAV
   ========================================================================== */

/* layout-behavior.js */
jQuery(function() {
    function i(i) {
        $(window).width() < 800 && !n.hasClass("page-sidebar-minimized") && x_navigation_minimize("close")
    }

    var u = $("body"),
        n = $(".page-sidebar"),
        t = $(".page-container"),
        f = $(".logo-isi-engenharia"),
        r = $("#sidebar-wrapper"),
        e = $("#header-application");

    u.scroll(function() {
        $(window).width() > 800 && i(0)
    });
    $(window).resize(function() {
        i(60)
    });
    i(60)
})


/* settings.js */
function set_settings(n, t) {
  if (n.st_head_fixed == 1 ? $(".page-container").addClass("page-navigation-top-fixed") : $(".page-container").removeClass("page-navigation-top-fixed"), 
      n.st_sb_fixed == 1 ? $(".page-sidebar").addClass("page-sidebar-fixed") : $(".page-sidebar").removeClass("page-sidebar-fixed"), 
      n.st_sb_scroll == 1 ? $(".page-sidebar").addClass("scroll").mCustomScrollbar("update") : $(".page-sidebar").removeClass("scroll").css("height", "").mCustomScrollbar("disable", !0), 
      n.st_sb_right == 1 ? $(".page-container").addClass("page-mode-rtl") : $(".page-container").removeClass("page-mode-rtl"), 
      n.st_sb_custom == 1 ? $(".page-sidebar .x-navigation").addClass("x-navigation-custom") : $(".page-sidebar .x-navigation").removeClass("x-navigation-custom"), 
      t && t === "st_sb_minimized") {

      var i = false;
      i && (n.st_sb_minimized = i == "true" ? 1 : 0);
      n.st_sb_minimized == 1 ? x_navigation_minimize("close") : x_navigation_minimize("open")
  }
  $(window).resize()
}

jQuery(function() {
  var n = {
      st_head_fixed: 0,
      st_sb_fixed: 1,
      st_sb_scroll: 1,
      st_sb_right: 0,
      st_sb_custom: 0,
      st_sb_minimized: 0,
      st_layout_boxed: 0
  };

  set_settings(n, "st_sb_minimized", 1);
  
  $(".theme-settings input").on("ifClicked", function() {
      var t = $(this);
      n[t.attr("name")] = t.attr("name") != "st_layout_boxed" ? t.prop("checked") ? 0 : t.val() : t.val();
      t.attr("name") === "st_sb_fixed" && (n.st_sb_scroll = n.st_sb_fixed == 1 ? 1 : 0);
      t.attr("name") === "st_sb_scroll" && (n.st_sb_fixed = n.st_sb_scroll == 1 && n.st_layout_boxed == 0 ? 1 : n.st_sb_scroll == 1 && n.st_layout_boxed == 1 ? -1 : n.st_sb_scroll == 0 && n.st_layout_boxed == 1 ? -1 : 0);
      t.attr("name") === "st_layout_boxed" && (n.st_layout_boxed == 1 ? (n.st_head_fixed = -1, n.st_sb_fixed = -1, n.st_sb_scroll = 1) : (n.st_head_fixed = 0, n.st_sb_fixed = 1, n.st_sb_scroll = 1));
      set_settings(n, t.attr("name"))
  });
})


/* actions.js */
function onload() {
    x_navigation_onresize();
    page_content_onresize()
}

function page_content_onresize() {
    $(window).width() < 1200 ? $("body").hasClass("page-container-boxed") && $("body").removeClass("page-container-boxed").data("boxed", "1") : $("body").data("boxed") === "1" && $("body").addClass("page-container-boxed").data("boxed", "")
}

function panel_fullscreen(n) {
    if (n.hasClass("panel-fullscreened")) n.removeClass("panel-fullscreened").unwrap(), n.find(".panel-body,.chart-holder").css("height", ""), n.find(".panel-fullscreen .fa").removeClass("fa-compress").addClass("fa-expand"), $(window).resize();
    else {
        var i = n.find(".panel-heading"),
            r = n.find(".panel-body"),
            u = n.find(".panel-footer"),
            t = 30;
        (r.hasClass("panel-body-table") || r.hasClass("padding-0")) && (t = 0);
        i.length > 0 && (t += i.height() + 21);
        u.length > 0 && (t += u.height() + 21);
        n.find(".panel-body,.chart-holder").height($(window).height() - t);
        n.addClass("panel-fullscreened").wrap('<div class="panel-fullscreen-wrap"><\/div>');
        n.find(".panel-fullscreen .fa").removeClass("fa-expand").addClass("fa-compress");
        $(window).resize()
    }
}

function panel_collapse(n, t, i) {
    n.hasClass("panel-toggled") ? (n.removeClass("panel-toggled"), n.find(".panel-collapse .fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down"), t && t === "shown" && typeof i == "function" && i(), onload()) : (n.addClass("panel-toggled"), n.find(".panel-collapse .fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up"), t && t === "hidden" && typeof i == "function" && i(), onload())
}

function panel_refresh(n, t, i) {
    n.hasClass("panel-refreshing") ? (n.find(".panel-refresh-layer").remove(), n.removeClass("panel-refreshing"), t && t === "hidden" && typeof i == "function" && i()) : (n.append('<div class="panel-refresh-layer"><img src="img/loaders/default.gif"/><\/div>'), n.find(".panel-refresh-layer").width(n.width()).height(n.height()), n.addClass("panel-refreshing"), t && t === "shown" && typeof i == "function" && i());
    onload()
}

function panel_remove(n, t, i) {
    t && t === "before" && typeof i == "function" && i();
    n.animate({
        opacity: 0
    }, 200, function() {
        n.parent(".panel-fullscreen-wrap").remove();
        $(this).remove();
        t && t === "after" && typeof i == "function" && i();
        onload()
    })
}

function x_navigation_onresize() {
    var n = window.innerWidth || $(document).width();
    n < 1025 ? ($(".page-sidebar .x-navigation li.active").removeClass("active"), $(".x-navigation-horizontal").each(function() {
        $(this).hasClass("x-navigation-panel") || $(".x-navigation-horizontal").addClass("x-navigation-h-holder").removeClass("x-navigation-horizontal")
    })) : $(".x-navigation-h-holder").addClass("x-navigation-horizontal").removeClass("x-navigation-h-holder")
}

function x_navigation_minimize(n) {
    n == "open" && ($(".page-container").removeClass("page-navigation-minimized"), $(".page-sidebar").removeClass("page-sidebar-minimized"), $(".page-sidebar .x-navigation").removeClass("x-navigation-minimized"), $(".x-navigation-minimize").find(".fa").removeClass("fa-indent").addClass("fa-dedent"), $(".page-sidebar.scroll").mCustomScrollbar("update"), setCookie("sidebar_minimized", "false", 365));
    n == "close" && ($(".page-container").addClass("page-navigation-minimized"), $(".page-sidebar").addClass("page-sidebar-minimized"), $(".page-sidebar .x-navigation").addClass("x-navigation-minimized"), $(".x-navigation-minimize").find(".fa").removeClass("fa-dedent").addClass("fa-indent"), $(".page-sidebar.scroll").mCustomScrollbar("disable", !0), setCookie("sidebar_minimized", "true", 365));
    $(".x-navigation li.active").removeClass("active")
}

function x_navigation() {
    $(document).on("click", ".x-navigation-control", function() {
        return $(this).parents(".x-navigation").toggleClass("x-navigation-open"), onresize(), !1
    });
    $(document).on("click", ".x-navigation-minimize", function() {
        return $(".page-sidebar .x-navigation").hasClass("x-navigation-minimized") ? x_navigation_minimize("open") : x_navigation_minimize("close"), onresize(), !1
    });
    $(document).on("click", ".x-navigation li", function(n) {
        var i, t;
        return n.stopPropagation(), t = $(this), i = t.parent("ul"), i.find("li").not(t).removeClass("active"), t = $(this), t.children("ul").length > 0 || t.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0 ? (t.hasClass("active") ? (t.removeClass("active"), t.find("li.active").removeClass("active")) : t.addClass("active"), onresize(), $(this).hasClass("xn-profile") > 0 ? !0 : !1) : void 0
    });
    $(".xn-search").on("click", function() {
        $(this).find("input").focus()
    })
}

function onresize(n) {
    n = n ? n : 200;
    setTimeout(function() {
        page_content_onresize()
    }, n)
}

function playAudio(n) {
    n === "alert" && document.getElementById("audio-alert").play();
    n === "fail" && document.getElementById("audio-fail").play()
}

function setCookie(n, t, i) {
    var u = "",
        r;
    i && (r = new Date, r.setTime(r.getTime() + i * 864e5), u = "; expires=" + r.toUTCString());
    document.cookie = n + "=" + (t || "") + u + "; path=/"
}

function getCookie(n) {
    for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
        for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1, t.length);
        if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
    }
    return null
}

function eraseCookie(n) {
    document.cookie = n + "=; Max-Age=-99999999;"
}
$(document).ready(function() {
    var n = !0;
    $("html").on("click", function(t) {
        if (n) {
            if ($(t.target).closest(".x-navigation-sidebar").length > 0) return;
            if ($(t.target).hasClass("x-navigation-minimize") || $(t.target).closest(".x-navigation-minimize").length > 0) return;
            $(".x-navigation-horizontal li,.x-navigation-minimized li").removeClass("active");
            $(window).width() < 800 && x_navigation_minimize("close")
        }
    });
    $(".widget-remove").on("click", function() {
        return $(this).parents(".widget").fadeOut(400, function() {
            $(this).remove();
            $("body > .tooltip").remove()
        }), !1
    });
    $(".gallery-item .iCheck-helper").on("click", function() {
        var n = $(this).parent("div");
        n.hasClass("checked") ? $(this).parents(".gallery-item").addClass("active") : $(this).parents(".gallery-item").removeClass("active")
    });
    $(".gallery-item-remove").on("click", function() {
        return $(this).parents(".gallery-item").fadeOut(400, function() {
            $(this).remove()
        }), !1
    });
    $("#gallery-toggle-items").on("click", function() {
        $(".gallery-item").each(function() {
            var n = $(this).find(".iCheck-helper").parent("div");
            n.hasClass("checked") ? ($(this).removeClass("active"), n.removeClass("checked"), n.find("input").prop("checked", !1)) : ($(this).addClass("active"), n.addClass("checked"), n.find("input").prop("checked", !0))
        })
    });
    $(".x-navigation-sidebar").find("li > a").each(function(n, t) {
        $(t).attr("data-toogle", "tooltip");
        $(t).attr("data-placement", "top");
        $(t).attr("title", $(t).text())
    });
    $(document).on("click", ".dropdown-toggle", function() {
        onresize()
    });
    $(".mb-control").on("click", function() {
        var n = $($(this).data("box")),
            t;
        return n.length > 0 && (n.toggleClass("open"), t = n.data("sound"), t === "alert" && playAudio("alert"), t === "fail" && playAudio("fail")), !1
    });
    $(".mb-control-close").on("click", function() {
        return $(this).parents(".message-box").removeClass("open"), !1
    });
    $(".content-frame-left-toggle").on("click", function() {
        $(".content-frame-left").is(":visible") ? $(".content-frame-left").hide() : $(".content-frame-left").show();
        page_content_onresize()
    });
    $(".content-frame-right-toggle").on("click", function() {
        $(".content-frame-right").is(":visible") ? $(".content-frame-right").hide() : $(".content-frame-right").show();
        page_content_onresize()
    });
    $(".mail .mail-star").on("click", function() {
        $(this).toggleClass("starred")
    });
    $(".mail-checkall .iCheck-helper").on("click", function() {
        var n = $(this).prev("input").prop("checked");
        $(".mail .mail-item").each(function() {
            var t = $(this).find(".mail-checkbox > div");
            t.toggleClass("checked", n).find("input").prop("checked", n)
        })
    });
    $(".panel-fullscreen").on("click", function() {
        return panel_fullscreen($(this).parents(".panel")), !1
    });
    $(".panel-collapse").on("click", function() {
        return panel_collapse($(this).parents(".panel")), $(this).parents(".dropdown").removeClass("open"), !1
    });
    $(".panel-remove").on("click", function() {
        return panel_remove($(this).parents(".panel")), $(this).parents(".dropdown").removeClass("open"), !1
    });
    $(".panel-refresh").on("click", function() {
        var n = $(this).parents(".panel");
        return panel_refresh(n), setTimeout(function() {
            panel_refresh(n)
        }, 3e3), $(this).parents(".dropdown").removeClass("open"), !1
    });
    $(".accordion .panel-title a").on("click", function() {
        var n = $(this).attr("href"),
            t = $(this).parents(".accordion"),
            i = t.hasClass("accordion-dc");
        if ($(n).length > 0) return $(n).hasClass("panel-body-open") ? $(n).slideUp(200, function() {
            $(this).removeClass("panel-body-open")
        }) : $(n).slideDown(200, function() {
            $(this).addClass("panel-body-open")
        }), i || t.find(".panel-body-open").not(n).slideUp(200, function() {
            $(this).removeClass("panel-body-open")
        }), !1
    });
    $(".dataTables_length select").on("change", function() {
        onresize()
    });
    $(".toggle").on("click", function() {
        var n = $("#" + $(this).data("toggle"));
        return n.is(":visible") ? n.addClass("hidden").removeClass("show") : n.addClass("show").removeClass("hidden"), !1
    });
    $(".messages .item").each(function(n) {
        var t = $(this);
        setInterval(function() {
            t.addClass("item-visible")
        }, n * 300)
    });
    x_navigation()
});
$(function() {
    onload();
});
$(window).resize(function() {
    x_navigation_onresize();
    page_content_onresize()
});
Object.size = function(n) {
    var t = 0;
    for (var i in n) n.hasOwnProperty(i) && t++;
    return t
}

/*
(function ($) {
    "use strict";
})(jQuery);
*/