document.addEventListener("DOMContentLoaded", function () {
    const cloudLeft = document.getElementById("cloud_left");
    const cloudRight = document.getElementById("cloud_right");

    let scrollY = window.scrollY;
    let animationFrameId;
    let time = 0;

    function animateWiggle() {
        time += 0.01;

        // Wiggle for left cloud
        const wiggleXLeft = Math.sin(time * 1.2) * 10;
        const wiggleYLeft = Math.cos(time * 1.5) * 10;

        // Wiggle for right cloud (different freq and offset)
        const wiggleXRight = Math.sin(time * 0.9 + 1) * 10;
        const wiggleYRight = Math.cos(time * 1.3 + 2) * 10;

        const shift = Math.min(scrollY * 0.5, 300);
        const scrollOpacity = Math.max(1 - scrollY / 600, 0);

        cloudLeft.style.transform = `translate(${-shift + wiggleXLeft}px, ${scrollY * 0.3 + wiggleYLeft}px)`;
        cloudRight.style.transform = `translate(${shift + wiggleXRight}px, ${scrollY * 0.3 + wiggleYRight}px)`;

        cloudLeft.style.opacity = scrollOpacity;
        cloudRight.style.opacity = scrollOpacity;

        animationFrameId = requestAnimationFrame(animateWiggle);
    }

    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
    });

    animateWiggle();
});