import { LoginSchema } from '$lib/schema.js';
import { supabase } from '$lib/supabase/client';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	login: async ({ locals, request }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { email, password } = LoginSchema.parse(formEntries);
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				return fail(404, {
					message: error.message
				});
			}

			if (data.user && data.session) {
				locals.user = data.user;
				locals.session = data.session;
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

		redirect(303, '/');
	}
};
