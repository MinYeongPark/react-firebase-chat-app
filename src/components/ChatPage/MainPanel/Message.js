import React from 'react'
import moment from 'moment';

function Message({ message, user }) {

    const timeFromNow = timestamp => moment(timestamp).fromNow();

    const isImage = message => {
        return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
    }
    const isMessageMine = (message, user) => {
       if(user) {
           return message.user.id === user.uid // 사용자가 보낸 메시지라면 회색으로 스타일링
       }
    }

    return (
        <div style={{ marginBottom: '3px', display:'flex' }}>
            <img
                style={{ borderRadius: '10px' }}
                width={48}
                height={48}
                className="mr-3"
                src={message.user.image}
                alt={message.user.name}
            />
            <div style={{
                backgroundColor: isMessageMine(message, user) && "#ECECEC"
            }}>
                <h6>{message.user.name}{" "}
                    <span style={{ fontSize: '10px', color: 'gray' }}>
                        {timeFromNow(message.timestamp)}
                    </span>
                </h6>
                {isImage(message) ? // 이미지인 경우, 텍스트인 경우 분기
                    <img style={{ maxWidth: '300px' }} alt="이미지" src={message.image} />
                    :
                    <p>
                        {message.content}
                    </p>
                }
            </div>
        </div>
    )
}

export default Message