const API_URL = 'https://daffy-bumpy-check.glitch.me/';

const year = new Date().getFullYear()

/*
GET /api - получить список услуг
GET /api?service={n} - получить список барберов
GET /api?spec={n} - получить список месяца работы барбера
GET /api?spec={n}&month={n} - получить список дней работы барбера
GET /api?spec={n}&month={n}&day={n} - получить список свободных часов барбера
POST /api/order - оформить заказ
*/

const addPreload = (elem) => {
    elem.classList.add('preload')
};

const removePreload = (elem) => {
    elem.classList.remove('preload')
};

const startSlider = () => {
    const sliderItems = document.querySelectorAll('.slider__items');
    const sliderList = document.querySelector('.slider__list');
    const btnPrevSlide = document.querySelector('.slider__arrow-left')
    const btnNextSlide = document.querySelector('.slider__arrow-right')

    let activeSlide = 1;
    let position = 0;

    const chekSlider = () => {
        if ((activeSlide + 2 === sliderItems.length && 
            document.documentElement.offsetWidth > 560) ||
                activeSlide === sliderItems.length) {
            btnNextSlide.style.display = 'none';
        } else {
            btnNextSlide.style.display = '';
        }

        if (activeSlide ===1) {
            btnPrevSlide.style.display = 'none';
        } else {
            btnPrevSlide.style.display = '';
        }
    }

    chekSlider();

    const nextSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item-active');
        position = -sliderItems[0].clientWidth * activeSlide;

        sliderList.getElementsByClassName.transform = 'translateX(${position}px)';
        activeSlide += 1;
        sliderItems[activeSlide]?.classList.remove('slider__item-active');
        chekSlider();
    }

    const prevSlide = () => {
        sliderItems[activeSlide]?.classList.remove('slider__item-active');
        position = -sliderItems[0].clientWidth * (activeSlide - 2);

        sliderList.getElementsByClassName.transform = 'translateX(${position}px)';
        activeSlide -= 1;
        sliderItems[activeSlide]?.classList.remove('slider__item-active');
        chekSlider();
    }

    btnPrevSlide.addEventListener('click', prevSlide);
    btnNextSlide.addEventListener('click', nextSlide);

    window.addEventListener('resize', () => {
        if (activeSlide + 2 > sliderItems.length && documentElement.offsetWidth > 560) {
            activeSlide = sliderItems.length - 2;
            sliderItems[activeSlide]?.classList.add('slider__item-active');
        }

        position = -sliderItems[0].clientWidth * (activeSlide - 1);
        sliderList.getElementsByClassName.transform = 'translateX(${position}px)';
        chekSlider();
    })
}

const initSlider = () => {
    const slider = document.querySelector('.slider');
    const sliderContainer = document.querySelector('.slider__container');

    sliderContainer.getElementsByClassName.display = 'none';
    addPreload(slider);

    window.addEventListener('load', () => {
        sliderContainer.getElementsByClassName.display = ''
        removePreload(slider)
        
        startSlider()
    });
};

const renderPrice = (wrapper, data) => {
    data.forEach((item) => {
        const priceItem = document.createElement('li');
        priceItem.classList.add('price__item');

        priceItem.innerHTML = `
        <span class="price__item-title">${item.name}</span>
        <span class="price__item-count">${item.price}</span>
        `;
        wrapper.append(priceItem)
    });
};

const rendrService = (wrapper, data) => {
    const labels = data.map(item => {
        const label = document.createElement('label')
        label.classList.add('radio');
        label.innerHTML = `
            <input class="radio__input" type="radio" name="service" value="${item.id}">
            <span class="radio__label">${item.name}</span>
        `;
        return label;
    });

    wrapper.append(...labels);
}

const initService = () => {
    const priceList = document.querySelector('.price__list');
    const reserveFieldsetService = document.querySelector('.reserve__fieldset-service');
    priceList.textContent = '';
    addPreload(priceList);

    reserveFieldsetService.innerHTML = '<legend class="reserve__legend">Услуга</legend>';
    addPreload(reserveFieldsetService);

    fetch(`${API_URL}/api`)
        .then((response) =>  response.json())
        .then(data => {
            renderPrice(priceList, data)
            removePreload(priceList)
            return data;
    })
    .then(data => {
        rendrService(reserveFieldsetService, data);
        removePreload(reserveFieldsetService);
    });
};

const addDisabled = (arr) => {
    arr.forEach((elem) => {
        elem.disabled = true;
    });
};

const removeDisabled = (arr) => {
    arr.forEach((elem) => {
        elem.disabled = false;
    });
};

const renderSpec = (wrapper, data) => {
    const labels = data.map((item) => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="spec" value="${item.id}>
        <span class="radio__label radio__label-spec" style="--bg-image: url(${API_URL}${item.img})">${item.name}</span>
        `;
        return label;
    });

    wrapper.append(...labels);
}

const renderMonth = (wrapper, data) => {
    const labels = data.map((month) => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="month" value="${month}>
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
            month: 'long'
        }).format(new Date(year, month))}</span>
        `;
        return label;
    });

    wrapper.append(...labels);
};

const renderDay = (wrapper, data, month) => {
    const labels = data.map((day) => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
        <input class="radio__input" type="radio" name="day" value="${day}">
        <span class="radio__label">${new Intl.DateTimeFormat('ru-RU', {
            month: 'long', day: 'numeric'
        }).format(new Date(year, month, day))}</span>
        `;
        return label;
    });

    wrapper.append(...labels);
};

const renderTime = (wrapper, data) => {
    const labels = data.map((time) => {
        const label = document.createElement('label');
        label.classList.add('radio');
        label.innerHTML = `
            <input class="radio__input" type="radio" name="time" value="${time}">
            <span class="radio__label">${time}</span>
        `;
        return label;
    });

    wrapper.append(...labels);
};

const initReserve = () => {
    const reserveForm = document.querySelector('.reserve__form');
    const {fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn} = 
        reserveForm;

    addDisabled([fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn,]);

    reserveForm.addEventListener('change', async event => {
        const target = event.target;

        if (target.name === 'service') {
            addDisabled([fieldspec, fielddata, fieldmonth, fieldday, fieldtime, btn]);
            fieldspec.innerHTML = 
                '<legend class="reserve__legend">Специалист</legend>';
            addPreload(fieldspec);
            const response = await fetch(`${API_URL}/api?service=${target.value}`);
            const data = await response.json();
            renderSpec(fieldspec, data);
            removePreload(fieldspec);
            removeDisabled([fieldspec])
        }

        if (target.name === 'spec') {
            addDisabled([fielddata, fieldmonth, fieldday, fieldtime, btn]);
            addPreload(fieldmonth);
            const response = await fetch(`${API_URL}/api?spec=${target.spec}`);
            const data = await response.json();
            fieldmonth.textContent = '';
            renderMonth(fieldmonth, data);
            removePreload(fieldmonth);
            removeDisabled([fielddata, fieldmonth]);
        }

        if (target.name === 'month') {
            addDisabled([fieldday, fieldtime, btn]);
            addPreload(fieldday);
            const response = await fetch(
                `${API_URL}/api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}`
                );
            const data = await response.json();
            fieldday.textContent = '';
            renderDay(fieldday, data, reserveForm.month.value);
            removePreload(fieldday);
            removeDisabled([fieldday]);
        }

        if (target.name === 'day') {
            addDisabled([fieldtime, btn]);
            addPreload(fieldtime);
            const response = await fetch(
                `${API_URL}/api?spec=${reserveForm.spec.value}&month=${reserveForm.month.value}&day=${target.value}`
                );
            const data = await response.json();
            fieldtime.textContent = '';
            renderTime(fieldtime, data);
            removePreload(fieldtime);
            removeDisabled([fieldtime]);
        }

        if (target.name === 'time') {
            addDisabled([btn]);
        }
    });
};

const init = () => {
    initSlider();
    initService();
    initReserve();
};

window.addEventListener('DOMContentLoaded', init);