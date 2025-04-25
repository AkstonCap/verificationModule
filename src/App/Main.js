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
} from 'nexus-module';

import NewsFeed from './news';

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
            active={activeTab === 'News'}
            onClick={() => handleSwitchTab('News')}
          >
            News feed
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'Namespace'}
            onClick={() => handleSwitchTab('Namespace')}
          >
            Namespace feed
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'MyProfile'}
            onClick={() => handleSwitchTab('MyProfile')}
          >
            My Profile
          </HorizontalTab>
        </HorizontalTab.TabBar>
      </div>

      <div>{activeTab === 'News' && <News />}</div>
      <div>{activeTab === 'Namespace' && <Namespace />}</div>
      <div>{activeTab === 'MyProfile' && <MyProfile />}</div>

    </Panel>
  );
}
