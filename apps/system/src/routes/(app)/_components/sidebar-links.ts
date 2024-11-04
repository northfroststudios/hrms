import {
	BriefcaseBusiness,
	Building2,
	ChartArea,
	ChartPie,
	LayoutDashboard,
	Nfc,
	UserPen,
	Users
} from 'lucide-svelte';

export const NAV_LINKS = [
	{
		title: 'Home',
		sub_links: [
			{
				name: 'Dashboard',
				href: '/',
				icon: LayoutDashboard
			}
		]
	},
	{
		title: 'Jobs',
		sub_links: [
			{
				name: 'Listings',
				href: '/jobs',
				icon: BriefcaseBusiness
			},
			{
				name: 'Applications',
				href: '/applications',
				icon: UserPen
			}
		]
	},
	{
		title: 'HR',
		sub_links: [
			{
				name: 'Employees',
				href: '/employees',
				icon: Users
			},
			{
				name: 'Departments',
				href: '/departments',
				icon: Building2
			},
		]
	},
	{
		title: 'Payroll',
		sub_links: [
			{
				name: 'Runs',
				href: '/payroll-runs',
				icon: Nfc
			},
			{
				name: 'Pay Grades',
				href: '/pay-grades',
				icon: ChartArea
			},
			{
				name: 'Reports',
				href: '/pay-reports',
				icon: ChartPie
			}
		]
	}
];
