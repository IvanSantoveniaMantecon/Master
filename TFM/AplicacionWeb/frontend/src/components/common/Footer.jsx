import React from 'react';
import { Layout } from 'antd';
import './styles/Footer.css';

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer className="custom-footer">
      SymptoRules, Universidad de Oviedo
    </Footer>
  );
}

export default CustomFooter;
