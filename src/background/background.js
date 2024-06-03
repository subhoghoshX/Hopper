const browser = chrome;

browser.webNavigation.onBeforeNavigate.addListener(
  async (details) => {
    await browser.cookies.set({
      url: "https://yewtu.be",
      name: "PREFS",
      value: encodeURIComponent(
        JSON.stringify({
          annotations: false,
          annotations_subscribed: false,
          autoplay: true,
          automatic_instance_redirect: false,
          captions: ["", "", ""],
          comments: ["", ""],
          continue: false,
          continue_autoplay: true,
          dark_mode: "",
          latest_only: false,
          listen: false,
          local: false,
          watch_history: false,
          vr_mode: true,
          show_nick: false,
          locale: "en-US",
          region: "US",
          max_results: 40,
          notifications_only: false,
          player_style: "invidious",
          quality: "hd720",
          quality_dash: "auto",
          default_home: "",
          feed_menu: ["Trending"],
          related_videos: false,
          sort: "published",
          speed: 1.0,
          thin_mode: false,
          unseen_only: false,
          video_loop: false,
          extend_desc: false,
          volume: 100,
          save_player_pos: false,
        }),
      ),
      domain: ".yewtu.be",
      path: "/",
      expirationDate: new Date("2024-11-30T06:44:07.106Z").getTime() / 1000,
      sameSite: "lax",
      secure: true,
    });
  },
  { url: [{ hostContains: "yewtu.be" }] },
);

browser.runtime.onMessage.addListener(async (message) => {
  if (message.type === "get_toggle_info") {
    const rulesets = await browser.declarativeNetRequest.getEnabledRulesets();
    if (rulesets.length === 0) {
      browser.runtime.sendMessage({
        toggleStatus: false,
      });
    } else {
      browser.runtime.sendMessage({
        toggleStatus: true,
      });
    }
  } else if (message.type === "set_toggle_info") {
    const { toggleStatus } = message;
    if (toggleStatus) {
      browser.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: ["redirect_ruleset"],
      });
    } else {
      browser.declarativeNetRequest.updateEnabledRulesets({
        disableRulesetIds: ["redirect_ruleset"],
      });
    }
  }
});
