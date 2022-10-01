import React, { ReactNode, useEffect, useState, useRef } from "react";
import { PropsWithChildren } from 'react';


import { Container } from "./styles";

interface Props {
  children: ReactNode | undefined;
};

const scrollThreshold = 300;

declare global {
  interface Window {
    toggleActiveMenu: (() => void) | undefined;
  }
}

const SideMenu: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
      setIsActive(false); 
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);

  const classes = [
    isActive ? 'open' : '',
    scrollY <= scrollThreshold ? 'scrollOpen' : '', 
  ];

  const className = classes.join(' ').trim();

  function toggleActiveMenu() {
    setIsActive((prevState) => !prevState);
  }
  window.toggleActiveMenu = toggleActiveMenu;

  return <Container className={className}>{children}</Container>; 
};

export default SideMenu;
