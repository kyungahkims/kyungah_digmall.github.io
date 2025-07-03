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
	}, 1500);
}

/* nav 스크롤 */
let slide4Initialized = false;
let animationInitialized = false;

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

	if (activeIndex === 0 && !slide4Initialized) {
		initSlide4();
		slide4Initialized = true;
	}

	if (activeIndex !== 0) {
		slide4Initialized = false;
	}

	if (activeIndex === 1 && !animationInitialized) {
		startPage3Animation();
		animationInitialized = true;
	}

	if (activeIndex !== 1) {
		animationInitialized = false;
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
			if (swiper1) swiper1.updateAutoHeight();
			$('.faq').data('animating', false);
		});
	} else {
		setTimeout(function () {
			$currentAnswer.slideDown(300, function () {
				$currentAnswer.addClass('active');
				if (swiper1) swiper1.updateAutoHeight();
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
let swiper1 = null;
let swiper2 = null;
let swiper3 = null;
let swiper4 = null;

function initSlide1() {
	if (!swiper1) {
		swiper1 = new Swiper('.swiper1', {
			effect: 'slide',
			slidesPerView: 'auto',
			spaceBetween: 20,
			autoHeight: true,
			loop: true,
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			observer: true,
			observeParents: true,
			on: {
				slideChange: function () {
					if (this.realIndex === 1) {
						initSlide2();
						initSlide3();
						swiper2 ?.autoplay ?.start();
						swiper3 ?.autoplay ?.start();
					}
					if (this.realIndex === 2) {
						swiper4 ?.autoplay ?.start();
					}
					if (this.realIndex === 4) {
						startPage3Animation();
					}
				}
			}
		});
	}
}

function initSlide2() {
	const wrapper = document.querySelector('.swiper2 .swiper-wrapper');
	const slides = wrapper.querySelectorAll('.swiper-slide');

	if (!wrapper.dataset.cloned) {
		const slideCount = slides.length;
		for (let i = 0; i < slideCount * 2; i++) {
			const clone = slides[i % slideCount].cloneNode(true);
			wrapper.appendChild(clone);
		}
		wrapper.dataset.cloned = "true";
	}

	if (swiper2) {
		swiper2.destroy(true, true);
		swiper2 = null;
	}
	swiper2 = new Swiper('.swiper2', {
		slidesPerView: 'auto',
		spaceBetween: 15,
		loop: true,
		speed: 2000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
	});
}

function initSlide3() {
	const wrapper = document.querySelector('.swiper3 .swiper-wrapper');
	const slides = wrapper.querySelectorAll('.swiper-slide');

	if (!wrapper.dataset.cloned) {
		const slideCount = slides.length;
		for (let i = 0; i < slideCount * 2; i++) {
			const clone = slides[i % slideCount].cloneNode(true);
			wrapper.appendChild(clone);
		}
		wrapper.dataset.cloned = "true";
	}

	if (swiper3) {
		swiper3.destroy(true, true);
		swiper3 = null;
	}
	swiper3 = new Swiper('.swiper3', {
		slidesPerView: 'auto',
		spaceBetween: 15,
		loop: true,
		speed: 2000,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
	});
}

function initSlide4() {
	if (swiper4) {
		swiper4.destroy(true, true);
		swiper4 = null;
	}
	swiper4 = new Swiper('.swiper4', {
		direction: 'vertical',
		autoHeight: true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			stopOnLastSlide: true,
		},
		speed: 5000,
		loop: false,
		loopAdditionalSlides: 1,
		slidesPerView: 'auto',
		spaceBetween: 15,
		observer: true,
		observeParents: true,
		on: {
			init() {
				if (this.slides.length > 1) {
					this.slideTo(1, 0);
					this.slideTo(0, 0);
				}
				setTimeout(() => {
					swiper4 ?.autoplay ?.start();
				}, 100);
			}
		}
	});
}

function destroySlide1() {
	if (swiper1) {
		swiper1.destroy(true, true);
		swiper1 = null;
	}
}

/* 반응형 구조 변경 */
let articlesCloned = false;
let $detachedPage2 = null;

function onResize() {
	if ($(window).innerWidth() <= 1190) {
		if (!articlesCloned) {
			if (!$detachedPage2) {
				$detachedPage2 = $('.page2').detach();
			}

			const $articles = $detachedPage2.find('article').clone().get().reverse();

			$articles.forEach(function (article) {
				$(article).insertAfter($('.page1'));
			});

			$('.swiper1 > .swiper-wrapper').css('display', 'flex');
			destroySlide1();
			requestAnimationFrame(() => {
				initSlide1();
			});

			articlesCloned = true;
		}
	} else {
		destroySlide1();
		$('.swiper1 > .swiper-wrapper').css('display', 'block');

		if (articlesCloned && $detachedPage2) {
			$('.page1').nextAll('article').remove();
			$detachedPage2.insertAfter('.page1');
			$detachedPage2 = null;
			articlesCloned = false;
		}
	}
	setTimeout(() => {
		initSlide2();
		initSlide3();
		initSlide4();
	}, 100);
}

$(window).resize(onResize).trigger('resize');