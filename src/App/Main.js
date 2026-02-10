import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import {
  Panel,
  HorizontalTab,
} from 'nexus-module';

import VerifyContent from './VerifyContent';
import RegisterContent from './RegisterContent';
import MyAssets from './MyAssets';
import Logo from '../components/Logo';
import { switchTab } from '../actions/actionCreators';

const BrandedHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 14,
  marginBottom: 16,
  paddingBottom: 12,
});

const BrandTitle = styled.h2({
  margin: 0,
  fontSize: 22,
  fontWeight: 700,
  fontFamily: "'Segoe UI', Roboto, sans-serif",
  letterSpacing: '0.5px',
  background: 'linear-gradient(135deg, #ef4568, #f0aa21)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

const BrandSubtitle = styled.span({
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  opacity: 0.5,
  display: 'block',
  marginTop: 2,
});

export default function Main() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();

  const handleSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };

  return (
    <Panel 
      //title="Content Verification" icon={null}>
      title={
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="distordia-logo.svg" alt="" style={{ width: '28px', height: '28px' }} />
          <span style={{ 
            background: 'linear-gradient(135deg, #ef4568 0%, #f0aa21 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 700,
            fontSize: '1.1em',
            letterSpacing: '0.5px',
            textShadow: '0 0 20px rgba(240, 170, 33, 0.3)'
          }}></span>
        </span>
      }>
      <BrandedHeader>
        <Logo size={48} />
        <div>
          <BrandTitle>Content Verification</BrandTitle>
          <BrandSubtitle>by Distordia</BrandSubtitle>
        </div>
      </BrandedHeader>
      <div className="text-center">
        <HorizontalTab.TabBar>
          <HorizontalTab
            active={activeTab === 'Verify'}
            onClick={() => handleSwitchTab('Verify')}
          >
            Verify
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'Register'}
            onClick={() => handleSwitchTab('Register')}
          >
            Register
          </HorizontalTab>
          <HorizontalTab
            active={activeTab === 'MyAssets'}
            onClick={() => handleSwitchTab('MyAssets')}
          >
            My Assets
          </HorizontalTab>
        </HorizontalTab.TabBar>
      </div>

      <div>{activeTab === 'Verify' && <VerifyContent />}</div>
      <div>{activeTab === 'Register' && <RegisterContent />}</div>
      <div>{activeTab === 'MyAssets' && <MyAssets />}</div>
    </Panel>
  );
}
