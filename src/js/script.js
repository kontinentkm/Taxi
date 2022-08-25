"use strict";

//Hamburger
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})

//Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');

modalTrigger.forEach(btn => {
	btn.addEventListener('click', function() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	});
});

function closeModal() {
	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

document.addEventListener('keydown', (e) => {
	if (e.code === "Escape" && modal.classList.contains('show')) { 
		closeModal();
	}
});


// ModalThanks
$('.modal_close').on('click', function() {
	$('#thanks').fadeOut('slow');
});


function validateForms(form){
	$(form).validate({
		 rules: {
			  name: {
					required: true,
					minlength: 2
			  },
			  phone: "required",
			//   email: {
			// 		required: true,
			// 		email: true
			//   }
		 },
		 messages: {
			  name: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символа!")
				 },
			  phone: "Пожалуйста, введите свой номер телефона",
			  email: {
				 required: "Пожалуйста, введите свою почту",
				 email: "Неправильно введен адрес почты"
			  }
		 }
	});
};

validateForms('#modal-window_form');


$('input[name=phone]').mask("+375 (99) 999-99-99");

$('form').submit(function(e) {
	e.preventDefault();
	$.ajax({
		 type: "POST",
		 url: "mailer/smart.php",
		 data: $(this).serialize()
	}).done(function() {
		 $(this).find("input").val("");
		 $('#modal-window').fadeOut();
		 $('#thanks').fadeIn('slow');

		 $('form').trigger('reset');
	});
	return false;
});