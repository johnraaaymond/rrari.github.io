$(document).ready(function() {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            let self = this;
            $('.et-hero-tab').click(function(event) { 
                self.onTabClick(event, $(this)); 
            });
            $(window).scroll(() => { this.onScroll(); });
            $(window).resize(() => { this.onResize(); });
        }
        
        onTabClick(event, element) {
            event.preventDefault();
            let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
            $('html, body').animate({ scrollTop: scrollTop }, 600);
        }
        
        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }
        
        onResize() {
            if(this.currentId) {
                this.setSliderCss();
            }
        }
        
        checkTabContainerPosition() {
            let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
            if($(window).scrollTop() > offset) {
                $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
            } else {
                $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
            }
        }
        
        findCurrentTabSelector() {
            let newCurrentId;
            let newCurrentTab;
            let self = this;
            $('.et-hero-tab').each(function() {
                let id = $(this).attr('href');
                let offsetTop = $(id).offset().top - self.tabContainerHeight;
                let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
                if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                    newCurrentId = id;
                    newCurrentTab = $(this);
                }
            });
            if(this.currentId != newCurrentId || this.currentId === null) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                this.setSliderCss();
            }
        }
        
        setSliderCss() {
            let width = 0;
            let left = 0;
            if(this.currentTab) {
                width = this.currentTab.css('width');
                left = this.currentTab.offset().left;
            }
            $('.et-hero-tab-slider').css('width', width);
            $('.et-hero-tab-slider').css('left', left);
        }
    }

    new StickyNavigation();
});

const phrases = ['Web Developer', 'Project Manager', 'Scrum Master'];
const typewriterText = document.getElementById('typewriter-text');
let currentPhraseIndex = 0;
let isDeleting = false;
let text = '';
let index = 0;
const typingSpeed = 100; // Speed of typing
const deletingSpeed = 50; // Speed of deleting (faster now)
const pauseDuration = 1000; // Pause duration between phrases

function typeWriterEffect() {
    let currentPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        text = currentPhrase.substring(0, index--);
    } else {
        text = currentPhrase.substring(0, index++);
    }

    typewriterText.textContent = text;

    if (!isDeleting && index > currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeWriterEffect, pauseDuration); // Pause before deleting
    } else if (isDeleting && index < 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(typeWriterEffect, pauseDuration); // Pause before typing the next phrase
    } else {
        let speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriterEffect, speed); // Adjust typing and deleting speed
    }
}

// Initialize the typewriter effect
typeWriterEffect();

// This adds some nice ellipsis to the description:
document.querySelectorAll(".projcard-description").forEach(function(box) {
    $clamp(box, {clamp: 6});
  });

