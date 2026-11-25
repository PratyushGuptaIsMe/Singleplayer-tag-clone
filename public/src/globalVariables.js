
window.gameWidth = width();
window.gameHeight = height();
onResize(() => {
    gameWidth = width();
    gameHeight = height();
});

window.start = new Date().getTime();
window.time = 0;
window.elapsed = "0.0";

function instance() {
    time += 100;

    elapsed = Math.floor(time / 100) / 10;

    document.title = elapsed;

    var diff = new Date().getTime() - start - time;
    setTimeout(instance, 100 - diff);
}

setTimeout(instance, 100);
