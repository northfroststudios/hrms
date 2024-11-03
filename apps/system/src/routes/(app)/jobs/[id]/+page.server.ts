import { supabase } from '$lib/supabase/client.js';

export async function load({ params }) {
	const job_detail = await supabase.from('jobs').select('*').eq('id', params.id).single();
	return {
		job_detail
	};
}
