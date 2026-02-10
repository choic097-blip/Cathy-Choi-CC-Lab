// 요소 선택
const sliderSection = document.getElementById('sliderArea');
const track = document.getElementById('track');

// 설정값
const itemWidth = 250; // CSS에서 설정한 박스 너비
const gap = 20;        // CSS에서 설정한 gap
const singleItemWidth = itemWidth + gap; // 아이템 하나가 차지하는 실제 너비 (270px)
const numberOfOriginalItems = 4; // 원본 아이템 개수 (Project 1~4)

// 전체 한 세트의 길이 (이만큼 이동하면 다시 0으로 리셋)
// 270px * 4개 = 1080px
const loopWidth = singleItemWidth * numberOfOriginalItems; 

let currentPosition = 0; // 현재 위치
let baseSpeed = 1.0;     // 기본 속도 (천천히 흐름)
let currentSpeed = 1.0;  // 현재 실제 속도
let targetSpeed = 1.0;   // 목표 속도 (휠 돌리면 빨라짐)
let isHovering = false;  // 마우스가 슬라이더 위에 있는지 확인

// 1. 매 프레임마다 실행되는 애니메이션 루프
function animate() {
    // 부드러운 감속/가속 (Lerp 효과)
    // 현재 속도를 목표 속도로 서서히 맞춤 (0.05는 반응 속도)
    currentSpeed += (targetSpeed - currentSpeed) * 0.05;

    // 위치 이동
    currentPosition -= currentSpeed;

    // [핵심] 무한 루프 로직
    // 위치가 한 세트 길이(-1080px)만큼 가면 다시 0으로 몰래 이동
    if (currentPosition <= -loopWidth) {
        currentPosition += loopWidth; // 끊김 없이 위치 재조정
    }

    // 실제 화면에 적용
    track.style.transform = `translateX(${currentPosition}px)`;

    // 다음 프레임 요청
    requestAnimationFrame(animate);
}

// 애니메이션 시작
animate();


// 2. 마우스 감지 (슬라이더 영역에 들어왔을 때만 반응)
sliderSection.addEventListener('mouseenter', () => {
    isHovering = true;
});

sliderSection.addEventListener('mouseleave', () => {
    isHovering = false;
    targetSpeed = baseSpeed; // 나가면 원래 속도로
});

// 3. 휠 이벤트 (영역 내부에서만 작동)
sliderSection.addEventListener('wheel', (e) => {
    if (!isHovering) return; // 마우스가 위에 없으면 무시

    e.preventDefault(); // 페이지 전체 스크롤 방지 (슬라이더만 집중)

    // 휠 방향에 따라 가속
    if (e.deltaY > 0) {
        targetSpeed = 15.0; // 아래로 휠: 엄청 빨라짐
    } else {
        targetSpeed = 15.0; // 위로 휠: (원하면 반대로 -15.0 설정 가능)
    }

    // 휠 멈춤 감지 (setTimeout)
    clearTimeout(window.wheelTimer);
    window.wheelTimer = setTimeout(() => {
        targetSpeed = baseSpeed; // 휠 멈추면 천천히 원래 속도로 복귀
    }, 100);
}, { passive: false });
