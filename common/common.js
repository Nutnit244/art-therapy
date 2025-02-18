  function toggleMenu() {
        const menu = document.getElementById('menu');
        menu.classList.toggle('open');
    }

let globalAudio;

document.addEventListener("DOMContentLoaded", () => {
    const soundIcon = document.getElementById("sound-icon");

    if (!globalAudio) {
        // สร้าง Audio Object ถ้ายังไม่มี
        globalAudio = new Audio('assets/Jazz Music.mp3');
        globalAudio.loop = true;

        // โหลดสถานะจาก localStorage
        const isPlaying = localStorage.getItem("isPlaying") || "false";
        const currentTime = localStorage.getItem("currentTime") || "0";

        globalAudio.currentTime = parseFloat(currentTime);
        if (isPlaying === "true") {
            globalAudio.play();
            soundIcon.src = 'assets/img/soundonicon.PNG';
        } else {
            soundIcon.src = 'assets/img/soundofficon.PNG';
        }

        // บันทึกสถานะก่อนออกจากหน้า
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("isPlaying", !globalAudio.paused);
            localStorage.setItem("currentTime", globalAudio.currentTime);
        });
    }
});

function toggleSound() {
    const soundIcon = document.getElementById("sound-icon");

    if (!globalAudio) return;

    if (globalAudio.paused) {
        globalAudio.play();
        soundIcon.src = 'assets/img/soundonicon.PNG';
        localStorage.setItem("isPlaying", "true");
    } else {
        globalAudio.pause();
        soundIcon.src = 'assets/img/soundofficon.PNG';
        localStorage.setItem("isPlaying", "false");
    }
}
