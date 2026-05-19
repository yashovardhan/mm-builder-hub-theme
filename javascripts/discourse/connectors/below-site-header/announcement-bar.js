import Component from "@glimmer/component";

export default class AnnouncementBar extends Component {
  get themeSettings() {
    return this.args.themeSettings || (typeof settings !== "undefined" ? settings : {});
  }

  get enabled() {
    const value = this.themeSettings.enable_announcement_bar;
    // Theme default is true; only hide when explicitly false
    if (value === false || value === "false") {
      return false;
    }
    return true;
  }

  get text() {
    return (
      this.themeSettings.announcement_text ||
      "MetaMask SDK is now MetaMask Connect. Go multichain with one integration across Ethereum, Solana, and additional chains as support expands."
    );
  }

  get linkUrl() {
    return this.themeSettings.announcement_link || "https://docs.metamask.io/metamask-connect/";
  }

  get linkLabel() {
    return this.themeSettings.announcement_link_label || "Get started";
  }
}
