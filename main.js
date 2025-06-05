$(function () {

    'use strict';


    //Lenis Smooth scroll
    const lenis = new Lenis({
        duration: 1.2
    })

    lenis.on('scroll', (e) => {
        console.log(e)
    })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    //Integration Lenis on GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    //Create animation ScrollTrigger
    function scrollTrig() {

        gsap.registerPlugin(ScrollTrigger);

        let gsapBl = $('.gsap__bl').width();

        //On full width
        // $('.gsap__item').css('width', gsapBl + 'px');

        //Transform slider track
        let gsapTrack = $('.gsap__track').width();
        let scrollSliderTransform = gsapTrack - gsapBl

        //Create ScrollTrigger
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

    //resize window
    const debouncedResize = _.debounce(onWindowResize, 500);
    function onWindowResize() {
        console.log('Window resized!');
        location.reload();
    }
    $(window).on('resize', debouncedResize);
});





// Selezioniamo tutti i contenitori con i video
var containers = document.querySelectorAll(".container__video");

containers.forEach(container => {
    // Selezioniamo il primo video (video principale) e il secondo video (video blur)
    var videoOne = container.querySelector(".video");
    var videoTwo = container.querySelector(".video-2");

    // Funzione per sincronizzare la posizione dei video
    function syncVideos() {
        // Sincronizza il tempo del video di sfondo con il video principale
        videoTwo.currentTime = videoOne.currentTime;
    }

    // Quando il video principale viene riprodotto, riproduci il video blur
    videoOne.addEventListener("play", () => {
        videoTwo.play();
    });

    // Quando il video principale viene messo in pausa, metti in pausa anche il video blur
    videoOne.addEventListener("pause", () => {
        videoTwo.pause();
    });

    // Quando il video principale cambia la posizione (durante il seek), sincronizza il tempo
    videoOne.addEventListener("seeked", syncVideos);

    // Quando il video principale è in riproduzione, sincronizza periodicamente la posizione
    videoOne.addEventListener("timeupdate", syncVideos);
});






document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".action");
    var icon = button.querySelector("i");
    var videoOne = document.querySelector(".video"); // Primo video
    var videoTwo = document.querySelector(".video-2"); // Secondo video (sempre mutato)

    button.addEventListener("click", function () {
        if (videoOne.muted) {
            videoOne.muted = false;
            icon.classList.remove("fa-volume-off");
            icon.classList.add("fa-volume-xmark"); // Cambia icona
        } else {
            videoOne.muted = true;
            icon.classList.remove("fa-volume-xmark");
            icon.classList.add("fa-volume-off"); // Torna all'icona mute
        }
    });

    // Assicura che il secondo video rimanga sempre mutato
    videoTwo.muted = true;
});




document.addEventListener("DOMContentLoaded", function () {
    var video = document.querySelector(".video");

    console.log("Video readyState:", video.readyState); // Deve essere almeno 3 per essere riproducibile

    video.volume = 0.2; // Imposta il volume a 30%
});