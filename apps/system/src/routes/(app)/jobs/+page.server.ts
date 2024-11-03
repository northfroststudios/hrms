import { supabase } from '$lib/supabase/client.js';


export async function load({ locals }) {
	const jobs = await supabase
		.from('jobs')
		.select('*')
		.eq('company_id', locals.company_id)
		.order('created_at', { ascending: false });
	return {
		jobs
	};
}
