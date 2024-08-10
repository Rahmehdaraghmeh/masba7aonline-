document.addEventListener('DOMContentLoaded', () => {
    const tasbeehOptions = document.querySelectorAll('.tasbeeh-option');
    const clickSound = document.getElementById('click-sound');
    const body = document.body;
    const maxCount = 100;

    // استرجاع الحالة من localStorage
    tasbeehOptions.forEach(option => {
        const optionId = option.id;
        let savedCount = localStorage.getItem(`${optionId}-count`);
        let savedCycles = localStorage.getItem(`${optionId}-cycles`);

        if (savedCount === null || savedCycles === null) {
            savedCount = 0;
            savedCycles = 0;
        }

        option.querySelector('.count').textContent = savedCount;
        option.querySelector('.cycle').textContent = `الدورة: ${savedCycles}`;
    });

    // قائمة الخلفيات
    const backgrounds = [
        './image/e421e883458368eb99049b6b2eecea5d.jpg',
        './image/e421e883458368eb99049b6b2eecea5d.jpg',
        './image/e421e883458368eb99049b6b2eecea5d.jpg',
        './image/e421e883458368eb99049b6b2eecea5d.jpg'
    ];

    tasbeehOptions.forEach(option => {
        let optionCount = parseInt(option.querySelector('.count').textContent);
        let cycles = parseInt(option.querySelector('.cycle').textContent.replace('الدورة: ', ''));

        option.addEventListener('click', () => {
            optionCount++;
            option.querySelector('.count').textContent = optionCount;
            clickSound.play();

            if (optionCount >= maxCount) {
                cycles++;
                option.querySelector('.cycle').textContent = `الدورة: ${cycles}`;
                optionCount = 0; // إعادة تعيين العداد للخيار الفردي
                option.querySelector('.count').textContent = optionCount;
            }

            // تخزين الحالة في localStorage
            const optionId = option.id;
            localStorage.setItem(`${optionId}-count`, optionCount);
            localStorage.setItem(`${optionId}-cycles`, cycles);

            // تغيير الخلفية عند النقر
            body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;
        });
    });
});