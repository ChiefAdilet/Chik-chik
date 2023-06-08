const addPreload = (elem) => {
    elem.classList.add('preload')
}

const removePreload = (elem) => {
    elem.classList.remove('preload')
}

const startSlider = () => {
    const sliderItems = document.querySelectorAll('.slider__items');
    const sliderList = document.querySelector('.slider__list');
    const btnPrevSlide = document.querySelector('.slider__arrow-left')
    const btnNextSlide = document.querySelector('.slider__arrow-right')

    let activeSlide = 1;
    let position = 0;

    const nextSlide = () => {
        sliderItems[activeSlide].classList.remove('slider__item-active');
        position = -sliderItems[0].clientWidth * activeSlide;

        sliderList.getElementsByClassName.transform = 'translateX(${position}px)';
        activeSlide += 1;
        sliderItems[activeSlide].classList.remove('slider__item-active');
    }

    const prevSlide = () => {
        sliderItems[activeSlide].classList.remove('slider__item-active');
        position = -sliderItems[0].clientWidth * (activeSlide - 2);

        sliderList.getElementsByClassName.transform = 'translateX(${position}px)';
        activeSlide -= 1;
        sliderItems[activeSlide].classList.remove('slider__item-active');
    }

    btnPrevSlide.addEventListener('click', prevSlide);
    btnNextSlide.addEventListener('click', nextSlide);
}

const initSlider = () => {
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider__container');

    sliderContainer.getElementsByClassName.display = 'none';
    addPreload(slider);

    window.addEventListener('load', () => {
        sliderContainer.getElementsByClassName.display = ''
        addPreload(slider)
        
        startSlider()
    });
};

window.addEventListener('DOMContentLoaded', initSlider);
