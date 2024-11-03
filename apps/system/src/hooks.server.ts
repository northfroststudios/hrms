import { supabase } from '$lib/supabase/client';
import type { Database } from '$lib/supabase/database.types';

type Membership = Database['public']['Tables']['memberships']['Row'];

// this updates event.locals
export const handle = async ({ event, resolve }) => {
	const {
		data: { session }
	} = await supabase.auth.getSession();
	event.locals.user = session?.user ?? null;

	if (event.locals.user) {
		const { data: membership, error } = await supabase
			.from('memberships')
			.select('*, company:companies (id, name, logo_url)')
			.eq('user_id', event.locals.user.id)
			.single<Membership>();

      event.locals.company_id = membership?.company_id!
	}

	return resolve(event);
};
