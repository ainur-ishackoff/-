document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');
    const currentChatName = document.getElementById('currentChatName');
    const groupList = document.getElementById('groupList');
    const fileInput = document.getElementById('fileInput');
    const fileButton = document.getElementById('fileButton');
    // const emojiButton = document.getElementById('emojiButton'); // Удалена кнопка эмодзи
    const searchInput = document.getElementById('searchInput');
    const photoButton = document.getElementById('photoButton');
    const videoButton = document.getElementById('videoButton');
    const voiceButton = document.getElementById('voiceButton');
    const galleryButton = document.getElementById('galleryButton');
    const locationButton = document.getElementById('locationButton');
    const contactsButton = document.getElementById('contactsButton');
    const notificationsButton = document.getElementById('notificationsButton');
    const feedbackIndicator = document.getElementById('feedbackIndicator');
    const addGroupButton = document.getElementById('addGroupButton');

    // Инициализация данных чатов - пустой объект
    const chats = {}; 

    // Объект для хранения контактов
    const contacts = {};

    let currentChat = null; // Изначально нет активного чата

    // Функция для отправки сообщения
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            const htmlText = emojione.toImage(text); // Преобразуем эмодзи в изображения

            const newMessage = {
                text: htmlText,
                sender: 'Вы',
                time: new Date().toLocaleTimeString(),
                id: Date.now(),
                pinned: false // Добавляем свойство pinned по умолчанию false
            };
            chats[currentChat].messages.push(newMessage);
            displayMessages(chats[currentChat]);
            messageInput.value = '';
            feedbackIndicator.textContent = 'Сообщение отправлено';
            setTimeout(() => {
                feedbackIndicator.textContent = '';
            }, 2000);
        }
    }

    // Функция для отправки сообщения с файлом
    function sendFileMessage(fileData, fileName, type) {
        const newMessage = {
            text: fileName,
            sender: 'Вы',
            time: new Date().toLocaleTimeString(),
            id: Date.now(),
            file: fileData,
            fileType: type,
            pinned: false // Добавляем свойство pinned по умолчанию false
        };
        chats[currentChat].messages.push(newMessage);
        displayMessages(chats[currentChat]);
        loadMedia(fileData, type, newMessage.id); // Загружаем медиафайл
    }

    // Функция для загрузки медиафайлов
    function loadMedia(fileData, fileType, messageId) {
        const messageElement = messageList.querySelector(`div[data-message-id="${messageId}"]`);
        if (fileType === 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = fileData;
            imgElement.classList.add('message-file', 'message-image');
            imgElement.dataset.messageId = messageId; // Добавляем атрибут с messageId
            imgElement.addEventListener('click', () => {
                deleteMedia(messageId); 
            });

            messageElement.textContent = '';
            messageElement.appendChild(imgElement);
        } else if (fileType === 'video') {
            const videoElement = document.createElement('video');
            videoElement.src = fileData;
            videoElement.controls = true;
            videoElement.classList.add('message-file', 'message-video');
            videoElement.dataset.messageId = messageId; // Добавляем атрибут с messageId
            videoElement.addEventListener('click', () => {
                deleteMedia(messageId); 
            });

            messageElement.textContent = '';
            messageElement.appendChild(videoElement);
        } else if (fileType === 'audio') {
            const audioElement = document.createElement('audio');
            audioElement.src = fileData;
            audioElement.controls = true;
            audioElement.classList.add('message-file', 'message-audio');
            messageElement.textContent = '';
            messageElement.appendChild(audioElement);
        }
    }

    // Функция для удаления медиафайла
    function deleteMedia(messageId) {
        if (confirm("Вы уверены, что хотите удалить это медиа?")) {
            const messageIndex = chats[currentChat].messages.findIndex(message => message.id === messageId);
            if (messageIndex !== -1) {
                chats[currentChat].messages.splice(messageIndex, 1);
                displayMessages(chats[currentChat]);
            }
        }
    }

    // Функция для отображения сообщений в чате
    function displayMessages(chat) {
        messageList.innerHTML = ''; // Очищаем список сообщений

        // Отфильтровываем закрепленные сообщения
        const pinnedMessages = chat.messages.filter(message => message.pinned);
        const unpinnedMessages = chat.messages.filter(message => !message.pinned);

        // Отображаем закрепленные сообщения
        if (pinnedMessages.length > 0) {
            const pinnedSection = document.createElement('div');
            pinnedSection.classList.add('pinned-messages');
            pinnedSection.innerHTML = '<h3>Закрепленные сообщения</h3>'; 
            pinnedMessages.forEach(message => {
                const messageElement = createMessageElement(message);
                pinnedSection.appendChild(messageElement);
            });
            messageList.appendChild(pinnedSection);
        }

        // Отображаем не закрепленные сообщения
        unpinnedMessages.forEach(message => {
            const messageElement = createMessageElement(message);
            messageList.appendChild(messageElement);
        });
    }

    // Функция для создания элемента сообщения
    function createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.dataset.messageId = message.id;

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');

        if (message.fileType === 'image') {
            const imgElement = document.createElement('img');
            imgElement.src = message.file;
            imgElement.classList.add('message-file', 'message-image');
            imgElement.dataset.messageId = message.id; // Добавляем атрибут с messageId
            imgElement.addEventListener('click', () => {
                deleteMedia(message.id); 
            });

            messageContent.appendChild(imgElement);
        } else if (message.fileType === 'video') {
            const videoElement = document.createElement('video');
            videoElement.src = message.file;
            videoElement.controls = true;
            videoElement.classList.add('message-file', 'message-video');
            videoElement.dataset.messageId = message.id; // Добавляем атрибут с messageId
            videoElement.addEventListener('click', () => {
                deleteMedia(message.id); 
            });

            messageContent.appendChild(videoElement);
        } else if (message.fileType === 'audio') {
            const audioElement = document.createElement('audio');
            audioElement.src = message.file;
            audioElement.controls = true;
            audioElement.classList.add('message-file', 'message-audio');
            messageContent.appendChild(audioElement);
        } else {
            messageContent.innerHTML = `
                <span class="message-sender">${message.sender}:</span>
                <span class="message-text">${message.text}</span>
                <span class="message-time">${message.time}</span>
            `;
        }

        const messageActions = document.createElement('div');
        messageActions.classList.add('message-actions');
        messageActions.innerHTML = `
            <button class="edit-button" data-message-id="${message.id}">Редактировать</button>
            <button class="delete-button" data-message-id="${message.id}">Удалить</button>
            <button class="pin-button" data-message-id="${message.id}" ${message.pinned ? 'aria-pressed="true"' : 'aria-pressed="false"'}>${message.pinned ? 'Открепить' : 'Закрепить'}</button>
        `;

        const editButton = messageActions.querySelector('.edit-button');
        editButton.addEventListener('click', () => {
            editMessage(message.id);
        });

        const deleteButton = messageActions.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            if (confirm(`Вы уверены, что хотите удалить это сообщение?`)) {
                deleteMessage(message.id);
            }
        });

        const pinButton = messageActions.querySelector('.pin-button');
        pinButton.addEventListener('click', () => {
            togglePinMessage(message.id);
            // Обновляем текст кнопки после закрепления/открепления
            pinButton.textContent = message.pinned ? 'Открепить' : 'Закрепить'; 
        });

        messageElement.appendChild(messageContent);
        messageElement.appendChild(messageActions);
        return messageElement;
    }

    // Функция для редактирования сообщения
    function editMessage(messageId) {
        const messageElement = messageList.querySelector(`div[data-message-id="${messageId}"]`);
        const messageText = messageElement.querySelector('.message-text');
        const newText = prompt('Введите новый текст:', messageText.textContent);
        if (newText) {
            const messageIndex = chats[currentChat].messages.findIndex(message => message.id === messageId);
            if (messageIndex !== -1) {
                chats[currentChat].messages[messageIndex].text = newText;
                displayMessages(chats[currentChat]);
            }
        }
    }

    // Функция для удаления сообщения
    function deleteMessage(messageId) {
        const messageIndex = chats[currentChat].messages.findIndex(message => message.id === messageId);
        if (messageIndex !== -1) {
            chats[currentChat].messages.splice(messageIndex, 1);
            displayMessages(chats[currentChat]);
        }
    }

    // Функция для переключения закрепления сообщения
    function togglePinMessage(messageId) {
        const messageIndex = chats[currentChat].messages.findIndex(message => message.id === messageId);
        if (messageIndex !== -1) {
            chats[currentChat].messages[messageIndex].pinned = !chats[currentChat].messages[messageIndex].pinned;
            displayMessages(chats[currentChat]);
        }
    }

    // Функция для отображения списка групп
    function displayGroups() {
        groupList.innerHTML = '';
        for (const groupName in chats) {
            const groupElement = document.createElement('div');
            groupElement.classList.add('group');

            // Создаем элемент для отображения имени группы
            const groupNameElement = document.createElement('span');
            groupNameElement.textContent = groupName;
            groupNameElement.classList.add('group-name'); // Добавляем класс для стилей

            // Создаем иконку карандаша для редактирования
            const editIcon = document.createElement('span');
            editIcon.classList.add('edit-group-icon');
            editIcon.textContent = '✏️';
            editIcon.dataset.groupName = groupName; // Добавляем атрибут с именем группы

            // Добавляем обработчик события для иконки
            editIcon.addEventListener('click', () => {
                editGroupName(groupName);
            });

            // Создаем иконку корзины
            const deleteIcon = document.createElement('span');
            deleteIcon.classList.add('delete-group-icon');
            deleteIcon.textContent = '🗑️';
            deleteIcon.dataset.groupName = groupName; // Добавляем атрибут с именем группы

            // Добавляем обработчик события для иконки
            deleteIcon.addEventListener('click', () => {
                deleteGroup(groupName);
            });

            // Добавляем элементы в группу
            groupElement.appendChild(groupNameElement);
            groupElement.appendChild(editIcon);
            groupElement.appendChild(deleteIcon);

            groupElement.addEventListener('click', () => {
                currentChat = groupName;
                currentChatName.textContent = groupName;
                displayMessages(chats[groupName]);
            });
            groupList.appendChild(groupElement);
        }
    }

    // Функция для удаления группы
    function deleteGroup(groupName) {
        if (confirm(`Вы уверены, что хотите удалить группу "${groupName}"?`)) {
            delete chats[groupName];
            displayGroups();
        }
    }

    // Функция для добавления новой группы
    function addGroup() {
        const groupName = prompt('Введите название новой группы:');
        if (groupName) {
            if (!chats[groupName]) {
                chats[groupName] = { messages: [] }; // Добавляем новую группу в объект chats
                displayGroups(); // Обновляем список групп
            } else {
                alert('Группа с таким названием уже существует!');
            }
        }
    }

    // Функция для редактирования названия группы
    function editGroupName(groupName) {
        const newGroupName = prompt('Введите новое название группы:', groupName);
        if (newGroupName) {
            if (!chats[newGroupName] && newGroupName !== groupName) { // Проверяем, не существует ли группа с новым именем
                // Переименовываем группу
                chats[newGroupName] = chats[groupName]; // Копируем данные
                delete chats[groupName]; // Удаляем старую группу
                displayGroups(); // Обновляем список групп
            } else {
                alert('Группа с таким названием уже существует!');
            }
        }
    }

    // Обработчик события для формы отправки сообщения
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        sendMessage();
    });

    // Обработчик события для поля ввода поиска
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const chat = chats[currentChat];
        const filteredMessages = chat.messages.filter(message => {
            return message.text.toLowerCase().includes(searchTerm);
        });
        displayMessages({messages: filteredMessages}); // Отображаем только отфильтрованные сообщения
    });

    // Обработчик события для кнопки выбора файла
    fileButton.addEventListener('click', () => {
        fileInput.click();
    });

    // Обработчик события для изменения файла
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileData = e.target.result;
                sendFileMessage(fileData, file.name, file.type.split('/')[0]);
            };
            reader.readAsDataURL(file);
        }
    });

    // Обработчики событий для кнопок инструментов
    photoButton.addEventListener('click', () => {
        fileInput.setAttribute('accept', 'image/*');
        fileInput.click();
    });

    videoButton.addEventListener('click', () => {
        fileInput.setAttribute('accept', 'video/*');
        fileInput.click();
    });

    voiceButton.addEventListener('click', recordVoice);
    locationButton.addEventListener('click', getLocation);
    contactsButton.addEventListener('click', chooseContact);

    // Обработчик событий для кнопки "Галерея"
    galleryButton.addEventListener('click', () => {
        // Открываем диалоговое окно выбора файлов
        fileInput.setAttribute('accept', 'image/*'); // Устанавливаем тип файлов
        fileInput.click();
    });

    // Обработчик событий для кнопки "Emoji" - удалена кнопка
    // emojiButton.addEventListener('click', () => {
    //     // Получаем позицию курсора в поле ввода
    //     const cursorPosition = messageInput.selectionStart;

    //     // Открываем эмодзи-пикер
    //     emojione.picker({
    //         // Дополнительные настройки, такие как позиция и размер
    //         // ...
    //         // Добавьте обработчик события для выбора эмодзи
    //         onSelect: (emoji) => {
    //             // Вставляем выбранный эмодзи в поле ввода
    //             messageInput.value = messageInput.value.substring(0, cursorPosition) + emoji + messageInput.value.substring(cursorPosition);
    //             // Перемещаем курсор после вставленного эмодзи
    //             messageInput.selectionStart = cursorPosition + emoji.length;
    //             messageInput.selectionEnd = cursorPosition + emoji.length;
    //         }
    //     });
    // });

    let notificationsEnabled = false;
    let subscription = null;

    // Функция для запроса разрешения на уведомления
    function requestNotificationPermission() {
        return new Promise((resolve, reject) => {
            if ('Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        resolve(true);
                    } else {
                        reject('Разрешение на уведомления не получено');
                    }
                });
            } else {
                reject('Браузер не поддерживает Web Push Notifications');
            }
        });
    }

    // Функция для создания подписки
    function subscribeUser() {
        return new Promise((resolve, reject) => {
            requestNotificationPermission()
                .then(() => {
                    navigator.serviceWorker.ready
                        .then(registration => {
                            registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: 'YOUR_PUBLIC_KEY' // Замените на ваш публичный ключ
                            })
                                .then(subscription => {
                                    resolve(subscription);
                                })
                                .catch(error => {
                                    reject(error);
                                });
                        });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    // Функция для отправки уведомления
    function sendNotification(title, body) {
        if (subscription) {
            fetch('YOUR_SERVER_URL/send_notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    subscription: subscription,
                    title: title,
                    body: body
                })
            })
                .then(response => {
                    // Обработка ответа сервера
                    // ...
                })
                .catch(error => {
                    // Обработка ошибки
                    // ...
                });
        }
    }

    // Обработчик событий для кнопки "Уведомления"
    notificationsButton.addEventListener('click', () => {
        notificationsEnabled = !notificationsEnabled;
        notificationsButton.textContent = notificationsEnabled ? 'Уведомления Вкл' : 'Уведомления Выкл';

        if (notificationsEnabled) {
            subscribeUser()
                .then(sub => {
                    subscription = sub;
                    // Отправьте данные подписки на ваш сервер
                    // ...
                })
                .catch(error => {
                    // Обработка ошибки
                    // ...
                });
        } else {
            // Отменить подписку
            // ...
        }
    });

    // Обработчик события для кнопки "Добавить группу"
    addGroupButton.addEventListener('click', addGroup);

    // Функция для записи голоса (пример)
    function recordVoice() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    // Создаем объект MediaRecorder
                    const recorder = new MediaRecorder(stream);

                    // Начинаем запись
                    recorder.start();

                    // Останавливаем запись по нажатию на кнопку
                    voiceButton.addEventListener('click', () => {
                        recorder.stop();
                    });

                    // Сохраняем записанный файл (пример)
                    recorder.onstop = (e) => {
                        const blob = new Blob(recorder.data, { type: 'audio/wav' });
                        const fileURL = URL.createObjectURL(blob);
                        sendFileMessage(fileURL, 'voice.wav', 'audio');
                    };
                })
                .catch(error => {
                    console.error('Ошибка при получении доступа к микрофону:', error);
                });
        } else {
            alert('Ваш браузер не поддерживает запись голоса.');
        }
    }

    // Функция для получения геопозиции (пример)
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    // Отправьте координаты на сервер или отобразите их в чате
                    const locationMessage = `Геопозиция: ${latitude}, ${longitude}`;
                    const newMessage = {
                        text: locationMessage,
                        sender: 'Вы',
                        time: new Date().toLocaleTimeString(),
                        id: Date.now(),
                        pinned: false // Добавляем свойство pinned по умолчанию false
                    };
                    chats[currentChat].messages.push(newMessage);
                    displayMessages(chats[currentChat]);
                },
                (error) => {
                    console.error('Ошибка при получении геопозиции:', error);
                    alert('Доступ к геолокации запрещен.');
                }
            );
        } else {
            alert('Ваш браузер не поддерживает геолокацию.');
        }
    }

    // Функция для выбора контакта (пример)
    function chooseContact() {
        const contactName = prompt('Введите имя контакта:', '');
        if (contactName) {
            if (!contacts[contactName]) { 
                contacts[contactName] = true; 
                const newMessage = {
                    text: `Контакт: ${contactName}`,
                    sender: 'Вы',
                    time: new Date().toLocaleTimeString(),
                    id: Date.now(),
                    pinned: false // Добавляем свойство pinned по умолчанию false
                };
                chats[currentChat].messages.push(newMessage);
                displayMessages(chats[currentChat]);
            } else {
                alert('Этот контакт уже существует!');
            }
        }
    }

    // Инициализация - отображаем список групп
    displayGroups(); 
});