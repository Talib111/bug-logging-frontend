// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable react/react-in-jsx-scope */
import {
  IconChecklist,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconHexagonNumber6,
  IconHexagonNumber7,
  IconHexagonNumber8,
  IconHexagonNumber9,
  IconLayoutDashboard,
  IconSettings,
  IconUserShield,
} from '@tabler/icons-react'
// import { useAppContext } from "@/context"
import { useAppContext } from '@/context'

import { Hexagon } from 'lucide-react'
import { House } from 'lucide-react';
import { useEffect } from 'react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

//2 SUPERADMIN SIDELINKS
export const superAdminSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Bug Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },

  {
    title: 'Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Projects',
        label: '',
        href: '/bug-log/dashboard/project-mstrs',
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: 'Role List',
        label: '',
        href: '/bug-log/dashboard/role',
        icon: <IconHexagonNumber2 size={18} />,
      },

      {
        title: 'Priority List',
        label: '',
        href: '/bug-log/dashboard/priority-list',
        icon: <IconHexagonNumber3 size={18} />,
      },

      {
        title: 'Platform',
        label: '',
        href: '/bug-log/dashboard/complaint-source',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <IconHexagonNumber5 size={18} />,
      },
    ],
  },
  {
    title: 'Reports',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Bug Report',
        label: '',
        href: '/bug-log/dashboard/complaint-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
    ],
  },

  {
    title: 'Change Password',
    label: '',
    href: '/bug-log/dashboard/change-password',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Profile',
    label: '',
    href: '/bug-log/dashboard/profile',
    icon: <IconChecklist size={18} />,
  },
]
//2 SUPERADMIN SIDELINKS
export const projectClientSideLinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/client-home',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Bug List',
    label: '',
    href: '/bug-log/dashboard/complaint-workflow',
    icon: <IconHexagonNumber1 size={18} />,
  },
  {
    title: 'Enhacement List',
    label: '',
    href: '/bug-log/dashboard/enhancement-list',
    icon: <IconHexagonNumber1 size={18} />,
  },
  {
    title: 'Bug Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },

  {
    title: 'Change Password',
    label: '',
    href: '/bug-log/dashboard/change-password',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Profile',
    label: '',
    href: '/bug-log/dashboard/profile',
    icon: <IconChecklist size={18} />,
  },
]
