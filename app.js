// MOBILE NAVIGATION LOGIC
const hamburgerBtn = document.getElementById('hamburger-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    const icon = hamburgerBtn.querySelector('i');
    if(sidebar.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
        icon.style.color = 'var(--accent)';
    } else {
        icon.className = 'fa-solid fa-bars';
        icon.style.color = '#fff';
    }
}

hamburgerBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);
sidebarLinks.forEach(link => link.addEventListener('click', toggleSidebar));

// GENDER SELECTION
let selectedGender = 'pria';
function setGender(gender) {
    selectedGender = gender;
    document.getElementById('btn-pria').classList.toggle('active', gender === 'pria');
    document.getElementById('btn-wanita').classList.toggle('active', gender === 'wanita');
}

// CALORIE ALGORITHM
function hitungGizi(event) {
    event.preventDefault();

    const usia = parseInt(document.getElementById('usia').value);
    const berat = parseFloat(document.getElementById('berat').value);
    const tinggi = parseFloat(document.getElementById('tinggi').value);
    const aktivitas = parseFloat(document.getElementById('aktivitas').value);

    let bmr = 0;
    if (selectedGender === 'pria') {
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) + 5;
    } else {
        bmr = (10 * berat) + (6.25 * tinggi) - (5 * usia) - 161;
    }

    const totalKkal = Math.round(bmr * aktivitas);

    const carbGram = Math.round((totalKkal * 0.45) / 4);
    const proteinGram = Math.round((totalKkal * 0.25) / 4);
    const fatGram = Math.round((totalKkal * 0.30) / 9);

    const resultBox = document.getElementById('result-box');
    resultBox.classList.add('active');

    // Reset bars
    document.getElementById('bar-carb').style.width = '0%';
    document.getElementById('bar-protein').style.width = '0%';
    document.getElementById('bar-fat').style.width = '0%';

    setTimeout(() => {
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Counter animation
    let currentCal = 0;
    const targetCal = totalKkal;
    
    const timer = setInterval(() => {
        currentCal += Math.ceil(targetCal / 30);
        if (currentCal >= targetCal) {
            currentCal = targetCal;
            clearInterval(timer);
            
            document.getElementById('bar-carb').style.width = '45%';
            document.getElementById('bar-protein').style.width = '25%';
            document.getElementById('bar-fat').style.width = '30%';
        }
        document.getElementById('calories-val').innerText = currentCal;
    }, 25);

    document.getElementById('label-carb').innerText = `${carbGram}g`;
    document.getElementById('label-protein').innerText = `${proteinGram}g`;
    document.getElementById('label-fat').innerText = `${fatGram}g`;
}
