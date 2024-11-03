import { supabase } from '$lib/supabase/client.js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export async function load({ params }) {
	const job_detail = await supabase.from('jobs').select('*').eq('id', params.id).single();
	return {
		job_detail
	};
}

export const actions: Actions = {
	delete: async ({ params }) => {
		const { error } = await supabase.from('jobs').delete().eq('id', params.id);

		if (error) {
			return fail(500, {
				error: 'Failed to delete job'
			});
		}

		throw redirect(301, '/jobs');
	}
};
