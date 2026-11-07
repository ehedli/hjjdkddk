import { patcher } from "@vendetta/patcher";
import { findByProps } from "@vendetta/metro";

// Find the module that contains the sendMessage function
const MessageActions = findByProps("sendMessage", "editMessage");

// Patch the sendMessage function – the "before" hook runs before the original
// function, allowing us to modify its arguments.
const unpatch = patcher.before("sendMessage", MessageActions, (args) => {
  // args[0] is the channel ID, args[1] is the message object
  if (args[1] && typeof args[1].content === "string") {
    // Force the message content to uppercase
    args[1].content = args[1].content.toUpperCase();
  }
});

// Export start/stop functions so Valenced can manage the plugin
export default {
  onLoad: () => {
    // Plugin loaded
  },
  onUnload: () => {
    // Remove the patch when the plugin is disabled/uninstalled
    unpatch();
  },
};
