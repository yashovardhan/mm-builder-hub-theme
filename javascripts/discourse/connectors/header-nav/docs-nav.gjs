import Component from "@glimmer/component";

const DOCS_LINKS = [
  { label: "Docs", href: "https://docs.metamask.io/" },
  { label: "Connect", href: "https://docs.metamask.io/metamask-connect/" },
  { label: "Embedded Wallets", href: "https://docs.metamask.io/embedded-wallets/" },
  { label: "Snaps", href: "https://docs.metamask.io/snaps/" },
];

export default class DocsNav extends Component {
  get themeSettings() {
    return this.args.themeSettings || (typeof settings !== "undefined" ? settings : {});
  }

  get enabled() {
    const value = this.themeSettings.show_docs_nav_links;
    if (value === false || value === "false") {
      return false;
    }
    return true;
  }

  get links() {
    return DOCS_LINKS;
  }

  <template>
    {{#if this.enabled}}
      <ul class="mm-header-docs-nav" aria-label="MetaMask documentation">
        {{#each this.links as |link|}}
          <li>
            <a href={{link.href}} target="_blank" rel="noopener noreferrer">{{link.label}}</a>
          </li>
        {{/each}}
      </ul>
    {{/if}}
  </template>
}
