import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io5';

export const SidebarData = [
  {
    title: 'My Day',
    path: '/',
    icon: <FiIcons.FiSun />,
    cName: 'sub-nav-text'
  },
  {
    title: 'Important',
    path: '/important',
    icon: <AiIcons.AiOutlineStar />,
    cName: 'sub-nav-text'
  },
  {
    title: 'Planned',
    path: '/planned',
    icon: <IoIcons.IoCalendarOutline />,
    cName: 'sub-nav-text'
  },
  {
    title: 'Assigned to me',
    path: '/assigned',
    icon: <IoIcons.IoPeopleOutline />,
    cName: 'sub-nav-text'
  },
  {
    title: 'Flagged task',
    path: '/Flagged',
    icon: <AiIcons.AiOutlineFlag />,
    cName: 'sub-nav-text'
  },
  {
    title: 'Task',
    path: '/task',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'sub-nav-text'
  }
];