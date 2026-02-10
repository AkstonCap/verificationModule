import { useSelector, useDispatch } from 'react-redux';
import {
  Panel,
  HorizontalTab,
} from 'nexus-module';

import VerifyContent from './VerifyContent';
import RegisterContent from './RegisterContent';
import MyAssets from './MyAssets';
import { switchTab } from '../actions/actionCreators';

export default function Main() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();

  const handleSwitchTab = (tab) => {
    dispatch(switchTab(tab));
  };

  return (
    <Panel title="Content Verification" icon={{ url: 'react.svg', id: 'icon' }}>
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
