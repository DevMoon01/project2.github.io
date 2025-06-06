document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".action");
    var icon = button.querySelector("i");
    var videoOne = document.querySelector(".video");
    var videoTwo = document.querySelector(".video-2");

    // Disattiva Lenis su mobile
    if (window.innerWidth > 768) {
        const lenis = new Lenis({
            duration: 1.2
        });

        lenis.on('scroll', (e) => {
            console.log(e);
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Integration Lenis on GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Creazione ScrollTrigger GSAP
        function scrollTrig() {
            gsap.registerPlugin(ScrollTrigger);

            let gsapBl = document.querySelector('.gsap__bl').offsetWidth;
            let gsapTrack = document.querySelector('.gsap__track').offsetWidth;
            let scrollSliderTransform = gsapTrack - gsapBl;

            gsap.to('.gsap__track', {
                scrollTrigger: {
                    trigger: '.gsap_slider',
                    start: 'center center',
                    end: () => '+=' + (gsapTrack - 200),
                    pin: true,
                    scrub: true
                },
                x: '-=' + scrollSliderTransform + 'px'
            });
        }
        scrollTrig();
    } else {
        console.log("Lenis disabilitato su mobile");
    }

    // Evita il refresh su resize (fix per mobile)
    function onWindowResize() {
        console.log("Window resized, ma senza refresh!");
    }
    window.addEventListener("resize", onWindowResize);

    // Sincronizza i video
    function syncVideos() {
        videoTwo.currentTime = videoOne.currentTime;
    }
    videoOne.addEventListener("play", () => videoTwo.play());
    videoOne.addEventListener("pause", () => videoTwo.pause());
    videoOne.addEventListener("seeked", syncVideos);
    videoOne.addEventListener("timeupdate", syncVideos);

    // Controllo audio + cambio icona
    button.addEventListener("click", function () {
        if (videoOne.muted) {
            videoOne.muted = false;
            icon.classList.remove("fa-volume-off");
            icon.classList.add("fa-volume-xmark");
        } else {
            videoOne.muted = true;
            icon.classList.remove("fa-volume-xmark");
            icon.classList.add("fa-volume-off");
        }
    });

    // Imposta volume di default
    videoOne.volume = 0.3;
});
