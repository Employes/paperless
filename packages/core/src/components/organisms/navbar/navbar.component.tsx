import { Component, h, Host, Listen, Prop, State } from '@stencil/core';

@Component({
    tag: 'p-navbar',
    styleUrl: 'navbar.component.scss',
    shadow: true,
})
export class Navbar {
    /**
     * The text to display for the close button
     */
    @Prop() closeText = 'Close';

    /**
     * The text to display for the menu button & sidebar title
     */
    @Prop() menuText = 'Menu';

    @State() private _showMenu = false;

    render() {
        return (
            <Host class="p-navbar">
                <div
                    class={`backdrop ${this._showMenu && 'show'}`}
                    onClick={() => (this._showMenu = false)}
                ></div>
                <div class={`sidebar ${this._showMenu && 'show'}`}>
                    <div class="header">
                        <p class="text-xl m-0 font-semibold text-storm-dark">
                            {this.menuText}
                        </p>

                        <p-button
                            variant="secondary"
                            icon="negative"
                            iconPosition="end"
                            size="small"
                            onClick={() => (this._showMenu = false)}
                        >
                            {this.closeText}
                        </p-button>
                    </div>
                    <div class="company">
                        <slot name="company" />
                    </div>
                    <div class="content">
                        <slot name="content" />
                    </div>

                    <div class="user">
                        <slot name="user" />
                    </div>
                </div>

                <div class="top-bar">
                    <p-button
                        variant="secondary"
                        icon="menu"
                        size="small"
                        onClick={() => (this._showMenu = true)}
                    >
                        {this.menuText}
                    </p-button>

                    <slot name="topbar" />
                </div>
            </Host>
        );
    }

    @Listen('closeNavbar', { target: 'window' })
    handleCloseNavbar() {
        this._showMenu = false;
    }

    @Listen('openNavbar', { target: 'window' })
    handleOpenNavbar() {
        this._showMenu = true;
    }
}
