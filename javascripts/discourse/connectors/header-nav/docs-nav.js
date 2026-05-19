import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

const DOCS_LINKS = [
  { label: "Docs", href: "https://docs.metamask.io/" },
  { label: "Connect", href: "https://docs.metamask.io/metamask-connect/" },
  { label: "Embedded Wallets", href: "https://docs.metamask.io/embedded-wallets/" },
  { label: "Snaps", href: "https://docs.metamask.io/snaps/" },
];

export default class DocsNav extends Component {
  @service siteSettings;

  get enabled() {
    return this.siteSettings.show_docs_nav_links;
  }

  get links() {
    return DOCS_LINKS;
  }
}
