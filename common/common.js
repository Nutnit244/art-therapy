
if (!window.scriptLoaded) {
    window.scriptLoaded = true; 

    document.addEventListener("DOMContentLoaded", function() {
        console.log("common.js loaded");

        // ✅ Toggle Menu (แก้ให้ใช้ menu ใน main.html)
        window.toggleMenu = function() {
            console.log("toggleMenu triggered");
            const menu = document.getElementById('myMenu');
            if (menu) {
                menu.classList.toggle('hidden');
            } else {
                console.error("Element with id 'myMenu' not found.");
            }
        };

        // ✅ Toggle Submenu (แก้ให้แน่ใจว่าเมนูย่อยเปลี่ยนไอคอนถูกต้อง)
        window.toggleSubmenu = function(event) {
            event.preventDefault();
            const li = event.currentTarget.closest('.has-submenu');
            if (li) {
                li.classList.toggle('open');
                const arrow = li.querySelector('.arrow');
                if (arrow) {
                    arrow.textContent = li.classList.contains('open') ? '▲' : '▼';
                }
            }
        };

        // ✅ ใช้ <audio> เดิมแทน new Audio() เพื่อไม่ให้เสียงซ้ำ
        let globalAudio = document.getElementById("background-music");
        const soundIcon = document.getElementById("sound-icon");

        if (!globalAudio) {
            console.error("Audio element not found. Ensure <audio id='background-music'> exists in main.html.");
            return;
        }

        // ✅ โหลดสถานะเสียงจาก localStorage
        const isPlaying = localStorage.getItem("isPlaying") || "false";
        const currentTime = localStorage.getItem("currentTime") || "0";

        globalAudio.currentTime = parseFloat(currentTime);

        if (isPlaying === "true") {
            globalAudio.play();
            soundIcon.src = 'assets/img/soundonicon.PNG';
        } else {
            soundIcon.src = 'assets/img/soundofficon.PNG';
        }

        // ✅ บันทึกสถานะก่อนออกจากหน้า
        window.addEventListener("beforeunload", function() {
            localStorage.setItem("isPlaying", !globalAudio.paused);
            localStorage.setItem("currentTime", globalAudio.currentTime);
        });

        // ✅ Toggle Sound (แก้ไขให้ใช้ globalAudio เดิม)
        window.toggleSound = function() {
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
        };
    });
}