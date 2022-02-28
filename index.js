stars();

gsap.to('#stars', 7,
  {
    rotation: 5,
    repeat: -1,
    yoyo: true,
    scale: 1.5,
  }
)

var backgroundDict = {
  'https://solarsystem.nasa.gov/system/feature_items/images/133_PIA22055_800w.jpg': 'Sequence: The Sun from its surface to its upper atmosphere all taken at about the same time on Oct. 27, 2017. Image Credit: NASA/GSFC/Solar Dynamics Observatory',
  'https://www.nasa.gov/images/content/533282main_messenger_orbit_image20110331_1_4by3_946-710.jpg': 'Mercury\'s Colorful Limb. Image Credit: NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washingto',
  'https://www.nasa.gov/sites/default/files/thumbnails/image/sdovenustransit.jpg': '2012 Venus Transit Path. Image Credit: NASA/Goddard Space Flight Center/SDO',
  'https://www.nasa.gov/sites/default/files/thumbnails/image/iss065e084062.jpg': 'A waning gibbous Moon above the Pacific Ocean. Image Credit: NASA',
  'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia24420.jpeg': 'Frosty Sand Dunes of Mars. Image Credit: NASA/JPL-Caltech/University of Arizona',
  'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia22692_hires.jpg': 'Jupiter\'s Magnificent Swirling Clouds. Image Credit: Enhanced Image by Gerald Eichstädt and Sean Doran (CC BY-NC-SA)/NASA/JPL-Caltech/SwRI/MSSS',
  'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pia18301_full.jpg': 'Study in Scarlet. Image Credit: NASA/JPL-Caltech/Space Science Institute',
  'https://d2pn8kiwq2w21t.cloudfront.net/original_images/jpegPIA00033.jpg': 'Uranus Rings in False Color. Image credit: NASA/JPL',
  'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/images/540545main_pia00317-full_full.jpg': 'Global Color Mosaic of Triton. Image credit: NASA/JPL/USGS',
};

const imageInfo = document.getElementById('imageInfo');
const toolTip = document.getElementById('toolTip');

dynamicImage();

document.getElementById('toolTip').addEventListener('mouseover', () => {
  toolTip.innerText = 'close';
  toolTip.style.transform = 'rotate(180deg)';
  imageInfo.style.visibility = 'visible';
})

document.getElementById('toolTip').addEventListener('mouseout', () => {
  imageInfo.style.visibility = 'hidden';
  toolTip.style.transform = 'rotate(0deg)';
  toolTip.innerText = 'info';
})

var pages = [
  'Sun',
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune'
];

document.getElementById('startTour').addEventListener('click', () => {
  document.getElementsByTagName('body')[0].style.overflowY = 'visible';
  backgroundAnimation();
  document.getElementById('stars').style.display = 'none';
  document.getElementById('sectiontwo').scrollIntoView();
  gsap.fromTo('#sectiontwo', delay = 5,
    { y: '150%' },
    { y: "0%" })
})

var slider = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 100,
  centeredSlides: true,
  mousewheel: true,
  pagination: {
    el: '.planet-links',
    clickable: true,
    renderBullet: function (index, className) {
      return `<div class=${className}>${pages[index]}</div>`;
    }
  }
});

slider.on('slideChange', function () {
  backgroundAnimation();

  gsap.fromTo('iframe', 10,
    { x: "150%", scale: 0 },
    {
      x: "0%",
      scale: 1,
    });

  gsap.to('.swiper-slide-active', 0.5, {
    scale: 0.85
  });

  gsap.to('#credits', 0.5, {
    autoAlpha: 0
  });

});

slider.on('slideChangeTransitionEnd', function () {

  gsap.to('.swiper-slide-active', 0.5, {
    scale: 1,
    ease: Power4.easeOut
  });

  gsap.to('.swiper-slide-active .slide-detail', 0, {
    autoAlpha: 1
  });
  gsap.to('.swiper-slide-active .slide-number', 0, {
    autoAlpha: 1
  });

  gsap.to('.swiper-slide-next .slide-detail', 0, {
    autoAlpha: 0
  });
  gsap.to('.swiper-slide-prev .slide-detail', 0, {
    autoAlpha: 0
  });

  gsap.to('.swiper-slide-next .slide-number', 0, {
    autoAlpha: 0
  });
  gsap.to('.swiper-slide-prev .slide-number', 0, {
    autoAlpha: 0
  });

  gsap.to('#credits', 5, {
    delay: 5,
    autoAlpha: 1
  });
});

function stars() {
  var starColor = ['white', 'grey', 'royalblue', 'yellowgreen', 'rosybrown', 'violet', 'lightseagreen', 'salmon', 'yellow', 'plum'];
  let count = 700;
  let i = 0;

  while (i < count) {
    let star = document.createElement('star');
    let size = Math.random() * 2;
    star.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
    star.style.top = Math.floor(Math.random() * window.innerHeight) + 'px';
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.position = 'absolute';
    star.style.backgroundColor = starColor[randomNum(0, 9)];
    star.style.borderRadius = '65%';
    document.getElementById('stars').appendChild(star);
    i++;
  }
}

function dynamicImage() {
  var index = randomNum(0, 8);
  var t1 = new TimelineMax({ repeat: -1 });
  t1.fromTo('#background', 5, { delay: 5, x: '110%', backgroundImage: `url('${Object.keys(backgroundDict)[index]}')`, backgroundSize: '100% 100%', autoAlpha: -1 }, { x: '0%', autoAlpha: 1 });
  imageInfo.innerText = Object.values(backgroundDict)[index];
  t1.to('#background', 5, { delay: 10, x: '110%', onComplete: dynamicImage });
  t1.play();
}

function backgroundAnimation() {
  gsap.to('#animate', {
    duration: 5,
    background: `radial-gradient(circle at ${randomNum(5, 95)}%, black ${randomNum(30, 100)}%, rgb(31, 30, 30) ${randomNum(30, 100)}%, rgba(255, 255, 255, 0.6) ${randomNum(30, 100)}%, black ${randomNum(30, 100)}% ${randomNum(30, 100)}%, rgba(255, 255, 255, 0.8))`,
    ease: 'sine.inOut',
    scale: 1.2,
    x: -25,
    repeat: -1,
    yoyo: true,
  })

  gsap.fromTo(['iframe', '.slide-detail', '.slide-number'],
    { x: 10 },
    {
      ease: 'sine.inOut',
      repeat: -1,
      x: -25,
      yoyo: true,
      duration: 5
    }
  );
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}