
window.addEventListener("DOMContentLoaded", function() {

    let overlayBody = document.querySelector(".overlayBody");
    let title = document.querySelector(".hero__title");
    let projImg = document.querySelector(".project-img");
    let iframe = document.querySelector(".iframe__wrapper");
    let iframeControl = document.querySelector(".iframe__control");
    let img1 = document.querySelector(".img_1");
    let img2 = document.querySelector(".img_2");
    let img3 = document.querySelector(".img_3");
    let img4 = document.querySelector(".img_4");
    let img5 = document.querySelector(".img_5");
//     let img6 = document.querySelector(".img_6");
//     let img7 = document.querySelector(".img_7");
    let centerX = document.documentElement.clientWidth / 2;
    let centerY = document.documentElement.clientHeight / 2;
    let toggleScript = document.querySelector(".toggleScript");
    let bodyStyle = getComputedStyle(document.body);

    let navItem = document.querySelectorAll(".hero__nav-item");
    let navLink = document.querySelectorAll(".hero__nav-link");
    let navList = document.querySelector(".hero__nav-list");
    let section = document.querySelectorAll("section");
    let img =  document.querySelectorAll(".img");
    let desc = document.querySelectorAll(".desc");
    
    let bgTitle = document.querySelectorAll(".section__bg-title");
    let left = document.querySelectorAll(".left");
    let right = document.querySelectorAll(".right");
    
    let burger = document.querySelector(".hero__nav-burger");

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;


    let width = document.body.clientWidth;
    let offset = document.documentElement.clientWidth;
    let cssWindowWidth = window.innerWidth;
    

    let time = 1000;
    let delta = 0;
    let lastDelta = 0;
    let i = 0;
    let length = img.length;
    let lastTime;
            
    let onescr = false;


    let start = false;

    let skillsBar = document.querySelectorAll(".skills-item__bar");
    let skillsPercent = document.querySelectorAll(".skills-item__percent");

    navItem[0].classList.add("active");

    navList.addEventListener("click", function(e) {
        
        if(e.target.nodeName == "A" && onescr == false) {
            e.preventDefault();
            

            Array.from(section).forEach(function(i) {
                
                if(i.getAttribute("id") == e.target.getAttribute("href").slice(1)){
                    Array.from(navItem).forEach(function(k) {
                        k.classList.remove("active");
                    });
                    window.scrollTo(0, getCoords(i).top);
                    e.target.parentElement.classList.add("active");
                }
                if(e.target.getAttribute("href") == "#") {
                    Array.from(navItem).forEach(function(k) {
                        k.classList.remove("active");
                    });
                    window.scrollTo(0,0);
                    e.target.parentElement.classList.add("active");
                }
            });
        }
        return;
    })

    burger.addEventListener("click", function() {
        this.classList.toggle("closeBurger");
        navList.classList.toggle("navHeight");
    });



    function linkActive () {

        let y = window.scrollY;
    
        Array.from(navItem).forEach(function(k) {
            k.classList.remove("active");
        });
        
        

        Array.from(section).forEach(function(el, i) {

           

            if(y + 20  >= getCoords(el).top && y + 20  <= getCoords(el).bottom){
                navItem[i+1].classList.add("active");
            }else if(y < document.documentElement.clientHeight){
                navItem[0].classList.add("active");
            }
        });

        
    }


    function gyro(event) {
        let x = event.beta;  
        let y = event.gamma;

        if (x >  90) {
             x =  90
        };
        if (x < -90) {
             x = -90
        };
        x += 90;
        y += 90;
//         title.innerHTML = "работает ориентация" + x + "    <<<<x" + y + "    <<<<<<y";
 
        img1.style.transform = `translate3d(${(y - centerX) * 1/100}px, ${(x - centerY) * 1/100}px, 0 )`;
        img2.style.transform = `translate3d(${(y - centerX) * 2/100}px, ${(x - centerY) * 2/100}px, 0 )`;
        img3.style.transform = `translate3d(${(y - centerX) * 3/100}px, ${(x - centerY) * 3/100}px, 0 )`;
        img4.style.transform = `translate3d(${(y - centerX) * 4/100}px, ${(x - centerY) * 4/100}px, 0 )`;
        img5.style.transform = `translate3d(${(y - centerX) * 20/100}px, ${(x - centerY) * 20/100}px, 0 )`;

    };
    function gyro2() {
        title.innerHTML = orientation.x + "    " + orientation.y;
    }

if(window.DeviceOrientationEvent){
    
    window.addEventListener("deviceorientation", gyro);
}


function fixedNav () {
    let scrollDelta = window.scrollY;
    if(bodyStyle.overflowY != "hidden" && scrollDelta > 30) {
        navList.classList.add("navFixed");
    }else if(scrollDelta < 30) {
        navList.classList.remove("navFixed");
    }
    if(scrollDelta + navList.offsetHeight > getCoords(section[0]).top){
        navList.style.backgroundColor = "#000000";
    }else{
        navList.style.backgroundColor = "";
    }
}

if(cssWindowWidth <= 768){
    toggleScript.style.display = "none";
    window.removeEventListener("scroll", fixedNav);
}else {
    window.addEventListener("scroll", fixedNav);
}


   

    function getCoords(el) {

        let block = el.getBoundingClientRect();
    
        let scrollTop = window.pageYOffset;
        let scrollLeft = window.pageXOffset;

        let top = block.top + scrollTop;
        let bottom = block.bottom + scrollTop;
        let left = block.left + scrollLeft;
    
        return {
        top: top,
        left: left,
        bottom: bottom
        };

    }

    function disableScroll() {
        document.body.style.overflowY = "hidden";
    }

    function enableScroll() {
        document.body.style.overflowY = "auto";
    }

    disableScroll();

    title.classList.add("zIndex");
    title.classList.add("animated");
    title.classList.add("fadeInUp");

    setTimeout(function (){
        
        overlayBody.classList.add("removeOverlay");

        setTimeout(function () {
            overlayBody.parentElement.removeChild(overlayBody);
            title.classList.remove("zIndex");
            title.classList.remove("animated");
            title.classList.remove("fadeInUp");
        },1000);
        if(cssWindowWidth >= 768){
            onescr = true;
            oneScreen();
        }else{
            onescr = false;
            fullPage();
        }
        if(onescr == false) {
            enableScroll();
        }else{
            
            return;
        }
       
        
    }, 1500);

    document.documentElement.addEventListener("mousemove", function(e) {



        // console.log("x:>>" + (centerX  -  e.clientX) + "centerX:" + e.clientX + "... y:>>>" + (e.clientY - centerY) + "centerY:" + e.clientY);


        img1.style.transform = `translate3d(${(centerX  -  e.clientX) * 1/100}px, ${(e.clientY - centerY) * 1/100}px, 0 )`;
        img2.style.transform = `translate3d(${(centerX  -  e.clientX) * 2/100}px, ${(e.clientY - centerY) * 2/100}px, 0 )`;
        img3.style.transform = `translate3d(${(centerX  -  e.clientX) * 3/100}px, ${(e.clientY - centerY) * 3/100}px, 0 )`;
        img4.style.transform = `translate3d(${(centerX  -  e.clientX) * 4/100}px, ${(e.clientY - centerY) * 4/100}px, 0 )`;
        img5.style.transform = `translate3d(${(centerX  -  e.clientX) * 20/100}px, ${(e.clientY - centerY) * 20/100}px, 0 )`;
        // img6.style.transform = `translate3d(${(centerX  -  e.clientX) * 1/140}px, ${(centerY  -  e.clientY) * 1/140}px, 0 )`;
        // img7.style.transform = `translate3d(${(centerX  -  e.clientX) * 1/145}px, ${(centerY  -  e.clientY) * 1/145}px, 0 )`;

    });
    
    projImg.addEventListener("click", function() {
        iframe.style.display = "block";
        iframeControl.style.display = "block";
        document.body.classList.add("overlay");
    });

    iframeControl.addEventListener("click", function() {
        iframe.style.display = "none";
        iframeControl.style.display = "none";
        document.body.classList.remove("overlay");
    });

    function toggle(event) {
        event.target.classList.toggle("click");
        if(onescr !== false) {
            fullPage();
            // event.target.classList.add("click");
        }else{
            oneScreen();
            // event.target.classList.remove("click");
        }
    }


    toggleScript.addEventListener("click", toggle);

    function show(index) {

        index = i;
        if(index == 4) movePercentBar();
        Array.from(img).forEach(function(el) {
            el.style.top = "200vh";
        });
        Array.from(desc).forEach(function(el) {
            el.style.left = "200vw";
            
        });
        Array.from(navItem).forEach(function(el) {
            el.classList.remove("active");
        });

        navItem[i].classList.add("active");   
        img[i].style.top = "150px";
        desc[i].style.left = "50vw";

    };
    
    
    function wheeler(){
        
        Array.from(section).forEach(function(i, k) {
            right[k].classList.remove("hideRight");
            left[k].classList.remove("hideLeft");
        });

        let timeNow = new Date().getTime();

        if(timeNow - lastTime < time) return;
        lastDelta = delta;
        delta += event.deltaY;

        if(lastDelta < delta){
            i++;
            if(i >= length) {
                i=0;
            }
        }else{
            if(i > 0){
                i--;
            }else{
                i = length-1;
            }
        }
        show(i);
        lastTime = timeNow;
    }


    function oneScreen() {

        if(onescr == false) {
            window.removeEventListener("scroll", animateSection);
            onescr = true;
        }

        window.scrollTo(0, 0);

       
        
        

        document.body.style.overflow = "hidden";
        document.body.style.position = "relative";
        bodyStyle = getComputedStyle(document.body);

        Array.from(right).forEach(function(i,k) {
                right[k].classList.remove("hideRight");
            
        });

        Array.from(left).forEach(function(i,k) {

                left[k].classList.remove("hideLeft");

        });

        Array.from(bgTitle).forEach(function(i){
            i.style.position = "static";
        });

        Array.from(section).forEach(function(i){
            i.style.position = "static";
        });

        Array.from(desc).forEach(function(i) {
            i.classList.add("animate");
            i.style.position = "absolute";
            i.style.top = "30vh";
            i.style.left = "200vw";
            i.style.zIndex = "15";
        });

        Array.from(img).forEach(function(i) {
            i.classList.add("animate");
            i.style.position = "absolute";
            i.style.top = "200vh";
            i.style.left = "10vw";
            i.style.width = "30vw";
            i.style.zIndex = "15";
        });

        

        img[0].style.top = "150px";
        desc[0].style.left = "50vw";
        navItem[0].classList.add("active");


        Array.from(navLink).forEach(function(el, k) {
            el.addEventListener("click", function (e) {
                e.preventDefault();
                    i = k;
                    show(i);
            });
        });

        

        document.documentElement.addEventListener("wheel", wheeler);

    }

    function fullPage() {
        window.scrollTo(0, 0);
        window.addEventListener("scroll", animateSection);
        window.addEventListener("scroll", linkActive);
        if(onescr == true) {
            document.documentElement.removeEventListener("wheel", wheeler);
            onescr = false;
        }
        Array.from(navItem).forEach(function(k) {
            k.classList.remove("active");
        });
        
    
        document.body.style.overflow = "";
        document.body.style.position = "";
        bodyStyle = getComputedStyle(document.body);


        

        Array.from(bgTitle).forEach(function(i){
            i.style.position = "";
        });

        Array.from(section).forEach(function(i){
            i.style.position = "";
        });

        Array.from(desc).forEach(function(i) {
            i.style.width = "";
            i.classList.remove("animate");
            i.style.position = "";
            i.style.top = "";
            i.style.left = "";
            i.style.maxHeight = "";
            i.style.zIndex = "";
        });

        Array.from(img).forEach(function(i) {
            i.classList.remove("animate");
            i.style.position = "";
            i.style.top = "";
            i.style.left = "";
            i.style.width = "";
            i.style.maxHeight = "";
            i.style.zIndex = "";
        });
        

        img[0].style.top = "";
        desc[0].style.left = "";
        navItem[0].classList.add("active");

    }


    function animateSection () {

        let y = window.scrollY;

        if(onescr == false){
            if(y + 20  > getCoords(section[3]).top  &&  y + 20 < getCoords(section[3]).bottom && start == false) {
                    movePercentBar();
                
            }
            if(y + 20  < getCoords(section[3]).top  ||  y + 20 > getCoords(section[3]).bottom){
                start = false;
            }
        }
        
        Array.from(section).forEach(function(i, k) {
            if(y + 20  > getCoords(i).top && y + 20 < getCoords(i).bottom) {
                right[k].classList.add("fadeRight");
                right[k].classList.add("animated");
                left[k].classList.add("fadeLeft");
                left[k].classList.add("animated");
                right[k].classList.remove("hideRight");
                left[k].classList.remove("hideLeft");
            }else{
                right[k].classList.remove("fadeRight");
                right[k].classList.remove("animated");
                left[k].classList.remove("fadeLeft");
                left[k].classList.remove("animated");
                right[k].classList.add("hideRight");
                left[k].classList.add("hideLeft"); 
            }
        });


       

    }

    


    function movePercentBar() {
       

        Array.from(skillsBar).forEach(function(el) {
            el.style.width = "0";
        });

        Array.from(skillsPercent).forEach(function(el) {
            el.innerHTML = 0 + "%";
            el.style.left = "0";
        });

        
        Array.from(skillsBar).forEach(function(el, i) {

            let width = 1;
            let interval = setInterval(move, 20);

            function move() {
                if(width >= el.dataset.percent){
                    clearInterval(interval);
                }else{
                    width++;
                    el.style.width = width + "%";
                    skillsPercent[i].style.left = width + "%";
                    skillsPercent[i].innerHTML = width + "%";
                }
            }
            
        });

        start = true;
    }



});
