import { supabase } from '$lib/supabase/client';

export async function load() {
	const [jobsResponse, membershipResponse, previousJobsResponse, previousMembershipResponse] = await Promise.all([
		supabase.from('jobs').select('*').eq('is_published', true),
		supabase.from('memberships').select('*').eq('is_active', true),
		// Fetch all published jobs that were created before the start of the current month
		supabase.from('jobs').select('*')
			.eq('is_published', true)
			.lt('created_at', new Date(new Date().setMonth(new Date().getMonth())).toISOString()),
		// Fetch all active memberships that were created before the start of the current month
		supabase.from('memberships').select('*')
			.eq('is_active', true)
			.lt('created_at', new Date(new Date().setMonth(new Date().getMonth())).toISOString())
	]);

	const openPositions = jobsResponse.data;
	const activeMemberships = membershipResponse.data;
	const previousJobs = previousJobsResponse.data;
	const previousMemberships = previousMembershipResponse.data;

	const employeeTrend = (activeMemberships?.length ?? 0) - (previousMemberships?.length ?? 0);
	const jobsTrend = (openPositions?.length ?? 0) - (previousJobs?.length ?? 0);

	return { 
		openPositions, 
		activeMemberships,
		trends: {
			employees: employeeTrend >= 0 ? `+${employeeTrend}` : employeeTrend.toString(),
			jobs: jobsTrend >= 0 ? `+${jobsTrend}` : jobsTrend.toString()
		}
	};
}
