// 27-06-2020
class LevusScroll {
  constructor(elements) {
    // global wrapper
    this.elements = document.querySelector(elements);
    // wrapper
    this.wrapper = this.elements.querySelector('.levus-scroll');
    // elements
    this.items = this.elements.querySelectorAll('.scroll-item');
    // to left button 
    this.left = this.elements.querySelector('.left');
    // to right button
    this.right = this.elements.querySelector('.right');
    // temporary array
    this.sizes = [];
    // one item size
    this.width = 1;
    // z-index
    this.zIndex = 0;
  }

  getElements() {
    // change quantity
    this.items.forEach(item => {
      const clone = item.cloneNode(!0);
      this.wrapper.append(clone);
    });

    this.items = this.elements.querySelectorAll('.scroll-item');
    return this.items;
  }

  toSizes(){
    this.items.forEach((item, i) => this.sizes.push(i * this.width - this.width));
  }

  arrows(){
    this.right.addEventListener('click', () => {
      const first = this.sizes.pop();
      this.sizes.unshift(first);
      this.move();
    });

    this.left.addEventListener('click', () => {
      const last = this.sizes.shift();
      this.sizes.push(last);
      this.move();
    });    
  }

  move(){
    if (this.wrapper.offsetWidth < 400) {
      this.width = this.wrapper.offsetWidth;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 0) this.zIndex = 3;
        else if(this.sizes[i] === -1 || this.sizes[i] === 1) this.zIndex = 2;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }

    else if (this.wrapper.offsetWidth < 600) {
      this.width = this.wrapper.offsetWidth / 2;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 0 || this.sizes[i] === 1 || this.sizes[i] === 2) this.zIndex = 3;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }

    else if (this.wrapper.offsetWidth > 599) {
      this.width = this.wrapper.offsetWidth / 3;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 1) this.zIndex = 3;
        else if (this.sizes[i] ===  0 || this.sizes[i] === 2) this.zIndex = 2;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }
  }
  
  resize(){
    const that = this;
    window.addEventListener('resize', function(){
      that.move();
    });
  }

  init() {
    this.getElements();
    this.toSizes();
    this.arrows();
    this.resize();
    this.move();
  }

}

// test 1
new LevusScroll('.levus-scroll-wrapper').init();

// test 2
new LevusScroll('.levus-scroll-wrapper-2').init();