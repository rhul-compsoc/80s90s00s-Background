import React, { createContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { throttle } from 'lodash';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { OnSettingsChange, OrbitParams, Settings } from '@/types/hopalong';
import Menu from './Menu';
import Toolbar from './Toolbar';
import WebGLStats from './WebGLStats';

export type Rating = {
  rating: number;
  params: OrbitParams<number>;
};

export const RatingContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  addRating: (rating: number) => {},
});

type PropsType = {
  stats: Stats;
  settings: Settings;
  onCenter: () => unknown;
  onSettingsChange: OnSettingsChange<Settings>;
  onReset: () => unknown;
};

export default function App({ stats, settings, onSettingsChange, onCenter, onReset }: PropsType) {
  const [toolbarVisible, updateToolbarVisible] = useState(true);
  const [menuOpen, updateMenuOpen] = useState(false);
  const [statsOpen, updateStatsOpen] = useState(false);
  const [ratings, setRatings] = useState<Rating[]>([]);

  const invertCurrent = (value) => !value;
  let hideTimeout: number;

  const showToolbar = throttle(() => {
    updateToolbarVisible(true);
    window.clearTimeout(hideTimeout);
    setToolbarTimeout();
  }, 250);
  const hideToolbar = () => updateToolbarVisible(true);
  const setToolbarTimeout = () => {
    hideTimeout = window.setTimeout(hideToolbar, 2000);
  };

  useEffect(() => {
    document.addEventListener('mousemove', showToolbar);
    document.addEventListener('touchmove', showToolbar);
    setToolbarTimeout();
  });

  useEffect(() => {
    console.log(ratings);
  }, [ratings]);

  const addRating = (rating: number) => {
    const newRatings = ratings;
    newRatings.push({
      rating: rating,//@ts-ignore
      params: window.hopalong.getCurrentOrbitParams(),
    } as Rating);
    setRatings(newRatings);
    // @ts-ignore
    window.ratings = newRatings;
  };

  const { mouseLocked, isPlaying, ...menuSettings } = settings;

  const toolbar = (
    <Toolbar
      menuOpen={menuOpen}
      statsOpen={statsOpen}
      mouseLocked={mouseLocked}
      isPlaying={isPlaying || false}
      updateMenuOpen={() => updateMenuOpen(invertCurrent)}
      updateStatsOpen={() => updateStatsOpen(invertCurrent)}
      updateMouseLocked={() => onSettingsChange({ mouseLocked: !mouseLocked })}
      updateIsPlaying={() => onSettingsChange({ isPlaying: !isPlaying })}
      onCenter={onCenter}
    />
  );

  return (
    <RatingContext.Provider value={{ addRating }}>
      <PlayerWrap>
        <ReactPlayer url="https://www.youtube.com/watch?v=tKi9Z-f6qX4" playing={isPlaying} />
      </PlayerWrap>
      <motion.div
        animate={{
          opacity: toolbarVisible ? 1 : 0,
        }}
      >
        {!menuOpen && <ToolbarWrap>{toolbar}</ToolbarWrap>}
      </motion.div>
      {menuOpen && (
        <MenuBg open={menuOpen}>
          {toolbar}
          <Menu settingsProps={{ settings: menuSettings, onChange: onSettingsChange, onReset }} />
        </MenuBg>
      )}
      <StatsBg open={statsOpen}>
        <WebGLStats stats={stats} />
      </StatsBg>
    </RatingContext.Provider>
  );
}
const zIndexMenu = 5;
const zIndexStats = zIndexMenu + 1;
const zIndexToolbar = zIndexMenu + 2;

const ToolbarWrap = styled.div`
  position: absolute;
  z-index: ${zIndexToolbar};
  top: 0;
  left: 0;
`;
const MenuBg = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: ${zIndexMenu};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto;
`;
const StatsBg = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${({ open }) => (open ? 'block' : 'none')};
  z-index: ${zIndexStats};
  top: 4px;
  right: 4px;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PlayerWrap = styled.div`
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
`;
