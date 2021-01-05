/*Нельзя перетаскивать картинки */
$("img").mousedown(function(){
    return false;
});


/*Скрол-шапка + Кнопка наверх */
$(window).scroll(function(){
	if ($(this).scrollTop() > 60) {
		$('.header-scroll').addClass('fixed');
	  } else {
		$('.header-scroll').removeClass('fixed');
	}
});

$(window).scroll(function(){
      if ($(this).scrollTop() > 80) {
          $('.arrow-top').addClass('arrow-top_scroll');
      } else {
          $('.arrow-top').removeClass('arrow-top_scroll');
      }
});


/*Плавный скрол вверх*/
var t;
function up() {
  var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
  if(top > 0) {
    window.scrollBy(0,-150);
    t = setTimeout('up()',20);
  } else clearTimeout(t);
  return false;
}


/*Бургер меню*/ 
$("#toggle").click(function() {
	$(this).toggleClass("active");
	$("#overlay").toggleClass("open");
	$('html').toggleClass("hidden");
});
  

  