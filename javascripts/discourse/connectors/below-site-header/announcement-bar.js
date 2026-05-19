import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class AnnouncementBar extends Component {
  @service siteSettings;

  get enabled() {
    return this.siteSettings.enable_announcement_bar;
  }

  get text() {
    return (
      this.siteSettings.announcement_text ||
      "MetaMask SDK is now MetaMask Connect. Go multichain with one integration across Ethereum, Solana, and additional chains as support expands."
    );
  }

  get linkUrl() {
    return this.siteSettings.announcement_link || "https://docs.metamask.io/metamask-connect/";
  }

  get linkLabel() {
    return this.siteSettings.announcement_link_label || "Get started";
  }
}
