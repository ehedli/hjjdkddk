import { definePlugin } from "@utils/types";
import { chatInputButtons } from "@api/ChatInputButtons";
import { React } from "@webpack/common";

let capsLockActive = false;

// Caps Lock ikonu (SVG bileşeni)
const CapsIcon = () =>
    React.createElement("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor" },
        React.createElement("path", { d: "M12 3L4 11H9V21H15V11H20L12 3Z" })
    );

export default definePlugin({
    name: "ChatbarCapsLock",
    description: "Sohbet çubuğundaki buton açık olduğunda mesajları büyük harfe çevirir.",
    authors: [{ name: "Ehed", id: 0n }],

    start() {
        chatInputButtons.add("capslock-toggle", () => ({
            icon: CapsIcon,
            tooltip: capsLockActive ? "Caps Lock: AÇIK" : "Caps Lock: KAPALI",
            selected: capsLockActive,
            onClick: () => {
                capsLockActive = !capsLockActive;
            }
        }));
    },

    stop() {
        chatInputButtons.remove("capslock-toggle");
        capsLockActive = false;
    },

    preSend(channelId, messageObj) {
        if (capsLockActive && messageObj?.content) {
            messageObj.content = messageObj.content.toLocaleUpperCase("tr-TR");
        }
    }
});
