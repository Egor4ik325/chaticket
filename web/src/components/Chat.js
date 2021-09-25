import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Messages from "./Messages";
import { chatRetrieve } from "../adaptors";

export default function Chat() {
    const [chat, setChat] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        chatRetrieve(id).then(setChat);
    }, [setChat]);

    const render = () => {
        if (chat) {
            return (
                <div>
                    <h3>{chat.full_name}</h3>
                    <p>{chat.name}</p>
                    <Messages />
                </div>
            )
        }

        return <p>Loading...</p>
    }

    return render();
}