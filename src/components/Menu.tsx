import React, { useState } from 'react';
import styled from 'styled-components';
import { UnstyledButton } from '../styles/mixins';
import { classes } from '../styles/utils';
import { Settings } from '../types/hopalong';
import InfoPanel from './InfoPanel';
import SettingsPanel from './SettingsPanel';

enum Tabs {
  SETTINGS = 'Settings',
  ABOUT = 'About',
}
type PropsType = {
  settings: Settings;
  onSettingsChange: (settings: Settings) => unknown;
};

export default function Menu({ settings, onSettingsChange }: PropsType) {
  const tabs = [Tabs.SETTINGS, Tabs.ABOUT];
  const [currentTab, updateCurrentTab] = useState(Tabs.SETTINGS);

  let content;
  switch (currentTab) {
    case Tabs.ABOUT:
      content = <InfoPanel />;
      break;
    case Tabs.SETTINGS:
      content = <SettingsPanel settings={settings} onChange={onSettingsChange} />;
      break;
  }
  return (
    <Root>
      <TabBar>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={classes({ active: currentTab === tab })}
            onClick={() => updateCurrentTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabBar>
      <Content>{content}</Content>
    </Root>
  );
}
const Root = styled.div`
  padding: 0 16px;
  font-size: 13px;
  font-weight: bold;
`;
const TabBar = styled.header`
  display: flex;
  justify-content: center;
`;
const Tab = styled(UnstyledButton)`
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid white;
  color: white;

  &:hover,
  &.active {
    background-color: white;
    color: black;
  }
`;
const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;
