/* step */
let page3IntervalId = null;

function startPage3Animation() {
	const $items = $('.page3 .box_wrap li');
	let currentIndex = 0;

	function activateItem(index) {
		$items.removeClass('active');
		$items.eq(index).addClass('active');
	}

	activateItem(currentIndex);

	if (page3IntervalId) {
		clearInterval(page3IntervalId);
	}

	page3IntervalId = setInterval(function () {
		currentIndex = (currentIndex + 1) % $items.length;
		activateItem(currentIndex);
	}, 2500);
}

/* nav 스크롤 */
function onScroll() {
	const scTop = $(this).scrollTop() + 20;
	const pages = [];

	for (let i = 0; i < $('.page').length; i++) {
		pages[i] = $('.page').eq(i).offset().top - 100;
	}

	let activeIndex = -1;

	for (let i = pages.length - 1; i >= 0; i--) {
		if (scTop >= pages[i]) {
			activeIndex = i;
			break;
		}
	}

	$('.link').removeClass('active');

	if (activeIndex !== -1) {
		$('.link').eq(activeIndex).addClass('active');
	}

	if (activeIndex === 1) {
		startPage3Animation();
	}
}

$(function () {
	$(window).on('scroll', onScroll);
	onScroll();
});

$(window).scroll(onScroll).trigger('scroll');

/* nav 클릭 */
function onNavClick() {
	const tar = $('.page').eq($(this).index()).offset().top - 100;
	$('html, body').stop().animate({
		'scrollTop': tar
	}, 300);
}

$('.link').click(onNavClick);

/* faq 열린거 닫고 열고 닫기*/
$('.faq').click(function () {
	const $clicked = $(this);
	const $currentAnswer = $clicked.find('.faq_a');
	const isOpen = $currentAnswer.hasClass('active');

	if ($clicked.data('animating')) return;
	$('.faq').data('animating', true);

	const $openAnswers = $('.faq .faq_a.active').not($currentAnswer);

	$openAnswers.slideUp(300, function () {
		$(this).removeClass('active');
		$(this).closest('.faq').find('.faq_q').removeClass('active3');
		$(this).closest('.faq').find('button').removeClass('active2');
	});

	if (isOpen) {
		$currentAnswer.slideUp(300, function () {
			$currentAnswer.removeClass('active');
			$clicked.find('.faq_q').removeClass('active3');
			$clicked.find('button').removeClass('active2');
			if (swiper) swiper.updateAutoHeight();
			$('.faq').data('animating', false);
		});
	} else {
		setTimeout(function () {
			$currentAnswer.slideDown(300, function () {
				$currentAnswer.addClass('active');
				if (swiper) swiper.updateAutoHeight();
				$('.faq').data('animating', false);
			});
			$clicked.find('.faq_q').addClass('active3');
			$clicked.find('button').addClass('active2');
		}, 300);
	}
});

/* 비밀번호 on/off */
$('.pw_btn').on('click', function () {
	const targetId = $(this).data('target');
	const $input = $('#' + targetId);

	const isPassword = $input.attr('type') === 'password';
	$input.attr('type', isPassword ? 'text' : 'password');

	$(this).toggleClass('active');
});

/* 모달 */
$('.modal1').click(function () {
	$('.modal_wrap1').css('display', 'flex');
});
$('.modal2').click(function () {
	$('.modal_wrap2').css('display', 'flex');
});

$('.modal_wrap, .modal_wrap button').click(function () {
	$('.modal_wrap').css('display', 'none');
});

$('.pop').click(function (e) {
	e.stopPropagation();
});

$('.agree_btn1').on('click', function () {
	$('#checkbox').prop('checked', true);
});

$('.agree_btn2').on('click', function () {
	$('#checkbox2').prop('checked', true);
});

/* 슬라이드 */
let swiper = null;

function initSlide() {
	swiper = new Swiper('.swiper', {
		effect: 'slide',
		slidesPerView: 'auto',
		spaceBetween: 20,
		autoHeight: true,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		on: {
			slideChange: function () {
				if (this.realIndex === 2) {
					startPage3Animation();
				}
			}
		}
	});
}

function destroySlide() {
	if (swiper) {
		swiper.destroy(true, true);
		swiper = null;
	}
}

function onResize() {
	if ($(window).innerWidth() <= 1190) {
		$('.swiper-wrapper').css('display', 'flex');
		if (!swiper) initSlide();
	} else {
		destroySlide();
		$('.swiper-wrapper').css('display', 'block');
	}
}

$(window).resize(onResize).trigger('resize');