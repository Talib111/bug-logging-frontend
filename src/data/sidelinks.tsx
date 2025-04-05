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

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Analytics Dashboard',
    label: '',
    href: '/bug-log/dashboard/analytics-dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Grievance Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
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

  {
    title: 'Workflow',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Grievance Workflow',
        label: '',
        href: '/bug-log/dashboard/complaint-workflow',
        icon: <IconHexagonNumber1 size={18} />,
      },
    ],
  },
  {
    title: 'Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      // {
      //   title: 'Users Master',
      //   label: '',
      //   href: '/bug-log/dashboard/users-master',
      //   icon: <Hexagon size={18} />,
      // },
      {
        title: 'Role List',
        label: '',
        href: '/bug-log/dashboard/role',
        icon: <IconHexagonNumber1 size={18} />,
      },
      // {
      //   title: 'FAQ List',
      //   label: '',
      //   href: '/bug-log/dashboard/complaint',
      //   icon: <IconHexagonNumber2 size={18} />,
      // },
      {
        title: 'Module Master',
        label: '',
        href: '/bug-log/dashboard/module-id',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Ulb List',
        label: '',
        href: '/bug-log/dashboard/ulb-list',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Priority List',
        label: '',
        href: '/bug-log/dashboard/priority-list',
        icon: <IconHexagonNumber5 size={18} />,
      },
      {
        title: 'Target Type',
        label: '',
        href: '/bug-log/dashboard/target-type',
        icon: <IconHexagonNumber6 size={18} />,
      },
      {
        title: 'Table Form',
        label: '',
        href: '/bug-log/dashboard/table-form',
        icon: <IconHexagonNumber7 size={18} />,
      },
      // {
      //   title: 'Work Flow Masters',
      //   label: '',
      //   href: 'workflow-master?parentId=null&levelSerial=1',
      //   icon: <IconHexagonNumber8 size={18} />,
      // },
      {
        title: 'Work Flow Role',
        label: '',
        href: '/bug-log/dashboard/workflow-roles',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Grievance Source',
        label: '',
        href: '/bug-log/dashboard/complaint-source',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Grievance Type',
        label: '',
        href: '/bug-log/dashboard/complaint-type',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Location',
        label: '',
        href: '/bug-log/dashboard/location',
        icon: <IconHexagonNumber9 size={18} />,
      },
      // {
      //   title: 'Notifications',
      //   label: '',
      //   href: '/bug-log/dashboard/notifications',
      //   icon: <IconLayoutDashboard size={18} />,
      // },
    ],
  },
  {
    title: 'Custom Data Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <Hexagon size={18} />,
      },
      {
        title: 'FAQ List',
        label: '',
        href: '/bug-log/dashboard/complaint',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Work Flow Masters',
        label: '',
        href: 'workflow-master?parentId=null&levelSerial=1',
        icon: <IconHexagonNumber8 size={18} />,
      },
      {
        title: 'Notifications',
        label: '',
        href: '/bug-log/dashboard/notifications',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Citizen Feedback',
        label: '',
        href: '/bug-log/dashboard/citizen-feedback',
        icon: <IconLayoutDashboard size={18} />,
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
        title: 'Grievance Report',
        label: '',
        href: '/bug-log/dashboard/complaint-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Grievance SLA Report',
        label: '',
        href: '/bug-log/dashboard/bug-log-sla-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Workflow Wise Report',
        label: '',
        href: '/bug-log/dashboard/wf-wise-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Resolution Days Report',
        label: '',
        href: '/bug-log/dashboard/resolution-days-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
    ],
  },

  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]

//1 ULB ADMIN SIDELINKS
export const ulbAdminSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Complaint Entry',
  //   label: '',
  //   href: '/bug-log/dashboard/management-complaint-form',
  //   icon: <IconChecklist size={18} />,
  // },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
  },

  // {
  //   title: 'Workflow',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={20} />,
  //   sub: [
  //     {
  //       title: 'Complaint Workflow',
  //       label: '',
  //       href: '/bug-log/dashboard/complaint-workflow',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //   ],
  // },
  {
    title: 'Custom Data Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <Hexagon size={18} />,
      },
      {
        title: 'Work Flow Masters',
        label: '',
        href: 'workflow-master?parentId=null&levelSerial=1',
        icon: <Hexagon size={18} />,
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
        title: 'Grievance Report',
        label: '',
        href: '/bug-log/dashboard/complaint-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Grievance SLA Report',
        label: '',
        href: '/bug-log/dashboard/bug-log-sla-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Workflow Wise Report',
        label: '',
        href: '/bug-log/dashboard/wf-wise-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Resolution Days Report',
        label: '',
        href: '/bug-log/dashboard/resolution-days-reports',
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
export const superAdminSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
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
    title: 'Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Role List',
        label: '',
        href: '/bug-log/dashboard/role',
        icon: <IconHexagonNumber1 size={18} />,
      },

      {
        title: 'Priority List',
        label: '',
        href: '/bug-log/dashboard/priority-list',
        icon: <IconHexagonNumber5 size={18} />,
      },

      {
        title: 'Platform',
        label: '',
        href: '/bug-log/dashboard/complaint-source',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <Hexagon size={18} />,
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

//3 JSK/IVR/CALLING SIDE LINKS
export const jskSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },

  {
    title: 'Grievance Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
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

//4 NORMAL SIDELINKS
export const normalSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Complaint Entry',
  //   label: '',
  //   href: '/bug-log/dashboard/management-complaint-form',
  //   icon: <IconChecklist size={18} />,
  // },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Workflow',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Grievance Workflow',
        label: '',
        href: '/bug-log/dashboard/complaint-workflow',
        icon: <IconHexagonNumber1 size={18} />,
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

//5 STATE GRO SIDE LINKS
export const stateGroSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Complaint Entry',
  //   label: '',
  //   href: '/bug-log/dashboard/management-complaint-form',
  //   icon: <IconChecklist size={18} />,
  // },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Workflow',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Grievance Workflow',
        label: '',
        href: '/bug-log/dashboard/complaint-workflow',
        icon: <IconHexagonNumber1 size={18} />,
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
        title: 'Grievance Report',
        label: '',
        href: '/bug-log/dashboard/complaint-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Grievance SLA Report',
        label: '',
        href: '/bug-log/dashboard/bug-log-sla-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Workflow Wise Report',
        label: '',
        href: '/bug-log/dashboard/wf-wise-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Resolution Days Report',
        label: '',
        href: '/bug-log/dashboard/resolution-days-reports',
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

//6 ULB GRO SIDE LINKS
export const ulbGroSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Active Bugs',
    label: '',
    href: '/bug-log/dashboard/complaint-workflow',
    icon: <IconHexagonNumber1 size={18} />,
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
        title: 'Role List',
        label: '',
        href: '/bug-log/dashboard/role',
        icon: <IconHexagonNumber1 size={18} />,
      },

      {
        title: 'Priority List',
        label: '',
        href: '/bug-log/dashboard/priority-list',
        icon: <IconHexagonNumber5 size={18} />,
      },

      {
        title: 'Platform',
        label: '',
        href: '/bug-log/dashboard/complaint-source',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Projects',
        label: '',
        href: '/bug-log/dashboard/project-mstrs',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <Hexagon size={18} />,
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

//7 STATEADMIN SIDELINKS
export const stateAdminSidelinks: SideLink[] = [
  {
    title: 'Analytics Dashboard',
    label: '',
    href: '/bug-log/dashboard/analytics-dashboard',
    icon: <IconLayoutDashboard size={18} />,
  },
  // {
  //   title: 'Complaint Entry',
  //   label: '',
  //   href: '/bug-log/dashboard/management-complaint-form',
  //   icon: <IconChecklist size={18} />,
  // },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
  },

  {
    title: 'Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Role List',
        label: '',
        href: '/bug-log/dashboard/role',
        icon: <IconHexagonNumber1 size={18} />,
      },

      {
        title: 'Module Master',
        label: '',
        href: '/bug-log/dashboard/module-id',
        icon: <IconHexagonNumber3 size={18} />,
      },
      {
        title: 'Ulb List',
        label: '',
        href: '/bug-log/dashboard/ulb-list',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Priority List',
        label: '',
        href: '/bug-log/dashboard/priority-list',
        icon: <IconHexagonNumber5 size={18} />,
      },
      {
        title: 'Target Type',
        label: '',
        href: '/bug-log/dashboard/target-type',
        icon: <IconHexagonNumber6 size={18} />,
      },
      {
        title: 'Table Form',
        label: '',
        href: '/bug-log/dashboard/table-form',
        icon: <IconHexagonNumber7 size={18} />,
      },
      {
        title: 'Work Flow Role',
        label: '',
        href: '/bug-log/dashboard/workflow-roles',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Grievance Problems',
        label: '',
        href: '/bug-log/dashboard/gr-problems',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Grievance Departments',
        label: '',
        href: '/bug-log/dashboard/gr-department',
        icon: <IconHexagonNumber4 size={18} />,
      },
      {
        title: 'Grievance Source',
        label: '',
        href: '/bug-log/dashboard/complaint-source',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Grievance Type',
        label: '',
        href: '/bug-log/dashboard/complaint-type',
        icon: <IconHexagonNumber9 size={18} />,
      },
      {
        title: 'Location',
        label: '',
        href: '/bug-log/dashboard/location',
        icon: <IconHexagonNumber9 size={18} />,
      },
    ],
  },
  {
    title: 'Custom Data Masters',
    label: '',
    href: '',
    icon: <IconUserShield size={20} />,
    sub: [
      {
        title: 'Users Master',
        label: '',
        href: '/bug-log/dashboard/users-master',
        icon: <Hexagon size={18} />,
      },
      {
        title: 'FAQ List',
        label: '',
        href: '/bug-log/dashboard/complaint',
        icon: <IconHexagonNumber2 size={18} />,
      },
      {
        title: 'Work Flow Masters',
        label: '',
        href: 'workflow-master?parentId=null&levelSerial=1',
        icon: <IconHexagonNumber8 size={18} />,
      },
      {
        title: 'Notifications',
        label: '',
        href: '/bug-log/dashboard/notifications',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Citizen Feedback',
        label: '',
        href: '/bug-log/dashboard/citizen-feedback',
        icon: <IconLayoutDashboard size={18} />,
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
        title: 'Grievance Report',
        label: '',
        href: '/bug-log/dashboard/complaint-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Grievance SLA Report',
        label: '',
        href: '/bug-log/dashboard/bug-log-sla-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Workflow Wise Report',
        label: '',
        href: '/bug-log/dashboard/wf-wise-reports',
        icon: <IconLayoutDashboard size={18} />,
      },
      {
        title: 'Resolution Days Report',
        label: '',
        href: '/bug-log/dashboard/resolution-days-reports',
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

//8 STATEJSK SIDELINKS
export const stateJskSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },

  {
    title: 'Grievance Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
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

// 9 CITIZEN LINKS
// export const citizenLinks: SideLink[] = [

//   {
//     title: 'Dashboard' ,
//     label: '',
//     href: '/bug-log/citizen-dashboard/home',
//     icon: <IconLayoutDashboard size={18} />,
//   },

//   {
//     title: 'All Grievance',
//     label: '',
//     href: '/bug-log/citizen-dashboard/all-complaints',
//     icon: <IconChecklist size={18} />,
//   },
//   {
//     title: 'All Feedbacks',
//     label: '',
//     href: '/bug-log/citizen-dashboard/citizen-testimonials',
//     icon: <IconChecklist size={18} />,
//   },
//   {
//     title: 'Give Your Feedback',
//     label: '',
//     href: '/bug-log/citizen-dashboard/citizen-review',
//     icon: <IconChecklist size={18} />,
//   },
//   {
//     title: 'Quick Tools',
//     label: '',
//     href: '',
//     icon: <IconUserShield size={20} />,
//     sub: [
//       {
//         title: 'Property Tools',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=property',
//         icon: <IconHexagonNumber1 size={18} />,
//       },
//       {
//         title: 'Water Tools',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=water',
//         icon: <IconHexagonNumber2 size={18} />,
//       },
//       {
//         title: 'Trade Tools',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=trade_License',
//         icon: <IconHexagonNumber3 size={18} />,
//       },
//       {
//         title: 'General Tools',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=general',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//       {
//         title: 'Pet Registration',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=pet_Registration',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//       {
//         title: 'Septic Tank Cleaning Tools',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=septic_Tank_Cleaning',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//       {
//         title: 'Water User Charge',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=water_User_Charge',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//       {
//         title: 'Advertisement Tax',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=advertisement_Tax',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//       {
//         title: 'Lodge And Banquet',
//         label: '',
//         href: '/bug-log/citizen-dashboard/tools?type=lodge_And_Banquet_Registration',
//         icon: <IconHexagonNumber4 size={18} />,
//       },
//     ],
//   },
//   {
//     title: 'Support',
//     label: '',
//     href: '',
//     icon: <IconUserShield size={20} />,
//     sub: [
//       {
//         title: 'Zone Wise Ward List',
//         label: '',
//         href: '/bug-log/citizen-dashboard/zone-ward-list',
//         icon: <IconHexagonNumber1 size={18} />,
//       },
//       {
//         title: 'FAQ',
//         label: '',
//         href: '/bug-log/citizen-dashboard/citizen-faq',
//         icon: <IconHexagonNumber2 size={18} />,
//       },
//       {
//         title: 'Privacy Policy',
//         label: '',
//         href: '/bug-log/citizen-dashboard/privacy-policy',
//         icon: <IconHexagonNumber3 size={18} />,
//       },

//     ],
//   },
//   {
//     title: 'Profile',
//     label: '',
//     href: '/bug-log/citizen-dashboard/profile',
//     icon: <IconChecklist size={18} />,
//   },
// ]




export const citizenLinks = () => {
  const { currentLanguage, languageKey }: any = useAppContext()

  // Check if the app is opened in a React Native WebView
  const isWebView = typeof window !== 'undefined' && window?.ReactNativeWebView;

  // Base links
  const links = [
    {
      title: currentLanguage?.DASHBOARD,
      label: '',
      href: '/bug-log/citizen-dashboard/home',
      icon: <IconLayoutDashboard size={18} />,
      isHref: false
    },
    {
      title: currentLanguage?.ALL_GR,
      label: '',
      href: '/bug-log/citizen-dashboard/all-complaints',
      icon: <IconChecklist size={18} />,
      isHref: false
    },
    {
      title: currentLanguage?.AF,
      label: '',
      href: '/bug-log/citizen-dashboard/citizen-testimonials',
      icon: <IconChecklist size={18} />,
      isHref: false
    },
    {
      title: currentLanguage?.GYF,
      label: '',
      href: '/bug-log/citizen-dashboard/citizen-review',
      icon: <IconChecklist size={18} />,
      isHref: false
    },
    {
      title: currentLanguage?.QUICK_TOOL,
      label: '',
      href: '',
      icon: <IconUserShield size={20} />,
      sub: [
        {
          title: currentLanguage?.PROPERTY_TOOLS,
          label: '',
          href: '/bug-log/citizen-dashboard/tools?type=property',
          icon: <IconHexagonNumber1 size={18} />,
        },
        {
          title: currentLanguage?.WATER_TOOLS,
          label: '',
          href: '/bug-log/citizen-dashboard/tools?type=water',
          icon: <IconHexagonNumber2 size={18} />,
        },
        {
          title: currentLanguage?.TRADE_TOOLS,
          label: '',
          href: '/bug-log/citizen-dashboard/tools?type=trade_License',
          icon: <IconHexagonNumber3 size={18} />,
        },
        {
          title: currentLanguage?.GENERAL_TOOLS,
          label: '',
          href: '/bug-log/citizen-dashboard/tools?type=general',
          icon: <IconHexagonNumber4 size={18} />,
        },
      ],
      isHref: false
    },
    {
      title: currentLanguage?.SUPPORT,
      label: '',
      href: '',
      icon: <IconUserShield size={20} />,
      sub: [
        // {
        //   title: currentLanguage?.L,
        //   label: '',
        //   href: '/bug-log/citizen-dashboard/zone-ward-list',
        //   icon: <IconHexagonNumber1 size={18} />,
        // },
        {
          title: currentLanguage?.FAQ_SRT,
          label: '',
          href: '/bug-log/citizen-dashboard/citizen-faq',
          icon: <IconHexagonNumber1 size={18} />,
        },
        {
          title: currentLanguage?.PRIVACY_POLICY,
          label: '',
          href: '/bug-log/citizen-dashboard/privacy-policy',
          icon: <IconHexagonNumber2 size={18} />,
        },
      ],
      isHref: false
    },
  ];

  // If it's a WebView, add the MP link
  if (isWebView) {
    links.push({
      title: "Home",
      label: '',
      href: 'https://jharkhandegovernance.com/juidco-app',
      icon: <House size={18} />,
      isHref: true
    });
  }


  return links;
};

// export default getCitizenLinks;

//10 Telecaller
export const telecallerSidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/bug-log/dashboard/home',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Complaint Entry',
    label: '',
    href: '/bug-log/dashboard/management-complaint-form',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Search Grievance',
    label: '',
    href: '/bug-log/dashboard/complaint-reports',
    icon: <IconLayoutDashboard size={18} />,
  },

  // {
  //   title: 'Workflow',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={20} />,
  //   sub: [
  //     {
  //       title: 'Complaint Workflow',
  //       label: '',
  //       href: '/bug-log/dashboard/complaint-workflow',
  //       icon: <IconHexagonNumber1 size={18} />,
  //     },
  //   ],
  // },
  // {
  //   title: 'Custom Data Masters',
  //   label: '',
  //   href: '',
  //   icon: <IconUserShield size={20} />,
  //   sub: [
  //     {
  //       title: 'Users Master',
  //       label: '',
  //       href: '/bug-log/dashboard/users-master',
  //       icon: <Hexagon size={18} />,
  //     },
  //     {
  //       title: 'Work Flow Masters',
  //       label: '',
  //       href: 'workflow-master?parentId=null&levelSerial=1',
  //       icon: <Hexagon size={18} />,
  //     },
  //   ],
  // },
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
