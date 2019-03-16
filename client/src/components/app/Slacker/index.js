import { connect } from "react-redux";
import { joinGroupRequest, selectGroup } from "../../group/duck/actions";
import { getQueuedInvite, getHasGroups } from "../../group/duck/selectors";

import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Header from "../../layout/Header";
import Content from "../../layout/Content";
import ThemeSwitcher from "../../ui/ThemeSwitcher";

import SideMenu from "../../layout/SideMenu";
import SideMenuLeft from "../../layout/SideMenuLeft";
import SideMenuRight from "../../layout/SideMenuRight";

import GroupList from "../../group/GroupList";
import ChannelName from "../../channel/ChannelName";
import styles from "./Slacker.scss";
import HamburgerButton from "../../ui/HamburgerButton";
import IconContainer from "../../reuse/IconContainer";
import { removeUiModalEscape } from "../../ui/duck/actions";
import Group from "../../group/Group";
import ChannelView from "../../channel/ChannelView";
import Row from "../../reuse/Row";
import ChannelBar from "../../channel/ChannelBar";
import ChannelViewSwitcher from "../../channel/ChannelViewSwitcher";
import ChannelNavigator from "../../channel/ChannelNavigator";
import Home from "../../home/Home";
import HeaderSecondary from "../../layout/HeaderSecondary";
import Main from "../../layout/Main";
import HeaderPrimary from "../../layout/HeaderPrimary";
import HomeMenu from "../../home/HomeMenu";
import Column from "../../reuse/Column";
import UserDetails from "../../user/UserDetails";


class Slacker extends Component {
    componentDidMount() {
        document.addEventListener("keydown", this.handleEscape, false);

        const { queuedGroup, onJoin } = this.props;
        if (queuedGroup) onJoin(queuedGroup);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleEscape, false);
    }

    handleEscape = event => {
        if (event.keyCode == 27) {
            const { onHideModal } = this.props;
            onHideModal();
        }
    }

    render() {
        const { hasGroups } = this.props;
        return (
            <div className={styles.Slacker}>
                <SideMenu>
                    <SideMenuLeft>
                        <GroupList />
                    </SideMenuLeft>
        
                    <SideMenuRight>
                        {hasGroups && <Route path="/:groupId" component={Group} />}
                        <Route path="/@me" component={HomeMenu} />
                        <UserDetails />
                    </SideMenuRight>
                </SideMenu>
        
                <Content>
                    <Header>
                        <HamburgerButton />
                        <HeaderPrimary>
                            <Column justifyContent="center">
                                <Route path="/:groupId/channels/:channelId" component={ChannelName} />
                                <Route path="/:groupId/channels/:channelId" component={ChannelBar} />
                            </Column>
                        </HeaderPrimary>

                        <HeaderSecondary>
                            <IconContainer>
                                <Route path="/:groupId/channels/:channelId" component={ChannelViewSwitcher}  />
                                <ThemeSwitcher />
                            </IconContainer>
                        </HeaderSecondary>
                    </Header>

                    <Main>
                        <Switch>
                            <Route path="/:groupId/channels/:channelId" component={ChannelView} />
                            <Route path="/@me" component={Home} />
                        </Switch>
                    </Main>
                    <ChannelNavigator />
                </Content>
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasGroups: getHasGroups(state),
    queuedGroup: getQueuedInvite(state)
});

export default withRouter(
connect(mapStateToProps, {
    onJoin: joinGroupRequest,
    onHideModal: removeUiModalEscape,
    onSelect: selectGroup
})(Slacker));