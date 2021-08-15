import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
//nombre de los menùs en la barra de navegaciòn lateral con sus iconos
export const SidebarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Egresado',
    cName: 'nav-text'
  },
  {
    title: 'Listado de Egresados',
    path: '/listaegresados',
    icon: <FaIcons.FaListAlt/>,
    cName: 'nav-text'
  },
  {
    title: 'Seguimiento',
    cName: 'nav-text'
  },
  {
    title: 'Información Laboral',
    path: '/informacionlaboral',
    icon: <FaIcons.FaUserTie />,
    cName: 'nav-text'
  },
];