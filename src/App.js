import logo from './logo.svg';
import './App.css';
import "./style.css"
import {useState} from "react";
const UserChat_0  = ({messages, setMessages}) => {

  const [groupList0, setGroupList0] = useState([]);

  const scrollToBottom = () => {
    const messageList = document.getElementById('messageList-0');
    if(!messageList) return
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height+100;
    setTimeout(()=>{
      messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, 10)
  };
  scrollToBottom()

  return (
      <div className="a">

        <div className="chat-container">
          <div className="header">
            <h1>Внутренний чат</h1>
            <input type="text" id={"searchInput-0"} placeholder="Поиск по сообщениям..."/>
            <button id="themeToggleButton-0" onClick={()=>{
              document.body.classList.toggle('dark-theme');
              var themeToggleButton = document.getElementById('themeToggleButton-0');
              themeToggleButton.textContent = document.body.classList.contains('dark-theme') ? 'Светлая тема' : 'Темная тема';
            }}>Темная тема</button>
            <button id="newGroupButton-0" onClick={()=>{
              const groupName = prompt('Введите название группы:');
              if (groupName) {
                setGroupList0([...groupList0, groupName]);
                document.getElementById('groupList-0').innerHTML += `<div class="group">${groupName}</div>`
              }
            }}>Новая группа</button>
          </div>
          <div className="group-list" id="groupList-0">
            {groupList0.map((groupName) => <div className="group" key={groupName}>{groupName}</div>)}
          </div>
          <div className="message-list" id="messageList-0">
            {messages.map((message, index) => (
                <div className={"message" + (message.user === 0 ? ' user-message' : ' other-message')} key={index}>
                  <div className="message-content">
                    <span className="message-text">{message.text}</span>
                    <span className="message-time">{message.time}</span>
                    {
                      message.user === 0 ? <span className="message-status">{message.self_status}</span>:
                        <span className="message-status">{message.another_status}</span>
                    }
                  </div>
                </div>
            ))}
          </div>
          <form id="messageForm-0">
                <textarea id="messageInput-0" placeholder="Введите сообщение..." rows="3" onInput={() =>{
                  const textarea = document.getElementById('messageInput-0');
                  const feedbackIndicator = document.getElementById('feedbackIndicator-0');
                  feedbackIndicator.textContent = textarea.value ? 'Печатает...' : '';
                }}></textarea>
            <input type="file" id="fileInput-0" onChange={()=>{
              const file = document.getElementById('fileInput-0').files[0];
              if (file) {
                //appendMessage(`Файл ${file.name} загружен`, true, 'Файл');
                setMessages([...messages, {
                  text: `Файл ${file.name} загружен`,
                  time: new Date().toLocaleTimeString(),
                  status: 'Файл',
                  user: 0
                }]);
                document.getElementById('fileInput-0').value = '';
              }
            }} hidden/>
            <button type="button" id="fileButton-0" onClick={()=>{ document.getElementById('fileInput-0').click()}}>📎</button>
            <button type="button" onClick={() => {
              const textarea = document.getElementById('messageInput-0');
              const feedbackIndicator = document.getElementById('feedbackIndicator-0');
              if (textarea.value) {
                setMessages([...messages, {
                  text: textarea.value,
                  time: new Date().toLocaleTimeString(),
                  self_status: 'Отправлено',
                  another_status: 'Получено',
                  user: 0
                }]);
                textarea.value = '';
                feedbackIndicator.textContent = 'Отправлено';
              }
            }}>Отправить</button>
            <button type="button" id="emojiButton-0" onClick={()=>{
              const textarea = document.getElementById('messageInput-0');
              textarea.value += '😊';
              textarea.focus();
            }}>😊</button>
          </form>
          <div id="feedbackIndicator-0"></div>
          <div className="call-buttons">
            <button id="callButton-0" onClick={()=>{
              const feedbackIndicator = document.getElementById('feedbackIndicator-0');
              feedbackIndicator.textContent = 'Звонок...';
            }}>Позвонить</button>
            <button id="videoCallButton-0" onClick={ () =>{
              const feedbackIndicator = document.getElementById('feedbackIndicator-0');
              feedbackIndicator.textContent = 'Видеозвонок...';
            }}>Видеозвонок</button>
          </div>
        </div>
      </div>
  )
}
const UserChat_1 = ({messages, setMessages}) => {
  const [groupList1, setGroupList1] = useState([]);

  const scrollToBottom = () => {
    const messageList = document.getElementById('messageList-1');
    if(!messageList) return
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height+100;
    setTimeout(()=>{
      messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }, 10)
  };
  scrollToBottom()

  return (
  <div className="a">
    <div className="chat-container">
      <div className="header">
        <h1>Внутренний чат</h1>
        <input type="text" id={"searchInput-1"} placeholder="Поиск по сообщениям..."/>
        <button id="themeToggleButton-1" onClick={()=>{
          document.body.classList.toggle('dark-theme');
          var themeToggleButton = document.getElementById('themeToggleButton-1');
          themeToggleButton.textContent = document.body.classList.contains('dark-theme') ? 'Светлая тема' : 'Темная тема';
        }}>Темная тема</button>
        <button id="newGroupButton-1" onClick={()=>{
          const groupName = prompt('Введите название группы:');
          if (groupName) {
            setGroupList1([...groupList1, groupName]);
            document.getElementById('groupList-1').innerHTML += `<div class="group">${groupName}</div>`
          }
        }}>Новая группа</button>
      </div>
      <div className="group-list" id="groupList-1">
        {groupList1.map((groupName) => <div className="group" key={groupName}>{groupName}</div>)}
      </div>
      <div className="message-list" id="messageList-1">
        {messages.map((message, index) => (
            <div className={ message.user === 1 ? "message user-message" : "message other-message"} key={index}>
              <div className="message-content">
                <span className="message-text">{message.text}</span>
                <span className="message-time">{message.time}</span>
                {
                  message.user === 1 ? <span className="message-status">{message.self_status}</span>:
                      <span className="message-status">{message.another_status}</span>
                }
              </div>
            </div>
        ))}
      </div>
      <form id="messageForm-1">
                <textarea id="messageInput-1" placeholder="Введите сообщение..." rows="3" onInput={() =>{
                  const textarea = document.getElementById('messageInput-1');
                  const feedbackIndicator = document.getElementById('feedbackIndicator-1');
                  feedbackIndicator.textContent = textarea.value ? 'Печатает...' : '';
                }}></textarea>
        <input type="file" id="fileInput-1" onChange={()=>{
          const file = document.getElementById('fileInput-1').files[0];
          if (file) {
            setMessages([...messages, {
              text: `Файл ${file.name} загружен`,
              time: new Date().toLocaleTimeString(),
              status: 'Файл',
              user: 1
            }]);
            document.getElementById('fileInput-1').value = '';
          }
        }} hidden/>
        <button type="button" id="fileButton-1" onClick={()=>{ document.getElementById('fileInput-1').click()}}>📎</button>
        <button type="button" onClick={() => {
          const textarea = document.getElementById('messageInput-1');
          const feedbackIndicator = document.getElementById('feedbackIndicator-1');
          if (textarea.value) {
            setMessages([...messages, {
              text: textarea.value,
              time: new Date().toLocaleTimeString(),
              self_status: 'Отправлено',
              another_status: 'Получено',
              user: 1
            }]);
            textarea.value = '';
            feedbackIndicator.textContent = 'Отправлено';
          }
        }}>Отправить</button>
        <button type="button" id="emojiButton-1" onClick={()=>{
          const textarea = document.getElementById('messageInput-1');
          textarea.value += '😊';
          textarea.focus();
        }}>😊</button>
      </form>
      <div id="feedbackIndicator-1"></div>
      <div className="call-buttons">
        <button id="callButton-1" onClick={()=>{
          const feedbackIndicator = document.getElementById('feedbackIndicator-1');
          feedbackIndicator.textContent = 'Звонок...';
        }}>Позвонить</button>
        <button id="videoCallButton-1" onClick={ () =>{
          const feedbackIndicator = document.getElementById('feedbackIndicator-1');
          feedbackIndicator.textContent = 'Видеозвонок...';
        }}>Видеозвонок</button>
      </div>
    </div>
  </div>
  )
}
function App() {
  const [messages, setMessages] = useState([]);
  return (
    <div className="app">
      <UserChat_0 messages={messages} setMessages={setMessages} />
      <UserChat_1 messages={messages} setMessages={setMessages} />
    </div>
  );
}

export default App;
