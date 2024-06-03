import * as React from "react";
import { Switch } from "@/components/switch";
import { Label } from "@/components/label";

const browser = chrome;

export default function App() {
  const [isRuleActive, setIsRuleActive] = React.useState(false);

  React.useEffect(() => {
    browser.runtime.sendMessage({ type: "get_toggle_info" });

    browser.runtime.onMessage.addListener(onMessageListener);
    function onMessageListener(message) {
      const { toggleStatus } = message;
      setIsRuleActive(toggleStatus);
    }
  });
  return (
    <main className="w-80 px-5 py-4 flex items-center space-x-3">
      <Switch
        id="switch"
        checked={isRuleActive}
        onCheckedChange={(isChecked) => {
          setIsRuleActive(isChecked);
          browser.runtime.sendMessage({
            type: "set_toggle_info",
            toggleStatus: isChecked,
          });
        }}
      />
      <Label htmlFor="switch">Redirect to yewtu.be</Label>
    </main>
  );
}
