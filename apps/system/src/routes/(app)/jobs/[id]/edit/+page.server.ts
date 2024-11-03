import { supabase } from '$lib/supabase/client';
import { CreateJobListingSchema } from '$lib/schema';
import { toBaseForm } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export async function load({ params }) {
	const job_detail = await supabase.from('jobs').select('*').eq('id', params.id).single();
	return {
		job_detail
	};
}

export const actions = {
	default: async ({ request, params }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { title, description, compensation, location } =
				CreateJobListingSchema.parse(formEntries);

			const { data,error } = await supabase
				.from('jobs')
				.update({
					title,
					description,
					compensation: toBaseForm(compensation),
					location,
					is_published: false
				})
				.eq('id', params.id);

				console.log(formEntries,data)

			if (error) {
				return fail(404, {
					message: error.message
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
