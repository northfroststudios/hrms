import { RegisterSchema } from '$lib/schema.js';
import { supabase } from '$lib/supabase/client.js';
import { fail, redirect } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	register: async ({ locals, request }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { email, password, name } = RegisterSchema.parse(formEntries);

			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						displayName: name
					}
				}
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
			} else {
				console.log(error);
				return fail(400, {
					message: 'We are unable to create your account at this time. Please try again'
				});
			}
		}

		redirect(303, '/onboarding');
	}
};
