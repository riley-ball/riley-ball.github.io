const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis aliquet ex ac egestas. Mauris egestas quam ac metus imperdiet lacinia. Duis egestas leo interdum, egestas tortor in, volutpat orci. Nam libero nisl, consequat egestas molestie eu, malesuada ut sapien. Morbi a elementum tortor. Maecenas tempus ut velit ut commodo. Pellentesque rhoncus tristique sem eu volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi eget scelerisque elit, vel iaculis ligula. Etiam at ex sodales, finibus erat non, tempor lectus. Quisque congue pulvinar enim, dignissim dapibus orci feugiat ut. Nunc dapibus ac dui eget imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum blandit commodo bibendum. \n\nDuis et ex nibh. Sed a facilisis eros. Suspendisse porta fermentum ipsum, ac iaculis mauris egestas quis. Ut at ligula eget libero suscipit eleifend. Suspendisse finibus metus vel euismod cursus. Integer ac arcu tellus. Cras tristique tincidunt libero vitae malesuada. In eget auctor nibh. Ut dapibus tristique turpis a gravida. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam sit amet augue quis risus condimentum fringilla. Fusce pulvinar mi felis, in venenatis ante feugiat non.\n\nUt quis auctor elit. Sed risus dolor, porttitor nec ipsum sit amet, laoreet venenatis elit. Sed accumsan efficitur est, et cursus leo varius in. Phasellus porttitor dignissim maximus. Aenean orci odio, ultrices ut auctor non, dignissim in tortor. Nullam massa sem, auctor iaculis lorem sed, vestibulum rhoncus felis. Etiam varius convallis enim, ut imperdiet metus vestibulum in. Donec aliquet turpis quam, eget varius lorem ullamcorper quis.\n\nSed semper purus nec enim suscipit, vestibulum hendrerit libero vestibulum. Nam placerat ipsum id mauris porttitor, in congue nulla pharetra. Suspendisse mollis arcu ipsum, et ullamcorper metus tempor sed. Suspendisse potenti. Mauris sodales viverra elit id faucibus. Curabitur et risus at mi placerat condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus";

document.querySelectorAll(".lorem-ipsum").forEach((p) => {
  p.innerHTML = loremIpsum;
});

document.getElementById("toggleButton").addEventListener("click", function() {
  let navBar = document.getElementById("navBar");
  if (navBar.style.left === "" || navBar.style.left === "-200px") {
    navBar.style.left = "0";
  } else {
    navBar.style.left = "-200px";
  }
});

function isElementInThreshold(el, threshold) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= window.innerHeight * threshold &&
    rect.bottom >= window.innerHeight * (1 - threshold)
  );
}

function updateSections() {
  const sections = document.querySelectorAll(".colored-section");
  let visibleSectionFound = false;

  for (const section of sections) {
    const textElements = section.querySelectorAll("p, h1");

    if (!visibleSectionFound && isElementInThreshold(section, 0.5)) {
      document.body.style.backgroundColor = section.dataset.bgColor;
      textElements.forEach((el) => el.classList.remove("blurred-text"));
      visibleSectionFound = true;
    } else {
      textElements.forEach((el) => el.classList.add("blurred-text"));
    }
  }
}

function isInViewport(element) {
const rect = element.getBoundingClientRect();
const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

return (
    (rect.top <= windowHeight && rect.bottom >= 0) &&
    (rect.left <= windowWidth && rect.right >= 0)
);
}

function handleSectionVisibility() {
const sections = document.querySelectorAll('.colored-section');

for (const section of sections) {
    if (isInViewport(section)) {
    section.classList.add('visible');
    } else {
    section.classList.remove('visible');
    }
}
}

document.addEventListener('DOMContentLoaded', handleSectionVisibility);
window.addEventListener('scroll', handleSectionVisibility);

function updateProgressIndicators() {
const sections = document.querySelectorAll('.colored-section');
const progressIndicators = document.getElementById('progress-indicators');

progressIndicators.innerHTML = '';
for (const section of sections) {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    const percentage = ((section.getBoundingClientRect().top + section.offsetHeight) / (section.offsetHeight + window.innerHeight)) * 100;
    indicator.style.width = `${100 - percentage}%`;

    progressIndicators.appendChild(indicator);
}
}

document.addEventListener('DOMContentLoaded', updateProgressIndicators);
window.addEventListener('scroll', updateProgressIndicators);
  

window.addEventListener("scroll", updateSections);

// Set initial states
updateSections();

let scrollingHeader = document.getElementById("scrolling-header");
let originalText = scrollingHeader.textContent;
let contentContainer = scrollingHeader.querySelector('.content-container');
contentContainer.innerHTML = Array(2).fill(`<p>${originalText}</p>`).join('');