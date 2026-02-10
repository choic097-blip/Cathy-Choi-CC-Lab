/* typing.js */

var typed = new Typed('#typed', {
    strings: [
        "a multi-content creator.",
        "a game developer.",
        "a web designer.",
        "an artist.",
        "a story director.",
        "an author."
    ],
    typeSpeed: 50,    // 글자 찍는 속도 (작을수록 빠름)
    backSpeed: 30,    // 지우는 속도
    backDelay: 1000,  // 다 찍고나서 지우기 전 대기 시간
    startDelay: 500,  // 시작 전 대기 시간
    loop: true,       // 무한 반복
    showCursor: true, // 커서 깜빡임 보이기
    cursorChar: '|',  // 커서 모양
});
