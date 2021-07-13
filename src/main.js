import './assets/scss/style.scss'
import $ from 'jquery'
import 'lightbox2'

$(function () {
  // デバイスにあわせたコンテンツサイズ
  var view = $(window).innerHeight();
  $("#hero").css("height", view);
  $("#result").css("height", view);
  $(".top_img").css("height", view);

  // メニュー用アニメーション
  var menu = $("header .modal_wrap");
  $("#menu").click(function () {
    if ($(this).hasClass("on")) {
      $(this)
        .removeClass("on")
        .addClass("off");
      $("#main_menu").fadeOut(750);
      menu.delay(750).queue(function () {
        $(this)
          .removeClass("on")
          .delay(750)
          .fadeOut("fast")
          .dequeue();
      });
    } else {
      $(this)
        .removeClass("off")
        .addClass("on");
      menu.fadeIn("fast").addClass("on");
      $("#main_menu")
        .delay(750)
        .fadeIn(400);
    }
  });

  $(".modal_wrap nav a").click(function () {
    $("#menu")
      .removeClass("on")
      .addClass("off");
    $("#main_menu").fadeOut(750);
    menu.delay(750).queue(function () {
      $(this)
        .removeClass("on")
        .delay(750)
        .fadeOut("fast")
        .dequeue();
    });
  });

  let randomTextArray = [];
  const randomText = $('.random_set_text');
  randomText.each(function (a){
    const text = randomText.eq(a).text();
    let numbers = [...Array(text.length).keys()];
    numbers = numbers.sort(function(){ return Math.random() - 0.5});
    randomText.eq(a).html('');
    for(let b = 0; b < text.length; b++) {
      const val = numbers[numbers.length - 1];
      numbers.pop();
      randomText.eq(a).append('<span class="random_text" style="transition-delay: 0.' +  val +'s;">' + text[b] + '</span>');
    }
    randomTextArray[a] = randomText.eq(a).offset().top;
  });

  let fadeInBlockArray = [];
  const fadeInBlock = $('.fade_in_block');
  fadeInBlock.each(function (a){
    fadeInBlockArray[a] = fadeInBlock.eq(a).offset().top;
  });

  const functionLine = view - view / 6;
  // Logo
  var titleLogoTop = $(".top_logo").offset().top;
  var titleLogoHeight = $(".top_logo").height();
  // スクロール関係
  $(window).scroll(function () {
    var scrollValue = $(this).scrollTop();
    // LogoAnimation
    const titleLogoResult =
      titleLogoTop + titleLogoHeight / 2 + -scrollValue / 10;
    if (titleLogoResult <= view) $(".top_logo").css("top", titleLogoResult);
    // backgroundAnimation
    const bgResult = scrollValue > view ? 0 : -scrollValue / 2;
    if (bgResult >= -view) $(".top_img").css("top", bgResult);

    randomText.each((i) => {
      if (scrollValue >= randomTextArray[i] - functionLine) {
        randomText.eq(i).children('span').addClass('on');
      }
    });

    fadeInBlock.each((i) => {
      if (scrollValue >= fadeInBlockArray[i] - functionLine) {
        fadeInBlock.eq(i).addClass('on');
      }
    });
  });

  // lightboxサボり用
  var replace = [
    { "": /.png/g },
    { "": /.jpg/g },
    { " ": /_/g },
    { "": /\.\/src\/assets\/img\//g }
  ];
  var gallery = $(".image_list a");
  gallery.each(function (i) {
    var src = gallery
      .find("img")
      .eq(i)
      .attr("src")
      .replace("thum/", "");
    gallery.eq(i).attr("href", src);
    $.each(replace, function (index, value) {
      $.each(value, function (key, value) {
        src = src.replace(value, key);
        gallery.eq(i).attr("data-title", src);
      });
    });
  });

  // galleryの画像表示処理
  gallery
    .on("touchstart", function () {
      $(this).addClass("on");
    })
    .on("touchend", function () {
      $(this)
        .delay(500)
        .queue(function () {
          $(this)
            .removeClass("on")
            .dequeue();
        });
    });
  gallery.hover(
    function () {
      $(gallery).removeClass("on");
      $(this).addClass("on");
    },
    function () {
      $(this).removeClass("on");
    }
  );

  // コンタクトフォーム入力繊維
  $(".contact_form button").on("click", function () {
    name = $('input[name="お名前"]').val();
    title = $('input[name="件名"]').val();
    mail = $('input[name="メールアドレス"]').val();
    message = $('textarea[name="本文"]').val();
    if (name === "") {
      return $("#notice").html("※お名前が未入力です");
    }
    if (title === "") {
      return $("#notice").html("※件名が未入力です");
    }
    if (mail === "") {
      return $("#notice").html("※メールアドレスが未入力です");
    } else if (!mail.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
      return $("#notice").html("※メールアドレスの形式が正しくありません");
    }
    if (message === "") {
      return $("#notice").html("※本文が未入力です");
    }

    $("#notice").html("");
    $("#contactName")
      .html("")
      .html(name);
    $("#contactTitle")
      .html("")
      .html(title);
    $("#contactMail")
      .html("")
      .html(mail);
    $("#contactMessage")
      .html("")
      .html(message.replace(/\r?\n/g, "<br>"));
    $("#contact .modal_wrap").fadeIn();
  });
  $("#cancel").on("click", function () {
    $("#contact .modal_wrap").fadeOut();
  });
  $("#submit").on("click", function () {
    $("#contact_form").submit();
  });

  // ローディング用のスクリプト
  var now_percent = 0;
  var displaying_percent = 0;
  var loaded = 0;
  var imgCount = $("img").length;
  $("img").each(function () {
    var src = $(this).attr("src");
    $("<img>")
      .attr("src", src)
      .on("load", function () { });
    loaded++;
  });
  now_percent = Math.ceil((100 * loaded) / imgCount);

  var timer = window.setInterval(function () {
    if (displaying_percent >= 100) {
      window.clearInterval(timer);
      view = $(window).innerHeight();
      $("#hero").css("height", view);
      $("#loader")
        .delay(200)
        .fadeOut()
        .queue(function () {
          $(window).scrollTop(0);
          $(".loading_window")
            .removeClass("on")
            .delay(750)
            .queue(function () {
              $(this)
                .fadeOut()
                .dequeue();
              $('.random_text, .fade_in_block').removeClass('on');
            });
        });
    } else {
      if (displaying_percent < now_percent) {
        displaying_percent++;
        $("#load-text").html(displaying_percent + "%");
        $("#bar span").css("width", displaying_percent + "%");
      }
    }
  }, 20);
});