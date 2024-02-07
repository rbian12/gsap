"use strict";

window.Webflow ||= [];
window.Webflow.push(() => {
    let splitType = new SplitType(".slider_cms_title", {
        types: "words, chars",
        tagName: "span",
      });
      
      $(".slider_wrap").each(function () {
        let childArrow = $(this).find(".slider_btn");
        let childItems = $(this).find(".slider_cms_item").hide();
        let childDots = $(this).find(".slider_dot_item");
        let totalSlides = childItems.length;
        let activeIndex = 0;
      
        childItems.first().css("display", "flex");
      
        // DOT Lines
        let tl2 = gsap.timeline({ repeat: -1 });
        childDots.each(function (index) {
          tl2.addLabel(`step${index}`);
          tl2.to($(this).find(".slider_dot_line"), {
            xPercent: 100,
            ease: "none",
            duration: 5,
            onComplete: () => {
              goNext(index + 1);
            },
          });
        });
      
        function moveSlide(nextIndex, forwards) {
          tl2.seek(`step${nextIndex}`);
      
          let titleForm = -100;
          let titleDelay = "<";
          if (forwards) {
            titleForm = 100;
            titleDelay = "<50%";
          }
          //
          childItems.hide();
          let prevItem = childItems.eq(activeIndex).css("display", "flex");
          let nextItem = childItems.eq(nextIndex).css("display", "flex");
          let tl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
      
          if (forwards) {
            tl.fromTo(
              nextItem,
              { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" },
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, -30% 100%)" }
            );
      
            tl.fromTo(
              prevItem,
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
              { clipPath: "polygon(0% 0%, 0% 0%, -30% 100%, 0% 100%)" },
              "<"
            );
          } else {
            tl.fromTo(
              nextItem,
              { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
              { clipPath: "polygon(0% 0%, 100% 0%, 130% 100%, 0% 100%)" }
            );
      
            tl.fromTo(
              prevItem,
              { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
              { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 130% 100%)" },
              "<"
            );
          }
      
          tl.fromTo(
            nextItem.find(".slider_cms_title .char"),
            { yPercent: titleForm },
            { yPercent: 0, duration: 0.5, stagger: { amount: 0.5 } },
            titleDelay
          );
          activeIndex = nextIndex;
        }
      
        function goNext(num) {
          let nextIndex = num;
          if (nextIndex > totalSlides - 1) nextIndex = 0;
          moveSlide(nextIndex, true);
        }
      
        // go next
        childArrow.eq(0).on("click", function () {
          //
          goNext(activeIndex + 1);
        });
      
        // go prev
        childArrow.eq(1).on("click", function () {
          //
          let nextIndex = activeIndex - 1;
          if (nextIndex < 0) nextIndex = totalSlides - 1;
          moveSlide(nextIndex, false);
        });
      
        childDots.on("click", function () {
          let dotIndex = $(this).index();
          if (activeIndex > dotIndex) {
            moveSlide(dotIndex, false);
          } else if (activeIndex < dotIndex) {
            moveSlide(dotIndex, true);
          }
        });
      });
      
});
