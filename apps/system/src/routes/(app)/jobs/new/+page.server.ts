import { CreateJobListingSchema } from '$lib/schema';
import { supabase } from '$lib/supabase/client.js';
import { toBaseForm } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		console.log(formEntries);

		try {
			const { title, description, compensation, location, job_type } =
				CreateJobListingSchema.parse(formEntries);

			const { error } = await supabase.from('jobs').insert({
				title,
				description,
				compensation: toBaseForm(compensation),
				location,
				type: job_type,
				company_id: locals.company_id,
				user_id: locals.user?.id as string,
				is_published: false
			});

			if (error) {
				console.log(error);
				return fail(404, {
					message: error.message
				});
			}

			const { error: activityLogError } = await supabase.from('activity_logs').insert({
				action: 'created a job listing',
				company_id: locals.company_id,
				user_id: locals.user?.id as string
			});

			if (activityLogError) {
				console.log(activityLogError);
				return fail(404, {
					message: activityLogError.message
				});
			}
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				const errors = error.errors.reduce(
					(acc, err) => {
						const field = err.path[0];
						acc[field] = err.message;
						return acc;
					},
					{} as Record<string, string>
				);
				return fail(400, {
					field_errors: errors
				});
			}
		}

		throw redirect(301, '/jobs');
	}
};
