import { ResetPasswordSchema } from '$lib/schema.js';
import { supabase } from '$lib/supabase/client.js';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	default: async ({ request, url }) => {
		let token = url.searchParams.get('access_token');

		if (!token) {
			return fail(400, { message: 'Token is missing' });
		}

		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { password } = ResetPasswordSchema.parse(formEntries);

			const { error } = await supabase.auth.updateUser({
				password: password
			});

			if (error) {
				return fail(404, {
					message: error.message
				});
			}
		} catch (error) {
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

		redirect(303, '/login');
	}
};
