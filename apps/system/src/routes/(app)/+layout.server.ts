import type { Database } from '$lib/supabase/database.types';
import { supabase } from '$lib/supabase/client.js';
import { fail, redirect } from '@sveltejs/kit';

type Membership = Database['public']['Tables']['memberships']['Row'];
type Company = {
	id: string;
	name: string;
	logo_url: string;
};

type ExtendedMembership = Membership & { company: Company };

export async function load({ locals, url }) {
	if (!locals.user) {
		throw redirect(301, '/login');
	}

	// Get the company related to the membership
	const { data: membership, error } = await supabase
		.from('memberships')
		.select('*, company:companies (id, name, logo_url)')
		.eq('user_id', locals.user.id)
		.single<ExtendedMembership>();

	if (error) {
		return {
			message: error.message
		};
	}

	if (!membership && url.pathname !== '/onboarding') {
		throw redirect(301, '/onboarding');
	}
	return {
		full_name: locals.user.user_metadata.displayName,
		company_name: membership.company.name,
		logo: membership.company.logo_url
	};
}
