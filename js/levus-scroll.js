{
  // scroll
  const scroll = document.querySelector('.levus-scroll');

  // scroll elements
  let items = scroll.querySelectorAll('.scroll-item');

  // дублюємо всі елементи скрола
  items.forEach(item => {
    const clone = item.cloneNode(!0);
    scroll.append(clone);
  });

  // new (all) scroll elements
  items = scroll.querySelectorAll('.scroll-item');

  // one item size
  let width = 1;

  // resize
  window.addEventListener('resize', move);

  // sizes
  const sizes = [];

  // z-index position
  let zIdex = 0;

  // fill sizes
  items.forEach((item, i) => sizes.push(i * width - width));

  // build scroll
  move();

  // left
  const left = document.querySelector('.levus-scroll-nav .left');

  // right
  const right = document.querySelector('.levus-scroll-nav .right');

  // scroll to left
  left.addEventListener('click', () => {
    const first = sizes.pop();
    sizes.unshift(first);
    move();
  });

  // scroll to right
  right.addEventListener('click', () => {
    const last = sizes.shift();
    sizes.push(last);
    move();
  });

  // function move 1 item
  function move() {

    if (scroll.offsetWidth < 400) {
      width = scroll.offsetWidth;
      items.forEach((item, i) => {
        item.style.width = `${scroll.offsetWidth}px`;

        item.style.transform = `translateX(${sizes[i] * width}px)`;

        // 2
        if (sizes[i] === width) zIdex = 3;
        // 1, 3
        else if (sizes[i] === 0 || sizes[i] === width * 2) zIdex = 2;
        // other
        else zIdex = 0;

        item.style.zIndex = zIdex;
      });
    }

    else if (scroll.offsetWidth < 600) {
      width = scroll.offsetWidth / 2;
      items.forEach((item, i) => {
        item.style.width = `${scroll.offsetWidth / 2}px`;

        item.style.transform = `translateX(${sizes[i] * width}px)`;

        // 2
        if (sizes[i] === width) zIdex = 3;
        // 1, 3
        else if (sizes[i] === 0 || sizes[i] === width * 2) zIdex = 2;
        // other
        else zIdex = 0;

        item.style.zIndex = zIdex;
      });
    }

    else if (scroll.offsetWidth > 599) {
      width = scroll.offsetWidth / 3;
      items.forEach((item, i) => {
        item.style.width = `${scroll.offsetWidth / 3}px`;

        item.style.transform = `translateX(${sizes[i] * width}px)`;

        // 2
        if (sizes[i] === width) zIdex = 3;
        // 1, 3
        else if (sizes[i] === 0 || sizes[i] === width * 2) zIdex = 2;
        // other
        else zIdex = 0;

        item.style.zIndex = zIdex;
      });
    }
  }
}