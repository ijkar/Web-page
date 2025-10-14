let movement1 = 0;
let movement2 = 0;
const rotatingDiv = document.getElementById('rotatingDiv');
const targetDiv = document.getElementById('targetDiv');
const sword1 = document.getElementById('sword1');
const sword2 = document.getElementById('sword2');
const health1 = document.getElementById('health1');
const health2 = document.getElementById('health2');
let jump = 50;
sword = ""
function move1(movement) {
    rotatingDiv.style.right = movement + '%';;
    sword2.style.right = movement + 5 + '%';;
}
function move2(movement) {
    sword1.style.left = movement + '%';;
    targetDiv.style.left = movement + -5 + '%';;
    
}
function Jump1(movement, sword, target) {
    target.style.top = movement + '%';;
    sword.style.top = movement + '%';;
    setTimeout(() => {
        target.style.top = '50%';
        sword.style.top = '50%';
    }, 300);
}
function duck(sword, target) {
    target.style.top = '60%';;
    sword.style.top = '60%';
}


function attack(sword) {
    sword.style.transform = 'rotate(-90deg)';   
}

// Store hit states to ensure health decreases only once per touch
let sword2HitTarget = false;
let sword1HitRotating = false;

// Store initial health bar widths
const initialHealth1Width = parseFloat(health1.style.width) || 50;
const initialHealth2Width = parseFloat(health2.style.width) || 50;

function isDivTouching() {
    const rotRect = rotatingDiv.getBoundingClientRect();
    const targetRect = targetDiv.getBoundingClientRect();
    const sword1Rect = sword1.getBoundingClientRect();
    const sword2Rect = sword2.getBoundingClientRect();

    function isOverlapping(rectA, rectB) {
        return (
            rectA.left < rectB.right &&
            rectA.right > rectB.left &&
            rectA.top < rectB.bottom &&
            rectA.bottom > rectB.top
        );
    }

    // Check if sword2 is touching targetDiv
    const sword2TouchingTarget = isOverlapping(sword2Rect, targetRect);

    // Check if sword1 is touching rotatingDiv
    const sword1TouchingRotating = isOverlapping(sword1Rect, rotRect);

    // Sword2 hits targetDiv (player 1 attacks player 2)
    if (sword2TouchingTarget) {
        if (!sword2HitTarget) {
            let currentWidth = parseFloat(health2.style.width) || initialHealth2Width;
            let newWidth = Math.max(currentWidth - 10, 0);
            health2.style.width = newWidth + '%';
            sword2HitTarget = true;
        }
        targetDiv.style.background = 'red';
    } else {
        targetDiv.style.background = 'coral';
        sword2HitTarget = false;
    }

    // Sword1 hits rotatingDiv (player 2 attacks player 1)
    if (sword1TouchingRotating) {
        if (!sword1HitRotating) {
            let currentWidth = parseFloat(health1.style.width) || initialHealth1Width;
            let newWidth = Math.max(currentWidth - 10, 0);
            health1.style.width = newWidth + '%';
            sword1HitRotating = true;
        }
        rotatingDiv.style.background = 'red';
    } else {
        rotatingDiv.style.background = 'lightblue';
        sword1HitRotating = false;
    }
}

setInterval(isDivTouching, 100); // Check every 100 milliseconds


document.addEventListener('keydown', (e) => {
    if (e.key === 'd') {
            movement2 += 1;
            move2(movement2);
            // Wait for rotation animation
        }
        if (e.key === 'a') {
            movement2 += -1;
            move2(movement2);
            // Wait for rotation animation
        }
        if (e.key === 'w') {
            jump = 30;
            Jump1(jump, sword1, targetDiv);
            // Wait for jump animation
        }
        if (e.key === 's') {
            duck(sword1, targetDiv);
            setTimeout(() => {
                targetDiv.style.top = '50%';
                sword1.style.top = '50%';
            }, 300);}

        if (e.key === 'z') {
        // Attack action for player 1
        attack(sword1);
        setTimeout(() => {
            sword1.style.transform = 'rotate(0deg)';
        }, 300);}
    });

    document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        movement1 += 1;
        move1(movement1);
         // Wait for rotation animation
    }
    if (e.key === 'ArrowRight') {
        movement1 += -1;
        move1(movement1);
         // Wait for rotation animation
    }
    if (e.key === 'ArrowUp') {
        jump = 30;
        Jump1(jump, sword2, rotatingDiv);
         // Wait for jump animation
    }
    if (e.key === 'ArrowDown') {
        duck(sword2, rotatingDiv);  
        setTimeout(() => {
            rotatingDiv.style.top = '50%';
            sword2.style.top = '50%';
        }, 300);}
    if (e.key === 'm') {
        // Attack action for player 1
        attack(sword2);
        setTimeout(() => {
            sword2.style.transform = 'rotate(0deg)';
        }, 300);}
    
});
// Initial check
