import { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import {
  Panel,
  Switch,
  Tooltip,
  TextField,
  Button,
  FieldSet,
  confirm,
  apiCall,
  showErrorDialog,
  showSuccessDialog,
  HorizontalTab,
} from 'nexus-module';

import NewsFeed from './news';
import NamespaceFeed from './namespace';
import Profile from './profile';
import { switchTab } from '../actions/actionCreators';

export default function Main() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();

  const handleSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };

  return (
    <Panel title="Distordia news" icon={{ url: 'react.svg', id: 'icon' }}>
      <div className="text-center">
        <HorizontalTab.TabBar>
          <HorizontalTab
            active={activeTab === 'NewsFeed'}
            onClick={() => handleSwitchTab('NewsFeed')}
          >
            News feed
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'NamespaceFeed'}
            onClick={() => handleSwitchTab('NamespaceFeed')}
          >
            Namespace feed
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'Profile'}
            onClick={() => handleSwitchTab('Profile')}
          >
            My Profile
          </HorizontalTab>
        </HorizontalTab.TabBar>
      </div>

      <div>{activeTab === 'NewsFeed' && <NewsFeed />}</div>
      <div>{activeTab === 'NamespaceFeed' && <NamespaceFeed />}</div>
      <div>{activeTab === 'Profile' && <Profile />}</div>

    </Panel>
  );
}
