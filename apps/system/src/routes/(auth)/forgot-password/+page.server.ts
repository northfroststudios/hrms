import { ForgotPasswordSchema } from '$lib/schema.js';
import { supabase } from '$lib/supabase/client';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';

export const actions = {
	login: async ({ request }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { email } = ForgotPasswordSchema.parse(formEntries);
			const { error } = await supabase.auth.resetPasswordForEmail(email);

			if (error) {
				return fail(404, {
					message: error.message
				});
			}
			return {
				success: "We've sent an reset link to your mail."
			};
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
	}
};
