import { CreateJobListingSchema } from '$lib/schema';
import { supabase } from '$lib/supabase/client.js';
import { toBaseForm } from '$lib/utils.js';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	default: async ({ request, locals }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { title, description, compensation, location } =
				CreateJobListingSchema.parse(formEntries);

			const { error } = await supabase.from('jobs').insert({
				title,
				description,
				compensation: toBaseForm(compensation),
				location,
				company_id: locals.company_id,
				user_id: locals.user?.id!,
				is_published: false
			});

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
